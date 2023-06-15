// ==UserScript==
// @name         F-ChatGPT Copy Button
// @namespace    https://github.com/jk278/f-chatgpt-copy-button
// @version      1.5
// @description  Add a copy button to the specified element on https://chatgpt.finnwu.cn/* and improve LaTeX handling.
// @author       jk278
// @match        https://chatgpt.finnwu.cn/*
// @grant        none
// @require      https://unpkg.com/turndown/dist/turndown.js
// ==/UserScript==

(function () {
    'use strict';

    function addButton() {
        const targetElements = document.querySelectorAll('.message-reply, .message-request');
        targetElements.forEach(element => {
            if (!element.querySelector('.copy-button')) {
                const copyButton = document.createElement('span');
                copyButton.textContent = '复制';
                copyButton.style.position = 'absolute';
                copyButton.style.top = '0';
                copyButton.style.right = '0';
                copyButton.style.padding = '2px';
                copyButton.style.backgroundColor = 'transparent';
                copyButton.style.border = 'none';
                copyButton.style.color = 'gray';
                copyButton.style.cursor = 'pointer';
                copyButton.style.whiteSpace = 'nowrap'; // Prevent line breaks
                copyButton.style.overflow = 'hidden'; // Hide overflowing text
                copyButton.classList.add('copy-button');

                copyButton.addEventListener('click', () => {
                    const targetChild = element.children[0];

                    function htmlToPlainText(html) {
                        const tempElement = document.createElement('div');
                        tempElement.innerHTML = html;

                        const latexElements = tempElement.querySelectorAll('.katex');
                        latexElements.forEach(latexElement => {
                            const latexSource = latexElement.children[0]?.children[0]?.children[0]?.children[1];
                            const displayMode = latexElement.parentNode.classList.contains('katex-display');
                            const wrappedLatexText = (displayMode ? '$$' : '$') + latexSource.innerHTML + (displayMode ? '$$' : '$');
                            latexElement.innerHTML = wrappedLatexText;
                        });

                        const codeElements = tempElement.querySelectorAll('code');
                        codeElements.forEach(codeElement => {
                            const { parentElement } = codeElement;
                            const codeContent = codeElement.innerHTML;
                            const isPreTag = parentElement.tagName.toLowerCase() === 'pre';
                            if (isPreTag) {
                                const codeLanguage = parentElement.firstChild?.firstChild?.innerHTML || '';
                                parentElement.firstChild.remove();
                                parentElement.innerHTML = `\`\`\`${codeLanguage}\n${codeContent}\`\`\``;
                            } else {
                                codeElement.innerHTML = `\`${codeContent}\``;
                            }
                        });

                        const turndownService = new TurndownService();

                        // custom rule
                        turndownService.addRule('KeepCodeAndKatex', {
                            // filter 值可以是数组，也可以是函数，数组不能匹配类名
                            filter: (node) => {  // code is one-line, yet pre is multi-line
                                if (node.nodeName === 'PRE' || node.nodeName === 'CODE') {
                                    return true;
                                }
                                if (node.classList.contains('katex')) {
                                    return true;
                                }
                                return false;
                            },
                            replacement: (content, node) => { // can't node alone
                                return node.innerHTML;
                            }
                        });

                        // 覆盖 escape (转义) 函数
                        turndownService.escape = function (string) {
                            return string;
                        };

                        console.log(tempElement.innerHTML);
                        const markdown = turndownService.turndown(tempElement.innerHTML);
                        console.log(markdown);

                        tempElement.innerHTML = markdown;

                        return tempElement.innerHTML;
                    }

                    async function copyTextToClipboard(text) {
                        try {
                            await navigator.clipboard.writeText(text);
                            console.log('Text copied to clipboard');
                        } catch (err) {
                            console.error('Failed to copy text: ', err);
                        }
                    }

                    const htmlContent = [...targetChild.children].map(child => child.outerHTML).join('');
                    const plainTextContent = htmlToPlainText(htmlContent);
                    copyTextToClipboard(plainTextContent);

                    copyButton.textContent = '已复制';
                    setTimeout(() => {
                        copyButton.textContent = '复制';
                    }, 2000);
                });

                element.style.position = 'relative';
                element.appendChild(copyButton);
            }
        });
    }

    setInterval(addButton, 1000);
})();
