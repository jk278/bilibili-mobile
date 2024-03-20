// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-mobile
// @version            2.8
// @description        view bilibili mobile page recommended video directly
// @description:zh-CN  b 站移动端网页推荐视频直接看
// @author             jk278
// @match              *://m.bilibili.com
// @match              *://m.bilibili.com/video/*
// @grant              none
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

(function () {
  'use strict'
  console.log('Bilibili mobile execute!')

  removeAdButton()

  const pathname = window.location.pathname

  if (pathname.startsWith('/video')) {
    customElementStyle()
  }

  waitDOMContentLoaded(() => {
    if (pathname.startsWith('/video')) {
      autoplay()
      preventAutoCallApp()
      removeFullscreenAd()
    } else if (pathname === '/' || pathname === '') {
      runHome()
    }
  })

  // DOM 加载完后
  function waitDOMContentLoaded (callback) {
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback()
  }

  // 阻止点击视频区跳转APP
  function preventAutoCallApp () {
    // 阻止点击视频区跳转APP
    const autoCallApp = document.querySelector('.mplayer-display-call-app')
    autoCallApp.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopImmediatePropagation()
    })

    const playButton = document.querySelector('.mplayer-pause-call-app')
    playButton.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      // 播放监听此时还未被阻止
    })
  }

  // 全屏后，全屏广告元素样式变为 flex !important
  function removeFullscreenAd () {
    // 全屏后跳App的横幅、清晰度按钮、弹幕提示
    document.addEventListener('fullscreenchange', function () {
      const adBanner = document.querySelector('.mplayer-widescreen-callapp')
      const qualityBtn = document.querySelector('.mplayer-control-btn-quality')
      const text = document.querySelector('.mplayer-comment-text')

      adBanner.style.cssText = 'display: none !important;'
      qualityBtn.style.cssText = 'display: none !important;'
      text.style.cssText = 'display: none !important;'

      const commentContent = document.querySelector('.mplayer-btn-comment-content')
      commentContent.style.cssText = 'position: absolute; left: 11px; width: 24px !important;'
    })
  }

  function removeAdButton () {
    const ad1 = '.home-float-openapp, .open-app, .m-nav-openapp, .m-float-openapp, [class^="m-video2-awaken-btn"]'
    // 两个底部出现的弹窗和一个点击播放后的弹窗
    const ad2 = '.openapp-dialog, .caution-dialog, .v-dialog'
    const style = document.createElement('style')
    style.textContent = `${ad1}, ${ad2}{ display: none !important; }`

    // 如果 document.head 可用，将样式添加到文档
    document.head ? document.head.appendChild(style) : waitDOMContentLoaded(document.head.appendChild(style))
  }

  function customElementStyle () {
    // 全屏跳App、倍速按钮、播完推荐
    const css1 = `
    .mplayer-fullscreen-call-app, .mplayer-control-btn-speed, .mplayer-ending-panel-recommend
        { display: none !important; }
    `

    // 优化视觉
    const css2 = `
    /* 调整分集高度 */
    .m-video-part-panel-content { height: 81vmin !important; }
    /* 阻止跳转APP */
    .launch-app-btn { pointer-events: none; }
    .card-box a { pointer-events: auto; }
    /* 重复的初始图形层 */
    .natural-module, .m-footer { display: none !important; }
    `

    // 居中重播按钮
    const css3 = '.mplayer-ending-panel-buttons { align-self: center !important; img { margin-left: 3px !important; } }'

    // 声音按钮
    const unmuteStyle = `
.unmute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    text-transform: uppercase;
    color: #000;
    font-size: 127%;
    font-weight: 500;
    background: none;
    padding: 12px;
    border: 0;
    text-align: inherit;
}
.unmute-inner {
    position: relative;
    width: 100%;
}
.unmute-icon {
    width: 48px;
    height: 48px;
    display: inline-block;
    vertical-align: middle;

    padding-left: 2px;
    position: relative;
    z-index: 10;
    background-color: rgb(255, 255, 255);
    border-radius: 2px;
    border-bottom: 1px solid #f1f1f1;
}
.unmute svg {
    filter: drop-shadow(0 0 2px rgba(0,0,0,.5));
}
.unmute-text {
    position: relative;
    z-index: 10;
    padding-top: 1px;
    padding-right: 10px;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    display: inline-block;

    /* animation: unmute-alpha-anim .25s cubic-bezier(.4,0,1,1) 5.4s reverse forwards; */
    transition: opacity .25s cubic-bezier(.4,0,1,1);
}
.animated .unmute-text {
    opacity: 0;
}
.unmute-box {
    width: 100%;
    display: block;
    background-color: rgb(255, 255, 255);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 2px;
    border-bottom: 1px solid #f1f1f1;

    /* animation: unmute-width-anim .5s cubic-bezier(.4,0,1,1) 5.5s reverse forwards; */
    transition: width .5s cubic-bezier(.4,0,1,1);
}
.animated .unmute-box {
    width: 0;
}
    `

    const style = document.createElement('style')
    style.textContent = css1 + css2 + css3 + unmuteStyle

    // 如果 document.head 可用，将样式添加到文档
    document.head ? document.head.appendChild(style) : waitDOMContentLoaded(document.head.appendChild(style))
  }

  function goToVideoById (keyword, callback) {
    const callbackName = `jsonp_callback_${Date.now()}_${Math.floor(Math.random() * 100000)}`

    window[callbackName] = function (responseData) {
      if (responseData.data.result[11].data[0]) {
        const bvId = responseData.data.result[11].data[0].bvid
        callback(bvId, null)
      } else {
        callback(null, 'BVId not found')
      }
      delete window[callbackName]
    }

    const script = document.createElement('script')
    script.src = `https://api.bilibili.com/x/web-interface/search/all/v2?page=1&keyword=${keyword}&jsonp=jsonp&callback=${callbackName}`
    document.body.appendChild(script)
  }

  function addTargetElementListener (targetElement) {
    if (targetElement) {
      const anchor = targetElement.firstChild
      const h2Element = anchor.lastChild
      const keyword = encodeURIComponent(h2Element.innerHTML)

      anchor.addEventListener('click', event => {
        event.preventDefault()
        event.stopImmediatePropagation()

        goToVideoById(keyword, (bvId, error) => {
          if (bvId) {
            const videoUrl = `https://m.bilibili.com/video/${bvId}`
            window.history.pushState({}, '', videoUrl)
            window.location.href = videoUrl
          } else {
            console.error('BVId wrong: ', error)
          }
        })
      }, true)
    }
    console.log('Execute Video! 添加监听器')
  }

  // 自动播放
  function autoplay () {
    const play = document.querySelector('.main-cover')

    const style = document.createElement('style')
    style.textContent = '.m-navbar + div { display: block !important }'
    document.head.appendChild(style)

    if (play) {
      const video = document.querySelector('video')
      if (video) {
        // 先添加播放监听，第一次播放时执行
        video.addEventListener('play', function () {
          if (video.muted === true) createUnmuteButton()
        }, { once: true })

        const startPlayPromise = video.play()

        if (startPlayPromise !== undefined) {
          startPlayPromise
            .catch((error) => {
              if (error.name === 'NotAllowedError') {
                video.muted = true
                // video.play()
              } else {
                // 处理加载或播放错误
              }
            })
            .then(() => {
              // 仅在播放开始后才开始执行你需要执行的操作。
            })
        }

        // 创建解除静音按钮
        function createUnmuteButton () {
          // 检查是否已存在解除静音按钮
          if (document.getElementById('unmuteButton')) {
            return // 如果已存在，不进行重复创建
          }
          // 创建按钮元素
          const button = document.createElement('button')
          button.classList.add('unmute')
          button.innerHTML = `
<div class="unmute-inner">
    <div class="unmute-icon"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
            <use class="svg-shadow" xlink:href="#ytp-id-1"></use>
            <path class="ytp-svg-fill"
                d="m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"
                id="id-1"></path>
        </svg></div>
    <div class="unmute-text">点按取消静音</div>
    <div class="unmute-box"></div>
</div>
          `
          // 按钮点击事件
          button.addEventListener('click', function () {
            video.muted = false
            button.remove()
          })

          // 将按钮添加到页面的合适位置
          const videoWrapper = document.querySelector('.mplayer-video-wrap')
          videoWrapper.insertAdjacentElement('afterend', button)
          // 第一个参数是函数，而非调用函数的结果
          setTimeout(() => {
            button.classList.add('animated')
          }, 4500)
        }
      }
    }

    observeCardBox()
  }

  // 观察推荐视频的加载
  function observeCardBox () {
    const cardBox = document.querySelector('.card-box')
    const targetElements = cardBox.children

    // 为初始子元素添加监听器
    Array.from(targetElements).forEach(addTargetElementListener)

    // 创建 MutationObserver 以监听子元素的变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((addedNode) => {
            addTargetElementListener(addedNode)
          })
        }
      })
    })

    // 配置观察选项
    const observerConfig = {
      childList: true
    }

    // 开始观察
    observer.observe(cardBox, observerConfig)
  }

  function addHomeTargetElementListener (tag) {
    tag.addEventListener('click', async (event) => { // 异步，然后放到 js 末尾执行
      event.preventDefault() // 阻止默认行为
      // event.stopPropagation(); // 阻止事件冒泡
      event.stopImmediatePropagation() // 阻止其他事件监听器的执行
      console.log('test href: ', tag.getAttribute('href'))

      // 等待下一个事件循环迭代
      await new Promise((resolve) => setTimeout(resolve, 0)) // THIS!
      window.location.href = tag.getAttribute('href')
    }, true)
  }

  function runHome () {
    // observeHomeCardBox
    const cardBox = document.querySelector('.card-box')
    const aTags = cardBox.children

    Array.from(aTags).forEach(addHomeTargetElementListener)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((addedNode) => {
            addHomeTargetElementListener(addedNode)
          })
        }
      })
    })

    const observerConfig = {
      childList: true
    }

    observer.observe(cardBox, observerConfig)

    console.log('Execute Home!')
  }
})()
