// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API

import './style/app.css'
import './style/header.css'
import './style/home.css'
import './style/video.css'
import './style/search.css'
import './style/user.css'
import './style/message.css'

import { initViewport } from './init.js'
import { preventBeforeUnload, increaseVideoLoadSize, handleScroll } from './window.js'
import { handleScriptPreSetting, handleScriptSetting } from './setting.js'
import { handleHeaderImage } from './header-image.js'
import { videoInteraction } from './video.js'
import { createUnfoldBtn } from './element.js'

import { handleActionbar, handleSidebar } from './actionbar.js'

(function () {
  // setInterval(() => { debugger }, 100)

  if (window.top !== window.self) { return } // 检查当前执行环境是否为顶级窗口

  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  initViewport()
  preventBeforeUnload()

  console.log('Bilibili mobile execute!')

  // 简单表达式: 常量折叠，解析引擎优化为只计算一次，然后缓存入临时变量。函数调用、对象属性访问等不适用。
  const part = location.hostname.substring(0, location.hostname.indexOf('.'))

  switch (part) {
    case 'www':
      if (location.pathname === '/') {
        increaseVideoLoadSize()
        handleHeaderImage()
      }
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar()
        handleScriptSetting()
        if (location.pathname.startsWith('/video')) {
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
    case 'message':
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar()
        handleScriptSetting()
        handleSidebar('message')
        handleScroll('message')
        createUnfoldBtn()
      })
      break
    default:
      break
  }
})()
