// ==UserScript==
// @name               91PORN Ad Remover
// @name:zh-CN         九色视频去广告
// @namespace          https://github.com/jk278/91porn-ad-remover
// @version            2.2
// @description        Remove ads from 91PORN series websites.
// @description:zh-CN  删除 91PORN 系列网站的广告。
// @author             jk278
// @match              https://jiuse.icu/*
// @grant              none
// @run-at             document-start
// @icon               https://jiuse2.github.io/favicon.ico
// ==/UserScript==

(function () {
    'use strict';

    removeElementsBeforeRendering();

    executeAfterDOMContentLoaded(function () {
        replaceVideoLinks();
        preventScrollBouncing();
    });

    function removeElementsBeforeRendering() {
        // 广告元素，高清版本，首页顶部收藏，播放器，启动弹窗（+蒙版），高清标签，文本广告
        const selector1 = '[id^="po-s"], .alert, .p-0.mb-3, #playerJsvLayer, #global-modals, .modal-backdrop, .vip-layer, .col-60>.title>.navContainer';
        // 跳转到其他网站的视频区广告
        const selector2 = ', .colVideoList:has([href^="http"])';
        // 首页链接（上、下），首页广告标签
        const selector3 = ', #po-link1, #po-link2, main>.px-0:not(:last-child)>.row:not(.my-2)>.col-60 > a:not([href^="/search"]):not([href="/tags"])';
        const targetElementSelector = selector1 + selector2 + selector3;

        // 尽早插入 CSS 隐藏广告元素
        insertHideAdsStyle();

        function insertHideAdsStyle() {
            const css = `${targetElementSelector} {display: none !important;}
                #main {margin-top: calc(1.5rem + 56px) !important;}
                .col-60>.title {justify-content: flex-end;}`;
            const style = document.createElement('style');
            style.textContent = css;

            // 尝试将样式插入到 head 中
            const head = document.head || document.querySelector('head');
            if (head) {
                head.insertBefore(style, head.firstChild);
            } else {
                // 如果 head 还未加载，监听 readyStateChange 事件
                document.addEventListener('readystatechange', () => {
                    if (!style.isConnected && document.readyState !== 'loading') {
                        const head = document.head || document.querySelector('head');
                        if (head) {
                            head.insertBefore(style, head.firstChild);
                        }
                    }
                });
            }
        }

    }

    // 针对 VIA 浏览器优化，判断 DOM 状态
    function executeAfterDOMContentLoaded(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => callback());
        } else {
            callback();
        }
    }

    function replaceVideoLinks() {
        const links = document.querySelectorAll('a[href*="/video/viewhd/"]');
        links.forEach(function (link) {
            const href = link.getAttribute('href');
            const newHref = href.replace('/video/viewhd/', '/video/view/');
            link.setAttribute('href', newHref);
        });
    }

    function preventScrollBouncing() {
        // 设置 header 样式
        const style = document.createElement('style');
        style.textContent = `
            .Mobile-Header { position: fixed; width: 100% }
            body { paddingTop: 56px }
            `;

        // 如果 document.documentElement 可用，将样式添加到文档
        if (document.documentElement) {
            // 添加为html的末尾子元素
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

})();