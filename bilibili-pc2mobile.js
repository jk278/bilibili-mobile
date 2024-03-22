// ==UserScript==
// @name               Bilibili PC to Mobile
// @name:zh-CN         bilibili 移动端（桌面版）
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            2.0
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  在手机上看 b 站桌面版网页
// @author             jk278
// @match              *://www.bilibili.com/*
// @grant              none
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

(function () {
  'use strict'
  console.log('Bilibili mobile execute!')

  customElementStyle()

  controlScrollX()

  // DOM 加载完后
  function waitDOMContentLoaded (callback) {
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback()
  }

  function controlScrollX () {
    waitDOMContentLoaded(() => {
      const toggleSidebar = document.createElement('button')
      toggleSidebar.id = 'toggleSidebar'
      toggleSidebar.innerHTML = `
<svg width="50" height="50" viewBox="0 0 50 50">
    <line id="line-1" x1="25" y1="5" x2="25" y2="25" />
    <line id="line-2" x1="25" y1="45" x2="25" y2="25" />
</svg>
      `

      toggleSidebar.addEventListener('click', function () {
        let x = 0
        if (!toggleSidebar.classList.contains('arrow')) {
          x = window.innerWidth
          toggleSidebar.classList.add('arrow')
        } else {
          toggleSidebar.classList.remove('arrow')
        }
        window.scrollTo({
          left: x,
          top: window.scrollY,
          behavior: 'smooth'
        })
      })

      // 若作为两个分列的兄弟元素加入，就会影响页面布局
      document.body.appendChild(toggleSidebar)
    })
  }

  function customElementStyle () {
    const initialInsertStyle = `
/*
* 首页  *
*/
/* 双列视频 */
.recommended-container_floor-aside .container {
    grid-template-columns: repeat(2, 1fr) !important;
    padding: 15px;
}
/* 最小宽度 */
body, .bili-header, .bili-header__banner {
    min-width: 0 !important;
}
/* 宽度 */
.bili-feed4-layout, .bili-header {
    width: 100% !important;
}
/* 顶部留空 */
.bili-header__bar {
    padding: 75px 15px 25px !important;
}
.video-container-v1 {
    margin-top: 25px !important;
}
/* 搜索框置顶 */
.center-search-container {
    position: absolute !important;
    width: 100%;
    left: 0;
    top: 0;
    padding: 10px 20px 5px !important;
    z-index: 3;
    margin: 0 !important;
}
.left-entry {
    min-width: 0;
    margin: 0 !important;
}
.right-entry {
    flex: 1;
    min-width: 0;
    margin: 0 !important;
    justify-content: space-evenly;
}
/* 禁止换行 */
.left-entry__title, .dm.item {
    white-space: nowrap;
}
/* 移除次要入口 */
.left-entry>li:not(:nth-of-type(1)), .vip-wrap, .right-entry-item:nth-of-type(6), .right-entry-item--upload,
.header-channel, .bili-header__channel, .recommended-swipe, .feed-roll-btn {
    display: none !important;
}
/* 缩减纵距 */
.container > * {
    margin-top: 0 !important;
}
/* 广告、推广图块 */
.container > *:has(.bili-video-card__info--ad), .floor-single-card, .desktop-download-tip {
    display: none !important;
}
/*
* 视频详情页 *
*/
/* 列包裹 */
.video-container-v1 {
    min-width: 0 !important;
    justify-content: start !important;
}
/* 分列和视频 */
.video-container-v1 > div {
    width: 100% !important;
    flex: none;
}
/* 视频列 */
.left-container {
}
/* 推荐列 */
.right-container {
    min-width: 0;
    margin-left: 20px !important;
    padding-right: 10px !important;
}
/* 播放器样式 */
#bilibili-player {
    height: 100% !important;
    width: 100% !important;
}
#playerWrap {
    height: calc((100vw - 20px) * 0.5625 + 46px) !important;
}
/* 播放器控制区 */
.bpx-player-control-entity {
    display: block !important;
}
.bpx-player-ctrl-pip, .bpx-player-ctrl-wide, .bpx-player-ctrl-web {
    display: none !important;
}
.bpx-player-control-bottom-left, .bpx-player-control-bottom-right {
    flex: 1 !important;
    min-width: 0;
}
/* 点赞投币行 */
.video-toolbar-left, .video-toolbar-left-main {
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
.bpx-player-video-info, .bpx-player-dm-hint {
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
#activity_vote, #bannerAd, .reply-notice,
.ad-report, .pop-live-small-mode {
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
/* 禁横滚 */
body {
    overflow-x: hidden !important;
}
/* 侧栏按钮 */
#toggleSidebar {
    position: fixed;
    border: 0;
    background: none;
    z-index: 75;
    top: calc(50% - 25px);
    transition: left .3s linear;
    left: calc(100% - 50px);
}
#toggleSidebar.arrow {
    left: 0;
}
svg line {
    stroke: #333;
    stroke-width: 10;
    stroke-linecap: round;
    drop-shadow: (0 0 5px rgba(0,0,0,.5))
    transition: transform .5s linear;
    transform: rotate(0);
    transform-origin: 50% 50%;
}
.arrow #line-1 {
    transform: rotate(-30deg);
}
.arrow #line-2 {
    transform: rotate(30deg);
}
      `
    const style = document.createElement('style')
    style.textContent = initialInsertStyle

    // 如果 document.head 可用，将样式添加到文档
    document.head ? document.head.appendChild(style) : waitDOMContentLoaded(document.head.appendChild(style))
  }
})()
