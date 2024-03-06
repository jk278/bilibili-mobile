// ==UserScript==
// @name         Skip Intro/Outro and Auto Next Episode
// @namespace    https://github.com/jk278/auto-player-plus
// @version      2.0
// @description  Automatically skip intro/outro and play next episode on a video site
// @author       jk278
// @match        https://www.dmttang.com/vodplay/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log("start!");

    function handleVideo() {
        // 片头片尾时长（秒）
        const introDuration = 110;
        const outroDuration = 50;

        const iframe = document.getElementsByClassName("embed-responsive-item")[0];
        console.log(iframe);

        // Wait for the iframe to load
        iframe.onload = function () {
            // Access the contents of the iframe
            const iframeDocument = iframe.contentWindow.document;

            const observer = new MutationObserver((mutationsList, observer) => {
                // Use querySelector to look for the video element inside the iframe
                const videoElement = iframeDocument.querySelector('video');
                if (videoElement) {
                    // If the video element is found, stop observing changes and handle the video
                    observer.disconnect();
                    console.log("GOGOGO!");
                    handleVideoElement(videoElement, introDuration, outroDuration);
                    addPageFullScreenButton(iframeDocument);
                }
            });

            // Start observing changes to the iframe document
            observer.observe(iframeDocument, { childList: true, subtree: true });
        };
    }

    function handleVideoElement(videoElement, introDuration, outroDuration) {
        let outroSkipped = false;

        // 监听视频加载事件
        videoElement.addEventListener('loadedmetadata', function () {
            // 获取视频总时长
            const totalDuration = this.duration;

            // 跳过片头
            this.currentTime = introDuration;
            console.log("已自动跳过片头");

            // 监听视频播放进度
            this.addEventListener('timeupdate', function () {
                if (!outroSkipped && this.currentTime >= totalDuration - outroDuration) {
                    console.log("已到达片尾");
                    // 当接近片尾时，跳过片尾
                    outroSkipped = true;

                    // 延迟一段时间后开始播放下一集（需要解析出下一集的URL）
                    setTimeout(playNextEpisode, 1000);
                }
            });
        });
    }

    function addPageFullScreenButton(iframeDocument) {
        const pageFullScreenButton = iframeDocument.getElementById("pagefull-switch");

        pageFullScreenButton.style.cssText = "display: block !important;";

        // 添加页面全屏按钮的点击事件
        pageFullScreenButton.addEventListener("click", function () {
            togglePageFullScreen();
        });

        function togglePageFullScreen() {
            if (isPageFullScreen()) {
                exitPageFullScreen();
                pageFullScreenButton.setAttribute("tooltip", "网页全屏");
            } else {
                enterPageFullScreen();
                pageFullScreenButton.setAttribute("tooltip", "退出网页全屏");
            }
        }

        function isPageFullScreen() {
            return sessionStorage.getItem("pageFullScreen") === "true";
        }

        function enterPageFullScreen() {
            // 在 document 中添加一个 style 标签，让 iframe 全屏显示
            const iframeStyle = document.createElement("style");
            iframeStyle.id = "iframe-fullscreen-style";
            iframeStyle.innerHTML = `
            iframe {
              position: fixed !important;
              z-index: 9999;
            }
          `;
            document.head.appendChild(iframeStyle);

            // 在 iframeDocument 中添加一个 style 标签，让 video 全屏显示
            const videoStyle = iframeDocument.createElement("style");
            videoStyle.id = "video-fullscreen-style";
            videoStyle.innerHTML = `
            video {
              object-fit: contain;
            }
          `;
            iframeDocument.head.appendChild(videoStyle);

            sessionStorage.setItem("pageFullScreen", "true");
        }

        function exitPageFullScreen() {
            // 移除添加的 style 标签
            const iframeStyle = document.getElementById("iframe-fullscreen-style");
            const videoStyle = iframeDocument.getElementById("video-fullscreen-style");
            iframeStyle.parentNode.removeChild(iframeStyle);
            videoStyle.parentNode.removeChild(videoStyle);

            sessionStorage.setItem("pageFullScreen", "false");
        }

        // 初始化页面全屏状态
        if (isPageFullScreen()) {
            enterPageFullScreen();
            pageFullScreenButton.setAttribute("tooltip", "退出网页全屏");
        }
    }

    function playNextEpisode() {
        // 获取当前页面URL
        const currentUrl = window.location.href;
        console.log(currentUrl);

        // 使用正则表达式提取数字
        const match = currentUrl.match(/-(\d+)(?=\.html\b)/);
        console.log("Regular expression match:", match);
        if (match) {
            const episodeNumber = parseInt(match[1], 10);
            console.log("Episode number:", episodeNumber);

            // 增加一集数
            const nextEpisodeNumber = episodeNumber + 1;

            // 构建下一集的URL
            const nextPageUrl = currentUrl.replace(/-(\d+)(?=\.html\b)/, `-${nextEpisodeNumber}`);

            // 打开新的页面或者替换当前页面为下一集
            window.location.href = nextPageUrl;
        } else {
            console.log("Regular expression did not match the current URL");
        }
    }

    // 确保DOM加载完成后再处理视频元素
    console.log("Document ready state: ", document.readyState);
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        console.log("DOM is ready, calling handleVideo");
        handleVideo();
    } else {
        console.log("DOM is not ready, adding event listener");
        document.addEventListener("DOMContentLoaded", handleVideo);
    }

})();