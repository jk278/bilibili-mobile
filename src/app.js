// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API

import './style/app.css'
import './style/header.css'
import './style/home.css'
import './style/video.css'
import './style/search.css'
import './style/user.css'

import { initViewport } from './init.js'
import { preventBeforeUnload, increaseVideoLoadSize, handleScroll } from './window.js'
import { handleScriptPreSetting, handleScriptSetting } from './setting.js'
import { handleHeaderImage } from './header-image.js'
import { videoInteraction } from './video.js'

import { handleActionbar, handleSidebar } from './actionbar.js'

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

  switch (part) {
    case 'www':
      if (url.pathname === '/') {
        increaseVideoLoadSize()
        handleHeaderImage()
      }
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar()
        handleScriptSetting()
        if (url.pathname.startsWith('/video')) {
          videoInteraction()
          handleSidebar()
          handleScroll('video')
        } else {
          handleScroll()
        }
      })
      break
    case 'search':
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar()
        handleScriptSetting()
        handleScroll('search')
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
