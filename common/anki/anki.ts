import { AudioClip } from '@project/common/audio-clip';
import { CardModel, Image } from '@project/common';
import { HttpFetcher, Fetcher } from '@project/common';
import { AnkiSettings } from '@project/common/settings';
import sanitize from 'sanitize-filename';
import { extractText, sourceString } from '@project/common/util';

const ankiQuerySpecialCharacters = ['"', '*', '_', '\\', ':'];
const alphaNumericCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomString = () => {
    let string = '';

    for (let i = 0; i < 8; ++i) {
        string += alphaNumericCharacters.charAt(Math.floor(Math.random() * alphaNumericCharacters.length));
    }

    return string;
};

// Makes a file name unique with reasonable probability by appending a string of random characters.
// Leaves more room for the original file name than Anki's appended hash when `storeMediaFile`
// is called with `deleteExising` == true.
// Also, AnkiConnect Android doesn't support `deleteExisting` anyway.
const makeUniqueFileName = (fileName: string) => {
    const match = /(.*)\.(.*)/.exec(fileName);

    if (match === null || match.length < 3) {
        // Give up (not likely since we expect fileName to have an extension)
        return fileName;
    }

    const baseName = match[1];
    const exension = match[2];
    return `${baseName}_${randomString()}.${exension}`;
};

const htmlTagRegexString = '<([^/ >])*[^>]*>(.*?)</\\1>';

// Given <a><b>content</b></a> return ['<a><b>content</b></a>', '<b>content</b>', 'content']
const tagContent = (html: string) => {
    const htmlTagRegex = new RegExp(htmlTagRegexString);
    let content = html;
    let contents = [html];

    while (true) {
        const match = htmlTagRegex.exec(content);

        if (match === null || match.length < 3) {
            break;
        }

        content = match[2];
        contents.push(content);
    }

    return contents;
};

export const inheritHtmlMarkup = (original: string, markedUp: string) => {
    const htmlTagRegex = new RegExp(htmlTagRegexString, 'ig');
    const markedUpWithoutBreaklines = markedUp.replaceAll('<br>', '');
    let inherited = original;

    while (true) {
        const match = htmlTagRegex.exec(markedUpWithoutBreaklines);

        if (match === null || match.length < 3) {
            break;
        }

        let newInherited = inherited;

        if (!inherited.includes(match[0])) {
            const candidateTargets = tagContent(match[2]);

            for (const target of candidateTargets) {
                newInherited = inherited.replace(target, match[0]);

                if (newInherited !== inherited) {
                    break;
                }
            }
        }

        inherited = newInherited;
    }

    return inherited;
};

export type AnkiExportMode = 'gui' | 'updateLast' | 'default';

export async function exportCard(card: CardModel, ankiSettings: AnkiSettings, exportMode: AnkiExportMode) {
    const anki = new Anki(ankiSettings);
    const source = sourceString(card.subtitleFileName, card.mediaTimestamp);
    let audioClip =
        card.audio === undefined
            ? undefined
            : AudioClip.fromBase64(
                  source,
                  card.subtitle.start,
                  card.subtitle.end,
                  card.audio.playbackRate ?? 1,
                  card.audio.base64,
                  card.audio.extension,
                  card.audio.error
              );

    return await anki.export(
        card.text ?? extractText(card.subtitle, card.surroundingSubtitles),
        card.definition,
        audioClip,
        card.image === undefined
            ? undefined
            : Image.fromBase64(source, card.subtitle.start, card.image.base64, card.image.extension),
        card.word,
        source,
        card.url,
        card.customFieldValues ?? {},
        ankiSettings.tags,
        exportMode
    );
}

export class Anki {
    private readonly settingsProvider: AnkiSettings;
    private readonly fetcher: Fetcher;

    constructor(settingsProvider: AnkiSettings, fetcher = new HttpFetcher()) {
        this.settingsProvider = settingsProvider;
        this.fetcher = fetcher;
    }

    async deckNames(ankiConnectUrl?: string) {
        const response = await this._executeAction('deckNames', null, ankiConnectUrl);
        return response.result;
    }

    async modelNames(ankiConnectUrl?: string) {
        const response = await this._executeAction('modelNames', null, ankiConnectUrl);
        return response.result;
    }

    async modelFieldNames(modelName: string, ankiConnectUrl?: string) {
        const response = await this._executeAction('modelFieldNames', { modelName: modelName }, ankiConnectUrl);
        return response.result;
    }

    async findNotesWithWord(word: string, ankiConnectUrl?: string) {
        const response = await this._executeAction(
            'findNotes',
            { query: this.settingsProvider.wordField + ':' + this._escapeQuery(word) },
            ankiConnectUrl
        );
        return response.result;
    }

    async findNotesWithWordGui(word: string, ankiConnectUrl?: string) {
        const response = await this._executeAction(
            'guiBrowse',
            { query: this.settingsProvider.wordField + ':' + this._escapeQuery(word) },
            ankiConnectUrl
        );
        return response.result;
    }

    private _escapeQuery(query: string) {
        let escaped = '';

        for (let i = 0; i < query.length; ++i) {
            const char = query[i];
            if (ankiQuerySpecialCharacters.includes(char)) {
                escaped += `\\${char}`;
            } else {
                escaped += char;
            }
        }

        return `"${escaped}"`;
    }

    async requestPermission(ankiConnectUrl?: string) {
        const response = await this._executeAction('requestPermission', null, ankiConnectUrl);
        return response.result;
    }

    async version(ankiConnectUrl?: string) {
        const response = await this._executeAction('version', null, ankiConnectUrl);
        return response.result;
    }

    async export(
        text: string | undefined,
        definition: string | undefined,
        audioClip: AudioClip | undefined,
        image: Image | undefined,
        word: string | undefined,
        source: string | undefined,
        url: string | undefined,
        customFieldValues: { [key: string]: string },
        tags: string[],
        mode: AnkiExportMode,
        ankiConnectUrl?: string
    ) {
        const fields = {};

        this._appendField(fields, this.settingsProvider.sentenceField, text, true);
        this._appendField(fields, this.settingsProvider.definitionField, definition, true);
        this._appendField(fields, this.settingsProvider.wordField, word, false);
        this._appendField(fields, this.settingsProvider.sourceField, source, false);
        this._appendField(fields, this.settingsProvider.urlField, url, false);

        if (customFieldValues) {
            for (const customFieldName of Object.keys(customFieldValues)) {
                this._appendField(
                    fields,
                    this.settingsProvider.customAnkiFields[customFieldName],
                    customFieldValues[customFieldName],
                    true
                );
            }
        }

        const params: any = {
            note: {
                deckName: this.settingsProvider.deck,
                modelName: this.settingsProvider.noteType,
                tags: tags,
                options: {
                    allowDuplicate: false,
                    duplicateScope: 'deck',
                    duplicateScopeOptions: {
                        deckName: this.settingsProvider.deck,
                        checkChildren: false,
                    },
                },
            },
        };

        const gui = mode === 'gui';
        const updateLast = mode === 'updateLast';

        if (this.settingsProvider.audioField && audioClip && audioClip.error !== undefined) {
            const sanitizedName = this._sanitizeFileName(audioClip.name);
            const data = await audioClip.base64();

            if (data) {
                if (gui || updateLast) {
                    const fileName = (await this._storeMediaFile(sanitizedName, data, ankiConnectUrl)).result;
                    this._appendField(fields, this.settingsProvider.audioField, `[sound:${fileName}]`, false);
                } else {
                    params.note['audio'] = {
                        filename: sanitizedName,
                        data,
                        fields: [this.settingsProvider.audioField],
                    };
                }
            }
        }

        if (this.settingsProvider.imageField && image && image.isAvailable()) {
            const sanitizedName = this._sanitizeFileName(image.name);
            const data = await image.base64();

            if (data) {
                if (gui || updateLast) {
                    const fileName = (await this._storeMediaFile(sanitizedName, data, ankiConnectUrl)).result;
                    this._appendField(fields, this.settingsProvider.imageField, `<img src="${fileName}">`, false);
                } else {
                    params.note['picture'] = {
                        filename: sanitizedName,
                        data,
                        fields: [this.settingsProvider.imageField],
                    };
                }
            }
        }

        params.note['fields'] = fields;

        switch (mode) {
            case 'gui':
                return (await this._executeAction('guiAddCards', params, ankiConnectUrl)).result;
            case 'updateLast':
                const recentNotes = (
                    await this._executeAction('findNotes', { query: 'added:1' }, ankiConnectUrl)
                ).result.sort();

                if (recentNotes.length === 0) {
                    throw new Error('Could not find note to update');
                }

                const lastNoteId = recentNotes[recentNotes.length - 1];
                params.note['id'] = lastNoteId;
                const infoResponse = await this._executeAction('notesInfo', { notes: [lastNoteId] });

                if (infoResponse.result.length > 0 && infoResponse.result[0].noteId === lastNoteId) {
                    const info = infoResponse.result[0];

                    if (
                        this.settingsProvider.sentenceField &&
                        info.fields &&
                        typeof info.fields[this.settingsProvider.sentenceField]?.value === 'string' &&
                        typeof params.note.fields[this.settingsProvider.sentenceField] === 'string'
                    ) {
                        params.note.fields[this.settingsProvider.sentenceField] = inheritHtmlMarkup(
                            params.note.fields[this.settingsProvider.sentenceField],
                            info.fields[this.settingsProvider.sentenceField].value
                        );
                    }

                    await this._executeAction('updateNoteFields', params, ankiConnectUrl);

                    if (tags.length > 0) {
                        await this._executeAction(
                            'addTags',
                            { notes: [lastNoteId], tags: tags.join(' ') },
                            ankiConnectUrl
                        );
                    }

                    if (!this.settingsProvider.wordField || !info.fields) {
                        return info.noteId;
                    }

                    const wordField = info.fields[this.settingsProvider.wordField];

                    if (!wordField || !wordField.value) {
                        return info.noteId;
                    }

                    return wordField.value;
                }

                throw new Error('Could not update last card because the card info could not be fetched');
            case 'default':
                return (await this._executeAction('addNote', params, ankiConnectUrl)).result;
            default:
                throw new Error('Unknown export mode: ' + mode);
        }
    }

    private _appendField(fields: any, fieldName: string | undefined, value: string | undefined, multiline: boolean) {
        if (!fieldName || !value) {
            return;
        }

        let newValue = multiline ? value.split('\n').join('<br>') : value;
        const existingValue = fields[fieldName];

        if (existingValue) {
            newValue = existingValue + '<br>' + newValue;
        }

        fields[fieldName] = newValue;
    }

    private _sanitizeFileName(name: string) {
        return sanitize(name, { replacement: '_' });
    }

    private async _storeMediaFile(name: string, base64: string, ankiConnectUrl?: string) {
        return this._executeAction(
            'storeMediaFile',
            { filename: makeUniqueFileName(name), data: base64, deleteExisting: false },
            ankiConnectUrl
        );
    }

    private async _executeAction(action: string, params: any, ankiConnectUrl?: string) {
        const body: any = {
            action: action,
            version: 6,
        };

        if (params) {
            body['params'] = params;
        }

        const json = await this.fetcher.fetch(ankiConnectUrl || this.settingsProvider.ankiConnectUrl, body);

        if (json.error) {
            throw new Error(json.error);
        }

        return json;
    }
}
