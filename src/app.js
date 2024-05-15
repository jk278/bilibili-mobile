// @grant 表示全局作用域运行，而不在隔离沙盒内使用特定 API

import './style/app.css'
import './style/header.css'
import './style/home.css'
import './style/video.css'
import './style/search.css'
import './style/space.css'
import './style/message.css'

import { preventBeforeUnload, increaseVideoLoadSize, handleScroll } from './window.js'
import { handleScriptPreSetting, handleScriptSetting, setScriptHelp } from './setting.js'
import { handleActionbar } from './actionbar.js'
import { handleHeaderImage, handleVideoCard } from './home.js'
import { videoInteraction } from './video.js'
import { createUnfoldBtn } from './message.js'

(function () {
  // setInterval(() => { debugger }, 100)

  if (window.top !== window.self) { return } // 检查当前执行环境是否为顶级窗口

  function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

  /* initViewport */ document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'viewport', content: 'width=device-width, initial-scale=1' }))

  preventBeforeUnload()

  console.log('Bilibili mobile execute!')

  // 简单表达式: 常量折叠，解析引擎优化为只计算一次，然后缓存入临时变量。函数调用、对象属性访问等不适用。
  const part = location.hostname.substring(0, location.hostname.indexOf('.'))

  switch (part) {
    case 'www':
      if (location.pathname === '/') {
        increaseVideoLoadSize()
        handleHeaderImage()
        handleScriptPreSetting()
        waitDOMContentLoaded(() => {
          handleActionbar('home')
          handleScriptSetting()
          handleVideoCard()
          handleScroll()
          setScriptHelp()
        })
      } else if (location.pathname.startsWith('/video')) {
        handleScriptPreSetting()
        waitDOMContentLoaded(() => {
          handleActionbar('video')
          handleScriptSetting()
          videoInteraction()
          handleScroll('video')
          setScriptHelp()
        })
      }
      break
    case 'search':
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar('search')
        handleScriptSetting()
        handleScroll('search')
        setScriptHelp()
      })
      break
    case 'space':
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar('space')
        handleScriptSetting()
        handleScroll('space')
        setScriptHelp()
      })
      break
    case 'message':
      handleScriptPreSetting()
      waitDOMContentLoaded(() => {
        handleActionbar('message')
        handleScriptSetting()
        handleScroll('message')
        createUnfoldBtn()
        setScriptHelp()
      })
      break
    default:
      break
  }
})()
