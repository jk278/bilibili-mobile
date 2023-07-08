// ==UserScript==
// @name               ChatGPT System Prompt
// @name:zh-CN         ChatGPT 系统提示词
// @namespace          https://github.com/jk278/chatgpt-system-prompt
// @version            0.1
// @description        Your Script Description
// @description:zh-CN  
// @author             jk278
// @match               https://chat.openai.com/*
// @grant              none
// @run-at             document-start
// @icon                https://raw.githubusercontent.com/jk278/chatgpt-enter-key-modification/main/openai-icon_48.png
// ==/UserScript==

(function () {
    'use strict';

    let jsonList = []; // 初始化 json 列表

    function addButton() {
        const exampleElement = document.querySelector('.absolute.bottom-0.left-0.w-full.border-t');
        if (!exampleElement) return;

        const button = document.createElement('button');
        button.innerHTML = `
            <div class="flex w-full items-center justify-center gap-2">
            <svg stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="24" width= "24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none"/>
            <path d="M12,5 L12,19 M5,12 L19,12" stroke-linecap="round"/>
            </svg></div>
        `;
        button.classList.add('btn', 'relative', 'btn-neutral', 'border-0', 'md:border');
        button.className = 'prompt-button';

        const parent = document.createElement("div");
        parent.className = "flex justify-center pb-2";
        parent.appendChild(button);

        exampleElement.prepend(parent);

        createPopup();

        button.addEventListener('click', function () {
            console.log("test: 点击")
            togglePopup();
        });
    }

    function createPopup() {
        // 创建弹窗
        const popup = document.createElement("div");
        popup.className = 'prompt-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            z-index: 9999;
            display: none;
        `;

        // 添加标题
        const popupTitle = document.createElement("div");
        popupTitle.innerHTML = "系统提示词";
        popup.appendChild(popupTitle);

        // 添加提示词菜单
        const promptBody = document.createElement("div");
        promptBody.style.cssText = 'height:300px;width:300px;'
        popup.appendChild(promptBody);

        // 添加关闭按钮
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "关闭";
        closeButton.addEventListener("click", function () {
            togglePopup();
        });
        popup.appendChild(closeButton);

        // 添加按钮
        const addButton = document.createElement("button");
        addButton.innerHTML = "添加";
        addButton.addEventListener("click", function () {
            openAddItemPopup();
        });
        popup.appendChild(addButton);

        // 排序按钮
        const sortButton = document.createElement("button");
        sortButton.innerHTML = "排序";
        sortButton.addEventListener("click", function () {
            toggleSortMode();
        });
        popup.appendChild(sortButton);

        // 删除按钮
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "删除";
        deleteButton.addEventListener("click", function () {
            toggleDeleteMode();
        });
        popup.appendChild(deleteButton);

        // 根据暗色模式设置背景色
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        let backgroundStr;
        darkModeMediaQuery ? backgroundStr = "rgba(52, 53, 65, var(--tw-bg-opacity))" : backgroundStr = "white";
        popup.style.backgroundColor = backgroundStr;


        darkModeMediaQuery.addEventListener('change', function (e) {
            if (e.matches) {
                popup.style.backgroundColor = "rgba(52, 53, 65, var(--tw-bg-opacity))";
            } else {
                popup.style.backgroundColor = "white";
            }
        });

        // 显示弹窗
        document.body.appendChild(popup);
    }

    // 切换弹窗的显示状态
    function togglePopup() {
        const popup = document.querySelector('.prompt-popup');
        if (popup.style.display === "none") {
            popup.style.display = "block";
            refreshUI();
        } else {
            popup.style.display = "none";
        }
    }

    // 刷新列表 UI
    function refreshUI() {
        const listContainer = document.createElement("ul");

        for (let i = 0; i < jsonList.length; i++) {
            const listItem = document.createElement("li");
            listItem.innerHTML = jsonList[i].name;
            listItem.addEventListener("click", function () {
                getItemValue(this.innerHTML);
            });

            listContainer.appendChild(listItem);
        }

        // 清空弹窗内容
        popup.innerHTML = "";
        // 添加列表
        popup.appendChild(listContainer);
    }

    // 打开添加项目的弹窗
    function openAddItemPopup() {
        const addItemPopup = document.createElement("div");
        addItemPopup.innerHTML = `
            <input type="text" id="nameInput" placeholder="名称">
            <input type="text" id="stringInput" placeholder="字符串">
            <button id="confirmButton">确认</button>
        `;
        popup.appendChild(addItemPopup);

        const confirmButton = document.getElementById("confirmButton");
        confirmButton.addEventListener("click", function () {
            const nameInput = document.getElementById("nameInput");
            const stringInput = document.getElementById("stringInput");

            if (nameInput.value && stringInput.value) {
                addItem(nameInput.value, stringInput.value);
            }

            // 清空输入框
            nameInput.value = "";
            stringInput.value = "";
            // 关闭添加项目的弹窗
            popup.removeChild(addItemPopup);
        });
    }

    // 添加元素到 json 列表
    function addItem(name, string) {
        jsonList.push({ name, string });
        refreshUI(); // 刷新 UI
    }

    // 打开排序模式
    function toggleSortMode() {
        const listItems = popup.getElementsByTagName("li");
        const sortButton = document.createElement("button");
        sortButton.innerHTML = "确认排序";
        sortButton.id = "sortButton";
        popup.appendChild(sortButton);

        for (const i = 0; i < listItems.length; i++) {
            var listItem = listItems[i];
            listItem.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 24 24" id="sortIcon${i}">
                    <path d="M6 19l6-6 6 6H6z" fill="#000"/>
                </svg>
            `;
            listItem.addEventListener("click", function () {
                var listItemIndex = Array.from(listItems).indexOf(this);
                toggleSortInput(listItemIndex);
            });
        }

        // var sortButton = document.getElementById("sortButton");
        sortButton.addEventListener("click", function () {
            endSortMode();
        });
    }

    // 切换排序输入框
    function toggleSortInput(index) {
        const sortIcon = document.getElementById(`sortIcon${index}`);
        const listItem = sortIcon.parentNode;

        if (sortIcon.tagName === "path") {
            sortIcon.outerHTML = `
                <input type="number" id="sortInput${index}" style="width: 40px;" min="1" max="${jsonList.length}" value="${index + 1}" />
            `;
            const sortInput = document.getElementById(`sortInput${index}`);
            sortInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    var newIndex = parseInt(this.value, 10);
                    sortItem(index, newIndex);
                    toggleSortInput(index);
                }
            });
            sortInput.focus();
        } else {
            const sortInput = document.getElementById(`sortInput${index}`);
            sortItem(index, parseInt(sortInput.value, 10));
            toggleSortInput(index);
        }
    }

    // 结束排序模式
    function endSortMode() {
        const sortButton = document.getElementById("sortButton");
        sortButton.parentNode.removeChild(sortButton);

        const sortInputs = popup.querySelectorAll('input[type="number"]');
        for (let i = 0; i < sortInputs.length; i++) {
            const sortInput = sortInputs[i];
            const sortIcon = document.createElement("svg");
            sortIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            sortIcon.setAttribute("height", "12");
            sortIcon.setAttribute("width", "12");
            sortIcon.setAttribute("viewBox", "0 0 24 24");
            sortIcon.id = `sortIcon${i}`;
            sortIcon.innerHTML = '<path d="M6 19l6-6 6 6H6z" fill="#000"/>';

            sortInput.parentNode.replaceChild(sortIcon, sortInput);
        }
    }

    // 对 json 列表进行排序
    function sortItem(index, newIndex) {
        if (newIndex < 1) newIndex = 1;
        if (newIndex > jsonList.length) newIndex = jsonList.length;
        const item = jsonList.splice(index, 1)[0];
        jsonList.splice(newIndex - 1, 0, item);
        refreshUI(); // 刷新 UI
    }

    // 打开删除模式
    function toggleDeleteMode() {
        const listItems = popup.getElementsByTagName("li");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "确认删除";
        deleteButton.id = "deleteButton";
        popup.appendChild(deleteButton);

        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            listItem.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 24 24" id="deleteIcon${i}">
                    <path d="M19 6h-4l-2-2H9L7 6H3v2h16V6zM4 18h16v-8H4v8zm8-6h2v4h-2v-4z" fill="#000"/>
                </svg>
            `;
            listItem.addEventListener("click", function () {
                var listItemIndex = Array.from(listItems).indexOf(this);
                deleteItem(listItemIndex);
            });
        }

        // var deleteButton = document.getElementById("deleteButton");
        deleteButton.addEventListener("click", function () {
            endDeleteMode();
        });
    }

    // 结束删除模式
    function endDeleteMode() {
        const deleteButton = document.getElementById("deleteButton");
        deleteButton.parentNode.removeChild(deleteButton);

        const deleteIcons = popup.querySelectorAll('svg[id^="deleteIcon"]');
        for (let i = 0; i < deleteIcons.length; i++) {
            const deleteIcon = deleteIcons[i];
            deleteIcon.parentNode.removeChild(deleteIcon);
        }
    }

    // 从 json 列表中删除元素
    function deleteItem(index) {
        jsonList.splice(index, 1);
        refreshUI(); // 刷新 UI
    }

    // 获取元素的值
    function getItemValue(name) {
        const item = jsonList.find(function (item) {
            return item.name === name;
        });

        if (item) {
            console.log(item.string);
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

    // <<注意>>: 仅能在 DOM 初始化过程中完整获取 DOM
    function observerForAddButton() {
        // <<常见错误>>: setTimeout(funcA(), 1000);

        // 创建 MutationObserver 实例
        const observer = new MutationObserver((mutationsList, observer) => {
            const exampleElement = document.querySelector('.absolute.bottom-0.left-0.w-full.border-t');
            const button = document.querySelector('.prompt-button');
            console.log("test");
            if (exampleElement && !button) {
                console.log("addButton");
                addButton();
            }
        });

        // 监听整个 Document 的变化
        observer.observe(document, {
            childList: true,  // 监视子节点的变化
            subtree: true,    // 监视所有子节点的变化
        });

    }

    let pathname = window.location.pathname;
    if (pathname === '/' || pathname === '' || pathname.startsWith('/?model=')) {

        observerForAddButton();

        executeAfterDOMContentLoaded(function () {

        });
    }

    // 监听popstate事件
    window.addEventListener('popstate', function () {
        // 检查href路径是否发生变化
        if (location.pathname !== pathname) {
            // 当href路径发生变化时，重新加载页面
            location.reload();
        }
    });

})();
