// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次
// 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用

export function preventBeforeUnload () {
  const originalAddEventListener = window.addEventListener
  // 重写 addEventListener 方法，禁止网站刷新时的弹窗
  window.addEventListener = (type, listener, options) =>
    type === 'beforeunload' ? undefined : originalAddEventListener.call(this, type, listener, options)
}

// 增加视频加载数量函数
export function increaseVideoLoadSize () {
  const origFetch = _unsafeWindow.fetch
  _unsafeWindow.fetch = function (input, init) {
    if (typeof input === 'string' && input.includes('api.bilibili.com') && input.includes('feed/rcmd') && init.method.toUpperCase() === 'GET') {
      input = input.replace('&ps=12&', '&ps=30&')
    }
    return origFetch(input, init)
  }
}

/**
 * 管理滚动和滑动事件的函数
 * @param {string} page - 简短描述页面的字符串: search, video
 */
export function handleScroll (page) {
  // eslint-disable-next-line no-undef
  if (GM_getValue('settingShowHidden', [])[0] === false || GM_getValue('ban-action-hidden', false) === false) {
    scrollToHidden()
  }

  if (page === 'search') {
    scrollToClick()
  }

  if (page === 'video') {
    scrollToToggleSidebar()
  }
}

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
function scrollToHidden () {
  let lastScrollTop = 0
  const scrollThreshold = 75

  _unsafeWindow.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY

    const offset = currentScrollTop - lastScrollTop
    const scrollHidden = offset > scrollThreshold ? 'true' : ''
    const shouldUpdate = Math.abs(offset) > scrollThreshold || currentScrollTop < scrollThreshold

    if (shouldUpdate) {
      scrollHidden ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
      lastScrollTop = currentScrollTop
    }
  })
}

function scrollToClick () {
  let startX = 0
  let endX = 0
  let startY = 0
  let endY = 0
  let clickIndex = 3
  const touchXThreshold = 55

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    endX = event.changedTouches[0].clientX
    endY = event.changedTouches[0].clientY

    const distanceX = endX - startX
    const distanceY = endY - startY

    const navItems = [4, 3, 2, 1, 7, 6, 5]
    if (Math.abs(distanceX) > touchXThreshold && Math.abs(distanceY) < 1 / 2 * Math.abs(distanceX)) {
      distanceX > 0 ? clickIndex-- : clickIndex++
      document.querySelector(`.vui_tabs--nav-item:nth-child(${navItems[clickIndex]})`).click()
    }
  }

  const container = document.querySelector('#i_cecream')
  container.addEventListener('touchstart', handleTouchStart)
  container.addEventListener('touchend', handleTouchEnd)
}

function scrollToToggleSidebar () {
  let startX = 0
  let endX = 0
  let startY = 0
  let endY = 0
  const touchXThreshold = 55
  const videoContainer = document.querySelector('#mirror-vdcon')

  const handleTouchStart = event => {
    startX = event.changedTouches[0].clientX
    startY = event.changedTouches[0].clientY
  }

  const handleTouchEnd = event => {
    endX = event.changedTouches[0].clientX
    endY = event.changedTouches[0].clientY

    const distanceX = endX - startX
    const distanceY = endY - startY

    if (Math.abs(distanceX) > touchXThreshold && Math.abs(distanceY) < 1 / 2 * Math.abs(distanceX)) {
      const isSidebarShown = videoContainer.hasAttribute('sidebar')
      if (distanceX > 0) {
        isSidebarShown && videoContainer.removeAttribute('sidebar')
      } else {
        !isSidebarShown && videoContainer.setAttribute('sidebar', '')
      }
    }
  }

  videoContainer.addEventListener('touchstart', handleTouchStart)
  videoContainer.addEventListener('touchend', handleTouchEnd)

  const videoArea = document.querySelector('.bpx-player-video-area')
  videoArea.addEventListener('touchstart', event => {
    // 阻止冒泡只对当前监听器生效，禁止全屏滑动和拖动进度条触发侧边栏
    event.stopPropagation()
  })
}
