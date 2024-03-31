// ==UserScript==
// @name               Hetushu night font color
// @name:zh-CN         和图书夜间字色
// @namespace          https://github.com/jk278/hetushu-night-font-color
// @version            1.0
// @description        Your Script Description
// @description:zh-CN  脚本描述
// @author             jk278
// @match              https://www.hetushu.com/book/*
// @grant              none
// @run-at             document-start
// ==/UserScript==

(function () {
  'use strict'

  // Function to execute a callback after the DOMContentLoaded event
  function executeAfterDOMContentLoaded (callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => callback())
    } else {
      callback()
    }
  }

  // Function to add CSS styles before rendering
  function addCssBeforeRendering () {
    // Create a style element
    const style = document.createElement('style')

    // Set the CSS styles for night mode
    style.textContent = `
          body[data-mode="night"] #cbox #content { color: rgb(140, 154, 182); }
          `
    // 比例：10：11：13，倍数：14

    // If document.documentElement is available, append the style to the document
    if (document.documentElement) {
      document.documentElement.appendChild(style)
    } else {
      // If document.documentElement is not available, listen for readyStateChange event
      document.addEventListener('readystatechange', () => {
        // If the style is not connected and the document is not in loading state, append the style
        if (!style.isConnected && document.readyState !== 'loading') {
          document.documentElement.appendChild(style)
        }
      })
    }
  }

  // Execute the CSS addition after the DOMContentLoaded event
  executeAfterDOMContentLoaded(function () {
    addCssBeforeRendering()
  })
})()
