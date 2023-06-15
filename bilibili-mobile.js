// ==UserScript==
// @name               Bilibili Mobile
// @name:zh-CN         bilibili 移动端
// @namespace          https://github.com/jk278/bilibili-mobile
// @version            2.5.1
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
  'use strict';

  function goToVideoById(keyword) {
    // 生成一个唯一的回调函数名称
    const callbackName = `jsonp_callback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    // 将回调函数挂载到 window 对象上
    window[callbackName] = function (responseData) {
      console.log('test data: ', responseData.data.result[11].data[0]); // 这里会打印 JSON 数据
      if (responseData.data.result[11].data[0]) {
        const bvId = responseData.data.result[11].data[0].bvid;
        const videoUrl = `https://m.bilibili.com/video/${bvId}`;
        window.history.pushState({}, '', videoUrl); // 添加新的 URL 到浏览器历史记录
        window.location.href = videoUrl;
      }
    };

    const script = document.createElement('script');
    script.src = `https://api.bilibili.com/x/web-interface/search/all/v2?page=1&keyword=${keyword}&jsonp=jsonp&callback=${callbackName}`;
    document.body.appendChild(script);
  }

  function addTargetElementListener(targetElement) {
    if (targetElement) {
      const anchor = targetElement.firstChild;
      const h2Element = anchor.lastChild;

      const keyword = encodeURIComponent(h2Element.innerHTML);

      anchor.addEventListener('click', async (event) => { // 这个时灵时不灵
        event.preventDefault();
        event.stopImmediatePropagation();
        console.log('Execute test!');

        const callback = (bvId, error) => {
          if (bvId) {
            console.log("test bvId: ", bvId);
            videoUrl = `https://m.bilibili.com/video/${bvId}`; // 在回调内更新 videoUrl 的值
          } else {
            console.error("test bvId wrong: ", error);
          }
        };

        try {
          goToVideoById(keyword, callback);
        } catch (error) {
          console.log('Test goToVideoById Error!', error);
        }

      }, true);
    }
    console.log('Execute Video! 添加监听器');
  }

  function observeCardBox() {
    const cardBox = document.querySelector('.card-box');
    const targetElements = cardBox.children;

    // 为初始子元素添加监听器
    Array.from(targetElements).forEach(addTargetElementListener);

    // 创建 MutationObserver 以监听子元素的变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((addedNode) => {
            addTargetElementListener(addedNode);
          });
        }
      });
    });

    // 配置观察选项
    const observerConfig = {
      childList: true,
    };

    // 开始观察
    observer.observe(cardBox, observerConfig);
  }

  function changeTargetElementWithCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;

    // 如果 document.documentElement 可用，将样式添加到文档
    if (document.documentElement) {
      document.documentElement.appendChild(style);
    } else {
      // 如果 document.documentElement 不可用，监听 readyStateChange 事件
      document.addEventListener('readystatechange', () => {
        if (!style.isConnected && document.readyState !== 'loading') {
          document.documentElement.appendChild(style);
        }
      });
    }
  }
  function customElementStyle() {
    // transparentElement // 调试时要注释掉
    const css1 = `.v-dialog, .v-dialog * { opacity: 0 !important; }`;

    // bigImgElement
    const css2 = `.main-cover { width: 100% !important; border-radius: 0 !important; }
      .natural-main-video { padding: 0 !important; }`;

    // Button to unmute
    const css3 = `#unmuteButton {
      position: fixed;
      width : 46px;
      height : 46px;
      bottom: 30px;
      right: 20px;
      padding: 10px;
      background-color: #ccc;
      border: none;
      border-radius: 50%;
      cursor: pointer;}`;

    const css = `${css1}\n${css2}\n${css3}`;
    changeTargetElementWithCSS(css);
  }

  function runVideo() {

    const play = document.querySelector('.main-cover');
    if (play) {
      const videos = document.getElementsByTagName("video");
      if (videos.length > 0) {
        const video = videos[0];
        play.click();
        console.log('test video', video);

        // 监听视频播放事件
        video.addEventListener("play", function () {
          if (video.muted === true) createUnmuteButton();
        });

        // 创建解除静音按钮
        function createUnmuteButton() {
          // 检查是否已存在解除静音按钮
          if (document.getElementById("unmuteButton")) {
            return; // 如果已存在，不进行重复创建
          }
          // 创建按钮元素
          const unmuteButton = document.createElement("button");
          unmuteButton.id = "unmuteButton";
          unmuteButton.innerHTML = `<svg t="1686706035961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1483" width="26" height="26"><path d="M257.493333 322.4l215.573334-133.056c24.981333-15.413333 57.877333-7.914667 73.493333 16.746667 5.301333 8.373333 8.106667 18.048 8.106667 27.914666v555.989334C554.666667 819.093333 530.784 842.666667 501.333333 842.666667c-9.994667 0-19.786667-2.773333-28.266666-8L257.493333 701.6H160c-41.237333 0-74.666667-33.013333-74.666667-73.738667V396.138667c0-40.725333 33.429333-73.738667 74.666667-73.738667h97.493333z m26.133334 58.4a32.298667 32.298667 0 0 1-16.96 4.8H160c-5.888 0-10.666667 4.714667-10.666667 10.538667v231.733333c0 5.813333 4.778667 10.538667 10.666667 10.538667h106.666667c5.994667 0 11.872 1.664 16.96 4.8L490.666667 770.986667V253.013333L283.626667 380.8zM800.906667 829.653333a32.288 32.288 0 0 1-45.248-0.757333 31.317333 31.317333 0 0 1 0.768-44.693333c157.653333-150.464 157.653333-393.962667 0-544.426667a31.317333 31.317333 0 0 1-0.768-44.682667 32.288 32.288 0 0 1 45.248-0.757333c183.68 175.306667 183.68 460.010667 0 635.317333z m-106.901334-126.186666a32.288 32.288 0 0 1-45.248-1.216 31.328 31.328 0 0 1 1.237334-44.672c86.229333-80.608 86.229333-210.56 0-291.178667a31.328 31.328 0 0 1-1.237334-44.672 32.288 32.288 0 0 1 45.248-1.216c112.885333 105.546667 112.885333 277.418667 0 382.965333z" fill="#000000" p-id="1484"></path></svg>`;
          // 按钮点击事件
          unmuteButton.addEventListener("click", function () {
            video.muted = false;
            removeUnmuteButton();
          });
          // 将按钮添加到页面的合适位置
          document.body.appendChild(unmuteButton);
        }

        // 删除解除静音按钮
        function removeUnmuteButton() {
          const unmuteButton = document.getElementById("unmuteButton");
          if (unmuteButton) { unmuteButton.remove(); }
        }
      }
    }

    const timer = setInterval(function () {
      const dialog = document.querySelector('.dialog');
      if (dialog) {
        clearInterval(timer);
        dialog.lastChild.click();
      }
    }, 50);

    observeCardBox();

    console.log('Execute Video!');
  }

  function addHomeTargetElementListener(tag) {
    tag.addEventListener('click', async (event) => { // 异步，然后放到 js 末尾执行
      event.preventDefault(); // 阻止默认行为
      // event.stopPropagation(); // 阻止事件冒泡
      event.stopImmediatePropagation(); // 阻止其他事件监听器的执行
      console.log("test href: ", tag.getAttribute("href"));

      // 等待下一个事件循环迭代
      await new Promise((resolve) => setTimeout(resolve, 0)); // THIS!
      window.location.href = tag.getAttribute("href");
    }, true);
  }

  function runHome() {
    // observeHomeCardBox
    const cardBox = document.querySelector('.card-box');
    const aTags = cardBox.children;

    Array.from(aTags).forEach(addHomeTargetElementListener);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((addedNode) => {
            addHomeTargetElementListener(addedNode);
          });
        }
      });
    });

    const observerConfig = {
      childList: true,
    };

    observer.observe(cardBox, observerConfig);

    console.log('Execute Home!');
  }

  // 针对 VIA 浏览器优化，判断 DOM 状态
  function executeAfterDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => callback());
    } else {
      callback();
    }
  }

  customElementStyle();
  executeAfterDOMContentLoaded(() => {
    let pathname = window.location.pathname;
    if (pathname.startsWith('/video')) {
      runVideo();
    } else if (pathname === '/' || pathname === '') {
      runHome();
    }
  });

})();