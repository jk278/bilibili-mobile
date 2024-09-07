import { loadFollowList } from './menu-follow.js';
import { handleHistoryShowMore } from './menu-history.js';
import { handleDynamicShowMore } from './menu-dynamic.js';
import { getUnreadNums } from '../api.js';
import { handleTransitionEndOnce } from '../utils.js';

export function setMenuBtn () {
  // 覆盖显隐，初始化加载动态、收藏、历史、主页
  const preloadeditems = [
    '.v-popover-wrap:has(>.right-entry__outside[href="//t.bilibili.com/"])',
    '.v-popover-wrap:has(>.right-entry__outside[data-header-fav-entry])',
    '.right-entry__outside[href="//www.bilibili.com/account/history"]',
    '.header-avatar-wrap'];

  tryPreload();
  function tryPreload () {
    if (document.querySelector(preloadeditems[0]) ||
      document.querySelector(preloadeditems[1]) ||
      document.querySelector(preloadeditems[2]) ||
      document.querySelector(preloadeditems[3])
    ) {
      preloadeditems.forEach(item => {
        document.querySelector(item).dispatchEvent(new MouseEvent('mouseenter'));
      });
      setTimeout(handleHistoryShowMore, 70);
      setTimeout(handleDynamicShowMore, 60);
    } else { setTimeout(tryPreload, 1000); }
  }

  const menuFab = document.getElementById('menu-fab');

  // headerInMenu
  const menuOverlay = Object.assign(document.createElement('div'), {
    id: 'menu-overlay',
    innerHTML: `
    <div id="header-in-menu">
      <ul>
        <li data-refer=".right-entry__outside.copy-category">分类</li>
        <li><a target="_blank" href="https://www.bilibili.com/v/popular/all/">热门</a></li>
        <li data-refer=".right-entry__outside[href='//message.bilibili.com']">消息<span class="badge" id="message-badge">1</span></li>
        <li data-refer=".right-entry__outside[href='//t.bilibili.com/']">动态<span class="badge" id="dynamic-badge">2</span></li>
        <li data-refer=".right-entry__outside[data-header-fav-entry]">收藏</li>
        <li data-refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li data-refer=".header-avatar-wrap--container">主页</li>
        <li data-refer=".right-entry__outside.follow-list">关注</li>
      </li>
    </div>
    `
  });
  menuFab.appendChild(menuOverlay);
  const menu = menuOverlay.querySelector('#header-in-menu');

  menuFab.addEventListener('click', () => {
    menu.classList.add('show');
    menuOverlay.classList.add('show');
    menuFab.classList.add('active');
  });

  updateBadges();
  // 消息数
  async function updateBadges () {
    function update (id, number) {
      const badge = menuOverlay.querySelector(`#${id}`);
      if (number > 0) {
        badge.textContent = number > 99 ? '99+' : number;
        badge.style.visibility = 'visible';
      } else {
        badge.style.visibility = 'hidden';
      }
    }
    const { messageNum, dynamicNum } = await getUnreadNums();
    update('message-badge', messageNum);
    update('dynamic-badge', dynamicNum);
  }

  let openedDialog = ''; // sessionStorage 刷新网页不变

  const items = menuOverlay.querySelectorAll('li');
  items.forEach(item =>
    item.addEventListener('click', event => {
      event.stopPropagation();
      menu.classList.remove('show');

      const refer = item.dataset.refer;

      if (!refer) { // 热门
        menuOverlay.classList.remove('show');
        return;
      }

      const referElement = document.querySelector(`${refer}+.v-popover`);
      if (!referElement) {
        const toast = document.querySelector('#toast');
        toast.textContent = '网页菜单加载中，请稍后重试';
        toast.style.display = 'block';
        setTimeout(() => { toast.setAttribute('show', ''); }, 10);

        menuOverlay.click();

        setTimeout(() => {
          toast.removeAttribute('show');
          toast.addEventListener('transitionend', () => { toast.style.cssText = ''; }, { once: true });
        }, 3000);

        return;
      }

      openedDialog = refer;

      referElement.setAttribute('display', '');
      setTimeout(() => { referElement.setAttribute('show', ''); }, 10);
    })
  );

  menuOverlay.addEventListener('click', event => {
    event.stopPropagation();
    menu.classList.remove('show');
    menuOverlay.classList.remove('show');
    menuFab.classList.remove('active');

    if (openedDialog === '') { return; }

    const referElement = document.querySelector(`${openedDialog}+.v-popover`);
    referElement.removeAttribute('show');

    handleTransitionEndOnce(referElement, 'opacity', () => { referElement.removeAttribute('display'); });

    if ((openedDialog === '\'.right-entry__outside[href=\'//message.bilibili.com\']') || (openedDialog === '.right-entry__outside[href=\'//t.bilibili.com/\']')) {
      updateBadges();
    }
  });

  function handleTouchMove () { menuOverlay.click(); }
  menuOverlay.addEventListener('touchstart', () => menuOverlay.addEventListener('touchmove', handleTouchMove, { once: true }));
  menuOverlay.addEventListener('touchend', () => menuOverlay.removeEventListener('touchmove', handleTouchMove));

  createExtraDialog();

  // 添加关注弹窗
  function createExtraDialog () {
    const falseHeader = Object.assign(document.createElement('div'), {
      className: 'bili-header false-header',
      innerHTML: `
      <div class="right-entry__outside copy-category"></div>
<div class="v-popover" id="copy-category-dialog">
  <div class="v-popover-content">
    <div class="bili-header-channel-panel">
      <div class="channel-panel__column">
        <a href="//www.bilibili.com/anime/" target="_blank"><span class="name">番剧</span></a>
        <a href="//www.bilibili.com/movie/" target="_blank"><span class="name">电影</span></a>
        <a href="//www.bilibili.com/guochuang/" target="_blank"><span class="name">国创</span></a>
        <a href="//www.bilibili.com/tv/" target="_blank"><span class="name">电视</span></a>
        <a href="//www.bilibili.com/variety/" target="_blank"><span class="name">综艺</span></a>
        <a href="//www.bilibili.com/documentary/" target="_blank"><span class="name">纪录</span></a>
        <a href="//www.bilibili.com/v/douga/" target="_blank"><span class="name">动画</span></a>
        <a href="//www.bilibili.com/v/game/" target="_blank"><span class="name">游戏</span></a>
        <a href="//www.bilibili.com/v/kichiku/" target="_blank"><span class="name">鬼畜</span></a>
        <a href="//www.bilibili.com/v/music" target="_blank"><span class="name">音乐</span></a>
      </div>
      <div class="channel-panel__column">
        <a href="//www.bilibili.com/v/dance/" target="_blank"><span class="name">舞蹈</span></a>
        <a href="//www.bilibili.com/v/cinephile" target="_blank"><span class="name">影视</span></a>
        <a href="//www.bilibili.com/v/ent/" target="_blank"><span class="name">娱乐</span></a>
        <a href="//www.bilibili.com/v/knowledge/" target="_blank"><span class="name">知识</span></a>
        <a href="//www.bilibili.com/v/tech/" target="_blank"><span class="name">科技</span></a>
        <a href="//www.bilibili.com/v/information/" target="_blank"><span class="name">资讯</span></a>
        <a href="//www.bilibili.com/v/food" target="_blank"><span class="name">美食</span></a>
        <a href="//www.bilibili.com/v/life" target="_blank"><span class="name">生活</span></a>
        <a href="//www.bilibili.com/v/car" target="_blank"><span class="name">汽车</span></a>
        <a href="//www.bilibili.com/v/fashion" target="_blank"><span class="name">时尚</span></a>
      </div>
      <div class="channel-panel__column">
        <a href="//www.bilibili.com/v/sports" target="_blank"><span class="name">运动</span></a>
        <a href="//www.bilibili.com/v/animal" target="_blank"><span class="name">动物</span></a>
        <a href="//www.bilibili.com/v/life/daily/?tag=530003" target="_blank"><span class="name">VLOG</span></a>
        <a href="//www.bilibili.com/v/life/funny" target="_blank"><span class="name">搞笑</span></a>
        <a href="//www.bilibili.com/v/game/stand_alone" target="_blank"><span class="name">单机游戏</span></a>
        <a href="//www.bilibili.com/v/virtual" target="_blank"><span class="name">虚拟UP</span></a>
        <a href="//love.bilibili.com" target="_blank"><span class="name">公益</span></a>
        <a href="//www.bilibili.com/mooc" target="_blank"><span class="name">公开</span></a>
      </div>
      <div class="channel-panel__column">
        <a href="//www.bilibili.com/read/home" target="_blank"><span class="name">专栏</span></a>
        <a href="//live.bilibili.com" target="_blank"><span class="name">直播</span></a>
        <a href="//www.bilibili.com/blackboard/activity-list.html?" target="_blank"><span class="name">活动</span></a>
        <a href="//www.bilibili.com/cheese/" target="_blank"><span class="name">课堂</span></a>
        <a href="https://www.bilibili.com/blackboard/activity-5zJxM3spoS.html" target="_blank"><span class="name">社区中心</span></a>
        <a href="//music.bilibili.com/pc/music-center/" target="_blank"><span class="name">新歌热榜</span></a>
      </div>
    </div>
  </div>
</div>
      `
    });
    document.body.appendChild(falseHeader);

    const followOutside = document.createElement('div');
    followOutside.className = 'right-entry__outside follow-list';
    falseHeader.appendChild(followOutside);

    const followDialog = Object.assign(document.createElement('div'), {
      className: 'v-popover is-bottom',
      id: 'follow-list-dialog',
      // /* html */
      innerHTML: `
        <div class="v-popover-content"><div class="history-panel-popover">
          <div class="header-tabs-panel">
            <div class="header-tabs-panel__item--active header-tabs-panel__item">最常访问</div>
            <div class="header-tabs-panel__item">最近添加</div>
          </div>
          <ul class="follow-list-content"></ul>
        </div></div>
        `
    });
    falseHeader.appendChild(followDialog);

    loadFollowList(1);
  }
}
