// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }
function ensureHeadGetted (element) { document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element)) }

// 隐藏顶栏
export function hideHeader () {
  const hiddenStyle = Object.assign(document.createElement('style'), {
    id: 'hidden-header',
    /* css */
    textContent: `
      .bili-header__bar, #header-musk {transform: translateY(-100%);}
      /* 父布局不要用 transform */
      .video-container-v1.video-container-v1 {top: 0 !important;}
      .right-container.right-container {height: 100%;}
      .center-search-container {margin-top: var(--header-height) !important;}
    `
  })
  ensureHeadGetted(hiddenStyle)
}
// #playerWrap {transform: translateY(calc(var(--header-height) * -1));}

// 操作栏
export function handleActionbar () {
  const actionbar = Object.assign(document.createElement('div'), {
    id: 'actionbar',
    /* html */
    innerHTML: `
      <div id="full-now">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(3.6,4.2)" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>
      </div>
      <div id="my-top">
        <svg width="24" height="24" viewBox="0 0 296 296" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(17,18)" stroke="currentColor" stroke-width="1" d="M110.69055,37.98071a20.00016,20.00016,0,0,1,34.6189,0l87.97632,151.99243a19.99992,19.99992,0,0,1-17.30957,30.019H40.0238a19.99992,19.99992,0,0,1-17.30957-30.019L110.69055,37.98071M128,36a11.879,11.879,0,0,0-10.38562,5.98853L29.63806,193.981A11.99988,11.99988,0,0,0,40.0238,211.99219H215.9762A11.99988,11.99988,0,0,0,226.36194,193.981L138.38562,41.98853A11.879,11.879,0,0,0,128,36Z"/></svg>
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
      <div id="sidebar-fab">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
      </div>
      <div id="refresh-fab">
        <svg width="24" height="24" viewBox="0 0 29 29" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(2.3,2.8)" d="M21.3687 13.5827C21.4144 13.3104 21.2306 13.0526 20.9583 13.0069C20.686 12.9612 20.4281 13.1449 20.3825 13.4173L21.3687 13.5827ZM12 20.5C7.30558 20.5 3.5 16.6944 3.5 12H2.5C2.5 17.2467 6.75329 21.5 12 21.5V20.5ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V2.5C6.75329 2.5 2.5 6.75329 2.5 12H3.5ZM12 3.5C15.3367 3.5 18.2252 5.4225 19.6167 8.22252L20.5122 7.77748C18.9583 4.65062 15.7308 2.5 12 2.5V3.5ZM20.3825 13.4173C19.7081 17.437 16.2112 20.5 12 20.5V21.5C16.7077 21.5 20.6148 18.0762 21.3687 13.5827L20.3825 13.4173Z"/><path transform="translate(2.3,2.9)" d="M20.4716 2.42157V8.07843H14.8147"/></svg>
      </div>
      `
  })

  document.body.appendChild(actionbar)

  if (window.location.pathname === '/') {
    actionbar.classList.add('home')

    setTopBtn()
    setRefreshBtn()
  }

  if (window.location.pathname.startsWith('/video')) {
    setFullbtn()
  }

  setHomeBtn()
  setSearchBtn()
  setMenuBtn()

  function setFullbtn () {
    const fullBtn = document.getElementById('full-now')
    fullBtn.addEventListener('click', () => {
      const video = document.querySelector('video')
      // 等于符号优先级更高
      if ((localStorage.getItem('full-unmuted') || '0') === '1') {
        video.play()
        video.muted = false
        if (video.volume === 0) {
          document.querySelector('.bpx-player-ctrl-muted-icon').click()
        }
      }
      fullScreen()
      function fullScreen () {
        const video = document.querySelector('video')
        const btnSelector = video.videoWidth / video.videoHeight < 1 ? '.bpx-player-ctrl-web' : '.bpx-player-ctrl-full'
        const rawFullBtn = document.querySelector(btnSelector)
        rawFullBtn ? rawFullBtn.click() : setTimeout(fullScreen, 500)
      }
    })
  }

  function setTopBtn () {
    const topBtn = document.getElementById('my-top')
    topBtn.addEventListener('click', () => {
      toTop()
      function toTop () {
        const rawTopBtn = document.querySelector('.top-btn')
        rawTopBtn ? rawTopBtn.click() : setTimeout(toTop, 500)
      }
    })
  }

  function setHomeBtn () {
    const home = document.getElementById('my-home')
    home.addEventListener('click', () => { window.location.href = '/' })
  }

  function setSearchBtn () {
    const searchbarBtn = document.getElementById('search-fab')
    searchbarBtn.addEventListener('click', (event) => {
    // 事件完成后立即冒泡
      event.stopPropagation()
      const searchbarContainer = document.querySelector('.center-search-container')
      searchbarContainer.classList.add('show')
      const input = searchbarContainer.querySelector('input')
      input.focus()

      const searchbar = searchbarContainer.querySelector('.center-search__bar')
      searchbar.addEventListener('click', (event) => {
        event.stopPropagation()
      })
      document.body.addEventListener('click', (event) => {
        if (event.target !== searchbar) {
          searchbarContainer.classList.remove('show')
        }
      }, { once: true })
    })
  }

  function setMenuBtn () {
    const menuBtn = document.getElementById('menu-fab')
    menuBtn.addEventListener('click', () => {
      if ((localStorage.getItem('header-in-menu') || '0') === '1') {
        const menu = document.getElementById('header-in-menu')
        if (menu) {
          menu.style.display = 'block'
          setTimeout(() => {
            menu.classList.add('show')
            menu.style.display = ''
          }, 0)
        }
      } else {
        if ((localStorage.getItem('hidden-header') || '0') === '1') {
          document.getElementById('hidden-header')?.remove()
          localStorage.setItem('hidden-header', '0')
        } else {
          hideHeader()
          localStorage.setItem('hidden-header', '1')
        }
      }
    })
  }

  function setRefreshBtn () {
    const refreshBtn = document.getElementById('refresh-fab')
    refreshBtn.addEventListener('click', () => {
      refresh()
      function refresh () {
        const rawRefreshBtn = document.querySelector('.flexible-roll-btn-inner')
        rawRefreshBtn ? rawRefreshBtn.click() : setTimeout(refresh, 500)
      }
    })
  }
}

// 侧边栏(使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。)
export function handleSidebar () {
  const sidebarBtn = document.getElementById('sidebar-fab')

  const sidebarOverlay = document.createElement('div')
  sidebarOverlay.id = 'sidebar-overlay'

  sidebarBtn.appendChild(sidebarOverlay)

  sidebarOverlay.addEventListener('click', (event) => {
    event.stopPropagation()
    closeSidebar()
  })

  sidebarBtn.addEventListener('click', () => {
    const isShow = document.body.getAttribute('show-sidebar') === 'true'
    isShow ? closeSidebar() : document.body.setAttribute('show-sidebar', 'true')
  })

  function closeSidebar () { document.body.setAttribute('show-sidebar', '') }

  // // popstate（历史记录），hashchange（改 URL 非历史记录）监听不到
  const recommendLiist = document.getElementById('reco_list')
  recommendLiist.addEventListener('click', (event) => {
    const nextPlay = document.querySelector('.rec-title')
    const recommendFooter = document.querySelector('.rec-footer')
    if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
  })
}

// 接管顶部点击事件，父元素point-events:none，子元素point-events:auto对有的手机无效
export function handleHeaderClick () {
  const musk = document.createElement('div')
  musk.id = 'header-musk'
  document.body.appendChild(musk)
  musk.addEventListener('click', handleClick)

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
      clickTimer = setTimeout(() => {
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
        musk.style.display = 'none'
        const element = document.elementFromPoint(event.clientX, event.clientY)
        simulateMouseEnter(element)
        musk.style.display = 'block'
        isMouseEntered = true
        storedElement = element
      }
    }

    function twiceClick () {
      musk.style.display = 'none'
      const element = document.elementFromPoint(event.clientX, event.clientY)
      simulateClick(element)
      musk.style.display = 'block'
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
