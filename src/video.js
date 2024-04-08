// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

export function videoInteraction () {
  handlePortrait()
  closeMiniPlayer()
  handlelVideoClick()
  handleVideoLongPress()
}

function handlePortrait () {
  // dynamic height
  const player = document.querySelector('#bilibili-player')
  const style = window.getComputedStyle(player)
  const width = style.getPropertyValue('width')
  const height = style.getPropertyValue('height')
  const aspectRatio = (parseInt(height) - 46) / parseInt(width)

  const playerWrap = document.querySelector('#playerWrap')
  const videoContainer = document.querySelector('#mirror-vdcon')
  if (aspectRatio > 1) {
    // 减去弹幕行初始高度
    const newHeight = aspectRatio * 100
    player.style.height = `${newHeight}vw !important`

    playerWrap.style.cssText = `height:${newHeight}vw !important; display:block;`

    // 相对布局加top会导致底部显示不全，从顶部下滑时top还会清零一次
    videoContainer.style.cssText = `margin-top:${newHeight}vw; display:flex`

    const rightContainer = document.querySelector('.right-container')
    rightContainer.style.height = `calc(100% - ${newHeight}vw)`
  } else {
    playerWrap.style.display = 'block'
    videoContainer.style.display = 'flex'
  }

  // video dblclick
  const videoArea = document.querySelector('.bpx-player-video-area')
  const videoPerch = document.querySelector('.bpx-player-video-perch')
  const videoWrap = document.querySelector('.bpx-player-video-wrap')
  const video = videoWrap.querySelector('video')

  videoArea.insertBefore(videoWrap, videoPerch)
  videoPerch.remove()

  let clickTimer = null
  videoWrap.addEventListener('click', () => {
    clearTimeout(clickTimer)
    clickTimer = setTimeout(() => {
      video.paused ? video.play() : video.pause()
    }, 300)
  })

  videoWrap.addEventListener('dblclick', () => {
    clearTimeout(clickTimer)
    document.querySelector('.bpx-player-ctrl-web').click()
  })
}

function closeMiniPlayer () {
  // 关闭小窗: getElement 提前使用在元素加载后能获取到, querySelector 在元素加载后使用才能获取到
  const miniPlayerBtn = document.getElementsByClassName('mini-player-window')[0]
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.target.classList.contains('on') && miniPlayerBtn.click()
    })
  }).observe(miniPlayerBtn, { attributes: true, attributeFilter: ['class'] })
}

// 接管视频点击事件
function handlelVideoClick () {
  const video = document.querySelector('.bpx-player-video-wrap>video')
  // safari 内联播放
  if (video) video.playsInline = true

  const playerContainer = document.querySelector('.bpx-player-container')
  playerContainer.addEventListener('click', handleClick)
  const controlWrap = playerContainer.querySelector('.bpx-player-control-wrap')

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

  // 双击打开声音
  playerContainer.addEventListener('dblclick', () => {
    video.muted = false
    if (video.volume === 0) {
      document.querySelector('.bpx-player-ctrl-muted-icon').click()
    }
  })
}

function handleVideoLongPress () {
  const video = document.querySelector('video')
  let isLongPress = false
  let timeoutId
  let times

  video.addEventListener('touchstart', () => {
    // eslint-disable-next-line no-undef
    times = GM_getValue('custom-longpress-speed', 2)
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
