// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-pc2mobile
// @version            3.9.7
// @description        view bilibili pc page on mobile phone
// @description:zh-CN  只需一点配置，即可获得足够好的使用体验
// @author             jk278
// @license            MIT
// @match              https://*.bilibili.com/*
// @grant              unsafeWindow
// @grant              GM_registerMenuCommand
// @run-at             document-start
// @icon               https://www.bilibili.com/favicon.ico
// ==/UserScript==

/**
 * 先完成配置，再打开桌面版B站
 * Via 修改网站独立 UA 为 Windows 或 MacOS，但不要开电脑模式
 * Firefox 下载扩展 Header Editor 并添加两条规则：
    ① 修改请求头 ------ 正则表达式 ------ << 匹配规则 >> ------ 名称: user-agent ------ 内容: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0
    ② 其中，规则一:  ^https://www\.bilibili\.com/.*  规则二:  ^https://.*\.bilivideo\.com/.*
 * Safari 浏览器 直接打开电脑模式即可
 */
