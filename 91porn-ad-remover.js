// ==UserScript==
// @name               91PORN Ad Remover
// @name:zh-CN         九色视频去广告
// @namespace          https://github.com/jk278/91porn-ad-remover
// @version            1.5.9
// @description        Remove ads from 91PORN series websites.
// @description:zh-CN  删除 91PORN 系列网站的广告。
// @author             jk278
// @match              *://*/*
// @exclude            *://github.com/*
// @grant              none
// @run-at             document-start
// @icon               https://jiuse2.github.io/favicon.ico
// ==/UserScript==

(function () {
  'use strict';

  function shouldExecute() {
    const storedDomains = JSON.parse(localStorage.getItem('allowedDomains')) || [];

    const domain = window.location.hostname;

    if (storedDomains.includes(domain)) {
      return true;
    }

    const copyright = document.querySelector('footer')?.firstChild?.lastChild?.innerHTML;

    if (!copyright) return false;

    if (copyright === 'Copyright © 2020 91PORN All Rights Reserved.') {
      if (storedDomains.length >= 30) {
        storedDomains.shift();
      }
      storedDomains.push(domain);
      localStorage.setItem('allowedDomains', JSON.stringify(storedDomains));
      return true;
    }

    return false;
  }

  function removeElementsBeforeRendering() {
    // 广告元素，高清版本，首页顶部收藏，播放器，启动弹窗，高清标签，文本广告，热搜下标签广告
    const selector1 = '[id^="po-s"], .alert, .p-0.mb-3, #playerJsvLayer, #global-modals, .modal-backdrop, .vip-layer, .text-danger, #po-link1';
    // 跳转到其他网站的视频区广告
    const selector2 = ', .colVideoList [href^="http"], .colVideoList [href^="http"] + small';
    // 底部链接，首页广告标签
    const selector3 = ', #po-link2, main>.px-0:not(:last-child)>.row:not(.my-2)>.col-60 > a:not([href^="/search"]):not([href="/tags"])';
    const targetElementSelector = selector1 + selector2 + selector3;

    // 用 CSS 隐藏目标元素，避免页面闪烁
    hideTargetElementWithCSS();

    // 当 document 对象可用时，移除 DOM 中的目标元素
    removeTargetElementOnDocumentAvailable();

    function hideTargetElementWithCSS() {
      const css = `${targetElementSelector} { display: none !important; }`;
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

    function removeTargetElementOnDocumentAvailable() {
      executeAfterDOMContentLoaded(removeTargetElement);
    }

    function removeTargetElement() {
      const targetElements = document.querySelectorAll(targetElementSelector);
      targetElements.forEach(function (element) {
        element.remove();
      });
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

  if (shouldExecute) {
    removeElementsBeforeRendering();

    executeAfterDOMContentLoaded(function () {
      replaceVideoLinks();
      preventScrollBouncing();
    });
  }

})();