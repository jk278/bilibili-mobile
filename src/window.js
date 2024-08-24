/* global GM_getValue GM_setValue unsafeWindow */

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

export function countViewTime () {
  window.onload = function () {
    let storedTime = GM_getValue('view-time', undefined)
    let storedTimestamp = GM_getValue('timestamp', undefined)

    if (storedTime && storedTimestamp) {
      const diff = Math.floor((Date.now() - storedTimestamp) / 1000 / 60)
      storedTime = diff < 2 ? storedTime + diff : 0
    } else {
      storedTime = 0
    }
    storedTimestamp = Date.now()

    GM_setValue('view-time', storedTime)
    GM_setValue('timestamp', storedTimestamp)

    setInterval(function () {
      storedTime++
      GM_setValue('view-time', storedTime)
      GM_setValue('timestamp', Date.now())
      if (storedTime % 120 === 0) {
        const fullscreenElem = document.fullscreenElement
        if (fullscreenElem && !fullscreenElem.querySelector(':scope>#toast')) {
          fullscreenElem.appendChild(document.querySelector('#toast').cloneNode())
        }
        const toasts = document.querySelectorAll('#toast')

        toasts.forEach(toast => {
          toast.textContent = `您已连续浏览 ${storedTime / 60} 小时，请注意休息`
          toast.style.display = 'block'
          setTimeout(() => { toast.setAttribute('show', '') }, 10)

          setTimeout(() => {
            toast.removeAttribute('show')
            toast.addEventListener('transitionend', () => { toast.style.cssText = '' }, { once: true })
          }, 5000)
        })
      }
    }, 60000)
  }
}

/**
 * 管理滚动和滑动事件的函数
 * @param {string} page - 简短描述页面的字符串: search, video, message, space
 */
export function handleScroll (page) {
  if (page !== 'video') { scrollToHidden() }

  switch (page) {
    case 'search':
      slideSearchSort()
      break
    case 'video':
      scrollToHidden('video')
      slideVideoSidebar()
      break
    case 'message':
      slideMessageSidebar()
      break
    case 'space':
      handleSpaceSwipe()
      break
    default:
      break
  }
}

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
function scrollToHidden (page) {
  let lastScrollY = 0
  const scrollThreshold = 75

  // if (page !== 'video') {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY
    const offsetY = currentScrollY - lastScrollY

    if (currentScrollY < scrollThreshold) { document.body.removeAttribute('scroll-hidden') }

    if (Math.abs(offsetY) > scrollThreshold) {
      offsetY > 0 ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
      lastScrollY = currentScrollY
    }
  })
  // } else {
  //   const leftContainer = document.body.querySelector('.left-container')
  //   const backToTop = document.getElementsByClassName('back-to-top')[0]

  //   leftContainer.addEventListener('scroll', () => { // change
  //     const currentScrollY = leftContainer.scrollTop // change
  //     const offsetY = currentScrollY - lastScrollY

  //     if (currentScrollY < scrollThreshold) { document.body.removeAttribute('scroll-hidden') }

  //     if (Math.abs(offsetY) > scrollThreshold) {
  //       offsetY > 0 ? document.body.setAttribute('scroll-hidden', '') : document.body.removeAttribute('scroll-hidden')
  //       lastScrollY = currentScrollY
  //     }

  //     // 修复更改滚动区后的置顶按钮不显示
  //     currentScrollY > leftContainer.clientHeight ? backToTop?.setAttribute('show', '') : backToTop?.removeAttribute('show')
  //   })

  //   backToTop.addEventListener('click', () => {
  //     leftContainer.scrollTo({ top: 0 })
  //     backToTop.classList.add('touch-active')
  //     backToTop.addEventListener('transitionend', () => { backToTop.classList.remove('touch-active') }, { once: true })
  //   })
  // }
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

// 处理space滚动和滑动事件
function handleSpaceSwipe () {
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode.id === 'app') {
          setTimeout(scrollToStick, 50) // 等待粉丝牌宽度 (可能影响高度) 动态加载
          slideSpaceNavigator()
          observer.disconnect()
        }
      })
    })
  })
  observer.observe(document.body, { childList: true })

  function scrollToStick () {
    const navigator = document.querySelector('#navigator')
    const threshold = navigator.getBoundingClientRect().top

    let isStuck = false

    window.addEventListener('scroll', () => {
      if (isStuck !== (window.scrollY > threshold)) {
        navigator.classList.toggle('sticky')
        isStuck = !isStuck
      }
    })
  }

  function slideSpaceNavigator () {
    let startX = 0; let startY = 0

    const touchXThreshold = 55

    const current = document.querySelector('#navigator .active')
    const siblings = Array.from(document.querySelectorAll('#navigator .n-btn')).sort((a, b) => {
      return parseInt(getComputedStyle(a).order) - parseInt(getComputedStyle(b).order)
    })
    let index = siblings.findIndex(el => el === current)

    const handleTouchStart = event => {
      startX = event.changedTouches[0].clientX
      startY = event.changedTouches[0].clientY
    }

    const handleTouchEnd = event => {
      const offsetX = event.changedTouches[0].clientX - startX
      const offsetY = event.changedTouches[0].clientY - startY

      if (Math.abs(offsetX) > touchXThreshold && Math.abs(offsetY / offsetX) < 1 / 2) {
        offsetX > 0 ? index-- : index++
        siblings[index].click()
      }
    }

    const container = document.querySelector('#app')
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)
  }
}
