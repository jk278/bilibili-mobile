// ==UserScript==
// @name               ChatGPT System Prompt
// @name:zh-CN         ChatGPT 系统提示词
// @namespace          https://github.com/jk278/chatgpt-system-prompt
// @version            0.1
// @description        Your Script Description
// @description:zh-CN  
// @author             jk278
// @match               https://chat.openai.com
// @match               https://chat.openai.com/?model=*
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

        var button = document.createElement('button');
        button.innerHTML = `
            <div class="flex w-full items-center justify-center gap-2">
            <svg stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="24" width= "24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none"/>
            <path d="M12,5 L12,19 M5,12 L19,12" stroke-linecap="round"/>
            </svg></div>
        `;
        button.style.cssText = 'Your CSS Here';
        button.className = 'prompt-button';
        
        const parent = document.createElement("div");
        parent.className = "flex w-full items-center justify-center gap-2";
        parent.appendChild(button);
        
        exampleElement.prepend(parent);
        console.log('test: ', exampleElement.parentNode);

        createPopup();

        button.addEventListener('click', function () {
            console.log("test: 点击")
            togglePopup();
        });
    }

    function createPopup() {
        // 创建弹窗
        var popup = document.createElement("div");
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

        // 添加关闭按钮
        var closeButton = document.createElement("button");
        closeButton.innerHTML = "关闭";
        closeButton.addEventListener("click", function () {
            togglePopup();
        });
        popup.appendChild(closeButton);

        // 添加按钮
        var addButton = document.createElement("button");
        addButton.innerHTML = "添加";
        addButton.addEventListener("click", function () {
            openAddItemPopup();
        });
        popup.appendChild(addButton);

        // 排序按钮
        var sortButton = document.createElement("button");
        sortButton.innerHTML = "排序";
        sortButton.addEventListener("click", function () {
            toggleSortMode();
        });
        popup.appendChild(sortButton);

        // 删除按钮
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "删除";
        deleteButton.addEventListener("click", function () {
            toggleDeleteMode();
        });
        popup.appendChild(deleteButton);

        // 根据暗色模式设置背景色
        var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        let backgroundStr;
        darkModeMediaQuery?backgroundStr="rgba(52, 53, 65, var(--tw-bg-opacity))":backgroundStr="white";
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
        var listContainer = document.createElement("ul");

        for (var i = 0; i < jsonList.length; i++) {
            var listItem = document.createElement("li");
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
        var addItemPopup = document.createElement("div");
        addItemPopup.innerHTML = `
            <input type="text" id="nameInput" placeholder="名称">
            <input type="text" id="stringInput" placeholder="字符串">
            <button id="confirmButton">确认</button>
        `;
        popup.appendChild(addItemPopup);

        var confirmButton = document.getElementById("confirmButton");
        confirmButton.addEventListener("click", function () {
            var nameInput = document.getElementById("nameInput");
            var stringInput = document.getElementById("stringInput");

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
        var listItems = popup.getElementsByTagName("li");
        var sortButton = document.createElement("button");
        sortButton.innerHTML = "确认排序";
        sortButton.id = "sortButton";
        popup.appendChild(sortButton);

        for (var i = 0; i < listItems.length; i++) {
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

        var sortButton = document.getElementById("sortButton");
        sortButton.addEventListener("click", function () {
            endSortMode();
        });
    }

    // 切换排序输入框
    function toggleSortInput(index) {
        var sortIcon = document.getElementById(`sortIcon${index}`);
        var listItem = sortIcon.parentNode;

        if (sortIcon.tagName === "path") {
            sortIcon.outerHTML = `
                <input type="number" id="sortInput${index}" style="width: 40px;" min="1" max="${jsonList.length}" value="${index + 1}" />
            `;
            var sortInput = document.getElementById(`sortInput${index}`);
            sortInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    var newIndex = parseInt(this.value, 10);
                    sortItem(index, newIndex);
                    toggleSortInput(index);
                }
            });
            sortInput.focus();
        } else {
            var sortInput = document.getElementById(`sortInput${index}`);
            sortItem(index, parseInt(sortInput.value, 10));
            toggleSortInput(index);
        }
    }

    // 结束排序模式
    function endSortMode() {
        var sortButton = document.getElementById("sortButton");
        sortButton.parentNode.removeChild(sortButton);

        var sortInputs = popup.querySelectorAll('input[type="number"]');
        for (var i = 0; i < sortInputs.length; i++) {
            var sortInput = sortInputs[i];
            var sortIcon = document.createElement("svg");
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
        var listItems = popup.getElementsByTagName("li");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "确认删除";
        deleteButton.id = "deleteButton";
        popup.appendChild(deleteButton);

        for (var i = 0; i < listItems.length; i++) {
            var listItem = listItems[i];
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
        var deleteButton = document.getElementById("deleteButton");
        deleteButton.parentNode.removeChild(deleteButton);

        var deleteIcons = popup.querySelectorAll('svg[id^="deleteIcon"]');
        for (var i = 0; i < deleteIcons.length; i++) {
            var deleteIcon = deleteIcons[i];
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
        var item = jsonList.find(function (item) {
            return item.name === name;
        });

        if (item) {
            console.log(item.string);
        }
    }

    // 因为元素在 DOM 渲染后动态加载，所以循环执行，成功后终止
    function checkForButton() {
        var button = document.querySelector('.prompt-button');
        if (button) {
            // 找到了按钮
            console.log('Button found:', button);
            // 在这里执行您希望执行的操作
        } else {
            // 没有找到按钮，继续等待
            console.log('Button not found. Trying again in 20ms...');
            addButton();
            setTimeout(checkForButton, 20);
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

    executeAfterDOMContentLoaded(function () {
        setTimeout(function () {
            checkForButton();
        }, 50);
    });

})();
