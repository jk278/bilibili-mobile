// ==UserScript==
// @name                Youtube dual subtitle
// @name:zh-CN          Youtube 双语字幕全平台
// @name:zh-TW          Youtube 雙語字幕全平臺
// @version             2.0.2
// @author              Coink & jk278
// @namespace           https://github.com/jk278/youtube-dual-subtitle
// @description         Fix for mobile devices on YouTube bilingual captions. It works on both mobile and desktop, and supports the Via browser.
// @description:zh-CN   Youtube 双语字幕。移动端（mobile）修复，双端适用，而且支持 Via 浏览器。
// @description:zh-TW   Youtube 雙語字幕。移動端（mobile）修復，雙端適用，而且支持 Via 瀏覽器。
// @match               *://www.youtube.com/watch?v=*
// @match               *://www.youtube.com
// @match               *://www.youtube.com/*
// @match               *://m.youtube.com/watch?v=*
// @match               *://m.youtube.com
// @match               *://m.youtube.com/*
// @require             https://unpkg.com/ajax-hook@latest/dist/ajaxhook.min.js
// @grant               none
// @run-at              document-start
// ==/UserScript==

/*
如果未自动加载，请切换字幕或关闭后再打开即可。默认语言为浏览器首选语言。
*/
(() => {
    'use strict';
    let localeLang = navigator.language.split('-')[0] || 'en';
    const storageSubtitleOn = localStorage.getItem('storageSubtitleOn');

    function enableSubs() {
        window.addEventListener('DOMContentLoaded', function () {
            ah.proxy({
                onRequest: (config, handler) => {
                    handler.next(config)
                },
                onResponse: (response, handler) => {
                    if (response.config.url.includes('/api/timedtext') && !response.config.url.includes('&translate_h00ked')) {
                        processSubtitleData(response, handler)
                    }
                }
            });

            if (window.location.hostname === 'www.youtube.com') {
                handleDesktopYoutube();
            } else {
                handleMobileYoutube();
            }
        })
    }
    enableSubs();

    function processSubtitleData(response, handler) {
        let xhr = new XMLHttpRequest();
        let url = response.config.url.replace(/(^|[&?])tlang=[^&]*/g, '');
        url = `${url}&tlang=${localeLang}&translate_h00ked`;
        xhr.open('GET', url, false);
        xhr.send();

        let defaultJson = null;
        if (response.response) {
            const jsonResponse = JSON.parse(response.response);
            if (jsonResponse.events) defaultJson = jsonResponse
        }

        const localeJson = JSON.parse(xhr.response);
        let isOfficialSub = true;

        for (const defaultJsonEvent of defaultJson.events) {
            if (defaultJsonEvent.segs && defaultJsonEvent.segs.length > 1) {
                isOfficialSub = false;
                break
            }
        }

        if (isOfficialSub) {
            mergeOfficialSubtitles(defaultJson, localeJson)
        } else {
            mergeUnofficialSubtitles(defaultJson, localeJson)
        }
        response.response = JSON.stringify(defaultJson);
        handler.resolve(response)
    }

    function mergeOfficialSubtitles(defaultJson, localeJson) {
        for (let i = 0, len = defaultJson.events.length; i < len; i++) {
            const defaultJsonEvent = defaultJson.events[i];
            if (!defaultJsonEvent.segs) continue;
            const localeJsonEvent = localeJson.events[i];
            if (`${defaultJsonEvent.segs[0].utf8}`.trim() !== `${localeJsonEvent.segs[0].utf8}`.trim()) {
                defaultJsonEvent.segs[0].utf8 += ('\n' + localeJsonEvent.segs[0].utf8)
            }
        }
    }

    function mergeUnofficialSubtitles(defaultJson, localeJson) {
        let pureLocalEvents = localeJson.events.filter(
            event => event.aAppend !== 1 && event.segs
        );
        for (const defaultJsonEvent of defaultJson.events) {
            if (!defaultJsonEvent.segs) continue;

            let currentStart = defaultJsonEvent.tStartMs;
            let currentEnd = currentStart + defaultJsonEvent.dDurationMs;
            let currentLocalEvents = pureLocalEvents.filter(
                pe => currentStart <= pe.tStartMs && pe.tStartMs < currentEnd
            );

            let localLine = '';
            for (const ev of currentLocalEvents) {
                for (const seg of ev.segs) {
                    localLine += seg.utf8
                }
                localLine += '﻿'
            }

            let defaultLine = '';
            for (const seg of defaultJsonEvent.segs) {
                defaultLine += seg.utf8
            }

            defaultJsonEvent.segs[0].utf8 = defaultLine + '\n' + localLine;
            defaultJsonEvent.segs = [defaultJsonEvent.segs[0]]
        }
    }

    function handleDesktopYoutube() {
        const subtitleSwitch = document.querySelector('.ytp-subtitles-button');
        const ariaPressed = subtitleSwitch.getAttribute('aria-pressed');
        console.log('字幕实际 ariaPressed:', ariaPressed);
        if ((storageSubtitleOn != "关闭" && ariaPressed != "true")
            || (storageSubtitleOn == "关闭" && ariaPressed == "true")) {
            subtitleSwitch.removeEventListener('click', subtitleChangeHandler);
            subtitleSwitch.click();
            subtitleSwitch.addEventListener('click', subtitleChangeHandler);
            console.log('字幕 自动切换成功')
        }
        subtitleSwitch.addEventListener('click', function () {
            console.log('字幕操作被记录');
            subtitleChangeHandler()
        });
    }

    function handleMobileYoutube() {
        let hasExecuted = false;
        localStorage.setItem('selectFollowStorage', false);
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && !hasExecuted) {
                    const parentElement = document.querySelector('.player-caption-settings');
                    if (parentElement !== null) {
                        setupSubtitleHandler(localStorage.getItem('selectFollowStorage'));
                        hasExecuted = true;
                        observer.disconnect()
                    }
                }
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    }

    function setupSubtitleHandler(v) {
        const selectElement = parentElement.querySelector('select');
        const selectedOption = selectElement.value;
        console.log('字幕选项:', selectedOption);
        if (v == "false") {
            if (storageSubtitleOn !== "关闭") {
                const preferredCaptions = ['英语', '英语 (自动生成)', '英语(美国)', '英语(英国)'];
                const matchingOption = Array.from(selectElement.options).find(option => preferredCaptions.includes(option.text));
                if (matchingOption) {
                    selectElement.onchange = null;
                    selectElement.value = matchingOption.value;
                    selectElement.onchange = preSubtitleChangeHandler;
                }
            } else {
                if (selectedOption !== '关闭') {
                    selectElement.onchange = null;
                    selectedOption = '关闭';
                    selectElement.onchange = preSubtitleChangeHandler()
                }
            }
            localStorage.setItem('selectFollowStorage', true);
        }
        selectElement.onchange = preSubtitleChangeHandler();

        function preSubtitleChangeHandler() {
            subtitleChangeHandler(events.target.value);
        }
    }

    function subtitleChangeHandler(v) {
        if (v) {
            localStorage.setItem('storageSubtitleOn', v)
        } else {
            if (storageSubtitleOn == "关闭") {
                localStorage.setItem('storageSubtitleOn', "开启")
            } else {
                localStorage.setItem('storageSubtitleOn', "关闭")
            }
        }
    }
})()
/*
立即执行函数表达式：
(function (x, y) {
  console.log(x + y);
})(2, 3);
*/