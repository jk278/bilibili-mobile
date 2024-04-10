// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

export function videoInteraction () {
  handlePortrait()
  closeMiniPlayer()
  handlelVideoClick()
  handleVideoLongPress()
}

function handlePortrait () {
  const video = document.querySelector('#bilibili-player video')

  function handleResize () {
    const height = video.videoHeight
    if (height !== 0) {
      const width = video.videoWidth
      const aspectRatio = height / width
      if (aspectRatio > 1) {
        portraitVideoDblclick()
      }
    }
  }
  video.addEventListener('resize', handleResize)

  // video dblclick
  function portraitVideoDblclick () {
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
