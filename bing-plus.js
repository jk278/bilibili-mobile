// ==UserScript==
// @name               Bing Plus
// @name:zh-CN         必应增强版
// @namespace          https://github.com/jk278/bing-plus
// @version            1.0.1
// @description        Add some extra styles and abilities for bing
// @description:zh-CN  为必应增加一些附加样式与能力
// @author             jk278
// @match              https://*.bing.com/*
// @grant              none
// @run-at             document-start
// @icon               https://www.bing.com/apple-touch-icon-144x144.png
// ==/UserScript==

/**
 * 能力：更改菜单位置，解决必应移动端的焦点跳动割裂体验感（这样）的问题
 */

(function () {
    'use strict';

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 打开菜单，导致元素发生偏移，找到后设置尺寸。
    // 要想单边阴影，可使用伪元素 ::before 或 ::after 
    // 通过把新元素和父元素的margin-top调成正负值，解决动态增加元素时的布局跳动（relative）
    function removeElementsBeforeRendering() {
        const css = `
        #tallhead { display: none }
        .b_searchboxForm { z-index: 3 }
        #bpage { width: 100vw }
        #HBright { max-width: 300px }
        .hb_det_cont_top { margin-top:44px }
        .hb_bfb_id { margin-top:-44px }
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

    /**
     * Adds two numbers.
     * @param {boolean} condition - TRUE --> 直接执行，FALSE --> 推迟
     * @param {function()} callback - 匿名函数：直接执行或DOM加载后执行
     */
    function judgeAndDelay(condition, callback) {
        if (!condition) {
            document.addEventListener('DOMContentLoaded', () => callback());
        } else {
            callback();
        }
    }

    function moveElement() {
        console.log("CHANGED!!");
        // 获取#tallhead元素
        var tallheadElement = document.getElementById('tallhead');
        console.log("tallheadElement: ", tallheadElement);

        // 如果存在#tallhead元素
        if (tallheadElement) {

            // 获取.b_pag元素
            var bPagElement = document.querySelector('.b_pag');
            // JavaScript中，null计算为true
            judgeAndDelay(bPagElement != null, () => {
                console.log("执行回调！");
                // 在.b_pag元素的后面插入元素。插入子元素：appendChild(tallheadElement);
                bPagElement.insertAdjacentElement('afterend', tallheadElement);

                // 修改元素的样式
                tallheadElement.style.display = 'block';
            });
            if(bPagElement==null) console.log('DOM加载状态:', document.readyState);

        }

    }

    if (isMobile) {
        removeElementsBeforeRendering();

        // 针对 VIA 浏览器优化，判断 DOM 状态
        judgeAndDelay(document.readyState !== 'loading', function () {
            moveElement();
        });
    }

})();