// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            3.9.6
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  只需一点配置，即可获得足够好的使用体验
// @author             jk278
// @license            MIT
// @match              *://www.bilibili.com/*
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
import { preventBeforeUnload, increaseVideoLoadSize } from './override.js'
import { handleScriptPreSetting, handleScriptSetting } from './setting.js'
import { handleHeaderImage } from './header-image.js'
import { handlelVideoClick, handleVideoLongPress } from './video.js'

import { hideHeader, handleActionbar, handleSidebar, handleHeaderClick } from './actionbar.js'

(function () {
  console.log('Bilibili mobile execute!')
  // setInterval(() => {
  //   console.log(undefined)
  // }, 100)

  // eslint-disable-next-line no-undef
  const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次
  // 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用

  initViewport()

  preventBeforeUnload()

  if (localStorage.getItem('hidden-header') === '1') { hideHeader() }

  if (window.location.pathname === '/') {
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

    // 待办：一个根据域名判断执行与否的框架
    // 待办：相关内容未加载时灰色显示的框架
    handleScriptSetting()

    if (window.location.pathname.startsWith('/video')) {
      // Video Interaction
      handlelVideoClick()
      handleVideoLongPress()

      handleSidebar()
    }

    scrollToHidden()
  })

  // DOM 加载完后
  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  // 滚动隐藏函数(弹幕行、评论行)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
  function scrollToHidden () {
    let lastScrollTop = 0
    const scrollThreshold = 75 // 滚动距离阈值

    _unsafeWindow.addEventListener('scroll', () => {
      const currentScrollTop = window.scrollY
      if ((currentScrollTop - lastScrollTop) > scrollThreshold) {
        document.body.setAttribute('scroll-hidden', 'true')
        lastScrollTop = currentScrollTop
      } else if ((currentScrollTop - lastScrollTop) < -scrollThreshold ||
       currentScrollTop < scrollThreshold) {
        document.body.setAttribute('scroll-hidden', '')
        lastScrollTop = currentScrollTop
      }
    })
  }
}())
