// ==UserScript==
// @name               Bilibili PC to Mobile
// @name:zh-CN         bilibili 移动端（桌面版）
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            2.4
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  在手机上看 b 站桌面版网页
// @author             jk278
// @license            MIT
// @match              *://www.bilibili.com/*
// @grant              none
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

(function () {
  'use strict'
  console.log('Bilibili mobile execute!')

  initViewport()
  initElementStyle()

  waitDOMContentLoaded(() => {
    controlSidebar()
    controlSearchbar()
    controlTopMenu()
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

  function controlSidebar () {
    const rightContainer = document.querySelector('.right-container')
    if (rightContainer) {
      const toggleSidebar = document.createElement('button')
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
          toggleSidebar.classList.remove('arrow')
          rightContainer.classList.remove('show')
        }
      })

      // 若作为两个分列的兄弟元素加入，就会影响页面布局
      document.body.appendChild(toggleSidebar)

      const recommendList = document.querySelector('#reco_list')
      // 只能传递函数引用，不能传递函数执行结果
      recommendList.addEventListener('click', () => { toggleSidebar.click() })
    }
  }

  function controlSearchbar () {
    const searchbarBtn = document.createElement('div')
    searchbarBtn.id = 'search-fab'
    searchbarBtn.innerHTML = `
      <svg width="30" height="30" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z" fill="currentColor"></path></svg>
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

  // 子元素先禁止，再启用一半
  function controlTopMenu () {
    if (!window.location.href.startsWith('https://www.bilibili.com/video')) {
      const leftEntry = document.querySelector('.left-entry')
      leftEntry.classList.add('show-button')
      leftEntry.addEventListener('click', function (event) {
        if (event.target === leftEntry) {
          leftEntry.classList.add('show-panel')
          const popoverWrap = document.querySelector('.v-popover-wrap')
          const arrow = document.querySelector('.mini-header__arrow')
          if (!arrow.classList.contains('arrow-up')) {
            popoverWrap.dispatchEvent(new MouseEvent('mouseenter', {
              bubbles: true,
              cancelable: true,
              view: window
            }))
            arrow.classList.add('arrow-up')
          } else {
            popoverWrap.dispatchEvent(new MouseEvent('mouseleave', {
              bubbles: true,
              cancelable: true,
              view: window
            }))
            arrow.classList.remove('arrow-up')
            leftEntry.classList.remove('show-panel')
          }
        }
      }, false)
    }
  }

  function initElementStyle () {
    /* css */
    const initialInsertStyle = `
/* ----------------------------------------------------
* ---------------------------------------------------- *
* ----------------------- 首页 ----------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */
/* 双列视频 */
.recommended-container_floor-aside .container {
  grid-template-columns: repeat(2, 1fr) !important;
  padding: 5px;
  grid-gap: 5px !important;
  background: #f1f2f3;;
}

/* 显示根据屏宽隐藏的 feed */
.container>.feed-card {
  display: block !important;
}

/* 最小宽度 */
body,
.bili-header,
.bili-header__banner {
  min-width: 0 !important;
}

/* 主页视频流 */
.bili-feed4-layout {
  width: 100% !important;
}

/* 顶栏边距 */
.bili-header__bar {
  padding: 0 15px !important;
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

/* 点击展开 */
.left-entry .v-popover-wrap {
  pointer-events: none;

  a > svg {
    pointer-events: auto;
  }
}

/* 展开图 */
.bili-header-channel-panel {
  width: calc(100vw - 30px) !important;
  padding: 5px 0 !important;
  display: none !important;
}

.left-entry.show-panel .bili-header-channel-panel {
  display: flex !important;
}

/* 视频页隐藏展开图相关 */
.mini-header__title {
  display: none !important;
}

.left-entry.show-button .mini-header__title {
  display: block !important;
} 

.channel-panel__column {
  width: 100% !important;
  flex: 1;
  padding: 0 !important;
}

.right-entry {
  flex: 1;
  min-width: 0;
  margin: 0 !important;
  justify-content: space-evenly;
}

/* 头像 */
.header-avatar-wrap {
  padding-right: 0 !important;
}

/* 禁止换行 */
.left-entry__title,
.dm.item {
  white-space: nowrap;
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
.container>*:has(.bili-video-card__info--ad),
.floor-single-card,
.desktop-download-tip,
.lt-row {
  display: none !important;
}

/* ----------------------------------------------------
* ---------------------------------------------------- *
* ---------------------- 视频卡片 -------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

.container > * {
  margin-top: 0 !important;
}

/* 卡片底板 */
.bili-video-card__wrap {
  border-radius: 5px;
  background: red !important;
}

/* 卡片标题 */
.bili-video-card__info--right {
  padding: 0 5px;
}

/* 卡片标题 - 字重 */
.bili-video-card__info--tit > a {
  font-family: unset !important;
  font-weight: normal !important;
}

/* 小标 */
.bili-video-card__info--bottom {
  --subtitle-font-size: 12px;
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

.bili-video-card__info--tit {
  padding-right: 0 !important;
  --title-font-size: 14px;
  --title-line-height: 20px;
}

/*
* 视频详情页 *
*/

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
}

/* 分内容块 */
.video-container-v1>div {
  width: 100% !important;
}

/* 推荐块 */
.right-container {
  position: fixed !important;
  z-index: 1;
  background: white;
  transition: transform .4s linear;
  transform: translateX(100%);
  height: 100%;
  overflow-y: auto;
  
  box-sizing: border-box;
  padding: 10px;
  margin: 0 !important;
  left: 0;
}

.right-container.show {
  transform: translateX(0)
}

.right-container-inner {
  padding: 0 !important;
}

/* 播放器样式 */
#bilibili-player {
  height: 100% !important;
  width: 100% !important;
}

/* 小窗 */
.bpx-player-container[data-screen=mini] {
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
}

#playerWrap {
  height: calc((100vw - 20px) * 0.5625 + 46px) !important;
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

/* 点赞投币行 */
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

/* 弹幕行 */
.bpx-player-video-info,
.bpx-player-dm-hint {
  display: none !important;
}

.bpx-player-video-inputbar {
  min-width: 0 !important;
}

.bpx-player-video-inputbar-wrap {
  width: 0 !important;
}

/* 纵向缩窄 */
.video-info-container {
  height: 90px !important;
}

.video-tag-container {
  margin: 0 !important;
}

/* 块状广告（包括推荐列） */
#activity_vote,
#bannerAd,
.reply-notice,
.ad-report,
.pop-live-small-mode {
  display: none !important;
}

/* 评论 */
.root-reply-container {
  padding-left: 50px !important;
}

.root-reply-avatar {
  width: 40px !important;
}

.sub-reply-container {
  padding-left: 40px !important;
}


/* ----------------------------------------------------
* ---------------------------------------------------- *
* ------------------------ 按钮 ---------------------- *
* ---------------------------------------------------- *
 ----------------------------------------------------- */

/* 侧栏按钮 */
#toggleSidebar {
  position: fixed;
  border: 0;
  background: none;
  z-index: 75;
  top: calc(50% - 25px);
  transition: left .4s linear;
  left: calc(100% - 50px);
}

#toggleSidebar.arrow {
  left: 0;
}

svg line {
  stroke: #333;
  stroke-width: 10;
  stroke-linecap: round;
  /* drop-shadow 属性只需要渲染阴影，而 box-shadow 属性还需要渲染盒子的边框。 */
  filter:  drop-shadow(0 0 5px rgba(0, 0, 0, .5));
  transition: transform .5s linear;
  transform-origin: 50% 50%;
}

.arrow #line-1 {
  transform: rotate(-30deg);
}

.arrow #line-2 {
  transform: rotate(30deg);
}

/* 搜索按钮 */
#search-fab {
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 1;
  padding: 10px 9px 9px 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, .2);
}

#search-fab svg {
  vertical-align: middle;
}

/* 刷新按钮 */
.flexible-roll-btn-inner {
  color: inherit !important;
  background: none !important;
  padding: 9px 9px 10px 10px !important;
  border-radius: 50% !important;
  background: rgba(0, 0, 0, .2) !important;
  height: auto !important;
  display: block !important;
  margin-right: 20px;
  margin-top: 70px;
}

.flexible-roll-btn-inner svg {
  width: 30px;
  height: 30px;
  stroke: currentColor;
  stroke-width: 0.1px;
}

.palette-button-wrap.translucent>div[data-v-6640d1cd].flexible-roll-btn {
  opacity: 1 !important;
}

/* 按钮组 */
span.btn-text-inner,
.primary-btn {
  display: none !important;
}


/* ----------------------------------------------------
* ---------------------------------------------------- *
* ---------------------- 动态窗口 -------------------- *
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
