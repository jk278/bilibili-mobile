// ==UserScript==
// @name               91PORN Ad Remover
// @name:zh-CN         九色视频去广告
// @namespace          https://github.com/jk278/91porn-ad-remover
// @version            3.0
// @description        Remove ads from 91PORN series websites.
// @description:zh-CN  删除 91PORNY 系列网站的广告。
// @author             jk278
// @match              https://jiuse.icu/*
// @match              https://*/*
// @exclude            https://*.gitbook.io/jiuse
// @run-at             document-start
// @grant              none
// @icon               https://jiuse2.github.io/favicon.ico
// ==/UserScript==

(function () {
    'use strict';

    console.log("91PORN Ad Remover is running!");
    const startTime = performance.now(); //时间戳

    // 检查是否为克隆分站
    function checkMetaContent() {
        if (document.querySelector('head>meta[name^="ap"]')?.content === "九色视频") {
            main();
        } else {
            console.log("退出", performance.now() - startTime, "ms");
            return;
        }
    }

    if (document.head) {
        checkMetaContent();
    } else {
        setTimeout(() => {
            checkMetaContent();
        }, 50);
    }

    function main() {
        console.log("开始", performance.now() - startTime, "ms");

        injectCss();

        waitDOMContentLoaded(() => {
            removeModal();
            replaceVideoLinks();
        });
    }

    // 渲染前注入 CSS 尽管无法阻止源代码中的广告位，但有时能增加表现效果（比如移动端或部分其它情况不预解析源代码）
    function injectCss() {
        // 首页广告元素，高清版本字样，首页顶部收藏，播放器，VIP视频标签
        const ad1 = '[id^="po-"], .alert, .p-0.mb-3, #playerJsvLayer, .vip-layer';
        // 跳转到其他网站的视频区广告、标签广告，removeModal 相关的启动弹窗和蒙版
        const ad2 = ', .colVideoList:has([href^="http"]), #global-modals, .modal-backdrop';
        // 跳转到其他网站的首页广告标签
        const ad3 = ', [href^="http"]:has(.btn-outline-danger)';
        const elemToHide = ad1 + ad2 + ad3;

        // 隐藏广告元素
        const selector1 = `${elemToHide} {display: none !important;}`;
        // 在 Firefox 中, sticky 元素高度超出视窗引起兄弟元素滚动溢出
        const selector2 = 'body {padding-top: 56px;} @media only screen and (min-width: 768px) {body {padding-top: 0;}} .Mobile-Header {position: fixed !important; width: 100%;}';
        // 分类页广告（排除搜索页）加修复页数显示

        const selector3 = '.col-60>.title>.navContainer {display: none !important;} .col-60>.title {justify-content: flex-end;}';

        const style = document.createElement('style');
        style.textContent = selector1 + selector2 + selector3;
        document.head.insertBefore(style, document.head.firstChild);
    }

    // DOM 加载完后
    function waitDOMContentLoaded(callback) {
        document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback();
    }

    // 广告：该类存在时禁止点击
    function removeModal() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class' && mutation.target.classList.contains('modal-open')) {
                    // 即使移除不存在的 class，也会导致属性变化，从而循环触发 MutationObserver
                    mutation.target.classList.remove('modal-open');
                }
            });
        });

        observer.observe(document.body, { attributes: true });
    }

    // 替换VIP视频链接
    function replaceVideoLinks() {
        const links = document.querySelectorAll('a[href*="/video/viewhd/"]');
        links.forEach(function (link) {
            const href = link.getAttribute('href');
            const newHref = href.replace('/video/viewhd/', '/video/view/');
            link.setAttribute('href', newHref);
        });
    }

})();