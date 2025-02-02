import {
    MobileOverlayToVideoCommand,
    MobileOverlayModel,
    RequestMobileOverlayModelMessage,
    UpdateMobileOverlayModelMessage,
    VideoToExtensionCommand,
} from '@project/common';
import Binding from '../services/binding';
import { CachingElementOverlay, ElementOverlay, OffsetAnchor } from '../services/element-overlay';
import { adjacentSubtitle } from '@project/common/key-binder';

export class MobileVideoOverlayController {
    private readonly _context: Binding;
    private _overlay: ElementOverlay;
    private _pauseListener?: () => void;
    private _playListener?: () => void;
    private _seekedListener?: () => void;
    private _forceHiding: boolean = false;
    private _showing: boolean = false;
    private _uiInitialized: boolean = false;
    private _messageListener?: (
        message: any,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response?: any) => void
    ) => void;
    private _bound = false;

    constructor(context: Binding, offsetAnchor: OffsetAnchor) {
        this._context = context;
        this._overlay = MobileVideoOverlayController._elementOverlay(context.video, offsetAnchor);
    }

    private static _elementOverlay(video: HTMLMediaElement, offsetAnchor: OffsetAnchor) {
        const containerClassName =
            offsetAnchor === OffsetAnchor.top
                ? 'asbplayer-mobile-video-overlay-container-top'
                : 'asbplayer-mobile-video-overlay-container-bottom';
        return new CachingElementOverlay({
            targetElement: video,
            nonFullscreenContainerClassName: containerClassName,
            fullscreenContainerClassName: containerClassName,
            nonFullscreenContentClassName: 'asbplayer-mobile-video-overlay',
            fullscreenContentClassName: 'asbplayer-mobile-video-overlay',
            offsetAnchor,
            contentPositionOffset: 8,
        });
    }

    set offsetAnchor(value: OffsetAnchor) {
        if (this._overlay.offsetAnchor === value) {
            return;
        }

        this._overlay.dispose();
        this._overlay = MobileVideoOverlayController._elementOverlay(this._context.video, value);

        if (this._showing) {
            this._doShow();
        }
    }

    set forceHide(forceHide: boolean) {
        if (!this._bound) {
            return;
        }

        if (forceHide) {
            if (this._showing) {
                this._doHide();
            }

            this._forceHiding = true;
        } else {
            if (this._forceHiding) {
                this._forceHiding = false;
                this._show();
            }
        }
    }

    bind() {
        if (this._bound) {
            return;
        }

        this._pauseListener = () => {
            this._show();
        };
        this._playListener = () => {
            this._hide();
        };
        this._seekedListener = () => {
            this.updateModel();
        };

        this._context.video.addEventListener('pause', this._pauseListener);
        this._context.video.addEventListener('play', this._playListener);
        this._context.video.addEventListener('seeked', this._seekedListener);
        this._messageListener = (
            message: any,
            sender: chrome.runtime.MessageSender,
            sendResponse: (response?: any) => void
        ) => {
            if (
                message.sender === 'asbplayer-mobile-overlay-to-video' &&
                message.message.command === 'request-mobile-overlay-model'
            ) {
                const command = message as MobileOverlayToVideoCommand<RequestMobileOverlayModelMessage>;

                if (command.src === this._context.video.src) {
                    this._model().then(sendResponse);
                    this._uiInitialized = true;
                    return true;
                }
            }
        };
        chrome.runtime.onMessage.addListener(this._messageListener);
        this._bound = true;

        if (this._context.video.paused) {
            this._show();
        }
    }

    async updateModel() {
        if (!this._bound || !this._uiInitialized) {
            return;
        }

        const model = await this._model();
        const command: VideoToExtensionCommand<UpdateMobileOverlayModelMessage> = {
            sender: 'asbplayer-video',
            message: {
                command: 'update-mobile-overlay-model',
                model,
            },
            src: this._context.video.src,
        };
        chrome.runtime.sendMessage(command);
    }

    private async _model() {
        const subtitles = this._context.subtitleController.subtitles;
        const subtitleDisplaying =
            subtitles.length > 0 && this._context.subtitleController.currentSubtitle()[0] !== null;
        const timestamp = this._context.video.currentTime * 1000;
        const { language, clickToMineDefaultAction } = await this._context.settings.get([
            'language',
            'clickToMineDefaultAction',
        ]);
        const model: MobileOverlayModel = {
            offset: subtitles.length === 0 ? 0 : subtitles[0].start - subtitles[0].originalStart,
            emptySubtitleTrack: subtitles.length === 0,
            recordingEnabled: this._context.recordMedia,
            recording: this._context.recordingMedia,
            previousSubtitleTimestamp: adjacentSubtitle(false, timestamp, subtitles)?.originalStart ?? undefined,
            nextSubtitleTimestamp: adjacentSubtitle(true, timestamp, subtitles)?.originalStart ?? undefined,
            currentTimestamp: timestamp,
            language,
            postMineAction: clickToMineDefaultAction,
            subtitleDisplaying,
        };
        return model;
    }

    show() {
        if (!this._bound) {
            return;
        }

        this._show();
    }

    disposeOverlay() {
        this._overlay.dispose();
        this._overlay = MobileVideoOverlayController._elementOverlay(this._context.video, this._overlay.offsetAnchor);
    }

    private _show() {
        if (!this._context.synced || this._forceHiding) {
            return;
        }

        this._doShow();
    }

    private _doShow() {
        const anchor = this._overlay.offsetAnchor === OffsetAnchor.bottom ? 'bottom' : 'top';
        this._overlay.setHtml([
            {
                key: 'ui',
                html: () =>
                    `<iframe style="border: 0; color-scheme: normal; width: 400px; height: 108px" src="${chrome.runtime.getURL(
                        'mobile-video-overlay-ui.html'
                    )}?src=${encodeURIComponent(this._context.video.src)}&anchor=${anchor}"/>`,
            },
        ]);
        this._showing = true;
    }

    private _hide() {
        if (!this._context.synced || this._context.recordingMedia) {
            return;
        }

        this._doHide();
    }

    private _doHide() {
        this._overlay.hide();
        this._showing = false;
    }

    unbind() {
        if (this._pauseListener) {
            this._context.video.removeEventListener('pause', this._pauseListener);
            this._pauseListener = undefined;
        }

        if (this._playListener) {
            this._context.video.removeEventListener('play', this._playListener);
            this._playListener = undefined;
        }

        if (this._seekedListener) {
            this._context.video.removeEventListener('seeked', this._seekedListener);
            this._seekedListener = undefined;
        }

        if (this._messageListener) {
            chrome.runtime.onMessage.removeListener(this._messageListener);
            this._messageListener = undefined;
        }

        this._overlay.dispose();
        this._overlay = MobileVideoOverlayController._elementOverlay(this._context.video, this._overlay.offsetAnchor);
        this._showing = false;
        this._bound = false;
    }
}
