import { loadFollowList } from './menu-follow.js'
import { handleHistoryShowMore } from './menu-history.js'
import { handleDynamicShowMore } from './menu-dynamic.js'
import { getUnreadNums } from '../api.js'

export function setMenuBtn () {
  // 覆盖显隐，初始化加载动态、收藏、历史、主页
  const preloadeditems = [
    '.v-popover-wrap:has(>.right-entry__outside[href="//t.bilibili.com/"])',
    '.v-popover-wrap:has(>.right-entry__outside[data-header-fav-entry])',
    '.right-entry__outside[href="//www.bilibili.com/account/history"]',
    '.header-avatar-wrap']

  const waitRightEntry = () => {
    document.querySelector('.right-entry') ? tryPreload() : setTimeout(waitRightEntry, 200)
  }
  waitRightEntry()

  function tryPreload () {
    // 好像收藏加载最慢
    if (document.querySelector(preloadeditems[1])) {
      preloadeditems.forEach(item => {
        document.querySelector(item).dispatchEvent(new MouseEvent('mouseenter'))
      })
      setTimeout(handleHistoryShowMore, 70)
      setTimeout(handleDynamicShowMore, 60)
    } else setTimeout(tryPreload, 1000)
  }

  const menuFab = document.getElementById('menu-fab')

  // headerInMenu
  const menuOverlay = Object.assign(document.createElement('div'), {
    id: 'menu-overlay',
    innerHTML: `
    <div id="header-in-menu">
      <ul>
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
  })
  menuFab.appendChild(menuOverlay)
  const menu = menuOverlay.querySelector('#header-in-menu')

  menuFab.addEventListener('click', () => {
    menu.classList.add('show')
    menuOverlay.classList.add('show')
    menuFab.classList.add('active')
  })

  updateBadges()
  // 消息数
  async function updateBadges () {
    function update (id, number) {
      const badge = menuOverlay.querySelector(`#${id}`)
      if (number > 0) {
        badge.textContent = number > 99 ? '99+' : number
        badge.style.visibility = 'visible'
      } else {
        badge.style.visibility = 'hidden'
      }
    }
    const { messageNum, dynamicNum } = await getUnreadNums()
    update('message-badge', messageNum)
    update('dynamic-badge', dynamicNum)
  }

  let openedDialog = '' // sessionStorage 刷新网页不变

  const items = menuOverlay.querySelectorAll('li')
  items.forEach(item =>
    item.addEventListener('click', event => {
      event.stopPropagation()
      menu.classList.remove('show')

      const refer = item.dataset.refer

      if (!refer) { return } // 热门

      const referElement = document.querySelector(`${refer}+.v-popover`)
      if (!referElement) {
        const toast = document.querySelector('#toast')
        toast.textContent = '网页菜单加载中，请稍后重试'
        toast.style.display = 'block'
        setTimeout(() => { toast.setAttribute('show', '') }, 10)

        menuOverlay.click()

        setTimeout(() => {
          toast.removeAttribute('show')
          toast.addEventListener('transitionend', () => { toast.style.cssText = '' }, { once: true })
        }, 3000)

        return
      }

      openedDialog = refer

      referElement.setAttribute('display', '')
      setTimeout(() => { referElement.setAttribute('show', '') }, 10)
    })
  )

  menuOverlay.addEventListener('click', event => {
    event.stopPropagation()
    menu.classList.remove('show')
    document.body.removeAttribute('menu')
    menuOverlay.classList.remove('show')
    menuFab.classList.remove('active')

    if (openedDialog === '') { return }

    const referElement = document.querySelector(`${openedDialog}+.v-popover`)
    referElement.removeAttribute('show')
    referElement.addEventListener('transitionend', () => { referElement.removeAttribute('display') }, { once: true }) // 鼠标一动就会触发 mouseleave

    if (openedDialog === ("'.right-entry__outside[href='//message.bilibili.com']" || ".right-entry__outside[href='//t.bilibili.com/']")) {
      updateBadges()
    }
  })

  function handleTouchMove () { menuOverlay.click() }
  menuOverlay.addEventListener('touchstart', () => menuOverlay.addEventListener('touchmove', handleTouchMove, { once: true }))
  menuOverlay.addEventListener('touchend', () => menuOverlay.removeEventListener('touchmove', handleTouchMove))

  createExtraDialog()

  // 添加关注弹窗
  function createExtraDialog () {
    const falseHeader = Object.assign(document.createElement('div'), {
      className: 'bili-header false-header'
    })
    document.body.appendChild(falseHeader)

    const followOutside = document.createElement('div')
    followOutside.className = 'right-entry__outside follow-list'
    falseHeader.appendChild(followOutside)

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
    })
    falseHeader.appendChild(followDialog)

    loadFollowList(1)
  }
}
