// ==UserScript==
// @name                ChatGPT Enter Key Modification ↵
// @name:zh-CN          ChatGPT 回车键修改 ↵
// @name:zh-TW          ChatGPT 回車鍵修改 ↵
// @version             1.2
// @author              jk278
// @namespace           https://github.com/jk278/chatgpt-enter-key-modification
// @description         Modify the behavior of the enter key based on device type
// @description:zh-CN   根据设备类型修改回车键的行为
// @description:zh-TW   根據設備類型修改回車鍵的行爲
// @match               https://chat.openai.com/*
// @grant               none
// @icon                https://raw.githubusercontent.com/jk278/chatgpt-enter-key-modification/main/openai-icon_48.png
// @homepageURL         https://github.com/jk278/chatgpt-enter-key-modification
// @supportURL          https://github.com/jk278/chatgpt-enter-key-modification/issues
// ==/UserScript==

(function () {
    'use strict';

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const localStorageKey = 'enterToSend';

    const modifyEnterBehavior = () => {
        // console.log("运行 modifyEnterBehavior");
        const textarea = document.querySelector('textarea');
        if (!textarea) return;

        textarea.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!isMobile || localStorage.getItem(localStorageKey) === 'true') {
                    const sendButton = textarea.nextElementSibling;
                    if (sendButton) sendButton.click(); // form.submit();
                } else {
                    textarea.value += '\n';
                    textarea.scrollTop = textarea.scrollHeight;
                }
                const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
                const minHeight = parseInt(getComputedStyle(textarea).height);
                const rows = textarea.value.split('\n').length;
                const height = Math.max(minHeight, lineHeight * rows);
                textarea.style.height = height + 'px';
                textarea.scrollTop = textarea.scrollHeight;
            }
            // else if (event.key === 'Enter' && event.shiftKey) {
            //     if (!isMobile || localStorage.getItem(localStorageKey) === 'true') {
            //         // 不阻止浏览器默认的换行行为
            //         // event.preventDefault();
            //         // textarea.value += '\n';
            //     }
            // }
        });
    };

    const createToggleEnterButton = () => {
        // console.log("运行 createToggleEnterButton");
        if (!isMobile) return;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('h-full', 'flex', 'mr-1', 'md:w-full', 'md:m-auto', 'md:mb-2', 'gap-0', 'md:gap-2', 'justify-center', 'pr-0'); // , 'pl-1'

        const button = document.createElement('button');
        button.classList.add('btn', 'relative', 'btn-neutral', 'border-0', 'md:border');
        button.setAttribute('id', 'enter-key-button');
        const bottonHTML = '<div class="flex w-full items-center justify-center gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle></svg></div>';
        button.innerHTML = bottonHTML;

        const updateButtonState = () => {
            const isSelected = localStorage.getItem(localStorageKey) === 'true';
            if (isSelected) {
                button.innerHTML += '<div class="absolute top-0 left-0 w-full h-full flex items-center justify-center"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="h-2 w-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="128"></circle></svg></div>';
            } else {
                button.innerHTML = bottonHTML;
            }
        };

        button.addEventListener('click', () => {
            event.preventDefault(); // 阻止默认提交表单
            localStorage.setItem(localStorageKey, localStorage.getItem(localStorageKey) !== 'true' ? 'true' : 'false');
            updateButtonState();
        });

        updateButtonState();
        buttonContainer.appendChild(button);

        const form = document.querySelector('form');
        if (form) {
            const height = form.offsetHeight;
            button.style.height = height + 'px';
            const firstChild = form.firstElementChild;

            // function insertButtonContainer() {
            //     const secondGrandchild = firstChild.children[1];
            //     if (secondGrandchild) {
            //         const firstGrandchild = firstChild.firstElementChild;
            //         firstChild.insertBefore(buttonContainer, firstGrandchild);
            //     } else {
            //         setTimeout(insertButtonContainer, 200);
            //     }
            // }

            // insertButtonContainer();

            // 获取textarea元素
            const textarea = document.querySelector('textarea');
            const textareaParent = textarea.parentNode;
            let width = textareaParent.clientWidth;
            // console.log('Textarea width:', width);

            // 创建一个ResizeObserver实例
            const resizeObserver = new ResizeObserver(entries => {
                for (let _entry of entries) { //未使用的声明添加下划线前缀
                    const newWidth = textareaParent.clientWidth; // entry.contentRect.width 返回的是元素的实际宽度
                                                                // textarea.clientWidth 返回的是元素的CSS宽度
                    if (newWidth < width && !document.querySelector('#enter-key-button')) { // 部分浏览器加载两个按钮
                        const firstGrandchild = firstChild.firstElementChild;
                        firstChild.insertBefore(buttonContainer, firstGrandchild);
                    }
                    width = newWidth;
                }
            });

            // 开始监听textarea元素的宽度变化
            resizeObserver.observe(textareaParent);

            // const offsetY = form.offsetHeight - textarea.offsetHeight;
            syncButtonHeight(textareaParent);
        }

        function syncButtonHeight(textareaParent) {
            // 创建 ResizeObserver 对象
            const observer = new ResizeObserver(entries => {
                // 遍历所有的 ResizeObserverEntry 对象
                for (let _entry of entries) {
                    // 获取 textareaParent 元素的新高度
                    const newHeight = textareaParent.clientHeight;
                    button.style.height = newHeight + 'px';
                }
            });

            // 将 form 元素添加到 ResizeObserver 对象的观察列表中
            observer.observe(textareaParent);
        }
    };

    function handleFormElements() {
        const forms = document.querySelectorAll('form');
        for (const form of forms) {
            if (form.dataset.handled === 'true') {
                continue;
            }
            form.dataset.handled = 'true';
            modifyEnterBehavior(form);
            createToggleEnterButton(form);
        }
    }

    function handleMutations(mutations) {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement) {
                    if (node.matches('form')) {
                        handleFormElements();
                    } else {
                        const forms = node.querySelectorAll('form');
                        for (const form of forms) {
                            handleFormElements();
                        }
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });

    handleFormElements();
})();