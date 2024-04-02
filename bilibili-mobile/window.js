// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次
// 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用

export function preventBeforeUnload () {
  const originalAddEventListener = window.addEventListener

  window.addEventListener = function (type, listener, options) {
    if (type === 'beforeunload') {
      const modifiedListener = function (event) {
      // 在这里直接阻止显示alert弹窗
        event.returnValue = null

        // 调用原来的监听函数
        listener(event)
      }

      return originalAddEventListener.call(this, type, modifiedListener, options)
    }

    return originalAddEventListener.call(this, type, listener, options)
  }
}

// 增加视频加载数量函数
export function increaseVideoLoadSize () {
  const origFetch = _unsafeWindow.fetch
  _unsafeWindow.fetch = function (input, init) {
    // console.log(input)
    if (typeof input === 'string' && input.includes('api.bilibili.com') && input.includes('feed/rcmd') && init.method.toUpperCase() === 'GET') {
      input = input.replace('&ps=12&', '&ps=30&')
    }
    return origFetch(input, init)
  }
}

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
export function scrollToHidden () {
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
