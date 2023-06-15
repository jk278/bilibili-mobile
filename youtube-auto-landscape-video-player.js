// ==UserScript==
// @name         Auto Landscape Video Player
// @version      1.0
// @description  Automatically rotate screen to landscape mode when playing YouTube videos in fullscreen on mobile devices with aspect ratio greater than 1:1, using Fullscreen API and screen orientation lock feature of the browser (tested on Firefox for Android).
// @author       jk278
// @match        https://m.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const video = document.querySelector('video');
    // console.log("脚本 video", video);
    if (!video) return;
    // console.log("脚本：开始");

    // const player = document.querySelector('#player');

    // 监听全屏状态的变化
    document.addEventListener('fullscreenchange', () => {
        // console.log("脚本：全屏元素为", document.fullscreenElement);
        if (document.fullscreenElement) {
            // 进入全屏模式，调用自动旋转屏幕函数
            autoRotateScreen(video.videoWidth, video.videoHeight);
        } else {
            // 退出全屏模式，将屏幕方向恢复为竖屏模式
            screen.orientation.unlock();
        }
    }
    );
    // observer.observe(video, { attributes: true });

    function autoRotateScreen(width, height) {
        const aspectRatio = width / height;
        if (aspectRatio > 1) {
            // console.log("脚本：触发横屏");
            screen.orientation.lock('landscape');
            // console.log("脚本：锁定横屏");
        } else {
            screen.orientation.lock('portrait');
        }
    }

})();
