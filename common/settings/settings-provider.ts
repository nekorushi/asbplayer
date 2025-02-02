import { AsbplayerSettings, KeyBindName, SubtitleListPreference } from '.';
import { AutoPausePreference, PostMineAction } from '..';

// @ts-ignore
const isMacOs = (navigator.userAgentData?.platform ?? navigator.platform)?.toUpperCase()?.indexOf('MAC') > -1;

export const defaultSettings: AsbplayerSettings = {
    ankiConnectUrl: 'http://127.0.0.1:8765',
    deck: '',
    noteType: '',
    sentenceField: '',
    definitionField: '',
    audioField: '',
    imageField: '',
    wordField: '',
    sourceField: '',
    urlField: '',
    subtitleSize: 36,
    subtitleColor: '#ffffff',
    subtitleThickness: 700,
    subtitleOutlineThickness: 0,
    subtitleOutlineColor: '#000000',
    subtitleShadowThickness: 3,
    subtitleShadowColor: '#000000',
    subtitleBackgroundColor: '#000000',
    subtitleBackgroundOpacity: 0,
    subtitleFontFamily: '',
    subtitlePreview: 'アあ安Aa',
    subtitlePositionOffset: 75,
    subtitleAlignment: 'bottom',
    audioPaddingStart: 0,
    audioPaddingEnd: 500,
    maxImageWidth: 0,
    maxImageHeight: 0,
    surroundingSubtitlesCountRadius: 2,
    surroundingSubtitlesTimeRadius: 10000,
    autoPausePreference: AutoPausePreference.atEnd,
    fastForwardModePlaybackRate: 2.7,
    keyBindSet: {
        togglePlay: { keys: 'space' },
        toggleAutoPause: { keys: isMacOs ? '⇧+P' : 'shift+P' },
        toggleCondensedPlayback: { keys: isMacOs ? '⇧+O' : 'shift+O' },
        toggleFastForwardPlayback: { keys: isMacOs ? '⇧+F' : 'shift+F' },
        toggleSubtitles: { keys: 'down' },
        toggleVideoSubtitleTrack1: { keys: '1' },
        toggleVideoSubtitleTrack2: { keys: '2' },
        toggleVideoSubtitleTrack3: { keys: '3' },
        toggleAsbplayerSubtitleTrack1: { keys: 'W+1' },
        toggleAsbplayerSubtitleTrack2: { keys: 'W+2' },
        toggleAsbplayerSubtitleTrack3: { keys: 'W+3' },
        seekBackward: { keys: 'A' },
        seekForward: { keys: 'D' },
        seekToPreviousSubtitle: { keys: 'left' },
        seekToNextSubtitle: { keys: 'right' },
        seekToBeginningOfCurrentSubtitle: { keys: 'up' },
        adjustOffsetToPreviousSubtitle: { keys: isMacOs ? '⇧+left' : 'ctrl+left' },
        adjustOffsetToNextSubtitle: { keys: isMacOs ? '⇧+right' : 'ctrl+right' },
        decreaseOffset: { keys: isMacOs ? '⇧+⌃+right' : 'ctrl+shift+right' },
        increaseOffset: { keys: isMacOs ? '⇧+⌃+left' : 'ctrl+shift+left' },
        resetOffset: { keys: isMacOs ? '⇧+⌃+down' : 'ctrl+shift+down' },
        copySubtitle: { keys: isMacOs ? '⇧+⌃+Z' : 'ctrl+shift+Z' },
        ankiExport: { keys: isMacOs ? '⇧+⌃+X' : 'ctrl+shift+X' },
        updateLastCard: { keys: isMacOs ? '⇧+⌃+U' : 'ctrl+shift+U' },
        takeScreenshot: { keys: isMacOs ? '⇧+⌃+V' : 'ctrl+shift+V' },
        decreasePlaybackRate: { keys: isMacOs ? '⇧+⌃+[' : 'ctrl+shift+[' },
        increasePlaybackRate: { keys: isMacOs ? '⇧+⌃+]' : 'ctrl+shift+]' },
        toggleSidePanel: { keys: '`' },
        toggleRepeat: { keys: isMacOs ? '⇧+R' : 'shift+R' },
    },
    preferMp3: true,
    tabName: 'asbplayer',
    miningHistoryStorageLimit: 25,
    preCacheSubtitleDom: true,
    clickToMineDefaultAction: PostMineAction.showAnkiDialog,
    themeType: 'dark',
    copyToClipboardOnMine: false,
    rememberSubtitleOffset: true,
    lastSubtitleOffset: 0,
    autoCopyCurrentSubtitle: false,
    alwaysPlayOnSubtitleRepeat: true,
    subtitleRegexFilter: '',
    subtitleRegexFilterTextReplacement: '',
    language: 'en',
    customAnkiFields: {},
    tags: [],
    imageBasedSubtitleScaleFactor: 1,
    subtitleCustomStyles: [],
    streamingAppUrl: 'https://killergerbah.github.io/asbplayer',
    streamingDisplaySubtitles: true,
    streamingRecordMedia: true,
    streamingTakeScreenshot: true,
    streamingCleanScreenshot: true,
    streamingCropScreenshot: true,
    streamingSubsDragAndDrop: true,
    streamingAutoSync: false,
    streamingLastLanguagesSynced: {},
    streamingCondensedPlaybackMinimumSkipIntervalMs: 1000,
    streamingScreenshotDelay: 1000,
    streamingSubtitleListPreference: SubtitleListPreference.noSubtitleList,
    streamingEnableOverlay: true,
    webSocketClientEnabled: false,
    webSocketServerUrl: 'ws://127.0.0.1:8766/ws',
};

type SettingsDeserializers = { [key in keyof AsbplayerSettings]: (serialized: string) => any };
export const settingsDeserializers: SettingsDeserializers = Object.fromEntries(
    Object.entries(defaultSettings).map(([key, value]) => {
        if (typeof value === 'string') {
            return [key, (s: string) => s];
        }

        if (typeof value === 'boolean') {
            return [key, (s: string) => s === 'true'];
        }

        if (typeof value === 'number') {
            return [key, (s: string) => Number(s)];
        }

        if (key === 'keyBindSet') {
            return [
                key,
                (s: string) => {
                    const keyBindSet = JSON.parse(s);

                    for (const key of Object.keys(defaultSettings.keyBindSet)) {
                        const keyBindName = key as KeyBindName;

                        if (keyBindSet[keyBindName] === undefined) {
                            keyBindSet[keyBindName] = defaultSettings.keyBindSet[keyBindName];
                        }
                    }

                    return keyBindSet;
                },
            ];
        }

        if (typeof value === 'object') {
            return [key, (s: string) => JSON.parse(s)];
        }

        throw new Error('Could not determine deserializer for setting');
    })
) as SettingsDeserializers;

const deepEquals = (a: any, b: any) => {
    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a !== 'object') {
        return a === b;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (a.length !== b.length) {
        return false;
    }

    for (const k of aKeys) {
        if (!deepEquals(a[k], b[k])) {
            return false;
        }
    }

    for (const k of bKeys) {
        if (!deepEquals(a[k], b[k])) {
            return false;
        }
    }

    return true;
};

type SettingsKey = keyof AsbplayerSettings;

const complexValuedKeys = Object.fromEntries(
    Object.keys(defaultSettings)
        .filter((k) => typeof defaultSettings[k as SettingsKey] === 'object')
        .map((k) => [k, true])
);

export class SettingsProvider {
    private _storage;
    private _complexValues: { [key: string]: any } = {};

    constructor(storage: SettingsStorage) {
        this._storage = storage;
    }

    async getAll(): Promise<AsbplayerSettings> {
        return this.get(Object.keys(defaultSettings) as SettingsKey[]);
    }

    async getSingle<K extends keyof AsbplayerSettings>(key: K): Promise<AsbplayerSettings[K]> {
        const vals = (await this.get([key])) as Partial<AsbplayerSettings>;
        const val = vals[key];
        return val as AsbplayerSettings[K];
    }

    async get<K extends keyof AsbplayerSettings>(keys: K[]): Promise<Pick<AsbplayerSettings, K>> {
        let parameters: Partial<AsbplayerSettings> = {};

        for (const key of keys) {
            parameters[key] = defaultSettings[key];
        }

        const data = await this._storage.get(parameters);
        const result: any = {};

        for (const key in parameters) {
            const value = data[key as SettingsKey] ?? defaultSettings[key as SettingsKey];

            if (complexValuedKeys[key]) {
                const lastValue = this._complexValues[key as SettingsKey];

                if (lastValue !== undefined && deepEquals(lastValue, value)) {
                    result[key] = lastValue;
                } else {
                    this._complexValues[key as SettingsKey] = value;
                    result[key] = value;
                }
            } else {
                result[key] = value;
            }
        }

        return result;
    }

    async set(settings: Partial<AsbplayerSettings>): Promise<void> {
        await this._storage.set(settings);
    }
}

export interface SettingsStorage {
    get: (keysAndDefaults: Partial<AsbplayerSettings>) => Promise<Partial<AsbplayerSettings>>;
    set: (settings: Partial<AsbplayerSettings>) => Promise<void>;
}
