import { modifyShadowDOMLate } from '../comment.js';
import { handleTransitionEndOnce } from '../utils.js';

/* 使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。
   head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。 */

/**
 * 处理侧边栏事件的函数
 */
export function setSidebarBtn (type) {
  const videoMap = {
    video: ['.right-container', '#reco_list'],
    list: ['.playlist-container--right', '.recommend-list-container']
  };

  if (['video', 'list'].includes(type)) {
    handleVideoSidebar();
    showMoreRecommend();
  } else if (type === 'message') {
    handleMessageSidebar();
  }

  /**
 * 处理视频侧边栏
 */
  function handleVideoSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab');
    const videoContainer = document.querySelector('#mirror-vdcon');

    sidebarFab.addEventListener('click', () => videoContainer.toggleAttribute('sidebar'));

    function closeSidebar () {
      videoContainer.removeAttribute('sidebar');
    }

    const rightContainer = videoContainer.querySelector(videoMap[type][0]);
    const recommendLiist = rightContainer.querySelector(videoMap[type][1]);

    recommendLiist.addEventListener('click', event => {
      const nextPlay = document.querySelector('.rec-title');
      const recommendFooter = document.querySelector('.rec-footer'); // 自动收起侧边栏
      if (!nextPlay?.contains(event.target) && !recommendFooter.contains(event.target)) {
        closeSidebar();
        handleTransitionEndOnce(rightContainer, 'transform', () => { rightContainer.scrollTop = 0; });
        // 此处不要使用监听器，否则会干扰原函数执行
        modifyShadowDOMLate(true);
      }
    });
  }

  // 侧边栏自动展开更多
  function showMoreRecommend () {
    const recommendFooter = document.querySelector('.rec-footer');
    setTimeout(() => { recommendFooter?.click(); }, 2000); // 直接传递 recommendFooter?.click: 可选链操作符前的 recommendFooter 条件判断将会立即执行

    document.querySelector('video').addEventListener('canplay', showMoreRecommend, { once: true });
  }

  function handleMessageSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab');
    const messageContainer = document.querySelector('body>.container');

    sidebarFab.addEventListener('click', () => {
      messageContainer.toggleAttribute('sidebar');
      sidebarOverlay.classList.toggle('show');
      sidebarFab.classList.toggle('active');
    });

    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.id = 'sidebar-overlay';
    sidebarFab.appendChild(sidebarOverlay);
  }
}
