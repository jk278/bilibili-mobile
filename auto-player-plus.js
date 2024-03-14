// ==UserScript==
// @name         Auto Player Plus on dmttang.com
// @name:zh-CN   自动播放增强
// @namespace    https://github.com/jk278/auto-player-plus
// @version      3.0
// @description  Automatically skip intro/outro and play next episode on a video site
// @description:zh-CN  自动跳过片头和片尾，自动播放下一集，跳过插片广告，针对网站：https://www.dmttang.com
// @author       jk278
// @match        https://www.dmttang.com/vodplay/*
// @match        https://www.agedm.org/play/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  // 初始化时间节点
  const introDuration = localStorage.getItem('introDuration') || -0.1
  const outroDuration = localStorage.getItem('outroDuration') || -0.1
  const adStart = localStorage.getItem('adStart') || -0.1
  const adEnd = localStorage.getItem('adEnd') || -0.1

  // 存储在对象中
  const vars = {}
  vars.introDuration = introDuration
  vars.outroDuration = outroDuration
  vars.adStart = adStart
  vars.adEnd = adEnd

  // Pin all the needed styles
  const style = document.createElement('style')
  style.innerHTML = `
body.full {
    overflow: hidden;
}
body.full iframe {
    position: fixed !important;
    z-index: 111;
}

#settings-button {
    position: fixed;
    left: 0;
    top: 50%;  
    transform: translateY(-50%);
    background-color: inherit;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
    border-bottom: 2px solid #666;
    outline: none;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 0 24px 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: currentColor;
    color: #666;
    z-index: 1;
    transition: transform 0.1s linear; /* 过渡属性设置为 transform，持续时间为 0.2 秒，缓和函数为 ease-in */
    animation: fadeIn 1s ease-in forwards; /* 动画属性设置为 fadeIn，持续时间为 1 秒，缓和函数为 ease-in，只播放一次，保留最后一帧的状态 */
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
#settings-button:hover, #settings-button.hover {
    transform: translateY(-50%) scale(1.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
#settings-button:hover #hour-hand, #settings-button.hover #hour-hand {
    animation: rotate-hour 18s linear infinite;
    transform-origin: 50% 50%;
}
@keyframes rotate-hour {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
#settings-button:hover #minute-hand, #settings-button.hover #minute-hand {
    animation: rotate-minute 3s linear infinite;
    transform-origin: 50% 50%;
}
@keyframes rotate-minute {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
#settings-button svg {
    width: 32px;
    height: 32px;
}

#settings-panel {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: inherit;
    border-top: 1px solid #666;
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
    border-radius: 0 10px 10px 0;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 112;
    transition: transform 0.6s linear;
}
#settings-panel.hide {
    transform: translateY(-50%) translateX(-100%);
}
#settings-panel .time {
    text-align: center;
    border: 1px solid #666;
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.5);
    border-radius: 0.8em;
    margin: 5px 0;
}
#settings-panel input {
    width: 100px;
    border: 1px solid #666;
    border-radius: 0.8em;
    margin: 5px 0;
    appearance: textfield;
    text-align: center;
    color: gray;
}
#settings-panel input::placeholder {
    text-align: center;
}
#settings-panel .button-wrapper {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#settings-panel .confirm, #settings-panel .info, #settings-panel .cancel {
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.5);
    height: auto;
    aspect-ratio: 1 / 1;
}
#settings-panel .confirm {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
        animation: translate-rotate 0.3s linear infinite;
    }
}
@keyframes translate-rotate {
    0%, 100% { transform: translateX(-50%) rotate(0deg); }
    25% { transform: translateX(-50%) rotate(15deg); }
    75% { transform: translateX(-50%) rotate(-15deg); }
}
#settings-panel .confirm svg {
    width: 24px;
    height: 24px;
}
#settings-panel .info, #settings-panel .cancel {
    &:hover {
        animation: rotate 0.3s linear infinite;
    }
}
@keyframes rotate {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    75% { transform: rotate(-15deg); }
}
#settings-panel .info {
    float: left;
}
#settings-panel .info svg, #settings-panel .cancel svg {
    width: 19px;
    height: 19px;
}
#settings-panel .cancel {
    float: right;
}
#settings-panel .tooltip {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: inherit;
    background-color: inherit;
    padding: 5px;
    border: 1px solid #666;
    border-radius: 5px;
    display: none;
    font-size: 0.8em;
}
`
  document.head.appendChild(style)

  const iframe = document.getElementsByClassName('embed-responsive-item')[0]
  const iframeDocument = iframe.contentWindow.document

  function init () {
    // 初始化页面全屏状态（通过 sessionStorage）
    let tooltipNeedChange = false
    if (sessionStorage.getItem('pageFullScreen') === 'true') {
      document.body.classList.add('full')
      iframeDocument.body.style.cursor = 'none'
    }

    // iframeDocument 已加载
    iframe.onload = function () {
      handleVideo()
      handlePageFullScreen()
      createSettingsPanel()
      forwardKeyboardEventsToIframe()

      // 初始化页面全屏的后续：修改按钮的 tooltip
      if (tooltipNeedChange) {
        const pageFullScreenButton = iframeDocument.getElementById('pagefull-switch')
        pageFullScreenButton.setAttribute('tooltip', '退出网页全屏')
        tooltipNeedChange = false
      }
    }
  }

  // 函数：视频进度
  function handleVideo () {
    const videoElement = iframeDocument.querySelector('video')

    // 监听视频加载事件
    videoElement.addEventListener('loadedmetadata', function () {
      // 获取视频总时长
      const totalDuration = this.duration

      // 跳过片头
      this.currentTime = introDuration

      // 监听视频播放进度
      this.addEventListener('timeupdate', function () {
        // 在 JavaScript 中，当使用 `+` 运算符时，如果其中一个操作数是字符串，那么另一个操作数也将被转换为字符串
        const finalOutroDuration = outroDuration >= 0 ? outroDuration : totalDuration + parseFloat(outroDuration)

        if (this.currentTime >= finalOutroDuration) {
          this.pause()
          playNextEpisode()
        } else if (adStart <= this.currentTime && this.currentTime < adEnd) {
          // 不支持 adStart <= this.currentTime < adEnd，会先前两者进行比较，所得布尔值结果再和末者比较
          this.currentTime = adEnd
        }
      })

      // 因为传递事件不能跨 JS 文件，所以重写部分按键
      const fullScreenButton = iframeDocument.getElementById('full-switch')
      const skipSeconds = 5
      iframeDocument.addEventListener('keydown', function (event) {
        switch (event.key.toLowerCase()) {
          case 'f':
            fullScreenButton.click()
            break
          case 'arrowleft':
            videoElement.currentTime -= skipSeconds
            showFooter()
            break
          case 'arrowright':
            videoElement.currentTime += skipSeconds
            showFooter()
            break
          case ' ':
            if (videoElement.paused) {
              videoElement.play()
            } else {
              videoElement.pause()
            }
            showFooter()
            break
        }
      })
      const mplayerFooter = iframeDocument.getElementById('mplayer-footer')
      function showFooter () {
        mplayerFooter.classList.add('show')
        setTimeout(() => {
          mplayerFooter.classList.remove('show')
        }, 3000)
      }
    })

    function playNextEpisode () {
      // 获取当前页面URL
      const currentUrl = window.location.href
      console.log(currentUrl)

      // 使用正则表达式提取数字
      const match = currentUrl.match(/-(\d+)(?=\.html\b)/)
      console.log('Regular expression match:', match)
      if (match) {
        const episodeNumber = parseInt(match[1], 10)
        console.log('Episode number:', episodeNumber)

        // 增加一集数
        const nextEpisodeNumber = episodeNumber + 1

        // 构建下一集的URL
        const nextPageUrl = currentUrl.replace(/-(\d+)(?=\.html\b)/, `-${nextEpisodeNumber}`)

        // 打开新的页面或者替换当前页面为下一集
        window.location.href = nextPageUrl
      } else {
        console.log('Regular expression did not match the current URL')
      }
    }
  }

  // 函数：页面全屏
  function handlePageFullScreen () {
    // 显示页面全屏按键
    const pageFullScreenButton = iframeDocument.getElementById('pagefull-switch')
    pageFullScreenButton.style.cssText = 'display: block !important;'

    // 为页面全屏键添加点击监听
    pageFullScreenButton.addEventListener('click', function () {
      togglePageFullScreen()
    })

    // 为页面全屏添加键盘监听：P
    iframeDocument.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() === 'p') {
        pageFullScreenButton.click()
      }
    })

    // 切换页面全屏（通过 sessionStorage）
    function togglePageFullScreen () {
      return sessionStorage.getItem('pageFullScreen') === 'true' ? exitPageFullScreen() : enterPageFullScreen()
    }

    // 开启页面全屏
    function enterPageFullScreen () {
      document.body.classList.add('full')
      pageFullScreenButton.setAttribute('tooltip', '退出网页全屏')
      hideMouse()
      sessionStorage.setItem('pageFullScreen', 'true')
    }

    // 关闭页面全屏
    function exitPageFullScreen () {
      document.body.classList.remove('full')
      pageFullScreenButton.setAttribute('tooltip', '网页全屏')
      showMouse()
      sessionStorage.setItem('pageFullScreen', 'false')
    }

    // 显示鼠标
    function showMouse () {
      iframeDocument.body.style.cursor = 'default'
    }

    // 隐藏鼠标
    function hideMouse () {
      iframeDocument.body.style.cursor = 'none'
    }

    // 页面全屏时，鼠标闲时隐藏
    (function () {
      // 避免连续操作创建多个计时器，从而导致内存泄漏
      let mouseEventTimer

      function resetMouseEventTimer () {
        showMouse()
        clearTimeout(mouseEventTimer)
        mouseEventTimer = setTimeout(hideMouse, 3500)
      }

      iframeDocument.addEventListener('mousemove', resetMouseEventTimer)
      iframeDocument.addEventListener('click', resetMouseEventTimer)
    })()
  }

  // 函数：设置面板
  function createSettingsPanel () {
    // 创建设置按钮
    const settingsPanelToggleBtn = document.createElement('button')
    settingsPanelToggleBtn.id = 'settings-button'
    settingsPanelToggleBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="32px" height="32px">
    <circle style="fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;" cx="16" cy="16" r="11"/>
    <line id="minute-hand" x1="16" y1="17" x2="16" y2="8" style="fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;"/>
    <line id="hour-hand" x1="15" y1="16" x2="22" y2="16" style="fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;"/>
</svg>
        `

    // 创建设置面板
    const settingsPanel = document.createElement('div')
    settingsPanel.id = 'settings-panel'
    settingsPanel.classList.add('hide')

    // 为按钮添加监听        当 display: none 时，元素不会渲染，但仍可以获取到它的样式
    // 对屏幕外元素，浏览器会自动优化渲染；有时将 display 设为 none 反而会强制浏览器重新计算布局，并在显隐时重绘页面
    settingsPanelToggleBtn.addEventListener('click', () => {
      settingsPanel.classList.toggle('hide')
    })

    // 将按钮插入 document
    document.body.insertBefore(settingsPanelToggleBtn, document.body.firstChild)

    // 为按钮添加键盘监听：S，模拟鼠标悬浮
    iframeDocument.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() === 's') {
        settingsPanelToggleBtn.classList.add('hover')
      }
    })
    iframeDocument.addEventListener('keyup', function (event) {
      if (event.key.toLowerCase() === 's') {
        // 触发鼠标点击事件
        settingsPanelToggleBtn.click()
        setTimeout(() => {
          settingsPanelToggleBtn.classList.remove('hover')
        }, 200)
      }
    })

    // 创建显示当前时间的元素
    const currentTimeDisplay = document.createElement('div')
    currentTimeDisplay.classList.add('time')
    updateCurrentTime() // 初始化时调用一次
    setInterval(updateCurrentTime, 1000) // 每秒更新一次

    function updateCurrentTime () {
      const now = new Date()
      currentTimeDisplay.textContent = `${now.getHours()} : ${now.getMinutes()}`
    }

    settingsPanel.appendChild(currentTimeDisplay)

    // 创建 4 个 input 元素
    const inputElements = [
      { id: 'introDuration', placeholder: '正片头' },
      { id: 'outroDuration', placeholder: '正片尾' },
      { id: 'adStart', placeholder: '广告头' },
      { id: 'adEnd', placeholder: '广告尾' }
    ]

    let introInput, outroInput, adStartInput, adEndInput

    inputElements.forEach(({ id, placeholder }) => {
      const input = document.createElement('input')
      input.type = 'number'
      input.placeholder = placeholder
      // console.log(vars[id], vars[id].type)
      input.value = Number(vars[id]) === -0.1 || 0 ? '' : vars[id]
      // console.log(input.value, input.type)
      settingsPanel.appendChild(input)

      // Assign the input field to the corresponding variable
      switch (id) {
        case 'introDuration':
          introInput = input
          break
        case 'outroDuration':
          outroInput = input
          break
        case 'adStart':
          adStartInput = input
          break
        case 'adEnd':
          adEndInput = input
          break
      }
    })

    // 创建确认按钮和监听
    const confirmBtn = document.createElement('button')
    confirmBtn.classList.add('confirm')
    confirmBtn.innerHTML = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="3"/>
    <path d="M30 55 L45 70 L70 30" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        `
    confirmBtn.addEventListener('click', () => {
      const inputFields = [
        { input: introInput, key: 'introDuration' },
        { input: outroInput, key: 'outroDuration' },
        { input: adStartInput, key: 'adStart' },
        { input: adEndInput, key: 'adEnd' }
      ]

      inputFields.forEach(({ input, key }) => {
        // 假值：false、null、undefined、0、NaN、空字符串 ""
        const value = parseFloat(input.value) || -0.1
        vars[key] = value
        localStorage.setItem(key, value)
        input.value = Number(input.value) === 0 ? '' : input.value
      })

      settingsPanel.classList.add('hide')
    })

    // 创建取消按钮和监听
    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('cancel')
    cancelBtn.innerHTML = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="4"/>
    <path d="M32 32 L68 68 M32 68 L68 32" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
</svg>
        `
    cancelBtn.addEventListener('click', () => {
      const inputFields = [
        { input: introInput, key: 'introDuration' },
        { input: outroInput, key: 'outroDuration' },
        { input: adStartInput, key: 'adStart' },
        { input: adEndInput, key: 'adEnd' }
      ]

      inputFields.forEach(({ input, key }) => {
        input.value = Number(vars[key]) === -0.1 || 0 ? '' : vars[key]
      })

      settingsPanel.classList.add('hide')
    })

    // 创建 info 按钮
    const infoBtn = document.createElement('button')
    infoBtn.classList.add('info')
    infoBtn.innerHTML = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="4"></circle>
    <path d="M50 45 L50 75 M49 25 L51 25 M49 27 L51 27" stroke="currentColor" stroke-width="8" stroke-linecap="round"></path>
</svg>
        `

    // 创建一个容器，用于包含确认、取消和 info 按钮
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-wrapper')
    buttonContainer.appendChild(confirmBtn)
    buttonContainer.appendChild(infoBtn)
    buttonContainer.appendChild(cancelBtn)

    // 创建提示块
    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    tooltip.innerHTML = `
        提示：<br>
        1. 单位：秒，片尾填负数表示倒着数<br>
        2. 按 P、F11，下一集即可自动全屏<br>
        3. 按 S 打开设置
        `

    // 为 span 元素添加鼠标悬浮事件监听器
    infoBtn.addEventListener('mouseover', () => {
      tooltip.style.display = 'block'
    })
    infoBtn.addEventListener('mouseout', () => {
      tooltip.style.display = 'none'
    })

    // 将元素插入到面板中
    settingsPanel.appendChild(tooltip)
    settingsPanel.appendChild(buttonContainer)

    // 将面板插入 document（不返回面板元素）
    document.body.insertBefore(settingsPanel, document.body.firstChild)
  }

  // 函数：传递键盘监听到 iframe
  function forwardKeyboardEventsToIframe () {
    document.addEventListener('keydown', function (event) {
      if (['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        event.preventDefault()
      }

      // 创建一个新的键盘事件
      const keyEvent = new KeyboardEvent('keydown', {
        key: event.key,
        code: event.code,
        bubbles: true
      })

      // 将键盘事件传递到 iframeDocument 中，只对当前 JS 文件生效，且只能传递已注册的按键事件。
      iframeDocument.dispatchEvent(keyEvent)
    })

    document.addEventListener('keyup', function (event) {
      const keyEvent = new KeyboardEvent('keyup', {
        key: event.key,
        code: event.code,
        bubbles: true
      })

      iframeDocument.dispatchEvent(keyEvent)
    })
  }

  // 确保DOM加载完成后再处理视频元素
  console.log('Document ready state: ', document.readyState)
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    console.log('DOM is ready, calling init')
    init()
  } else {
    console.log('DOM is not ready, adding event listener')
    document.addEventListener('DOMContentLoaded', init)
  }
})()
