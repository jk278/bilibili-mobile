// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            3.9.6
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  只需一点配置，即可获得足够好的使用体验
// @author             jk278
// @license            MIT
// @match              https://*.bilibili.com/*
// @grant              unsafeWindow
// @grant              GM_registerMenuCommand
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API

/**
 * 先完成配置，再打开桌面版B站
 * Via 修改网站独立 UA 为 Windows 或 MacOS，但不要开电脑模式
 * Firefox 下载扩展 Header Editor 并添加两条规则：
    ① 修改请求头 ------ 正则表达式 ------ << 匹配规则 >> ------ 名称: user-agent ------ 内容: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0
    ② 其中，规则一:  ^https://www\.bilibili\.com/.*  规则二:  ^https://.*\.bilivideo\.com/.*
 * Safari 浏览器 直接打开电脑模式即可
 */

import './style.css'

import { initViewport } from './init.js'
import { preventBeforeUnload, increaseVideoLoadSize, scrollToHidden } from './window.js'
import { handleScriptPreSetting, handleScriptSetting } from './setting.js'
import { handleHeaderImage } from './header-image.js'
import { videoInteraction } from './video.js'

import { hideHeader, handleActionbar, handleSidebar, handleHeaderClick } from './actionbar.js'

(function () {
  console.log('Bilibili mobile execute!')
  // setInterval(() => {
  //   console.log(undefined)
  // }, 100)

  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  const url = window.location
  // 简单表达式: 常量折叠，解析引擎优化为只计算一次，然后缓存入临时变量。函数调用、对象属性访问等不适用。
  const part = url.hostname.substring(0, url.hostname.indexOf('.'))

  initViewport()
  preventBeforeUnload()

  if (localStorage.getItem('hidden-header') === '1') { hideHeader() }

  switch (part) {
    case 'www':
      if (url.pathname === '/') {
        // 重写原生的 fetch 函数，DOM 加载完后执行就错过关键请求了
        increaseVideoLoadSize()
        handleHeaderImage()
      }

      handleScriptPreSetting()

      waitDOMContentLoaded(() => {
        localStorage.getItem('hidden-header') === '1' && document.body.setAttribute('hidden-header', 'true')
        handleHeaderClick()

        // 原内联播放位置，移至 video-interaction

        handleActionbar()

        // 待办：相关内容未加载时灰色显示的框架
        handleScriptSetting()

        if (url.pathname.startsWith('/video')) {
          // Video Interaction
          videoInteraction()

          handleSidebar()
        }

        scrollToHidden()
      })
      break
    case 'space':
      break
    case 'search':
      break
    case 'm':
      break
    default:
      break
  }
})()
