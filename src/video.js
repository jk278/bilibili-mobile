/* global GM_getValue */

export function videoInteraction () {
  handlePortrait()

  handlelVideoClick()

  handleVideoLongPress()

  closeMiniPlayer()
}

let isPortrait = false

function handlePortrait () {
  const video = document.querySelector('#bilibili-player video')

  video.addEventListener('resize', () => {
    // aspectRatio, resize 前宽高为 0
    if (video.videoHeight / video.videoWidth > 1) { isPortrait = true }
  }, { once: true })
}

// 接管视频点击事件
function handlelVideoClick () {
  // 架空双击全屏层以适应竖屏
  const videoPerch = document.querySelector('.bpx-player-video-perch')
  const videoWrap = document.querySelector('.bpx-player-video-wrap')
  const video = videoWrap.querySelector('video')

  videoPerch.parentElement.insertBefore(videoWrap, videoPerch)

  // 阻止添加 mousemove 监听器以禁用双击时控制栏变化
  const videoArea = document.querySelector('.bpx-player-video-area')
  const newVideoArea = document.createElement('div')
  newVideoArea.className = 'bpx-player-video-area'
  videoArea.parentElement.insertBefore(newVideoArea, videoArea.nextSibling)

  while (videoArea.firstChild) { newVideoArea.appendChild(videoArea.firstChild) }
  videoArea.style.display = 'none'

  // safari 内联播放
  if (video) { video.playsInline = true }

  const controlWrap = document.querySelector('.bpx-player-control-wrap')

  let clickTimer = null

  let controlWrapTimer = null // 返回值为 id

  let isBpxStateShow = false

  function hideControlWrap () {
    if (!video.paused && !isBpxStateShow) {
      controlWrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      clearTimeout(controlWrapTimer)
      controlWrapTimer = null
    }
  }

  function showControlWrap () {
    // view 省略时指向当前窗口
    controlWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    controlWrapTimer = setTimeout(hideControlWrap, 3000)
  }

  // 单击监听
  videoWrap.addEventListener('click', () => {
    clearTimeout(clickTimer)

    clickTimer = setTimeout(() => {
      controlWrapTimer ? hideControlWrap() : showControlWrap()

      if (!GM_getValue('ban-video-click-play', false)) { video.paused ? video.play() : video.pause() } // videoPerch.click()
    }, 250)
  })

  // 观察控制栏按键弹窗
  const controlBottom = document.querySelector('.bpx-player-control-bottom-right')

  const childObserver = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      if (isBpxStateShow !== mutation.target.classList.contains('bpx-state-show')) {
        if (isBpxStateShow) { showControlWrap() } // 关闭窗口会控制栏会 mouseleave
        isBpxStateShow = !isBpxStateShow
      }
    })
  })

  const controlObserver = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        childObserver.observe(addedNode, { attributes: true, attributeFilter: ['class'] })
        clearTimeout(observerTimer)
      })
    })
  })
  controlObserver.observe(controlBottom, { childList: true })

  const observerTimer = setTimeout(() => { controlObserver.disconnect() }, 3000)

  // 双击监听
  videoWrap.addEventListener('dblclick', () => {
    clearTimeout(clickTimer)

    // 双击打开声音
    video.muted = false
    if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }

    isPortrait
      ? document.querySelector('.bpx-player-ctrl-web').click()
      : videoPerch.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
  })
}

function closeMiniPlayer () {
  // 关闭小窗: getElement 提前使用在元素加载后能获取到, querySelector 在元素加载后使用才能获取到
  if (!localStorage.getItem('is-mini-player-closed')) {
    const miniPlayerBtn = document.getElementsByClassName('mini-player-window')[0]
    new MutationObserver(mutations =>
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('on')) {
          miniPlayerBtn.click()
          localStorage.setItem('is-mini-player-closed', true)
        }
      })
    ).observe(miniPlayerBtn, { attributes: true, attributeFilter: ['class'] })
  }
}

function handleVideoLongPress () {
  const video = document.querySelector('video')
  let isLongPress = false
  let timeoutId
  let times

  video.addEventListener('touchstart', () => {
    times = GM_getValue('custom-longpress-speed', 2)

    timeoutId = setTimeout(() => {
      video.playbackRate = video.playbackRate * times
      isLongPress = true
    }, 500)
  })

  video.addEventListener('touchmove', cancelLongPress)
  video.addEventListener('touchend', cancelLongPress)

  function cancelLongPress () {
    clearTimeout(timeoutId)

    if (isLongPress) {
      video.playbackRate = video.playbackRate / times
      isLongPress = false
    }
  }
}
