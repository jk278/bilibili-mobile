// ==UserScript==
// @name               Bilibili PC to Mobile
// @name:zh-CN         bilibili 移动端（桌面版）
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            3.0
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  在手机上看 b 站桌面版网页
// @author             jk278
// @license            MIT
// @match              *://www.bilibili.com/*
// @grant              none
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

// @grant none 表现全局作用域运行，而不在隔离沙盒内使用特定 API

/**
 * 使用此脚本，需在手机上打开电脑版网页 www.bilibili.com，且已完成初始配置：
 * Via 等轻浏览器 修改网站独立 UA 为 Windows 或 MacOS，但不要开电脑模式
 * Firefox for Android 下载扩展 Header Editor 并添加两条规则：
    ① 修改请求头 ------ 域名 ------ << 匹配规则 >> ------ 名称 : user-agent ------ 内容 : Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0
    ② 其中，规则一 : www.bilibili.com；规则二 : upos-sz-mirrorali.bilivideo.com
 * Safari 浏览器 直接打开电脑模式即可
 */

(function () {
  'use strict'
  console.log('Bilibili mobile execute!')

  // const _unsafeWindow = /* @__PURE__ */ (() => typeof window !== 'undefined' ? window : undefined)() // 立即执行表达式只调用一次
  // 变量提升机制: 重新声明 window 会替代整个作用域内的 widow，但初始化前无法使用

  initViewport()
  initElementStyle()

  controlHeaderImage()

  waitDOMContentLoaded(() => {
    controlHeaderClick()
    if (window.location.pathname.startsWith('/video')) {
      addPlaysInline()
      controlSidebar()
      scrollToHidden()
    }

    controlSearchbar()

    if (window.location.pathname === '/') {
      increaseVideoLoadSize()
    }
  })

  // DOM 加载完后
  function waitDOMContentLoaded (callback) {
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback()
  }

  function initViewport () {
    if (document.head) {
      const viewport = document.createElement('meta')
      viewport.setAttribute('name', 'viewport')
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
      document.head.appendChild(viewport)
    }
  }

  function addPlaysInline () {
    const videoElement = document.querySelector('.bpx-player-video-wrap>video')
    // 新添加了路径判断，此处预留
    if (videoElement) videoElement.playsInline = true
  }

  function controlSidebar () {
    const rightContainer = document.querySelector('.right-container')
    const toggleSidebar = document.createElement('div')
    toggleSidebar.id = 'toggleSidebar'
    toggleSidebar.innerHTML = `
    <svg width="50" height="50" viewBox="0 0 50 50">
        <line id="line-1" x1="25" y1="5" x2="25" y2="25" />
        <line id="line-2" x1="25" y1="45" x2="25" y2="25" />
    </svg>
          `

    toggleSidebar.addEventListener('click', function () {
      if (!toggleSidebar.classList.contains('arrow')) {
        toggleSidebar.classList.add('arrow')
        rightContainer.classList.add('show')
      } else {
        closeSidebar()
      }
    })

    function closeSidebar () {
      toggleSidebar.classList.remove('arrow')
      rightContainer.classList.remove('show')
    }

    // 若作为两个分列的兄弟元素加入，就会影响页面布局
    document.body.appendChild(toggleSidebar)

    const backdrop = document.querySelector('.left-container') // 伪元素的真实元素
    backdrop.addEventListener('click', closeSidebar)
    // 只能传递函数引用，不能传递函数执行结果，或 () => { closeSidebar() }
    // event.stopPropagation() 阻止目标子元素的点击事件默认冒泡到父元素

    // popstate（历史记录），hashchange（改 URL 非历史记录）监听不到
    const recommendLiist = document.getElementById('reco_list')
    recommendLiist.addEventListener('click', event => {
      const nextPlay = document.querySelector('.rec-title')
      nextPlay.contains(event.target) || closeSidebar()
    }
    )
  }

  function controlSearchbar () {
    const searchbarBtn = document.createElement('div')
    searchbarBtn.id = 'search-fab'
    searchbarBtn.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z" fill="currentColor"></path></svg>
      `
    searchbarBtn.addEventListener('click', () => {
      const searchbar = document.querySelector('.center-search-container')
      searchbar.classList.add('show')
      const input = searchbar.querySelector('input')
      input.focus()

      input.addEventListener('blur', () => {
        searchbar.classList.remove('show')
      })
    })
    document.body.appendChild(searchbarBtn)
  }

  // 接管顶部点击事件，父元素point-events:none，子元素point-events:auto对有的手机无效
  function controlHeaderClick () {
    const overlay = document.createElement('div')
    overlay.id = 'overlay'
    document.body.appendChild(overlay)
    overlay.addEventListener('click', handleClick)

    let storedElement = null
    let isMouseEntered = false
    let clickTimer = null
    let clickCount = 0

    function handleClick (event) {
      clickCount++

      if (clickTimer) {
        clearTimeout(clickTimer)
        clickTimer = null
      }

      if (clickCount === 1) {
        clickTimer = setTimeout(function () {
          // 如果 100ms 内没有第二次点击，则执行操作 A
          onceClick()
          clickCount = 0
        }, 250)
      } else {
        // 如果 100ms 内有第二次点击，则执行操作 B
        twiceClick()
        clickCount = 0
      }

      function onceClick () {
        if (isMouseEntered) {
          simulateMouseLeave(storedElement)
          isMouseEntered = false
        } else {
          overlay.style.display = 'none'
          const element = document.elementFromPoint(event.clientX, event.clientY)
          simulateMouseEnter(element)
          overlay.style.display = 'block'
          isMouseEntered = true
          storedElement = element
        }
      }

      function twiceClick () {
        overlay.style.display = 'none'
        const element = document.elementFromPoint(event.clientX, event.clientY)
        simulateClick(element)
        overlay.style.display = 'block'
      }
    }

    function simulateMouseEnter (element) {
      const event = new MouseEvent('mouseenter', { bubbles: true, view: window })
      element.dispatchEvent(event)
    }

    function simulateMouseLeave (element) {
      const event = new MouseEvent('mouseleave', { bubbles: true, view: window })
      element.dispatchEvent(event)
    }

    function simulateClick (element) {
      const event = new MouseEvent('click', { bubbles: true, view: window })
      element.dispatchEvent(event)
    }
  }

  function controlHeaderImage () {
    const key = 'header-image'
    const url = 'https://source.unsplash.com/random/840x400'
    const elementSelector = '.bili-header__banner'

    if (window.location.pathname === '/') {
      loadImage(key, elementSelector)

      setTimeout(async () => {
        try {
          const img = await getImage(url)
          const base64Data = imageToBase64(img)
          storeImage(key, base64Data)
        } catch (error) {
          console.error('Failed to get image:', error)
        }
      }, 5000)
    }

    function getImage (url) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = url
        img.onload = () => resolve(img)
        img.onerror = reject
      })
    }

    function imageToBase64 (img) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      return canvas.toDataURL('image/jpeg')
    }

    function storeImage (key, base64Data) {
      localStorage.setItem(key, base64Data)
    }

    function loadImage (key, elementSelector) {
      const base64Data = localStorage.getItem(key)
      if (base64Data) {
        const style = document.createElement('style')
        style.innerHTML = `
          ${elementSelector}::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-image: url(${base64Data});
            background-size: cover;
            background-position: center;
          }
        `
        document.head.appendChild(style)
      } else {
        // 如果本地存储中不存在图片数据，则从 URL 中获取图片
        getImage(url).then(img => {
          const base64Data = imageToBase64(img)
          storeImage(key, base64Data)
          loadImage(key, elementSelector)
        }).catch(error => {
          console.error('Failed to get image:', error)
        })
      }
    }
  }

  function increaseVideoLoadSize () {
    const origFetch = window.fetch
    window.fetch = function (input, init) {
      if (typeof input === 'string' && input.includes('api.bilibili.com') && input.includes('feed/rcmd') && init.method.toUpperCase() === 'GET') {
        input = input.replace('&ps=12&', '&ps=30&')
      }
      return origFetch(input, init)
    }

    const css = `
      /* 扩增载入后产生的骨架空位 */
      .floor-single-card:has(.skeleton, .skeleton-item) {
        display: none;
      }
    `
    const style = document.createElement('style')
    style.innerHTML = css
    document.head.appendChild(style)
  }

  function scrollToHidden () {
    const leftContainer = document.querySelector('.left-container')

    let lastScrollTop = 0
    const scrollThreshold = 100 // 滚动距离阈值

    window.addEventListener('scroll', () => {
      const currentScrollTop = window.scrollY
      if ((currentScrollTop - lastScrollTop) > scrollThreshold) {
        leftContainer.classList.add('scroll-hidden')
        lastScrollTop = currentScrollTop
      } else if ((currentScrollTop - lastScrollTop) < -scrollThreshold ||
       currentScrollTop === 0) {
        leftContainer.classList.remove('scroll-hidden')
        lastScrollTop = currentScrollTop
      }
    })
  }

  function initElementStyle () {
    /* css */
    const initialInsertStyle = `
/* ----------------------------------------------------
* ---------------------------------------------------- *
* ----------------------- 首页 ----------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

 body {
  /* 避免评论未加载时显示灰色 */
  background: white !important;

  /* 添加透明 animation 为 Via 预留加载 initViewport 的时间后，刷新加载出现白屏 */

  --header-height: 48px;
}

/* 顶栏点击遮罩层 */
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: transparent;
  z-index: 1002;
}

/* 双列视频 */
.recommended-container_floor-aside .container {
  grid-template-columns: repeat(2, 1fr) !important;
  padding: 5px;
  grid-gap: 5px !important;
  background: #f1f2f3;
}

/* 头图底色 */
.bili-header__banner {
  background-color: #f1f2f3 !important;
}

/* 显示根据屏宽隐藏的 feed */
.container>.feed-card {
  display: block !important;
}

/* 最小宽度（body、顶栏） */
body,
.bili-header,
.bili-header__banner {
  min-width: 0 !important;
}

/* 主页视频流 */
.bili-feed4-layout {
  width: 100% !important;
}

/* 顶栏边距（右边距减去头像右空隙） */
.bili-header__bar {
  padding: 0 10px 0 15px !important;
}

/* 顶栏高度 */
.bili-header .bili-header__bar {
  height: var(--header-height) !important;
}

/* 视频页顶栏高度 */
.header-v3 div#biliMainHeader,
.header-v3 #biliMainHeader .bili-header .mini-header {
  height: var(--header-height) !important;
}

/* 顶部按钮高度 */
.entry-title,
.right-entry,
.mini-header__logo {
  max-height: var(--header-height);
}

.left-entry__title {
  height: var(--header-height) !important;
}

/* 头像高度 */
.v-popover-wrap.header-avatar-wrap {
  height: var(--header-height) !important;
}

/* 顶栏高度补偿：HTML初始加载的顶栏高度留空，若修改则局部跳动，
   视频页非 fixed 布局，提前减去变化后的差值，而不修改顶栏外框 */

/* 不影响结果 */
#biliMainHeader .bili-header {
  min-height: var(--header-height);
  height: var(--header-height);
}

/* 搜索框 */
.center-search-container {
  position: absolute !important;
  width: 100%;
  left: 0;
  top: 0;
  padding: 10px 20px 5px !important;
  z-index: 3;
  margin: 0 !important;
  display: none;
}

.center-search-container.show {
  display: block;
}

.left-entry {
  min-width: 0;
  margin: 0 !important;
}

/* 顶栏右侧图标 */
.right-entry {
  flex: 1;
  min-width: 0;
  margin: 0 !important;
  justify-content: space-evenly;
}

.right-entry>* {
  animation: fadeIn 1s ease-in;
}

/* 头像图表边距 */
.header-avatar-wrap {
  padding-right: 0 !important;
}

/* 禁止换行 */
.left-entry__title,
.dm.item {
  white-space: nowrap;
}

/* 头像置右 */
.v-popover-wrap.header-avatar-wrap {
  order: 5;
  margin-left: auto;
}

/* 剩余元素均分 */
.v-popover-wrap:not(.header-avatar-wrap) {
  flex: 1;
}

/* 肉眼个别微调 */
.right-entry--message {
  padding-left: 3px;
}

/* 顶栏元素间距 */
.left-entry__title {
  margin-right: 0px !important;
}

/* 与头像左空隙对齐 */
.mini-header__logo {
  margin-right: 7px !important;
}

/* 禁用主题色重载 */
svg.mini-header__logo path {
  fill: var(--brand_blue) !important;
}

/* 移除“首页”字样 */
.mini-header__title {
  display: none !important;
}

/* 移除顶部动图和临时静图 */
.animated-banner,
#bili-header-banner-img {
  display: none !important;
}

/* 使用 controlHeaderImage 获取随机头图 */

.biliheader__banner {
  display: none !important;
}

/* -------------------------------------------------- 
 ---------------------- 展开图类 --------------------- 
 -------------------------------------------------- */

.v-popover {
  position: fixed !important;
  top: var(--header-height) !important;
  margin: 0 !important;
  max-width: 100%;
  padding: 5px !important;
}

/* 分类(左侧入口)展开图 */
.channel-panel__column {
  width: 100% !important;
  flex: 1;
  padding: 0 !important;
}

/* 右侧入口展开图 */
.dynamic-panel-popover,
.favorite-panel-popover,
.history-panel-popover {
  max-width: 100%;
  padding: 0 5px !important;
}

/* 动态展开图 */
.dynamic-video-item {
  margin-right: 0 !important;
}

.header-dynamic-list-item {
  padding: 0 !important;
}

.header-dynamic__box--center {
  max-width: 60%;
}

.header-dynamic__box--right {
  top: 0 !important;
  margin-bottom: 0 !important;
  width: unset !important;
  flex: 1;

  .cover {
      width: unset !important;
      height: unset !important;
  }
}

/* 收藏展开图 */
.favorite-panel-popover__nav {
  max-width: 25%;
}

.header-fav-card__image {
  max-width: 40%;

  picture {
      max-width: 100%;
      height: 100% !important;
  }
}

/* 间距（收藏展开图） */
.favorite-panel-popover__nav .tab-item {
  padding: 0 6px !important;
}

.header-fav-card {
  padding: 6px !important;
}

.favorite-panel-popover__nav {
  margin-top: 6px !important;
}

/* 历史展开图 */
.header-history-video {
  padding: 5px 10px !important;
}

/* 移除头像大图 */
.header-entry-avatar {
  display: none !important;
}

/* 关闭头像动画 */
.header-entry-mini {
  animation: unset !important;
}

/* 移除次要入口 */
.left-entry>li:not(:nth-of-type(1)),
.vip-wrap,
.right-entry-item:has(>.vip-wrap),
.right-entry-item:nth-of-type(6),
.right-entry-item--upload,
.header-channel,
.bili-header__channel,
.recommended-swipe,
.feed-roll-btn {
  display: none !important;
}

/* 广告、推广图块 */
/* 底部登录弹窗类 .lt-row 可能包含其它元素 */
/* 首页顶部动图上的大 Logo */
.container>*:has(.bili-video-card__info--ad),
.floor-single-card,
.desktop-download-tip,
.lt-row,
.header-banner__inner {
  display: none !important;
}

/* ----------------------------------------------------
* ---------------------- 视频卡片 -------------------- *
 ----------------------------------------------------- */

.container>* {
  margin-top: 0 !important;
}

/* 卡片底板 */
.bili-video-card__wrap {
  border-radius: 5px;
}

/* 封面宽长比 */
.bili-video-card.is-rcmd {
  --cover-radio: 75% !important;
}

/* 封面圆角 */
.v-img.bili-video-card__cover {
  border-radius: 5px 5px 0 0;
}

/* 封面信息（阴影层圆角） */
.bili-video-card__stats {
  border-radius: 0 !important;
  --icon-size: 16px;
  --subtitle-font-size: 11px;
  white-space: nowrap;
}

/* 卡片标题 - 字样 */
.bili-video-card__info--tit {
  --title-padding-right: 0;
  --title-font-size: 14px;
  --title-line-height: 20px;
}

/* 标题 - 上下距 */
/* .bili-video-card__info  */

/* 标题 - 左右距 */
.bili-video-card__info--right {
  padding: 0 5px;
}

/* 标题 - 字重 */
/* .bili-video-card__info--tit > a */

/* 小标 */
.bili-video-card__info--bottom {
  --subtitle-font-size: 12px;
}

.bili-video-card__info--icon-text {
  padding: 0 5px !important;
}

/* 小标 - 日期 */
.bili-video-card__info--owner {
  flex: 1;
}

.bili-video-card__info--date {
  margin-left: auto !important;
}

/* 小标 - 点赞数 */
.bili-video-card__info--icon-text {
  --follow-icon-font-size: 11px;
  --follow-icon-line-height: 15px;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* --------------------- 视频详情页 -------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* 主应用块 */
#app {
  overflow: hidden;
}

/* 主体内容块 */
.video-container-v1 {
  min-width: 0 !important;
  padding: 0 !important;
}

/** --------------------------------------------------------
 * ---------------------- 主视频块 -------------------------
 * ---------------------------------------------------------
 */

/* 主视频块(视频高度) */
.left-container {
  /* 注意：所加高度为弹幕行 */
  --video-height: calc(100vw * 0.5625);
}

/* 视频块（宽度） */
.left-container {
  /* 移动 Safari 百分比宽高自动考虑边框和填充 */
  padding: var(--video-height) 10px 0;
  box-sizing: border-box;
  width: 100% !important;
}

/** --------------------------------------------------------
 * ----------------------- 播放器 --------------------------
 * ---------------------------------------------------------
 */

/* 移除播放器固定尺寸 */
#bilibili-player {
  height: 100% !important;
  width: 100% !important;
}

/* 固定视频（覆盖原宽度） */
#playerWrap {
  position: fixed;
  left: 0;
  top: var(--header-height);
  width: 100vw;
  height: var(--video-height) !important;
  z-index: 75;
}

/* 小窗时的隐藏 - 始终隐藏 */
.bpx-player-top-wrap,
.bpx-player-state-wrap,
.bpx-player-toast-wrap, {
  display: none !important;
}

/* 小窗时的暂停按钮 */
.bpx-player-mini-warp {
  display: none !important;
}

/* 小窗时的位置移动（宽度相比 fixed 减去了滚动条） */
.bpx-player-container[data-screen=mini] {
  top: var(--header-height);
  left: 50%;
  transform: translateX(-50%);
  width: 100% !important;
  height: var(--video-height) !important;
}

/* 移除小窗等按钮 */
.fixed-sidenav-storage>*:nth-child(1),
.fixed-sidenav-storage>*:nth-child(2) {
  display: none !important;
}

/* 播放器控制区 */
.bpx-player-control-entity {
  display: block !important;
}

.bpx-player-ctrl-pip,
.bpx-player-ctrl-wide,
.bpx-player-ctrl-web {
  display: none !important;
}

.bpx-player-control-bottom-left,
.bpx-player-control-bottom-right {
  flex: 1 !important;
  min-width: 0;
}

/* 弹幕行滚动隐藏 */
.bpx-player-sending-area {
  position: absolute !important;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);

  transition: 0.5s transform ease-in;
}

.left-container.scroll-hidden .bpx-player-sending-area {
  transform: none
}

.bpx-player-video-area {
  z-index: 1;
}

#bilibili-player-placeholder-bottom {
  display: none !important;
}

/* 弹幕行高度 */
.bpx-player-sending-bar {
  height: 44px !important;
}

.bpx-player-sending-bar>* {
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
}

.bpx-player-dm-input {
  height: 26px !important;
}

/* 弹幕输入栏外 */
.bpx-player-video-inputbar {
  height: 26px !important;
  border-radius: 13px !important;
}

/** --------------------------------------------------------
 * ----------------------- 推荐块 --------------------------
 * ---------------------------------------------------------
 */

/* 推荐块 */
.right-container {
  width: 80% !important;

  position: fixed !important;
  z-index: 76;
  background: white;
  transition: transform .6s ease-in;
  transform: translateX(calc(100% + 1px));
  height: calc(100% - var(--header-height));
  overflow-y: auto;
  /* 避免到达边界后的滚动事件穿透 */
  overscroll-behavior: contain;

  box-sizing: border-box;
  padding: 10px;
  margin: 0 !important;
  right: 0;
  border-left: 1px solid var(--line_regular);
}

.right-container.show {
  transform: none;
}

.right-container-inner {
  padding: 0 !important;
}

/* 推荐块蒙版（加到左视频块才不会被冒泡事件影响） */
.video-container-v1:has(>.right-container) .left-container:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 75;
  background-color: rgb(0, 0, 0);
  opacity: 0;
  transition: opacity 0.6s ease-in;
  pointer-events: none;
}

.video-container-v1:has(>.right-container.show) .left-container:after {
  opacity: 0.5;
  pointer-events: auto;
}

/* UP信息 */
.upinfo-btn-panel .default-btn {
  font-size: 12px !important;
}

.new-charge-btn {
  max-width: 35%;
}

.follow-btn {
  max-width: 150px !important;
}

/* UP头像 */
.bili-avatar,
.up-avatar-wrap {
  width: 38px !important;
  height: 38px !important;
}

/* 推荐视频图块 */
#reco_list .card-box .pic-box {
  max-width: 50%;
}

/* ----------------------------------------------------
* ---------------------- 播放页组件 ------------------- *
 ----------------------------------------------------- */

/* 非主要元素 */
.bpx-player-video-info,
.bpx-player-dm-hint {
  display: none !important;
}

.bpx-player-video-inputbar {
  min-width: 0 !important;
}

.bpx-player-video-inputbar-wrap {
  width: 100% !important;
}

/* 不输入隐藏发送 */
.bpx-player-dm-btn-send {
  display: none !important;
}

.bpx-player-video-inputbar-wrap:has(>input:focus)+.bpx-player-dm-btn-send {
  display: flex !important;
}

.bpx-player-dm-btn-send {
  border-radius: 0 13px 13px 0 !important;
  height: 26px !important;
  min-width: 50px !important;
  width: 50px !important;
}

.bui-button-blue {
  min-width: 50px !important;
}

/* 点赞投币行 */
.video-toolbar-container {
  padding: 10px 0 8px !important;
}

.video-toolbar-left,
.video-toolbar-left-main {
  min-width: 0;
}

.toolbar-left-item-wrap {
  flex: 1;
  min-width: 0;
}

.video-toolbar-container * {
  margin: 0 !important;
}

.video-share-info {
  width: 40px !important;
}

.video-share-popover {
  display: none !important;
}

/* AI 助手“测试版”字样 */
.video-ai-assistant-badge {
  display: none !important;
}

/* AI 总结 */
.resizable-component {
  width: 100% !important;
  left: 0 !important;
}

/* 信息块（标题） */
.video-info-container {
  height: auto !important;
  padding-top: 10px !important;
}

/* 标题（可两行显示） */
.video-title {
  font-size: 18px !important;

  white-space: wrap !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  /* 去除折叠时的 show-more 按钮 margin */
  margin-right: 0 !important;
}

.show-more {
  top: unset !important;
  transform: none !important;
  bottom: 4px;
  right: 4px !important;
}

.video-desc-container {
  margin: 10px 0 !important;
}

/* 标签 */
.video-tag-container {
  margin: 6px 0 0 !important;
  padding-bottom: 1px !important;
}

.tag-panel .tag {
  margin-bottom: 6px !important;
  opacity: 0;
  animation: fadeIn 1s ease-in 2s forwards;
}

/* 投票卡片（ 暂定 ） */
.top-vote-card-left {
  width: unset !important;
  max-width: unset !important;
}

/* ----------------------------------------------------
* ----------------- 播放组件（评论以下） -------------- *
 ----------------------------------------------------- */

/* 固定评论栏 */
.main-reply-box {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  background: white;
  width: 100%;
  padding: 8px 12px;
  border-top: 1px solid var(--line_regular);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;

  transition: 0.5s transform ease-in;
}

@keyframes fadeIn {
  form {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
}

/* 评论行滚动隐藏 */
.left-container.scroll-hidden .main-reply-box {
  transform: translateY(100%)
}


/* 移除原底部评论栏 */
.fixed-reply-box {
  display: none !important;
}

/* 移除评论头像 */
.reply-box-avatar {
  display: none !important;
}

/* 输入块外 */
.reply-box-warp {
  border-radius: 13px !important;
}

/* 输入块内 */
.textarea-wrap {
  padding: 0 !important;
}

/* 文字输入 */
.reply-box-textarea {
  height: 26px !important;
  line-height: 26px !important;
  min-height: 26px !important;
  opacity: 0;
  animation: fadeIn 4.5s ease-in forwards;
}

/* 输入展开块 */
.main-reply-box .reply-box .box-expand[data-v-a6daab22] {
  height: 26px;
  margin: 8px 0 0 0;
}

/* 插入表情图片 */
.box-left {
  flex: 1;
  justify-content: space-evenly !important;
}

/* 点击发送 */
.reply-box-send {
  width: 50px !important;
  height: 26px !important;
}

/* 评论块 */
#comment {
  margin-top: 12px !important;
}

/* 评论导航 */
.reply-navigation {
  margin-bottom: 0 !important;
}

/* 评论 */
.root-reply-container {
  padding: 12px 0 0 36px !important;
}

.root-reply-avatar,
.root-reply-avatar .bili-avatar {
  width: 36px !important;
  height: 36px !important;
}

.user-info {
  margin: 3px 5px 0 !important;
}

/* 回复评论 */
.sub-reply-container {
  padding-left: 28px !important;
}

.sub-reply-item {
  padding: 4px 0 4px 37px !important;
}

/* 块状广告（包括推荐列） */
#activity_vote,
#bannerAd,
.reply-notice,
.ad-report,
.pop-live-small-mode,
#slide_ad {
  display: none !important;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* ------------------------ 按钮 ---------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* svg 大小 */
#toggleSidebar svg,
#search-fab svg,
.flexible-roll-btn-inner svg {
  width: 26px;
  height: 26px;
}

/* 侧栏按钮 */
#toggleSidebar {
  position: fixed;
  bottom: 132px;
  right: 0;
  z-index: 77;
  padding: 7px 7px 7px 8px;
  border-radius: 25% 0 0 25%;
  background: inherit;
  border: 1px solid var(--line_regular);
  border-right: none;
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;

  svg {
      vertical-align: middle;
  }
}

svg line {
  stroke: currentColor;
  stroke-width: 6;
  stroke-linecap: round;
  /* filter:  drop-shadow 属性只需要渲染阴影，而 box-shadow 属性还需要渲染盒子的边框。 */
  transition: transform .5s linear;
  transform-origin: 50% 50%;
}

.arrow #line-1 {
  transform: rotate(-30deg) translateX(3px);
}

.arrow #line-2 {
  transform: rotate(30deg) translateX(3px);
}

/* 搜索按钮 */
#search-fab {
  position: fixed;
  bottom: 78px;
  right: 0;
  z-index: 77;
  padding: 7px 7px 8px 9px;
  border-radius: 25% 0 0 25%;
  background: inherit;
  border: 1px solid var(--line_regular);
  border-right: none;
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;

  svg {
      vertical-align: middle;
  }
}

/* 刷新按钮 */
.flexible-roll-btn-inner {
  color: inherit !important;
  background: none !important;
  padding: 7px 8px 7px 7px !important;
  border-radius: 25% 0 0 25% !important;
  background: white !important;
  height: auto !important;
  display: block !important;
  border: 1px solid var(--line_regular);
  border-right: none;
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;

  /* 嵌套忘加右括号 */
  .flexible-roll-btn-inner svg {
      stroke: currentColor;
      stroke-width: 0.1px;
  }
}

/* 刷新按钮的位置 */
.palette-button-wrap {
  right: 10px !important;
  bottom: -20px !important;
}

.palette-button-wrap.translucent>.flexible-roll-btn.flexible-roll-btn {
  opacity: 1 !important;
}

/* 按钮组 */
span.btn-text-inner,
.primary-btn {
  display: none !important;
}

/* 返回顶部按钮（添加渐变） */
/* 权重：基本设置属性 < transition < animation */
.back-to-top {
  border-radius: 0 25% 25% 0 !important;
  border-left: 0 !important;
  margin-bottom: 0 !important;
  width: 42px !important;

  visibility: visible !important;
  transform: translateX(-100%);
  transition: transform .5s ease-in-out;
}

.back-to-top.visible {
  transform: none;
}

/* 回顶按钮的位置 */
.fixed-sidenav-storage {
  left: 0;
  right: unset !important;
  bottom: 78px !important;
  z-index: 1 !important;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* ---------------------- 其它窗口 -------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* 登录窗 */
.login-scan-wp,
.bili-mini-line {
  display: none !important;
}

.bili-mini-content-wp {
  padding: 52px 0 29px !important;
}

.bili-mini-login-right-wp,
.bili-mini-login-right-wp * {
  max-width: 80vw;
}
    `
    const style = document.createElement('style')
    style.textContent = initialInsertStyle

    // 如果 document.head 可用，将样式添加到文档
    document.head ? document.head.appendChild(style) : waitDOMContentLoaded(document.head.appendChild(style))
  }
})()
