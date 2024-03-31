import { _unsafeWindow } from './app'

export function preventBeforeUnload () {
  const originalAddEventListener = window.addEventListener

  // 重写 addEventListener 方法，禁止网站刷新时的弹窗
  window.addEventListener = function (type, listener, options) {
    if (type === 'beforeunload') {
      return
    }
    originalAddEventListener.call(this, type, listener, options)
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
