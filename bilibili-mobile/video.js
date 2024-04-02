// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

export function videoInteraction () {
  handlelVideoClick()
  handleVideoLongPress()
}

// 接管视频点击事件
function handlelVideoClick () {
  const video = document.getElementsByClassName('bpx-player-video-wrap>video')[0]
  if (video) video.playsInline = true

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

function handleVideoLongPress () {
  const video = document.querySelector('video') // 获取视频元素
  let isLongPress = false // 长按标志
  let timeoutId

  video.addEventListener('touchstart', (event) => {
    timeoutId = setTimeout(() => {
      video.playbackRate = video.playbackRate * 2
      isLongPress = true
    }, 500)
  })

  video.addEventListener('touchmove', (event) => {
    clearTimeout(timeoutId) // 触摸移动时取消长按
  })

  video.addEventListener('touchend', (event) => {
    clearTimeout(timeoutId) // 触摸结束时清除定时器

    if (isLongPress) {
      video.playbackRate = video.playbackRate / 2
      isLongPress = false
    }
  })
}
