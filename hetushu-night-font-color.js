// ==UserScript==
// @name               Hetushu night font color
// @name:zh-CN         和图书夜间字色
// @namespace          https://github.com/jk278/hetushu-night-font-color
// @version            1.0
// @description        Your Script Description
// @description:zh-CN  
// @author             jk278
// @match              https://www.hetushu.com/book/*
// @grant              none
// @run-at             document-start
// ==/UserScript==

(function () {
    'use strict';

    function executeAfterDOMContentLoaded(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => callback());
        } else {
            callback();
        }
    }

    function addCssBeforeRendering() {

        const style = document.createElement('style');
        style.textContent = `
          body[data-mode="night"] #cbox #content { color: rgb(120, 132, 156); }
          `;
        // 比例：10：11：13，倍数：12

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

    executeAfterDOMContentLoaded(function () {
        addCssBeforeRendering();
    });

})();