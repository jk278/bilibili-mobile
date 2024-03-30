// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            3.3.4.1
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

(function () {
  'use strict'
  console.log('Bilibili mobile execute!')
  // setInterval(() => {
  //   console.log(undefined)
  // }, 100)

  // eslint-disable-next-line no-undef
  const _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow !== 'undefined' ? unsafeWindow : window)() // 立即执行表达式只调用一次
  // 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用

  initViewport()
  initElementStyle()

  preventBeforeUnload()

  if (localStorage.getItem('hidden-header') === '1') { addHiddenStyle() }

  if (window.location.pathname === '/') {
    // 重写原生的 fetch 函数，DOM 加载完后执行就错过关键请求了
    increaseVideoLoadSize()
    handleHeaderImage()
  }

  if (window.location.pathname.startsWith('/video')) {
    handleScriptPreSetting()
  }

  waitDOMContentLoaded(() => {
    localStorage.getItem('hidden-header') === '1' && document.body.setAttribute('hidden-header', 'true')
    controlHeaderClick()
    if (window.location.pathname.startsWith('/video')) {
      addPlaysInline()
      controlVideoClick()
    }

    scrollToHidden()

    handleActionbar()

    if (window.location.pathname.startsWith('/video')) {
      handleSidebar()
    }
  })

  // DOM 加载完后
  function waitDOMContentLoaded (callback) {
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback()
  }
  // head 获取到后
  function ensureHeadGetted (element) {
    document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element))
  }

  function initViewport () {
    if (document.head) {
      const viewport = document.createElement('meta')
      viewport.setAttribute('name', 'viewport')
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
      document.head.appendChild(viewport)
    }
  }

  function addPlaysInline () {
    const videoElement = document.getElementsByClassName('bpx-player-video-wrap>video')[0]
    // 新添加了路径判断，此处预留
    if (videoElement) videoElement.playsInline = true
  }

  function preventBeforeUnload () {
    const originalAddEventListener = window.addEventListener

    // 重写 addEventListener 方法，禁止网站刷新时的弹窗
    window.addEventListener = function (type, listener, options) {
      if (type === 'beforeunload') {
        return
      }
      originalAddEventListener.call(this, type, listener, options)
    }
  }

  // 隐藏顶栏
  function addHiddenStyle () {
    const hiddenStyle = Object.assign(document.createElement('style'), {
      id: 'hidden-header',
      textContent: `
          .bili-header__bar, #overlay {transform: translateY(-100%);}
          #playerWrap {transform: translateY(calc(var(--header-height) * -1));}
          /* 父布局不要用 transform */
          .video-container-v1.video-container-v1 {top: -64px !important;}
        `
    })
    ensureHeadGetted(hiddenStyle)
  }

  // 操作栏
  function handleActionbar () {
    const actionbar = Object.assign(document.createElement('div'), {
      id: 'actionbar',
      /* html */
      innerHTML: `
      <div id="full-now">
        <svg version="1.0" width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-fullscreen"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>
      </div>
      <div id="my-home">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path></svg>
      </div>
      <div id="search-fab">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>
      </div>
      <div id="menu-fab">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
      </div>
      <div id="sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
      </div>
      `
    })

    document.body.appendChild(actionbar)

    if (window.location.pathname === '/') {
      actionbar.classList.add('home')
    }

    if (window.location.pathname.startsWith('/video')) {
      const fullBtn = document.getElementById('full-now')
      fullBtn.addEventListener('click', () => {
        const video = document.getElementsByTagName('video')[0]
        if (video) video.unmuted = false
        document.getElementsByClassName('bpx-player-ctrl-full')[0]?.click()
      })
    }

    const home = document.getElementById('my-home')
    home.addEventListener('click', () => { window.location.href = '/' })

    const searchbarBtn = document.getElementById('search-fab')
    searchbarBtn.addEventListener('click', () => {
      const searchbar = document.getElementsByClassName('center-search-container')[0]
      searchbar.classList.add('show')
      const input = searchbar.querySelector('input')
      input.focus()
      input.addEventListener('blur', () => { searchbar.classList.remove('show') })
    })

    const entryBtn = document.getElementById('menu-fab')
    entryBtn.addEventListener('click', () => {
      if (localStorage.getItem('hidden-header') === '1') {
        document.getElementById('hidden-header')?.remove()
        localStorage.setItem('hidden-header', '0')
      } else {
        addHiddenStyle()
        localStorage.setItem('hidden-header', '1')
      }
    })
  }

  // 侧边栏
  function handleSidebar () {
    const rightContainer = document.getElementsByClassName('right-container')[0]

    const sidebar = document.getElementById('sidebar')

    sidebar.addEventListener('click', function () {
      if (!rightContainer.classList.contains('show')) {
        rightContainer.classList.add('show')
      } else { closeSidebar() }
    })

    function closeSidebar () {
      rightContainer.classList.remove('show')
    }

    const backdrop = document.getElementsByClassName('left-container')[0] // 伪元素的真实元素
    backdrop.addEventListener('click', closeSidebar)

    // popstate（历史记录），hashchange（改 URL 非历史记录）监听不到
    const recommendLiist = document.getElementById('reco_list')
    recommendLiist.addEventListener('click', event => {
      const nextPlay = document.getElementsByClassName('rec-title')[0]
      const recommendFooter = document.getElementsByClassName('rec-footer')[0]
      if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
    })
  }

  // 接管顶部点击事件，父元素point-events:none，子元素point-events:auto对有的手机无效
  function controlHeaderClick () {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'
    document.body.appendChild(overlay)
    overlay.addEventListener('click', handleClick)

    let storedElement = null
    let isMouseEntered = false
    let clickTimer = null
    let clickCount = 0

    function handleClick (event) {
      clickCount++

      if (clickTimer) {
        clearTimeout(clickTimer)
        clickTimer = null
      }

      if (clickCount === 1) {
        clickTimer = setTimeout(function () {
          // 如果 100ms 内没有第二次点击，则执行操作 A
          onceClick()
          clickCount = 0
        }, 250)
      } else {
        // 如果 100ms 内有第二次点击，则执行操作 B
        twiceClick()
        clickCount = 0
      }

      function onceClick () {
        if (isMouseEntered) {
          simulateMouseLeave(storedElement)
          isMouseEntered = false
        } else {
          overlay.style.display = 'none'
          const element = document.elementFromPoint(event.clientX, event.clientY)
          simulateMouseEnter(element)
          overlay.style.display = 'block'
          isMouseEntered = true
          storedElement = element
        }
      }

      function twiceClick () {
        overlay.style.display = 'none'
        const element = document.elementFromPoint(event.clientX, event.clientY)
        simulateClick(element)
        overlay.style.display = 'block'
      }
    }

    function simulateMouseEnter (element) {
      const event = new MouseEvent('mouseenter', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }

    function simulateMouseLeave (element) {
      const event = new MouseEvent('mouseleave', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }

    function simulateClick (element) {
      const event = new MouseEvent('click', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }
  }

  // 控制首页头图函数
  function handleHeaderImage () {
    const key = 'header-image'
    const url = 'https://source.unsplash.com/random/840x400'
    const elementSelector = '.bili-header__banner'

    if (window.location.pathname === '/') {
      loadImage(key, elementSelector)

      setTimeout(async () => {
        try {
          const img = await getImage(url)
          const base64Data = imageToBase64(img)
          storeImage(key, base64Data)
        } catch (error) {
          console.error('Failed to get image:', error)
        }
      }, 5000)
    }

    function getImage (url) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = url
        img.onload = () => resolve(img)
        img.onerror = reject
      })
    }

    function imageToBase64 (img) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      return canvas.toDataURL('image/jpeg')
    }

    function storeImage (key, base64Data) {
      localStorage.setItem(key, base64Data)
    }

    function loadImage (key, elementSelector) {
      const base64Data = localStorage.getItem(key)
      if (base64Data) {
        const style = document.createElement('style')
        style.innerHTML = `
          ${elementSelector}::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-image: url(${base64Data});
            background-size: cover;
            background-position: center;
          }
        `
        document.head.appendChild(style)
      } else {
        // 如果本地存储中不存在图片数据，则从 URL 中获取图片
        getImage(url).then(img => {
          const base64Data = imageToBase64(img)
          storeImage(key, base64Data)
          loadImage(key, elementSelector)
        }).catch(error => {
          console.error('Failed to get image:', error)
        })
      }
    }
  }

  // 增加视频加载数量函数
  function increaseVideoLoadSize () {
    const origFetch = _unsafeWindow.fetch
    _unsafeWindow.fetch = function (input, init) {
      // console.log(input)
      if (typeof input === 'string' && input.includes('api.bilibili.com') && input.includes('feed/rcmd') && init.method.toUpperCase() === 'GET') {
        input = input.replace('&ps=12&', '&ps=30&')
      }
      return origFetch(input, init)
    }
  }

  // 滚动隐藏函数(弹幕行、评论行)
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

  // 接管视频点击事件
  function controlVideoClick () {
    const playerContainer = document.getElementsByClassName('bpx-player-container')[0]
    playerContainer.addEventListener('click', handleClick)
    const controlWrap = document.getElementsByClassName('bpx-player-control-wrap')[0]

    let clickTimer = null

    function handleClick () {
      simulateMouseEnter(controlWrap)

      if (clickTimer) {
        clearTimeout(clickTimer)
      }

      clickTimer = setTimeout(() => {
        simulateMouseLeave(controlWrap)
      }, 5000)
    }

    function simulateMouseEnter (element) {
      const event = new MouseEvent('mouseenter', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }

    function simulateMouseLeave (element) {
      const event = new MouseEvent('mouseleave', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }
  }

  // 脚本设置
  function handleScriptPreSetting () {
    const defaultValue = [1, 1, 1, 1]

    const css = {
      css1: `
      .bpx-player-sending-area.bpx-player-sending-area {display: none !important;}
      .left-container.left-container {padding: calc(var(--video-height) + 5px ) 10px 0;}
    `,
      css2: '.main-reply-box.main-reply-box {display: none !important;}',
      css3: '#v_tag {display: none !important;}',
      css4: `
      .copyright.item {display: none !important;}
      .show-more {display: none;}`
    }

    readScriptSetting()

    waitDOMContentLoaded(() => {
      createSettingPanel()

      // eslint-disable-next-line no-undef
      GM_registerMenuCommand('设置隐藏元素', () => {
        document.getElementById('setting-panel').classList.add('show')
      })
    })

    function readScriptSetting (diference) {
      diference = diference || false

      const settingShowHidden = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
      const values = Object.values(css)

      if (diference) {
        for (const [index, value] of diference.entries()) {
          if (value) {
            if (settingShowHidden[index]) {
              const scriptPreStyle = Object.assign(document.createElement('style'), {
                id: `script-pre-style-${index + 1}`,
                textContent: css[`css${index + 1}`]
              })
              ensureHeadGetted(scriptPreStyle)
            } else {
              document.head
                ? document.getElementById(`script-pre-style-${index + 1}`).remove()
                : waitDOMContentLoaded(document.getElementById(`script-pre-style-${index + 1}`))
            }
          }
        }
      } else {
        for (const [index, value] of values.entries()) {
          if (settingShowHidden[index]) {
            const scriptPreStyle = Object.assign(document.createElement('style'), {
              id: `script-pre-style-${index + 1}`,
              textContent: value
            })
            ensureHeadGetted(scriptPreStyle)
          }
        }
      }
    }

    function createSettingPanel () {
      const settingPanel = Object.assign(document.createElement('div'), {
        id: 'setting-panel',
        innerHTML: `
        <div class="setting-title">选择隐藏的元素：</div>
        <div id="setting-checkboxes">
          <label><input type="checkbox" value="1"><span>弹幕行</span></label>
          <label><input type="checkbox" value="2"><span>评论行</span></label>
          <label><input type="checkbox" value="3"><span>标签块</span></label>
          <label><input type="checkbox" value="4"><span>转载声明</span></label>
        </div>
        `
      })

      const settingConform = Object.assign(document.createElement('button'), {
        id: 'setting-conform',
        textContent: '确认'
      })

      const checkboxElements = settingPanel.querySelectorAll('#setting-checkboxes input[type="checkbox"]')
      const oldValues = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
      for (const [index, value] of oldValues.entries()) {
        checkboxElements[index].checked = value
      }

      settingConform.addEventListener('click', () => {
        const selectedValues = Array.from(checkboxElements).map((checkbox) => checkbox.checked ? 1 : 0)

        localStorage.setItem('settingShowHidden', JSON.stringify(selectedValues))
        const difference = selectedValues.map((value, index) => value === oldValues[index] ? 0 : 1)

        readScriptSetting(difference)

        settingPanel.classList.remove('show')
      })

      settingPanel.appendChild(settingConform)
      document.body.appendChild(settingPanel)
    }
  }

  function initElementStyle () {
    /* css */
    const initialInsertStyle = `
/* ---------------------------------------------------- *
* ----------------------- 操作栏 ----------------------- *
* ---------------------------------------------------- */

/* 操作栏 */
#actionbar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: var(--header-height);
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: inherit;
  transition: .5s transform ease-in;
}

[scroll-hidden=true] #actionbar,
[scroll-hidden=true] .flexible-roll-btn-inner,
[scroll-hidden=true] .top-btn {
  transform: translateY(var(--header-height));
}


#actionbar > * {
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
}

#full-now {
  padding: 12px;
  svg {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
}

#my-home,
#search-fab,
#menu-fab,
#sidebar {
  padding: 8px;
}

#actionbar.home #full-now,
#actionbar.home #sidebar {
  visibility: hidden;
  pointer-events: none;
}
/* --------------------- 其它适配 --------------------- */

/* 扩增载入后产生的骨架空位 */
.floor-single-card:has(.skeleton, .skeleton-item) {
  display: none;
}

/* 脚本设置窗口 */
#setting-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: inherit;
  z-index: 1;
  border: 1px solid var(--line_regular);
  display: none;
  flex-direction: column;
  padding: 5px;
  border-radius: 5px;
}

#setting-panel.show {
  display: flex;
}

.setting-title {
  padding-bottom: 5px;
  margin: 0 5px;
  border-bottom: 1px solid var(--line_regular);
}
#setting-checkboxes {
  display: flex;
  flex-direction: column;
}

#setting-checkboxes label {
  margin: 5px;
  display: flex;
}

#setting-checkboxes span {
  flex-grow: 1;
  text-align: center;
  user-select: none;
}

#setting-conform {
  margin: 0 20px;
  border-radius: 5px;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* ----------------------- 首页 ----------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

 body {
  /* 避免评论未加载时显示灰色 */
  background: white !important;

  /* 添加透明 animation 为 Via 预留加载 initViewport 的时间后，刷新加载出现白屏 */

  --header-height: 46px;
}

/* 顶栏点击遮罩层 */
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: transparent;
  z-index: 1002;
}

/* 双列视频 */
.recommended-container_floor-aside .container {
  grid-template-columns: repeat(2, 1fr) !important;
  padding: 5px;
  grid-gap: 5px !important;
  background: #f1f2f3;
}

/* 头图底色 */
.bili-header__banner {
  background-color: #f1f2f3 !important;
}

/* 显示根据屏宽隐藏的 feed */
.container>.feed-card {
  display: block !important;
}

/* 最小宽度（body、顶栏） */
body,
.bili-header,
.bili-header__banner {
  min-width: 0 !important;
}

/* 主页视频流 */
.bili-feed4-layout {
  width: 100% !important;
}

/* -------------------------------------------------- 
 ------------------------ 顶栏 ----------------------- 
 -------------------------------------------------- */

/* #i_cecream 属首页，#app #biliMainHeader 属视频页 */

/* 顶栏边距（右边距减去头像右空隙） */
.bili-header__bar {
  padding: 0 10px 0 15px !important;
  transition: transform 0.5s ease-in;
}

/* 顶栏高度 */
.bili-header .bili-header__bar {
  height: var(--header-height) !important;
}

/* 视频页顶栏高度 */
.header-v3 #biliMainHeader .bili-header .mini-header {
  height: var(--header-height) !important;
}

/* 保留 #biliMainHeader 内联初始高度 64px */

/* 顶部按钮高度 */
.entry-title,
.right-entry,
.mini-header__logo {
  max-height: var(--header-height);
}

.left-entry__title {
  height: var(--header-height) !important;
}

/* 头像高度 */
.v-popover-wrap.header-avatar-wrap {
  height: var(--header-height) !important;
}

/* 收藏按钮高度 */
.header-favorite-container-box,
.header-favorite-container  {
  max-height: var(--header-height) !important;
}

/* 顶栏高度：HTML 初始加载时，biliMainHeader 已有内联高度，
   保留顶栏外框（biliMainHeader）高度，修改其它元素 */

/* 不影响结果 */
#biliMainHeader .bili-header {
  min-height: var(--header-height);
  height: var(--header-height);
}

/* 搜索框 */
.center-search-container {
  position: absolute !important;
  width: 100%;
  left: 0;
  top: 0;
  padding: 10px 20px 5px !important;
  z-index: 3;
  margin: 0 !important;
  display: none;
}

.center-search-container.show {
  display: block;
}

/* 顶栏右侧图标 */
.right-entry {
  flex: 1;
  min-width: 0;
  margin: 0 !important;
  justify-content: space-evenly;
}
 
.right-entry > * {
  animation: fadeIn 1s ease-in;
}

.left-entry {
  min-width: 0;
  margin: 0 !important;
}

/* 头像图表边距 */
.header-avatar-wrap {
  padding-right: 0 !important;
}

/* 禁止换行 */
.left-entry__title,
.dm.item {
  white-space: nowrap;
}

/* 头像置右 */
.v-popover-wrap.header-avatar-wrap {
  order: 5;
  margin-left: auto;
}

/* 剩余元素均分 */
.v-popover-wrap:not(.header-avatar-wrap) {
  flex: 1;
}

/* 肉眼个别微调 */
.right-entry--message {
  padding-left: 3px;
}

/* 顶栏元素间距 */
.left-entry__title {
  margin-right: 0px !important;
}

/* 与头像左空隙对齐 */
.mini-header__logo {
  margin-right: 7px !important;
}

/* 禁用主题色重载 */
svg.mini-header__logo path {
  fill: var(--brand_blue) !important;
}

/* 移除“首页”字样 */
.mini-header__title {
  display: none !important;
}

/* 移除顶部动图和临时静图 */
.animated-banner,
#bili-header-banner-img {
  display: none !important;
}

/* 使用 controlHeaderImage 获取随机头图 */

.biliheader__banner {
  display: none !important;
}

/* -------------------------------------------------- 
 ---------------------- 展开图类 --------------------- 
 -------------------------------------------------- */

.v-popover {
  position: fixed !important;
  top: var(--header-height) !important;
  margin: 0 !important;
  max-width: 100%;
  padding: 5px !important;
}

/* 分类(左侧入口)展开图 */
.channel-panel__column {
  width: 100% !important;
  flex: 1;
  padding: 0 !important;
}

/* 右侧入口展开图 */
.dynamic-panel-popover,
.favorite-panel-popover,
.history-panel-popover {
  max-width: 100%;
  padding: 0 5px !important;
}

/* 动态展开图 */
.dynamic-video-item {
  margin-right: 0 !important;
}

.header-dynamic-list-item {
  padding: 0 !important;
}

.header-dynamic__box--center {
  max-width: 60%;
}

.header-dynamic__box--right {
  top: 0 !important;
  margin-bottom: 0 !important;
  width: unset !important;
  flex: 1;

  .cover {
      width: unset !important;
      height: unset !important;
  }
}

/* 收藏展开图 */
.favorite-panel-popover__nav {
  max-width: 25%;
}

.header-fav-card__image {
  max-width: 40%;

  picture {
      max-width: 100%;
      height: 100% !important;
  }
}

/* 间距（收藏展开图） */
.favorite-panel-popover__nav .tab-item {
  padding: 0 6px !important;
}

.header-fav-card {
  padding: 6px !important;
}

.favorite-panel-popover__nav {
  margin-top: 6px !important;
}

/* 历史展开图 */
.header-history-video {
  padding: 5px 10px !important;
}

/* 移除头像大图 */
.header-entry-avatar {
  display: none !important;
}

/* 关闭头像动画 */
.header-entry-mini {
  animation: unset !important;
}

/* 移除次要入口 */
.left-entry>li:not(:nth-of-type(1)),
.vip-wrap,
.right-entry-item:has(>.vip-wrap),
.right-entry-item:nth-of-type(6),
.right-entry-item--upload,
.header-channel,
.bili-header__channel,
.recommended-swipe,
.feed-roll-btn {
  display: none !important;
}

/* 广告、推广图块 */
/* 底部登录弹窗类 .lt-row 可能包含其它元素 */
/* 首页顶部动图上的大 Logo */
.container>*:has(.bili-video-card__info--ad),
.floor-single-card,
.desktop-download-tip,
.lt-row,
.header-banner__inner {
  display: none !important;
}

/* ----------------------------------------------------
* --------------------- 主页视频卡片 ------------------- *
 ----------------------------------------------------- */

.container>* {
  margin-top: 0 !important;
}

/* 卡片底板 */
.bili-video-card__wrap {
  border-radius: 5px;
}

/* 封面宽长比 */
.bili-video-card.is-rcmd {
  --cover-radio: 75% !important;
}

/* 封面圆角 */
.v-img.bili-video-card__cover {
  border-radius: 5px 5px 0 0;
}

/* 封面信息（阴影层圆角） */
.bili-video-card__stats {
  border-radius: 0 !important;
  --icon-size: 16px;
  --subtitle-font-size: 11px;
  white-space: nowrap;
}

/* 卡片标题 - 字样 */
.bili-video-card__info--tit {
  --title-padding-right: 0;
  --title-font-size: 14px;
  --title-line-height: 20px;
}

/* 标题 - 上下距 */
/* .bili-video-card__info  */

/* 标题 - 左右距 */
.bili-video-card__info--right {
  padding: 0 5px;
}

/* 标题 - 字重 */
/* .bili-video-card__info--tit > a */

/* 小标 */
.bili-video-card__info--bottom {
  --subtitle-font-size: 12px;
}

.bili-video-card__info--icon-text {
  padding: 0 5px !important;
}

/* 小标 - 日期 */
.bili-video-card__info--owner {
  flex: 1;
}

.bili-video-card__info--date {
  margin-left: auto !important;
}

/* 小标 - 点赞数 */
.bili-video-card__info--icon-text {
  --follow-icon-font-size: 11px;
  --follow-icon-line-height: 15px;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* --------------------- 视频详情页 -------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* 主应用块 */
#app {
  overflow: hidden;
}

/* 主体内容块 */
.video-container-v1 {
  min-width: 0 !important;
  padding: 0 !important;
  /* 顶栏高度减 #biliMainHeader 保留高度 */
  top: calc(var(--header-height) - 64px );
}

/* ----------------------------------------------------
* ---------------------- 主视频块 --------------------- *
 ----------------------------------------------------- */

/* 主视频块 */
.left-container {
  --video-height: calc(100vw * 0.5625);
  --dm-row-height: 44px;
}

/* 视频块（宽度） */
.left-container {
  /* 移动 Safari 百分比宽高自动考虑边框和填充 */
  padding: calc(var(--video-height) + var(--dm-row-height)) 10px 0;
  box-sizing: border-box;
  width: 100% !important;

  /* 填充评论未加载时的空白，注意: 顶部预留高度是 64px */
  min-height: calc(100vh - 64px);
}

/* ----------------------------------------------------
* ----------------------- 播放器 ---------------------- *
 ----------------------------------------------------- */

/* 修改播放器固定尺寸 */
#bilibili-player {
  height: 100% !important;
  width: 100% !important;
}

/* 固定视频（外框尺寸） */
#playerWrap {
  position: fixed;
  left: 0;
  top: var(--header-height);
  width: 100vw;
  height: var(--video-height) !important;
  z-index: 75;
  transition: transform 0.5s ease-in;
}

/* 小窗时的隐藏 - 始终隐藏*/
/* 顶部关注、音乐、反馈 */
/* 右下角暂停图标 */
/* 取消静音 */
.bpx-player-top-wrap,
.bpx-player-state-wrap,
.bpx-player-toast-wrap {
  display: none !important;
}

/* 小窗时的隐藏 - 固定显示*/
/* 视频控制栏 */
/* 弹幕行 */
.bpx-player-control-wrap,
.bpx-player-sending-area {
  display: block !important;
}

/* 小窗时的隐藏：定位、解除静音、点赞关注等弹窗 */
/*.bpx-player-toast-wrap {
  bottom: unset !important;
  top: 50%;
  transform: translateY(-50%);
}*/

.bpx-player-toast-item {
  margin: 0 !important;
}

/* 小窗时的暂停图标 */
.bpx-player-mini-warp {
  display: none !important;
}

/* 彻底移除小窗样式 */
#playerWrap .bpx-player-container[data-screen=mini] {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  right: 0 !important;
  bottom: 0 !important;
  transition: top 0.5s ease-in;
}

/* 移除小窗等按钮 */
.fixed-sidenav-storage>*:nth-child(1),
.fixed-sidenav-storage>*:nth-child(2) {
  display: none !important;
}

/* 窄屏不隐藏控制条和阴影 */
.bpx-player-control-entity,
.bpx-player-control-mask {
  display: block !important;
}

/* 移除次要按钮：画中画、宽屏、页面全屏、时间、选集 */
.bpx-player-ctrl-pip,
.bpx-player-ctrl-wide,
.bpx-player-ctrl-web,
.bpx-player-ctrl-time,
.bpx-player-ctrl-eplist {
  display: none !important;
}

/* 左右控制区 */
.bpx-player-control-bottom-left,
.bpx-player-control-bottom-right {
  flex: unset !important;
}

/* 全屏时 */
.bpx-player-container .bpx-player-control-bottom-left,
.bpx-player-container .bpx-player-control-bottom-right {
  min-width: 0 !important;
}

/* 清晰度(width:auto 不换行，隐藏不掉高清字样) */
.bpx-player-ctrl-quality {
  margin-right: 0 !important;
  min-width: 0;
  flex: auto !important;
}

/* 清晰度、倍速文本 */
.bpx-player-ctrl-quality-result,
.bpx-player-ctrl-playbackrate {
  font-size: 12px !important;
}

/* 清晰度文本:隐藏换行的部分 */
.bpx-player-ctrl-quality-result {
  height: 22px;
  overflow: hidden;
}

.bpx-player-ctrl-playbackrate {
  text-wrap: nowrap;
}

/* 按钮区(图标22px，算 margin 37px) */
.bpx-player-control-bottom {
  height: 29px !important;
  margin-top: 7px !important;
  padding: 0 7px !important;
}

/* 进度条 */
.bpx-player-control-top {
  bottom: 36px !important;
}

/* 修复部分情况下的控制栏图标增大导致的高度过高 */
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen=full] {
    height: 43px !important;
  }

  .bpx-player-control-top {
    bottom: 43px !important;
  }
}

/* 进度条细条包含块（高12px） */
.bpx-player-progress-wrap {
  height: 7px !important;
  padding-bottom: 3px !important;
}

/* 阴影(高能区 100% - 1px) */
.bpx-player-pbp {
  bottom: calc(100% + 6px) !important;
}

/* 清晰度弹窗 */
.bpx-player-ctrl-quality-menu-wrap {
  bottom: 0 !important;
  max-height: var(--video-height) !important;
}

/* 设置弹窗 */
.bpx-player-ctrl-setting-box {
  right: 0 !important;
  bottom: 0 !important;
}

/* 更多设置 */
.bpx-player-ctrl-setting-menu-right {
  padding: 5px !important;
  max-height: var(--video-height) !important;
}

/* 更多设置 */
.bui.bui-radio.bui-dark {
  margin-bottom: 5px !important;
}

/* 全屏控制栏 */
.bpx-player-control-bottom-center .bpx-player-sending-bar {
  padding-right: 6px !important;
  height: 24px !important;
}

/* 存在章节时(允许章节缩小) */
.bpx-player-ctrl-viewpoint {
  margin: 0 !important;
  min-width: 0 !important;
  width: 45px !important;
  flex-shrink: 1 !important;
}

.bpx-player-ctrl-viewpoint-text {
  width: 24px !important;
  text-overflow: unset !important;
  font-size: 12px;
  flex: none;
}

/* ----------------------------------------------------
* ----------------------- 弹幕行 ---------------------- *
 ----------------------------------------------------- */

/* 弹幕行：滚动隐藏 */
.bpx-player-sending-area {
  position: absolute !important;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);

  transition: 0.5s transform ease-in;
  display: block !important;
}

[scroll-hidden=true] .bpx-player-sending-area {
  transform: none;
}

.bpx-player-video-area {
  z-index: 1;
}

/* 弹幕行预加载灰块白条(视频底下也有，预加载有时会看到) */
.bpx-player-sending-bar-left,
.bpx-player-sending-bar-right,
#bilibili-player-placeholder-bottom {
  display: none !important;
}

/* 弹幕行高度 */
.bpx-player-sending-bar {
  height: var(--dm-row-height) !important;
}

.bpx-player-dm-input {
  height: 26px !important;
}

/* 弹幕输入栏外 */
.bpx-player-video-inputbar {
  height: 26px !important;
  border-radius: 13px !important;

  min-width: 0 !important;
}

.bpx-player-video-inputbar-wrap {
  width: 100% !important;
}

/* 不输入隐藏发送 */
.bpx-player-dm-btn-send {
  display: none !important;
}

.bpx-player-video-inputbar-wrap:has(>input:focus)+.bpx-player-dm-btn-send {
  display: flex !important;
}

.bpx-player-dm-btn-send {
  border-radius: 0 13px 13px 0 !important;
  height: 26px !important;
  min-width: 50px !important;
  width: 50px !important;
}

.bui-button-blue {
  min-width: 50px !important;
}

/* 观看人数 */
.bpx-player-video-info {
  margin-right: 6px !important;
}

/* 弹幕数量、弹幕礼仪 */
.bpx-player-video-info-divide,
.bpx-player-video-info-dm,
.bpx-player-dm-hint {
  display: none !important;
}

/* 播放组件在下面 */

/* ----------------------------------------------------
* ----------------------- 推荐块 ---------------------- *
 ----------------------------------------------------- */

/* 推荐块 */
.right-container {
  width: 85% !important;

  position: fixed !important;
  z-index: 76;
  background: white;
  transition: transform .6s ease-in;
  transform: translateX(calc(100% + 1px));
  height: calc(100% - var(--header-height));
  overflow-y: auto;
  /* 避免到达边界后的滚动事件穿透 */
  overscroll-behavior: contain;

  box-sizing: border-box;
  padding: 10px;
  margin: 0 !important;
  right: 0;
  border-left: 1px solid var(--line_regular);
}

.right-container.show {
  transform: none;
}

.right-container-inner {
  padding: 0 !important;
}

/* 推荐块蒙版（加到左视频块才不会被冒泡事件影响） */
.video-container-v1:has(>.right-container) .left-container:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 75;
  background-color: rgb(0, 0, 0);
  opacity: 0;
  transition: opacity 0.6s ease-in;
  pointer-events: none;
}

.video-container-v1:has(>.right-container.show) .left-container:after {
  opacity: 0.5;
  pointer-events: auto;
}

/* UP信息 */
.upinfo-btn-panel .default-btn {
  font-size: 12px !important;
}

.new-charge-btn {
  max-width: 35%;
}

.follow-btn {
  max-width: 150px !important;
}

/* UP头像 */
/*.up-avatar-wrap .bili-avatar,
.up-avatar-wrap {
  width: 38px !important;
  height: 38px !important;
}*/

/* 推荐视频图块 */
#reco_list .card-box .pic-box {
  max-width: 50%;
}

/* ----------------------------------------------------
* ---------------------- 播放页组件 ------------------- *
 ----------------------------------------------------- */

 #viewbox_report {
}

/* 信息块（标题） */
.video-info-container {
  height: auto !important;
  padding-top: 0 !important;
}

/* 标题（可两行显示） */
.video-title {
  font-size: 18px !important;

  white-space: wrap !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  /* 去除折叠时的 show-more 按钮 margin */
  margin-right: 0 !important;
}

.show-more {
  top: unset !important;
  transform: none !important;
  bottom: 4px;
  right: 4px !important;
}

.video-desc-container {
  margin: 10px 0 !important;
}

/* 点赞投币行 */
.video-toolbar-container {
  padding: 10px 0 8px !important;
}

.video-toolbar-left,
.video-toolbar-left-main {
  min-width: 0;
}

.toolbar-left-item-wrap {
  flex: 1;
  min-width: 0;
}

.video-toolbar-container * {
  margin: 0 !important;
}

.video-share-info {
  width: 40px !important;
}

.video-share-popover {
  display: none !important;
}

/* AI 助手“测试版”字样 */
.video-ai-assistant-badge {
  display: none !important;
}

/* AI 总结 */
.resizable-component {
  width: 100% !important;
  left: 0 !important;
}

/* 标签 */
.video-tag-container {
  margin: 6px 0 0 !important;
  padding-bottom: 1px !important;
}

.tag-panel .tag {
  margin-bottom: 6px !important;
  opacity: 0;
  animation: fadeIn 1s ease-in 2s forwards;
}

/* 投票卡片 */
.top-vote-card-left {
  width: unset !important;
  max-width: unset !important;
}

/* ----------------------------------------------------
* ----------------- 播放组件（评论以下） -------------- *
 ----------------------------------------------------- */

@keyframes fadeIn {
  form {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
}

/* 固定评论栏 */
.main-reply-box {
  position: fixed;
  left: 0;
  bottom: var(--header-height);
  z-index: 10;
  background: white;
  width: 100%;
  padding: 8px 12px;
  border-top: 1px solid var(--line_regular);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  transition: .75s transform ease-in;
  display: block !important;
}

/* 评论行滚动隐藏 */
[scroll-hidden=true] .main-reply-box {
  transform: translateY(calc(100% + var(--header-height)))
}

/* 移除原底部评论栏 */
.fixed-reply-box {
  display: none !important;
}

/* 移除评论头像 */
.reply-box-avatar {
  display: none !important;
}

/* 输入块外 */
.reply-box-warp {
  border-radius: 13px !important;
}

/* 输入块内 */
.textarea-wrap {
  padding: 0 !important;
}

/* 文字输入 */
.reply-box-textarea {
  height: 26px !important;
  line-height: 26px !important;
  min-height: 26px !important;
}

/* 输入展开块 */
.main-reply-box .reply-box .box-expand[data-v-a6daab22] {
  height: 26px;
  margin: 8px 0 0 0;
}

/* 插入表情图片 */
.box-left {
  flex: 1;
  justify-content: space-evenly !important;
}

/* 点击发送 */
.reply-box-send {
  width: 50px !important;
  height: 26px !important;
}

/* 评论块 */
#comment {
  margin-top: 12px !important;
}

/* 评论导航 */
.reply-navigation {
  margin-bottom: 0 !important;
}

/* 评论 */
.root-reply-container {
  padding: 12px 0 0 36px !important;
}

.root-reply-avatar,
.root-reply-avatar .bili-avatar {
  width: 36px !important;
  height: 36px !important;
}

.user-info {
  margin: 3px 5px 0 !important;
}

/* 回复评论 */
.sub-reply-container {
  padding-left: 28px !important;
}

.sub-reply-item {
  padding: 4px 0 4px 37px !important;
}

/* 块状广告（包括推荐列） */
#activity_vote,
#bannerAd,
.reply-notice,
.ad-report,
.pop-live-small-mode,
#slide_ad {
  display: none !important;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* ------------------------ 按钮 ---------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* 按钮 */
.primary-btn:hover {
  background-color: unset !important;
}

.primary-btn {
  background: none !important;
}

/* 刷新按钮 */
.flexible-roll-btn-inner {
  border: none !important;
  color: inherit !important;
  background: none !important;
  padding: 7px 8px 7px 7px !important;
  display: block !important;
  position: fixed;
  bottom: -17px;
  right: 5vw;
  width: 40px !important;
  transition: .5s transform ease-in;
}

/* 首页置顶按钮 */
.top-btn {
  border: none !important;
  position: fixed;
  bottom: -17px;
  right: 77vw;
  width: 40px !important;
  transition: .5s transform ease-in !important
}

.top-btn .primary-btn-text {
  display: none;
}

/* svg 大小 */
.flexible-roll-btn-inner svg {
  width: 26px;
  height: 26px;
}

.palette-button-wrap.translucent>.flexible-roll-btn.flexible-roll-btn,
.palette-button-wrap.translucent>.top-btn-wrap.top-btn-wrap {
  opacity: 1 !important;
}

/* 按钮组 */
span.btn-text-inner,
.storage-box {
  display: none !important;
}

/* 返回顶部按钮（添加渐变） */
/* 权重：基本设置属性 < transition < animation */
.back-to-top {
  border-radius: 0 25% 25% 0 !important;
  border-left: 0 !important;
  margin-bottom: 0 !important;
  width: 42px !important;

  visibility: visible !important;
  transform: translateX(-100%);
  transition: transform .5s ease-in-out;
}

.back-to-top.visible {
  transform: none;
}

/* 回顶按钮的位置 */
.fixed-sidenav-storage {
  left: 0;
  right: unset !important;
  bottom: 78px !important;
  z-index: 1 !important;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* ---------------------- 其它窗口 -------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* 登录窗 */
.login-scan-wp,
.bili-mini-line {
  display: none !important;
}

.bili-mini-content-wp {
  padding: 52px 0 29px !important;
}

.bili-mini-login-right-wp,
.bili-mini-login-right-wp * {
  max-width: 80vw;
}
    `
    const style = document.createElement('style')
    style.textContent = initialInsertStyle

    // 如果 document.head 可用，将样式添加到文档
    ensureHeadGetted(style)
  }
})()
