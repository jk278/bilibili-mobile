// ==UserScript==
// @name         Skip Intro/Outro and Auto Next Episode
// @namespace    https://github.com/jk278/auto-player-plus
// @version      2.3
// @description  Automatically skip intro/outro and play next episode on a video site
// @author       jk278
// @match        https://www.dmttang.com/vodplay/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Initialize intro and outro durations with default values or values from localStorage
    let introDuration = localStorage.getItem('introDuration') || 111;
    let outroDuration = localStorage.getItem('outroDuration') || -48;
    // Initialize ad start and ad duration with default values or values from localStorage
    let adStart = localStorage.getItem('adStart') || 0;
    let adEnd = localStorage.getItem('adEnd') || 0;

    // Pin all the needed styles
    const style = document.createElement('style');
    style.innerHTML = `
.settings-button {
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
    opacity: 0;
    transition: transform 0.2s linear; /* 过渡属性设置为 transform，持续时间为 0.2 秒，缓和函数为 ease-in */
    animation: fadeIn 1s ease-in forwards; /* 动画属性设置为 fadeIn，持续时间为 1 秒，缓和函数为 ease-in，只播放一次，保留最后一帧的状态 */
}
.settings-button:hover {
    transform: translateY(-50%) scale3d(1.1, 1.1, 1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.settings-button:hover #hour-hand {
    animation: rotate-hour 18s linear infinite;
    transform-origin: 50% 50%;
}
.settings-button:hover #minute-hand {
    animation: rotate-minute 3s linear infinite;
    transform-origin: 50% 50%;
}
.settings-button svg {
    width: 32px;
    height: 32px;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes rotate-hour {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes rotate-minute {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

#settings-panel {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: inherit;
    border: 2px solid #333;
    border-radius: 10px;
    padding: 10px;
    display: none;
    grid-template-columns: 1fr;
    z-index: 3;
}
#settings-panel input {
    width: 100px;
    border-radius: 10px;
    background-color: #333;
    padding: 0 5px;
    margin: 5px 0;
}
`;
    document.head.appendChild(style);

    // Create the settings panel
    const settingsPanel = createSettingsPanel();
    document.body.insertBefore(settingsPanel, document.body.firstChild);

    function createSettingsPanel() {
        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'settings-panel';

        const settingsPanelToggleBtn = document.createElement('button');
        settingsPanelToggleBtn.classList.add('settings-button');

        settingsPanelToggleBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="32px" height="32px">
    <circle style="fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;" cx="16" cy="16" r="11"/>
    <line id="minute-hand" x1="16" y1="16" x2="16" y2="8" style="fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;"/>
    <line id="hour-hand" x1="16" y1="16" x2="22" y2="16" style="fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;"/>
  </svg>
    `;

        settingsPanelToggleBtn.addEventListener('click', () => {
            settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'grid' : 'none';
        });
        document.body.insertBefore(settingsPanelToggleBtn, document.body.firstChild);
        // 添加键盘事件监听器
        document.addEventListener("keydown", function (event) {
            if (event.key === "S" || event.key === "S") {
                settingsPanelToggleBtn.click();
            }
        });

        const introInput = document.createElement('input');
        introInput.type = 'number';
        introInput.placeholder = 'Intro duration (seconds)';
        introInput.value = introDuration;
        settingsPanel.appendChild(introInput);

        const outroInput = document.createElement('input');
        outroInput.type = 'number';
        outroInput.placeholder = 'Outro duration (seconds)';
        outroInput.value = outroDuration;
        settingsPanel.appendChild(outroInput);

        // Add input fields for ad start and ad duration in the settings panel
        const adStartInput = document.createElement('input');
        adStartInput.type = 'number';
        adStartInput.placeholder = 'Ad start (seconds)';
        adStartInput.value = adStart;
        settingsPanel.appendChild(adStartInput);

        const adEndInput = document.createElement('input');
        adEndInput.type = 'number';
        adEndInput.placeholder = 'Ad duration (seconds)';
        adEndInput.value = adEnd;
        settingsPanel.appendChild(adEndInput);

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '确认';
        confirmBtn.addEventListener('click', () => {
            introDuration = parseFloat(introInput.value, 10);
            outroDuration = parseFloat(outroInput.value, 10);
            adStart = parseFloat(adStartInput.value, 10);
            adEnd = parseFloat(adEndInput.value, 10);
            // Store the new intro and outro durations in localStorage
            localStorage.setItem('introDuration', introDuration);
            localStorage.setItem('outroDuration', outroDuration);
            localStorage.setItem('adStart', adStart);
            localStorage.setItem('adEnd', adEnd);
            settingsPanel.style.display = 'none';
        });
        settingsPanel.appendChild(confirmBtn);

        return settingsPanel;
    }

    function handleVideo() {
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
                    handleVideoElement(videoElement);
                    addPageFullScreenButton(videoElement, iframeDocument);
                    handleMouseHide(iframeDocument);
                }
            });

            // Start observing changes to the iframe document
            observer.observe(iframeDocument, { childList: true, subtree: true });
        };
    }

    function handleVideoElement(videoElement) {
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
                let finalOutroDuration;
                if (outroDuration < 0) {
                    // 在 JavaScript 中，当使用 `+` 运算符时，如果其中一个操作数是字符串，那么另一个操作数也将被转换为字符串
                    finalOutroDuration = totalDuration + parseFloat(outroDuration);
                } else {
                    finalOutroDuration = outroDuration;
                }

                if (!outroSkipped && this.currentTime >= finalOutroDuration) {
                    console.log("已到达片尾");
                    // 当接近片尾时，跳过片尾
                    outroSkipped = true;

                    // 延迟一段时间后开始播放下一集（需要解析出下一集的URL）
                    setTimeout(playNextEpisode, 1000);
                } else if (adStart <= this.currentTime && this.currentTime < adEnd) {
                    // 不支持 adStart <= this.currentTime < adEnd，会先前两者进行比较，所得布尔值结果再和末者比较
                    console.log("已到达广告位置");
                    this.currentTime = adEnd;
                }
            });
        });
    }

    function addPageFullScreenButton(videoElement, iframeDocument) {
        const pageFullScreenButton = iframeDocument.getElementById("pagefull-switch");

        pageFullScreenButton.style.cssText = "display: block !important;";

        // 添加页面全屏按钮的点击事件
        pageFullScreenButton.addEventListener("click", function () {
            togglePageFullScreen();
        });

        // 添加键盘事件监听器
        iframeDocument.addEventListener("keydown", function (event) {
            if (event.key === "p" || event.key === "P") {
                pageFullScreenButton.click();
            }
        });

        // 将焦点设置到 iframe 元素上
        videoElement.focus();

        function hideMouse() {
            iframeDocument.body.style.cursor = 'none';
        }

        function showMouse() {
            iframeDocument.body.style.cursor = 'default';
        }

        function togglePageFullScreen() {
            if (isPageFullScreen()) {
                exitPageFullScreen();
                pageFullScreenButton.setAttribute("tooltip", "网页全屏");
                showMouse();
            } else {
                enterPageFullScreen();
                pageFullScreenButton.setAttribute("tooltip", "退出网页全屏");
                hideMouse();
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
              z-index: 111;
            }
            body {
              overflow: hidden;
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
            hideMouse();
        }
    }

    function handleMouseHide(iframeDocument) {
        let mouseEventTimer;

        function resetMouseEventTimer() {
            showMouse();
            clearTimeout(mouseEventTimer);
            mouseEventTimer = setTimeout(hideMouse, 3500);
        }

        function hideMouse() {
            iframeDocument.body.style.cursor = 'none';
        }

        function showMouse() {
            iframeDocument.body.style.cursor = 'default';
        }

        iframeDocument.addEventListener('mousemove', resetMouseEventTimer);
        iframeDocument.addEventListener('click', resetMouseEventTimer);
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