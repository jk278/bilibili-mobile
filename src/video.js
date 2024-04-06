// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

export function videoInteraction () {
  dynamicHeight()
  handlelVideoClick()
  handleVideoLongPress()
}

function dynamicHeight () {
  const player = document.querySelector('#bilibili-player')
  const playerWrap = document.querySelector('#playerWrap')
  const leftContainer = document.querySelector('.left-container')

  const style = window.getComputedStyle(player)
  const width = style.getPropertyValue('width')
  const height = style.getPropertyValue('height')

  const newHeight = parseInt(height) / parseInt(width) * 100
  player.style.cssText = `width:100vw; height:${newHeight}vw;`
  playerWrap.style.height = `${newHeight}vw`
  playerWrap.style.display = 'block'

  leftContainer.style.top = `${newHeight}vw`
  leftContainer.style.display = 'block'

  const miniPlayerBtn = document.getElementsByClassName('mini-player-window')[0]
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (miniPlayerBtn.classList.contains('on')) {
          miniPlayerBtn.click()
        }
      }
    })
  })

  observer.observe(miniPlayerBtn, { attributes: true })
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
  const video = document.querySelector('video')
  let isLongPress = false
  let timeoutId
  let times

  video.addEventListener('touchstart', () => {
    times = Number(localStorage.getItem('custom-longpress-speed') || '2')
    timeoutId = setTimeout(() => {
      video.playbackRate = video.playbackRate * times
      isLongPress = true
    }, 500)
  })

  video.addEventListener('touchmove', () => {
    clearTimeout(timeoutId)
  })

  video.addEventListener('touchend', () => {
    clearTimeout(timeoutId)

    if (isLongPress) {
      video.playbackRate = video.playbackRate / times
      isLongPress = false
    }
  })
}
