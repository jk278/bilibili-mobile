/* global GM_getValue */

export function videoInteraction () {
  handlePortrait()

  handlelVideoClick()

  handleVideoLongPress()

  closeMiniPlayer()

  setEndingContent()

  modifyShadowDOMLate()
}

let isPortrait = false

function handlePortrait () {
  const video = document.querySelector('#bilibili-player video')

  // 适配侧边栏切换视频
  video.addEventListener('resize', () => {
    // aspectRatio, resize 前宽高为 0
    isPortrait = video.videoHeight / video.videoWidth > 1
  })
}

// 接管视频点击事件
function handlelVideoClick () {
  const playerContainter = document.querySelector('.bpx-player-container')
  const videoArea = playerContainter.querySelector('.bpx-player-video-area')
  const videoPerch = videoArea.querySelector('.bpx-player-video-perch')
  const videoWrap = videoPerch.querySelector('.bpx-player-video-wrap')
  const video = videoWrap.querySelector('video')

  // 架空双击全屏层以适应竖屏
  videoArea.insertBefore(videoWrap, videoPerch)

  // safari 内联播放
  if (video) { video.playsInline = true }

  const oldControlWrap = videoArea.querySelector('.bpx-player-control-wrap')
  const controlEntity = oldControlWrap.querySelector('.bpx-player-control-entity') // 移动后再使用

  let clickTimer = null

  let hideTimer = null

  // 阻止 controlWrap 的 mouseleave 事件隐藏控制栏, mouseleave 事件不会在冒泡阶段和捕获阶段传播
  const controlWrap = Object.assign(document.createElement('div'), {
    className: 'bpx-player-control-wrap new',
    innerHTML: '<div class="bpx-player-control-mask"></div>'
  })
  videoArea.insertBefore(controlWrap, oldControlWrap)
  controlWrap.appendChild(controlEntity)

  // 观察控制栏按键弹窗, 元素发生移动后, 之前的 querySelector 会失效 (无法找到该元素)
  // 当箭头函数的函数体只有一条语句时，如果使用了花括号，则该语句会被解释为函数体，而不是返回值。因此，当使用了花括号时，isBpxStateShow 的返回值为 undefined。
  const isBpxStateShow = () => controlEntity.querySelector('.bpx-player-control-bottom-right>.bpx-state-show')

  const controlTop = controlEntity.querySelector('.bpx-player-control-top')
  const bottomRight = controlEntity.querySelector('.bpx-player-control-bottom-right')

  // 可以作语句的表达式：需要赋值给变量或者作为函数调用的一部分，能够产生一个可以被丢弃的值
  // 布尔值不能直接作为语句，因为它们不执行任何动作，也不改变程序的状态
  // x++ 作语句时执行操作，但是不显式返回值，实际 x 的值隐式地改变了；作表达式时根据前后缀，依次返回 x 的值和执行操作
  const isShown = () => playerContainter.getAttribute('ctrl-shown') === 'true' // controlWrap 的 mouseleave 事件导致点击非视频部分会隐藏控制栏, 实际已不必要

  // 覆盖原显隐
  playerContainter.setAttribute('ctrl-shown', 'false')

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes[0].classList.contains('bpx-player-ctrl-web')) { // 还可以让控制栏显示作为网页全屏按钮加载的标志事件
        if (video.paused) { showControlWrap() }
        // 点击视频关闭字幕设置
        const subtitleBtn = document.querySelector('.bpx-player-ctrl-subtitle')
        if (subtitleBtn) {
          window.addEventListener('click', event => {
            if (!subtitleBtn.contains(event.target)) { subtitleBtn.dispatchEvent(new MouseEvent('mouseleave')) }
          })
        }
        observer.disconnect()
      }
    })
  })
  observer.observe(bottomRight, { childList: true })

  function hideControlWrap (isEnd) {
    if ((!video.paused && !isBpxStateShow()) || isEnd) {
      playerContainter.setAttribute('ctrl-shown', 'false')
      clearTimeout(hideTimer)
    } else {
      delayHideTimer()
    }
  }

  video.addEventListener('ended', () => { hideControlWrap(true) })

  function showControlWrap () {
    playerContainter.setAttribute('ctrl-shown', 'true')
    delayHideTimer()
  }

  function delayHideTimer () {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(hideControlWrap, 3000)
  }

  // 阻止触摸单击触发 videoArea 的 mousemove 事件而显隐控制栏
  videoWrap.addEventListener('mousemove', event => { event.stopPropagation() })
  controlWrap.addEventListener('mousemove', event => { event.stopPropagation() })

  video.addEventListener('play', delayHideTimer)

  controlWrap.addEventListener('click', event => {
    event.stopPropagation()
    delayHideTimer()
  })

  controlTop.addEventListener('touchstart', delayHideTimer)

  // 单击监听
  videoWrap.addEventListener('click', () => {
    clearTimeout(clickTimer)

    clickTimer = setTimeout(() => {
      isShown() ? hideControlWrap() : showControlWrap()

      if (!GM_getValue('ban-video-click-play', false)) { video.paused ? video.play() : video.pause() } // videoPerch.click()
    }, 250)
  })

  // 双击监听
  videoWrap.addEventListener('dblclick', () => {
    clearTimeout(clickTimer)

    // 双击打开声音
    video.muted = false
    if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }

    isPortrait
      ? document.querySelector('.bpx-player-ctrl-web').click()
      // view 省略时指向当前窗口
      : videoPerch.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
  })

  // 阻止视频响应滑动侧边栏
  // 阻止冒泡只对当前监听器生效，禁止全屏滑动和拖动进度条触发侧边栏。要传递参数或用形参，就要用函数而非引用
  videoArea.addEventListener('touchstart', event => { event.stopPropagation() })
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
    times = Number(GM_getValue('video-longpress-speed', '2'))

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

function setEndingContent () {
  addEndingScale()

  function addEndingScale () {
    const style = Object.assign(document.createElement('style'), {
      id: 'ending-content-scale',
      textContent: `
        .bpx-player-ending-content[screen-mode=little-screen] { transform: scale(calc(${window.innerWidth}/536*0.9)) !important; }
        .bpx-player-ending-content { transform: scale(calc(${window.innerWidth}/710*0.9)) !important; }
        .bpx-player-container[data-screen=full] .bpx-player-ending-content { transform: scale(calc(${window.innerWidth}/952*0.9)) !important; }
      `
    })
    document.head.appendChild(style)
  }

  function renewEndingScale () {
    document.head.querySelector('#ending-content-scale').remove()
    addEndingScale()
  }

  screen.orientation.addEventListener('change', renewEndingScale)
  window.addEventListener('resize', renewEndingScale)
}

// 动态修改播放组件样式
export function modifyShadowDOMLate () {
  let commentsShadow
  let commentsHeaderShadow

  // 初始化动态要获胜 #comment，第一次变化删除.comment增加.comment，第二次添加bili-comments
  const comment = document.getElementById('comment')
  // console.log(comment)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // console.log(mutation.addedNodes, mutation.removedNodes)
      mutation.addedNodes.forEach(node => {
        // console.log(node.nodeType, node.nodeName)
        if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'bili-comments') {
          A()
          observer.disconnect()
        }
      })
    })
  })

  // 开始观察目标元素
  observer.observe(comment, { childList: true, subtree: true })

  function A () {
    commentsShadow = document.querySelector('bili-comments').shadowRoot

    const style1 = Object.assign(document.createElement('style'), {
      textContent: `
      div#contents {
        padding-top: 0;
        left: -30px;
        width: calc(100% + 30px);
      }`
    })
    commentsShadow.appendChild(style1)

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // console.log(mutation.addedNodes, mutation.removedNodes)
        mutation.addedNodes.forEach(node => {
          // console.log(node.nodeType, node.nodeName)
          if (node.nodeType === Node.ELEMENT_NODE && node.id === 'header') {
            B()
            observer.disconnect()
          }
        })
      })
    })

    // 开始观察目标元素
    observer.observe(commentsShadow, { childList: true, subtree: true })
  }

  function B () {
    commentsHeaderShadow = commentsShadow.querySelector('bili-comments-header-renderer').shadowRoot

    // 固定评论栏
    const style2 = Object.assign(document.createElement('style'), {
      textContent: `
      div#commentbox {
        position: fixed;
        left: 0;
        bottom: var(--actionbar-height);
        z-index: 10;
        background: white;
        width: 100%;
        padding: 8px 12px;
        border-top: 1px solid var(--line_regular);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

        transition: calc(var(--actionbar-time)*1.40) ease-in;
        display: var(--commentbox-display);

        /* 由全局变量控制滚动隐藏 */
        transform: var(--shadow-transform)
      }

      /* 评论导航 */
      div#navbar {
        margin-bottom: 0;
      }

      /* 评论顶部广告横条 */
      #notice {
        display: none;
      }`
    })
    commentsHeaderShadow.appendChild(style2)

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // console.log(mutation.addedNodes, mutation.removedNodes)
        mutation.addedNodes.forEach(node => {
          // console.log(node.nodeType, node.nodeName)
          if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'div' && node.classList.contains('bili-comments-bottom-fixed-wrapper')) {
            C()
            observer.disconnect()
          }
        })
      })
    })

    observer.observe(commentsHeaderShadow, { childList: true, subtree: true })
  }

  function C () {
    const commentBoxShadow = commentsHeaderShadow.querySelector('bili-comment-box')?.shadowRoot

    const style3 = Object.assign(document.createElement('style'), {
      textContent: `
      :host {
        display: var(--commentbox-display) !important;
      }

      /* 移除评论头像 */
      div#user-avatar {
          display: none;
      }

      /* 输入块 */
      div#comment-area {
        width: calc(100% - 24px);
      }

      /* 输入块内 */
      div#editor {
        border-radius: 13px;
        padding: 0;
      }`
    })
    commentBoxShadow.appendChild(style3)
  }
}
