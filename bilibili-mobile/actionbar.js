// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }
function ensureHeadGetted (element) { document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element)) }

// 隐藏顶栏
function hiddenHeader () {
  const hiddenStyle = Object.assign(document.createElement('style'), {
    id: 'hidden-header',
    /* css */
    textContent: `
          .bili-header__bar, #overlay {transform: translateY(-100%);}
          #playerWrap {transform: translateY(calc(var(--header-height) * -1));}
          /* 父布局不要用 transform */
          .video-container-v1.video-container-v1 {top: 0 !important;}
          .right-container.right-container {height: 100%;}
          .center-search-container {margin-top: var(--header-height) !important;}
          /* 隐藏时操作栏蒙版 */
          #actionbar:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(0, 0, 0);
            opacity: 0;
            transition: opacity 0.6s ease-in;
            pointer-events: none;
          }
          
          body[show-sidebar="true"] #actionbar:after {
            opacity: 0.5;
            pointer-events: auto;
          }
        `
  })
  ensureHeadGetted(hiddenStyle)
}

// 操作栏
export function handleActionbar () {
  const actionbar = Object.assign(document.createElement('div'), {
    id: 'actionbar',
    /* html */
    innerHTML: `
      <div id="full-now">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path transform="translate(4,4)" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>
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
      <div id="sidebar-btn">
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
      // 等于符号优先级更高
      if ((localStorage.getItem('full-unmuted') || '0') === '1') {
        video.play()
        video.muted = false
        if (video.volume === 0) {
          document.getElementsByClassName('bpx-player-ctrl-muted-icon')[0].click()
        }
      }
      fullScreen()
    })
    function fullScreen () {
      const fullBtn = document.getElementsByClassName('bpx-player-ctrl-full')[0]
      fullBtn ? fullBtn.click() : setTimeout(fullScreen, 500)
    }
  }

  const home = document.getElementById('my-home')
  home.addEventListener('click', () => { window.location.href = '/' })

  const searchbarBtn = document.getElementById('search-fab')
  searchbarBtn.addEventListener('click', (event) => {
    // 事件完成后立即冒泡
    event.stopPropagation()
    const searchbarContainer = document.getElementsByClassName('center-search-container')[0]
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

  const entryBtn = document.getElementById('menu-fab')
  entryBtn.addEventListener('click', () => {
    if (localStorage.getItem('hidden-header') === '1') {
      document.getElementById('hidden-header')?.remove()
      localStorage.setItem('hidden-header', '0')
    } else {
      hiddenHeader()
      localStorage.setItem('hidden-header', '1')
    }
  })
}

// 侧边栏(使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。)
export function handleSidebar () {
  const sidebarBtn = document.getElementById('sidebar-btn')

  sidebarBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    const isShow = document.body.getAttribute('show-sidebar') === 'true'
    isShow ? closeSidebar() : document.body.setAttribute('show-sidebar', 'true')
  })

  function closeSidebar () { document.body.setAttribute('show-sidebar', '') }

  document.getElementsByClassName('left-container')[0].addEventListener('click', closeSidebar)

  document.getElementById('actionbar').addEventListener('click', () => {
    // 子元素的监听器比 actionbar 先触发，所以这里的属性值始终为 'true'，阻止子元素的冒泡事件即可
    localStorage.getItem('hidden-header') === '1' && document.body.getAttribute('show-sidebar') === 'true' && closeSidebar()
  })

  // // popstate（历史记录），hashchange（改 URL 非历史记录）监听不到
  const recommendLiist = document.getElementById('reco_list')
  recommendLiist.addEventListener('click', (event) => {
    const nextPlay = document.getElementsByClassName('rec-title')[0]
    const recommendFooter = document.getElementsByClassName('rec-footer')[0]
    if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
  })
}

// 接管顶部点击事件，父元素point-events:none，子元素point-events:auto对有的手机无效
export function handleHeaderClick () {
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
