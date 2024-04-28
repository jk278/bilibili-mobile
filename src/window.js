/* global GM_getValue unsafeWindow */

export function preventBeforeUnload () {
  const originalAddEventListener = window.addEventListener
  // 重写 addEventListener 方法，禁止网站刷新时的弹窗
  window.addEventListener = (type, listener, options) =>
    type === 'beforeunload' || originalAddEventListener.call(this, type, listener, options)
}

// 增加视频加载数量函数
export function increaseVideoLoadSize () {
  // 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用
  // typeof undefinedVariable 不会报错，而是返回 'undefined'

  const _unsafeWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
  // 不使用 //@grant none 则沙盒运行; unsafeWindow: 重写 fetch, MouseEvent 对象的 view 属性

  const originalFetch = _unsafeWindow.fetch
  _unsafeWindow.fetch = (input, init) => {
    if (typeof input === 'string' && input.startsWith('https://api.bilibili.com') && input.includes('feed/rcmd')) {
      input = input.replace('&ps=12&', '&ps=30&')
    }
    return originalFetch(input, init)
  }
}

/**
 * 管理滚动和滑动事件的函数
 * @param {string} page - 简短描述页面的字符串: search, video
 */
export function handleScroll (page) {
  if (GM_getValue('settingShowHidden', [])[0] === false || GM_getValue('ban-action-hidden', false) === false) {
    scrollToHidden()
  }

  switch (page) {
    case 'search':
      slideSearchSort()
      break
    case 'video':
      slideVideoSidebar()
      break
    case 'message':
      slideMessageSidebar()
      break
    default:
      break
  }
}

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
function scrollToHidden () {
  let lastScrollY = 0
  const scrollThreshold = 75

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY
    const offsetY = currentScrollY - lastScrollY

    if (Math.abs(offsetY) > scrollThreshold || currentScrollY < scrollThreshold) {
      offsetY > 0 ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
      lastScrollY = currentScrollY
    }
  })
}

function slideSearchSort () {
  let startX = 0; let startY = 0

  let clickIndex = 3
  const touchXThreshold = 55

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    const offsetX = event.changedTouches[0].clientX - startX
    const offsetY = event.changedTouches[0].clientY - startY

    const navItems = [4, 3, 2, 1, 7, 6, 5]

    if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
      offsetX > 0 ? clickIndex-- : clickIndex++
      document.querySelector(`.vui_tabs--nav-item:nth-child(${navItems[clickIndex]})`).click()
    }
  }

  const container = document.querySelector('#i_cecream')
  container.addEventListener('touchstart', handleTouchStart)
  container.addEventListener('touchend', handleTouchEnd)
}

function slideVideoSidebar () {
  let startX = 0; let startY = 0

  const touchXThreshold = 55
  const videoContainer = document.querySelector('#mirror-vdcon')

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    const offsetX = event.changedTouches[0].clientX - startX
    const offsetY = event.changedTouches[0].clientY - startY

    if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
      const isToShow = offsetX < 0

      if (isToShow !== videoContainer.hasAttribute('sidebar')) {
        isToShow ? videoContainer.setAttribute('sidebar', '') : videoContainer.removeAttribute('sidebar')
      }
    }
  }

  videoContainer.addEventListener('touchstart', handleTouchStart)
  videoContainer.addEventListener('touchend', handleTouchEnd)

  const videoArea = document.querySelector('.bpx-player-video-area:not([style])')
  // 阻止冒泡只对当前监听器生效，禁止全屏滑动和拖动进度条触发侧边栏。要传递参数或用形参，就要用函数而非引用
  videoArea.addEventListener('touchstart', event => { event.stopPropagation() })
}

function slideMessageSidebar () {
  let startX = 0; let startY = 0

  const touchXThreshold = 55
  const messageContainer = document.querySelector('body>.container')

  const sidebarOverlay = document.querySelector('#sidebar-overlay')
  const sidebarFab = document.querySelector('#sidebar-fab')

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    const offsetX = event.changedTouches[0].clientX - startX
    const offsetY = event.changedTouches[0].clientY - startY

    if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
      const isToShow = GM_getValue('message-sidebar-right', false) ? offsetX < 0 : offsetX > 0

      if (isToShow !== messageContainer.hasAttribute('sidebar')) {
        if (isToShow) {
          messageContainer.setAttribute('sidebar', '')
          sidebarOverlay.classList.add('show')
          sidebarFab.classList.add('active')
        } else {
          messageContainer.removeAttribute('sidebar')
          sidebarOverlay.classList.remove('show')
          sidebarFab.classList.remove('active')
        }
      }
    }
  }

  messageContainer.addEventListener('touchstart', handleTouchStart)
  messageContainer.addEventListener('touchend', handleTouchEnd)
  sidebarOverlay.addEventListener('touchstart', handleTouchStart)
  sidebarOverlay.addEventListener('touchend', handleTouchEnd)
}
