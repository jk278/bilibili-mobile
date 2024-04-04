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

// 滚动隐藏函数(弹幕行、评论行、操作栏)(主要布局块的class在初始化时会动态刷新，动态加载块子元素动态变动)(页面初始化使用了element的className方法设置class属性的值来同时添加多个class)
export function scrollToHidden () {
  let lastScrollTop = 0
  const scrollThreshold = 75

  _unsafeWindow.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY

    const offset = currentScrollTop - lastScrollTop
    const scrollHidden = offset > scrollThreshold ? 'true' : ''
    const shouldUpdate = Math.abs(offset) > scrollThreshold || currentScrollTop < scrollThreshold

    if (shouldUpdate) {
      document.body.setAttribute('scroll-hidden', scrollHidden)
      lastScrollTop = currentScrollTop
    }
  })
}
