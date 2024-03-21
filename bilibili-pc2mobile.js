// ==UserScript==
// @name               Bilibili PC to Mobile
// @name:zh-CN         bilibili 桌面版移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            1.0
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

  // DOM 加载完后
  function waitDOMContentLoaded (callback) {
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback()
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
.header-channel, .video-container-v1 {
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
    flex: 1;
    min-width: 0;
    margin: 0 !important;
}
.right-entry {
    flex: 2;
    min-width: 0;
    margin: 0 !important;
}
.right-entry * {
    margin: 0 2px !important;
}
/* 禁止换行 */
.left-entry__title, .dm.item {
    white-space: nowrap;
}
/* 移除次要入口 */
.left-entry>li:not(:nth-of-type(1)), .vip-wrap, .right-entry-item:nth-of-type(6), .right-entry-item--upload,
.bili-header__channel, .recommended-swipe, .feed-roll-btn {
    display: none !important;
}
/*
* 视频详情页 *
*/
/* 垂直排列 */
.video-container-v1 {
    flex-direction: column;
    min-width: 0 !important;
}
/* 分列和视频 */
.video-container-v1 > div, #bilibili-player {
    width:100% !important;
}
/* 视频列 */
.left-container.scroll-sticky {
    position: relative !important;
}
/* 推荐列 */
.right-container {
    margin: 0 !important;
}
/* 播放器样式 */
#playerWrap, #bilibili-player {
    height: auto !important;
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
/* 冗杂元素 */
#activity_vote {
    display: none !important;
}
      `
    const style = document.createElement('style')
    style.textContent = initialInsertStyle

    // 如果 document.head 可用，将样式添加到文档
    document.head ? document.head.appendChild(style) : waitDOMContentLoaded(document.head.appendChild(style))
  }
})()
