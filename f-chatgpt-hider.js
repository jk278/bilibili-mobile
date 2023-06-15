// ==UserScript==
// @name         F-ChatGPT Hider
// @namespace    https://github.com/jk278/f-chatgpt-hider
// @version      1.0
// @description  Hide the specified element to increase visible space
// @author       jk278
// @match        https://chatgpt.finnwu.cn/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const svgIcon = `
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);">
        <path d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z" fill="black"></path>
    </svg>
  `;
  
  const button = document.createElement('button');
  button.innerHTML = svgIcon;
  button.style.position = 'absolute';
  button.style.bottom = '0';
  button.style.left = '50%';
  button.style.transform = 'translateX(-50%)';
  button.style.zIndex = '1000';
  button.style.backgroundColor = 'transparent';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  
  function toggleElement() {
      const element = document.querySelector('.p-4');
      if (element.style.display === 'none') {
          element.style.display = '';
          button.firstChild.style.transform = 'rotate(90deg)';
      } else {
          element.style.display = 'none';
          button.firstChild.style.transform = 'rotate(270deg)';
      }
  }
  
  button.addEventListener('click', toggleElement);
  
//   const mainElement = document.querySelector('main.flex.flex-col.flex-1.min-h-0');
const mainElement = document.body;
  
  // 添加button到main元素的底部作为倒数第一个子元素
//   mainElement.insertBefore(button, mainElement.lastElementChild.nextSibling);
  
  // 如果你希望将按钮添加为最后一个子元素，只需使用 appendChild
  mainElement.appendChild(button);
})();
