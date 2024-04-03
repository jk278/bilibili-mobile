// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API

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
        increaseVideoLoadSize()
        handleHeaderImage()
      }
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        localStorage.getItem('hidden-header') === '1' && document.body.setAttribute('hidden-header', 'true')
        handleHeaderClick()
        handleActionbar()
        handleScriptSetting()
        if (url.pathname.startsWith('/video')) {
          videoInteraction()
          handleSidebar()
        }
        scrollToHidden()
      })
      break
    case 'search':
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        localStorage.getItem('hidden-header') === '1' && document.body.setAttribute('hidden-header', 'true')
        handleHeaderClick()
        handleActionbar()
        handleScriptSetting()
        scrollToHidden()
      })
      break
    case 'space':
      break
    case 'm':
      break
    default:
      break
  }
})()
