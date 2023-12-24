// ==UserScript==
// @name               Bing Plus
// @name:zh-CN         必应增强版
// @namespace          https://github.com/jk278/bing-plus
// @version            1.0
// @description        Add some extra styles and abilities for bing
// @description:zh-CN  为必应增加一些附加样式与能力
// @author             jk278
// @match              https://*.bing.com/*
// @grant              none
// @run-at             document-start
// @icon               https://www.bing.com/apple-touch-icon-144x144.png
// ==/UserScript==

/**
 * 能力：像谷歌那样把菜单栏移动到底部，解决必应移动端的焦点跳动割裂体验感（这样）的问题
 */

(function () {
    'use strict';

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 打开菜单，导致元素发生偏移，找到后设置尺寸。
    // 要想单边阴影，可使用伪元素 ::before 或 ::after 
    // 通过把新元素和父元素的margin-top调成正负值，解决动态增加元素时的布局跳动（relative）
    function removeElementsBeforeRendering() {
        const css = `
        #tallhead { height: 0 !important; }
        #mHamburger#mHamburger { top:54px; z-index:2; background:var(--htmlbk); }
        #mHamburger#mHamburger::before {
            content: "";
            position: absolute;
            top: 0;
            left: -3px;
            width: 5px;
            height: 100%;
            box-shadow: -5px 0 5px rgba(0, 0, 0, 0.2);
        }
        .b_scopebar { margin-right: 44px; }
        .b_searchboxForm { z-index: 3; }
        #bpage { width: 100vw; }
        #HBright { max-width: 300px; }
        .hb_det_cont_top { margin-top:44px; }
        .hb_bfb_id { margin-top:-44px; }
        `;
        const style = document.createElement('style');
        style.textContent = css;

        // 如果 document.documentElement 可用，将样式添加到文档
        if (document.documentElement) {
            document.documentElement.appendChild(style);
        } else {
            // 如果 document.documentElement 不可用，监听 readyStateChange 事件
            document.addEventListener('readystatechange', () => {
                if (!style.isConnected && document.readyState !== 'loading') {
                    document.documentElement.appendChild(style);
                }
            });
        }
    }

    if (isMobile) {
        removeElementsBeforeRendering();
    }

})();