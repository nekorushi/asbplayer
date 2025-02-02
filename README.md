<p align="center">
    <img src="https://raw.githubusercontent.com/killergerbah/asbplayer/main/extension/src/assets/icon128.png" width="75" height="75" style="border-radius: 16px" alt="asbplayer" />
</p>

<div align="center">

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/killergerbah/asbplayer/verify.yml)](https://github.com/killergerbah/asbplayer/actions/workflows/verify.yml)
[![Github All Releases](https://img.shields.io/github/downloads/killergerbah/asbplayer/total.svg)](https://github.com/killergerbah/asbplayer/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/killergerbah)](https://github.com/sponsors/killergerbah)
[![Static Badge](https://img.shields.io/badge/donate-ko--fi-ed6760?label=donate)](https://ko-fi.com/killergerbah)
[![GitHub License](https://img.shields.io/github/license/killergerbah/asbplayer)](https://github.com/killergerbah/asbplayer?tab=MIT-1-ov-file)

</div>

# asbplayer

**asbplayer** is a browser-based media player and Chrome extension developed for language learners who learn their target language through subtitled media. With asbplayer, you can:

-   **Easily create high-quality, multimedia flashcards** out of subtitled videos.
-   **Load text-selectable subtitles onto most video sources**, including streaming sources.
-   **Extract subtitles from popular streaming services** like Netflix and YouTube.
-   **Seek through subtitles** using a **navigable subtitle list**.
-   **Optimize language-learning efficiency** using subtitled videos with **playback modes** like:
    -   **Condensed playback**: Only play subtitled sections of a video.
    -   **Fast-forward playback**: Fast-forward through unsubtitled sections of video.
    -   **Auto-pause**: Automatically pause at the beginning or end of every subtitle.
-   **Use customizable keyboard shortcuts** to access most of asbplayer's features.

## Thanks

Thank you to all of my sponsors:

[@vivekchoksi](https://www.github.com/vivekchoksi),
[@nzarbayezid](https://www.github.com/nzarbayezid),
[@ManuJapan](https://www.github.com/ManuJapan),
AdamM,
realgoodsmiley,
Alex,
[@m4eko](https://github.com/m4eko),
Simon,
Attenius,
medyas,
[@zaerald](https://github.com/zaerald),
Suna,
[@tony7253](https://github.com/tony7253),
[@voothi](https://github.com/voothi),
kibo,
[@genericdave](https://github.com/genericdave)

and to those who have donated privately.

Thank you to all those who have contributed to asbplayer:

[@Renji-XD](https://www.github.com/Renji-XD),
[@MatiasIslaA](https://www.github.com/MatiasIslaA),
[@cyphar](https://www.github.com/cyphar),
[@alexbofa](https://www.github.com/alexbofa),
[@Zyphdoz](https://github.com/Zyphdoz),
[@artjomsR](https://github.com/artjomsR),
[@iam6lake](https://github.com/iam6lake),
[@bpwhelan](https://github.com/bpwhelan),
[@pooky-programs](https://github.com/pooky-programs),
[@m-edlund](https://github.com/m-edlund)

Thank you to all those who have translated asbplayer:

**Mana Tsutsumi** (Japanese, initial translation),
**Kai Böse** (German),
**Triline** (Polish),
**NeverWinterSwor** (Simplified Chinese),
**Yagxter** (Brazilian Portuguese),
**Leo Gonzalez** (Spanish),
**Yuri (ganqqwerty)** (Russian)

If you are a non-English native, and would like to help translate asbplayer, please contact me on [Discord](https://discord.gg/ad7VAQru7m).

## Getting Started

> [!NOTE]  
> asbplayer is both a subtitle control and flashcard creation tool. If you are not interested in flashcards, and only want to use asbplayer's subtitle features, you can read about them under [Subtitle features](#subtitle-features).

First, see if you can get started by following one of the [community guides](#community-guides).

Otherwise, the following steps for setting up automated Anki flashcards should work for any language:

1. Install and set up a dictionary tool for your target language that allows you to do instant lookups. Popular ones are [Yomitan](https://chromewebstore.google.com/detail/yomitan/likgccmbimhjbgkjambclfkhldnlhbnn) for Japanese and [VocabSieve](https://github.com/FreeLanguageTools/vocabsieve) for European languages.
2. Install [Anki](https://apps.ankiweb.net/), and create a deck and note type. More details on [Refold's guide](https://refold.la/roadmap/stage-1/a/anki-setup).
3. Install the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin for Anki.
4. [Configure](https://killergerbah.github.io/asbplayer/?view=settings) asbplayer to create cards via AnkiConnect using your deck and note type.
5. Enhance a video using asbplayer and subtitle files.

    - **For streaming video:** After installing the [Chrome extension](https://chromewebstore.google.com/detail/asbplayer-language-learni/hkledmpjpaehamkiehglnbelcpdflcab), drag-and-drop a subtitle file into the streaming video you want to mine.
    - **For local files:** Drag-and-drop media/subtitle files into the [asbplayer website](https://killergerbah.github.io/asbplayer).

    You may have to [adjust the subtitle offset](#adjusting-subtitle-offset) to get the subtitles in sync.

6. When a subtitle appears that you want to mine, use <kbd>Ctrl + Shift + X</kbd> to open the flashcard creator.
7. Fill in the definition and word fields and then export the card. To fill in the definition field you may use the dictionary you installed in step 1.

## Community guides

Text guides:

-   [Shiki's Lazy Sentence Mining Workflow (Japanese)](https://docs.google.com/document/d/e/2PACX-1vQuEAoZFoJbULZzCJ3_tW7ayT_DcQl9eDlrXMnuPGTwDk62r5fQrXak3ayxBsEgkL85_Z-YY5W4yUom/pub)
-   [Sentence mining from Netflix and YouTube with asbplayer (Japanese)](https://soyuz18.notion.site/Sentence-mining-from-Netflix-and-YouTube-with-asbplayer-83a03590cd8349ba81ca10340645b565)
-   [Refold's Anki guide](https://refold.la/roadmap/stage-1/a/anki-setup)

Video guides:

-   [Refold's installation and basic usage guide](https://www.youtube.com/watch?v=GYsf-NOVoYc)
-   [Refold's sentence mining guide (European languages)](https://youtu.be/jXO4gmCmcNE?si=u-8F7L7PWgdsXK5t&t=678)
-   [Sentence Mining: Learning Japanese From Anime (Japanese)](https://www.youtube.com/watch?v=B60cj69MSmA)
-   [How to Setup and Use ASBPlayer for Vocab Mining (Japanese)](https://www.youtube.com/watch?v=D1tlb7zo8Og&ab_channel=pooks_)

## Demos

-   [3 ways to mine streaming video with asbplayer](https://www.youtube.com/watch?v=HrIJZ6cUMFw)
-   [Sentence mining a video file with asbplayer](https://www.youtube.com/watch?v=BSr_JusW8E8)

## Detailed usage

To use asbplayer with streaming video, install the Chrome [extension](https://chromewebstore.google.com/detail/asbplayer-language-learni/hkledmpjpaehamkiehglnbelcpdflcab). Otherwise, use the [website](https://killergerbah.github.io/asbplayer/).

In order to make use of any of asbplayer's features, subtitles (or an empty subtitle track) must first be loaded, either onto a streaming video or a local video file. The following section instructs how to do this.

---

### Subtitle features

#### Enhancing streaming video with asbplayer-controlled subtitles

There are a number of ways to load subtitles with streaming video:

1. Drag-and-drop a subtitle file into the video element you want to enhance.
2. Load a subtitle file into the [asbplayer website](https://killergerbah.github.io/asbplayer/) and click on the camera in the bottom right to pick a video element to enhance. This is the recommended way to load BluRay subtitle files onto streaming video.
3. Use <kbd>Ctrl + Shift + F</kbd> to select a video element to enhance. From the dialog that appears you can choose whether to load an [auto-detected subtitle track](#subtitle-track-detection-for-streaming-video) or an empty one.
4. Open the side panel (<kbd>\`</kbd> button or `Open Side Panel` from the extension popup). When a video element is on screen, click on the `Load Subtitles` button to open the same subtitle track selector in (3).

asbplayer features will then be accessible for that video.

#### Enhancing local video files with asbplayer-controlled subtitles

Drag-and-drop media and subtitle files into the [asbplayer website](https://killergerbah.github.io/asbplayer/) to load them. asbplayer features will then be accessible for those files. Not all media files may be compatible - see the [Browser Compatibility](#browser-compatibility) section.

#### Adjusting subtitle offset

Use <kbd>Ctrl + Left/Right</kbd> to adjust subtitle offset so that the previous/next subtitle appears at the current timestamp. Then use <kbd>Ctrl + Shift + Left/Right</kbd> for finer adjustment by 100ms increments.

If you are using the asblayer website, you can also use the `Subtitle Offset` text field available in the controls UI.

#### Subtitle track detection for streaming video

Use <kbd>Ctrl + Shift + F</kbd> to see auto-detected subtitle tracks for streaming video. Below are the sites where automatic subtitle detection is supported:

-   Netflix
-   Youtube
-   Disney Plus (known issue: subtitles sometimes off by ~5 seconds)
-   Hulu
-   TVer
-   Bandai Channel
-   Amazon Prime (known issue: subtitles sometimes off by ~30 seconds)
-   Emby
-   Rakuten Viki

<kbd>Ctrl + Shift + F</kbd> also allows you to load an empty subtitle track so that you can extract audio and screenshots from streaming video without loading subtitles.

#### Filtering subtitle text

If you'd like to filter out specific instances subtitle text, one way to do so is by using a regular expression (regex). asbplayer can match any sequence following a specified regex pattern and remove the matches.

Under the MISC section in asbplayer settings, locate the "Subtitle regex filter" textbox. Enter an appropriate regex to filter desired content.
You can replace filtered content similarly by entering a string into the "Subtitle regex filter text replacement" textbox. Leaving this blank will simply remove the content.

Useful examples of regular expressions:

-   `(\(|（).*(\)|）)` : Remove names enclosed by parenthesis to indicate speakers (i.e. "**（山田）**　元気ですか？")
-   `\[.*\]` : Remove indications enclosed by brackets that sound or music that is playing (i.e. "**\[PLAYFUL MUSIC]**")

Learn how to write and test custom regular expressions at [Regex Learn - Playground](https://regexlearn.com/playground).

#### Downloading subtitle files

Once loaded into the extension, you can download the subtitles by opening the side panel and clicking the `Download Subtitles as SRT` button in the top-right. You can also download subtitles via the website by clicking the same download button in the top-left.

> Note: Using the [regex feature](#filtering-subtitle-text) will alter the .srt that is downloaded.

---

### Anki integration

#### Creating Anki flashcards

Make sure [Anki](https://apps.ankiweb.net/) and [AnkiConnect](https://ankiweb.net/shared/info/2055492159) are installed. Integration with AnkiConnect can be configured in the [settings](https://killergerbah.github.io/asbplayer/?view=settings) as in this [video](https://youtu.be/Mv7fEVb6PHo?t=44).

When a subtitle that you want to mine appears, use <kbd>Ctrl + Shift + X</kbd> to open the flashcard creator.

See the [keyboard shortcuts](https://killergerbah.github.io/asbplayer/?view=settings#keyboard-shortcuts) for other ways to interact with and create cards.

#### Adjusting Anki flashcards

All text fields can be edited from the flashcard creator prior to flashcard creation.

Adjust the selected time interval for the card using the slider at the bottom of the export dialog.
The newly selected time interval can be applied to the card using the buttons available in the sentence and audio sections of the card. See this [video](https://youtu.be/BSr_JusW8E8?t=34) for a demo.

---

### Other basic features

#### Extension side panel UI

Most of the extension features detailed above can be accessed through the extension's side panel UI. The side panel can be opened with the <kbd>\`</kbd> button or `Open Side Panel` from the extension popup.

#### Keyboard shortcuts

Keyboard shortcuts are customizable from the [settings](https://killergerbah.github.io/asbplayer/?view=settings#keyboard-shortcuts) or from accessing the extension directly. Once asbplayer has been bound to a video, you can use the keyboard shortcuts to access most of asbplayer's features.

#### Extension video overlay

By default some UI appears at the top of streaming video when it is paused. It can be toggled on/off from the [settings](https://killergerbah.github.io/asbplayer/?view=settings#streaming-video). It exists primarily to make it possible to sentence mine on Kiwi Browser for Android, with buttons/fields to mine a subtitle, load subtitles, and adjust subtitle offset.

#### Audio track selection for mkv files

An audio track selector will appear for `mkv` files if experimental web platform features are enabled from `chrome://flags`. Note that enabling this flag may cause issues with other features of asbplayer, such as card creation through the Chrome extension.

---

### Advanced features

#### One-click mining flow

asbplayer can be setup to support one-click mining workflows by integrating with other tools via its [WebSocket interface](#websocket-interface) and a locally-running proxy that intercepts AnkiConnect traffic. Below are steps to set up such a workflow using Yomitan:

1. Install [Go](https://go.dev/doc/install).
2. Clone this repository and start the AnkiConnect proxy server:
    ```
    cd scripts/anki-connect-proxy
    go run main.go
    ```
3. Enable asbplayer's WebSocket client from the [settings](https://killergerbah.github.io/asbplayer?view=settings#misc-settings).
4. Point Yomitan at the proxy by configuring `http://127.0.0.1:8766` for the AnkiConnect URL.
5. Configure Yomitan to use the same note type you have configured for asbplayer.
6. Using Yomitan's `+` button on asbplayer subtitles will now trigger the flashcard creator with word and definition fields pre-populated by Yomitan.

See the proxy's [example configuration file](https://github.com/killergerbah/asbplayer/blob/main/scripts/anki-connect-proxy/.env.example) for how to further configure it.

#### WebSocket interface

The asbplayer website can be controlled remotely through a WebSocket connection, which enables [one-click mining flows](#one-click-mining-flow) with the right setup. Currently asbplayer responds to one type of payload:

```javascript
{
    "command": "mine-subtitle",
    // Message ID to correlate with asbplayer's response
    "messageId": "10281760-d787-4356-8572-f698d8ff3884",
    "body": {
        // 0 = "None", 1 = "Show anki dialog", 2 = "Update last card", 3 = "Export card"
        "postMineAction": 1,
        // Key-value pairs corresponding to an Anki note type
        "fields": {
            "key1": "value1",
            "key2": "value2"
        }
    }
}
```

Response:

```javascript
{
    "command": "response",
    // Same message ID received in request
    "messageId": "10281760-d787-4356-8572-f698d8ff3884",
    "body": {
        // Whether the command was successfully published to the website
        "published": true
    }
}
```

## Common issues

### asbplayer can't connect to Anki. It shows an error message e.g. 'Failed to fetch.'

-   If you're using Brave, make sure asbplayer isn't being blocked by Shield.
-   Make sure that asbplayer is allowed by AnkiConnect, as in this [video](https://youtu.be/Mv7fEVb6PHo?t=44).
-   Make sure that the origin you add to the AnkiConnect settings is exactly `https://killergerah.github.io` with no slash at the end (and not `https://killergerah.github.io/asbplayer`).
-   Check that your browser or an ad blocker isn't blocking the request. A good place to start is by opening your browser's developer console and looking for errors.
-   As of this writing enabling experimental web platform features is known to cause this issue. Try disabling this flag from `chrome://flags`.
-   On later versions of macOS, AnkiConnect will not respond when Anki is backgrounded. See "Notes for MacOS Users" on the [AnkiConnect developer's website](https://foosoft.net/projects/anki-connect/).

### When using the 'update last card' feature, the card does not update in Anki.

-   Make sure Anki's card browser is closed when using 'update last card.' There is a [known issue](https://github.com/FooSoft/anki-connect/issues/82) with AnkiConnect where cards will not appear to update when the card browser is open.

### When loading a local file asbplayer either shows a black screen, or doesn't play audio.

-   See the [Browser Compatibility](#browser-compatibility) section.

### My popup dictionary extension (e.g. Yomitan) doesn't work on the side panel

-   Chrome does not allow other extension scripts to be injected into extension UI, so there is no fix for this. If you want to scan text with other extensions then you will need to do it from the subtitles displayed inside the video element, or from the subtitle list on the asbplayer website.

### asbplayer isn't detecting streaming video.

-   Try refreshing both the asbplayer tab and the video in the other tab.
-   Make sure that in the extension details, the extension has access to all sites.

### Keyboard shortcuts aren't working.

-   Check the the [keyboard shortcut settings](https://killergerbah.github.io/asbplayer/?view=settings#keyboard-shortcuts).
-   If you are using the extension:
    -   Check `chrome://extensions/shortcuts`.
    -   Try refreshing the page and loading subtitles again.
    -   Try uninstalling and reinstalling the extension, and restarting Chrome.
    -   Make sure the extension isn't installed twice.

### asbplayer isn't including audio/screenshot in flashcards.

-   If you're mining streaming video via the Chrome extension, make sure that the streaming video tab is selected and in the foreground when you use a mining keyboard shortcut

### asbplayer isn't properly cropping screenshots from streaming video.

-   Make sure the browser zoom setting is at 100%.
-   You can disable cropping altogether using the extension settings menu.

## Browser compatibility

The asbplayer application and extension have only been tested on the latest version Chrome and likely work on other Chromium-based browsers.

Local video file playback is supported only for codecs supported by the browser. The latest versions of Chrome can decode H.265 video as long as hardware acceleration is enabled. The [animebook](https://github.com/animebook/animebook.github.io?tab=readme-ov-file#video-format-support-last-update-january-2023) readme has a detailed explanation of this and links to browsers that have good compatibility.

## Contributing

Pull requests are welcome! However, to reduce back-and-forth during review ideally consult with me on the corresponding issue or on [Discord](https://discord.gg/ad7VAQru7m) before attempting changes to UI/UX. When making changes, format code according to the Prettier config and attempt to match the style of surrounding code.

## Building and running

```
# Install yarn
npm install --global yarn

# Make sure you're on yarn 3
yarn set version 3.2.0

# Install dependencies
yarn

# Starts the development server for the website
yarn workspace @project/client run start

# Build the Chromium version of the extension to extension/dist/chromium
yarn workspace @project/extension buildDev

# Build the Firefox version of the extension to extension/dist/firefox
yarn workspace @project/extension buildDev --env firefox

# Build the Firefox for Android version of the extension to extension/dist/firefoxandroid
yarn workspace @project/extension buildDev --env firefoxandroid
```

If you have problems building try deleting `node_modules` and re-running `yarn`.

## Contact

Submit bugs or feature requests from the [issues page](https://github.com/killergerbah/asbplayer/issues). Join the [Discord](https://discord.gg/ad7VAQru7m) server to talk with me and other language learners.

## Donations

If you've benefited from asbplayer, please consider supporting my work via [Github Sponsors](https://github.com/sponsors/killergerbah?frequency=one-time) or [Ko-fi](https://ko-fi.com/killergerbah).
