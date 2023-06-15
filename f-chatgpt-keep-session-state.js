// ==UserScript==
// @name         F-ChatGPT Keep Session State
// @namespace    https://github.com/jk278/f-chatgpt-keep-session-state
// @version      1.0
// @description  A script to save and restore the active state of F-ChatGPT session.
// @author       jk278
// @match        https://chatgpt.finnwu.cn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const storageKey = 'n-collapse-items';
    const activeClassName = 'n-collapse-item--active';
    const targetClassName = 'n-collapse';

    const getStoredStates = () => JSON.parse(localStorage.getItem(storageKey) || '[]');
    const saveStates = (states) => localStorage.setItem(storageKey, JSON.stringify(states));

    const updateStoredStates = () => {
        const nCollapse = document.querySelector(`.${targetClassName}`);
        if (!nCollapse) return;

        const items = Array.from(nCollapse.children);
        const states = items.map((item) => item.classList.contains(activeClassName));
        saveStates(states);
    };

    const restoreStates = () => {
        const nCollapse = document.querySelector(`.${targetClassName}`);
        if (!nCollapse) return;

        const storedStates = getStoredStates();
        storedStates.forEach((isActive, index) => {
            const item = nCollapse.children[index];
            if (item) {
                const itemIsActive = item.classList.contains(activeClassName);

                if (isActive ^ itemIsActive) {
                    item.children[0].children[0].click();
                }
            }
        });
    };


    const observeDOM = (() => {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        return (obj, callback) => {
            if (!obj || obj.nodeType !== 1) return;

            if (MutationObserver) {
                const obs = new MutationObserver((mutations, observer) => {
                    callback(mutations);
                });
                obs.observe(obj, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
            } else if (window.addEventListener) {
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
                obj.addEventListener('DOMAttrModified', callback, false);
            }
        };
    })();

    const init = (nCollapse) => {
        if (nCollapse) {
            restoreStates();
            observeDOM(nCollapse, () => {
                updateStoredStates();
            });
        }
    };

    const waitForTargetElement = () => {
        const nCollapse = document.querySelector(`.${targetClassName}`);

        if (nCollapse) {
            init(nCollapse);
        } else {
            setTimeout(waitForTargetElement, 500);
        }
    };

    const observeBody = () => {
        const body = document.querySelector('body');
        const observer = new MutationObserver((mutations, observer) => {
            const nCollapse = document.querySelector(`.${targetClassName}`);
            if (nCollapse) {
                observer.disconnect();
                init(nCollapse);
            }
        });

        observer.observe(body, {
            childList: true,
            subtree: true
        });
    };

    // Start observing the body for DOM changes
    observeBody();

})();
