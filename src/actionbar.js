/* global GM_getValue */

import categoryInnerHTML from './category.html'

/**
 * 管理操作栏的函数(DOMContentLoaded 之后)
 * fuck: 消息页顶栏不统一
 */
export function handleActionbar () {
  const actionbar = Object.assign(document.createElement('div'), {
    id: 'actionbar',
    // <div style="display:flex; transform:scale(4)">
    // <style>svg {background-color:yellow; border:1px solid;}</style>
    innerHTML: `
      <div id="full-now">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(3.6,4.2)" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>
      </div>
      <div id="my-top">
        <svg width="24" height="24" viewBox="0 0 296 296" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(17,18)" stroke="currentColor" stroke-width="1" d="M110.69055,37.98071a20.00016,20.00016,0,0,1,34.6189,0l87.97632,151.99243a19.99992,19.99992,0,0,1-17.30957,30.019H40.0238a19.99992,19.99992,0,0,1-17.30957-30.019L110.69055,37.98071M128,36a11.879,11.879,0,0,0-10.38562,5.98853L29.63806,193.981A11.99988,11.99988,0,0,0,40.0238,211.99219H215.9762A11.99988,11.99988,0,0,0,226.36194,193.981L138.38562,41.98853A11.879,11.879,0,0,0,128,36Z"/></svg>
      </div>
      <div id="my-home">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z"></path></svg>
      </div>
      <div id="search-fab">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>
      </div>
      <div id="menu-fab">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
      </div>
      <div id="sidebar-fab">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
      </div>
      <div id="refresh-fab">
        <svg width="24" height="24" viewBox="0 0 29 29" fill="currentColor" style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(2.3,2.8)" d="M21.3687 13.5827C21.4144 13.3104 21.2306 13.0526 20.9583 13.0069C20.686 12.9612 20.4281 13.1449 20.3825 13.4173L21.3687 13.5827ZM12 20.5C7.30558 20.5 3.5 16.6944 3.5 12H2.5C2.5 17.2467 6.75329 21.5 12 21.5V20.5ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V2.5C6.75329 2.5 2.5 6.75329 2.5 12H3.5ZM12 3.5C15.3367 3.5 18.2252 5.4225 19.6167 8.22252L20.5122 7.77748C18.9583 4.65062 15.7308 2.5 12 2.5V3.5ZM20.3825 13.4173C19.7081 17.437 16.2112 20.5 12 20.5V21.5C16.7077 21.5 20.6148 18.0762 21.3687 13.5827L20.3825 13.4173Z"/><path transform="translate(2.3,2.9)" d="M20.4716 2.42157V8.07843H14.8147"/></svg>
      </div>
      <div id="show-more-fab">
        <svg width="24" height="24" viewBox="0 0 40 40" fill="currentColor"  style="pointer-events: none; display: inherit; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg"><path transform="translate(4,4)" d="M0.256 23.481c0 0.269 0.106 0.544 0.313 0.75 0.412 0.413 1.087 0.413 1.5 0l14.119-14.119 13.913 13.912c0.413 0.413 1.087 0.413 1.5 0s0.413-1.087 0-1.5l-14.663-14.669c-0.413-0.412-1.088-0.412-1.5 0l-14.869 14.869c-0.213 0.212-0.313 0.481-0.313 0.756z"></path></svg>
      </div>
      `
  })
  document.body.appendChild(actionbar)

  // window 是全局对象，window.location.href 可省略 window
  if (location.hostname === 'www.bilibili.com' && location.pathname === '/') {
    actionbar.classList.add('home')
    setRefreshBtn()
  }

  if (location.pathname.startsWith('/video')) {
    actionbar.classList.add('video')
    setFullbtn()
  } else if (location.hostname === 'message.bilibili.com') {
    actionbar.classList.add('message')
    setSearchBtn('message')
  } else {
    setTopBtn()
  }

  if (location.hostname === 'search.bilibili.com') {
    actionbar.classList.add('search')
    setSearchBtn('search')
    setShowMoreBtn()
  } else {
    setSearchBtn()
  }

  setHomeBtn()
  if (location.hostname !== 'message.bilibili.com') {
    setMenuBtn()
  }

  function setFullbtn () {
    let clickTimer = null

    const fullBtn = document.getElementById('full-now')

    fullBtn.addEventListener('click', () => {
      clearTimeout(clickTimer)

      clickTimer = setTimeout(() => {
        const videoWrap = document.querySelector('.bpx-player-video-wrap')
        videoWrap.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))

        if (GM_getValue('full-unmuted', false)) {
          const video = document.querySelector('video')

          video.play()
          video.muted = false

          if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }
        }
      }, 250)
    })

    fullBtn.addEventListener('dblclick', () => {
      clearTimeout(clickTimer)

      const video = document.querySelector('video')
      video.play()
      video.muted = false

      if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }
    })
  }

  function setTopBtn () {
    const topBtn = document.getElementById('my-top')
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0 }))
  }

  function setHomeBtn () {
    const home = document.getElementById('my-home')
    home.addEventListener('click', () => (location.href = 'https://www.bilibili.com/'))
  }

  /**
 * 设置不同页面的搜索事件的函数
 * @param {string} page - 简短描述页面的字符串: search, message
 */
  function setSearchBtn (page) {
    const searchFab = document.getElementById('search-fab')
    const svg = searchFab.querySelector('svg')

    const searchOverlay = document.createElement('div')
    searchOverlay.id = 'search-overlay'
    searchFab.appendChild(searchOverlay)

    const searchContainer = page === 'message' ? '.nav-search-box' : '.center-search-container'

    let searchFabText
    if (page === 'search') {
      // 底部显示搜索文本
      const pageInput = document.querySelector('.search-input input')
      searchFabText = Object.assign(document.createElement('div'), {
        id: 'search-fab-text',
        textContent: pageInput.value
      })
      searchFab.appendChild(searchFabText)

      searchFab.style.cssText = `
        background-color: var(--graph_bg_thick);
        border-radius: 16px;
      `
      svg.style.flex = '0 0 20px'
    }

    let clickTimer = null

    let handleInput = null

    searchFab.addEventListener('click', () => {
      clearTimeout(clickTimer)

      clickTimer = setTimeout(() => {
        const input = document.querySelector(`${searchContainer} input`)

        if (input) {
          // 滑动时 .center-search-container 的 class 会刷新
          document.querySelector(`${searchContainer}`).toggleAttribute('show')
          input.focus()
          searchOverlay.classList.toggle('show')
          searchFab.classList.toggle('active')

          if (page === 'search') {
            // 移除之前添加的 input 事件监听器
            input.removeEventListener('input', handleInput)

            // 模拟输入: 将文本填入底部搜索
            input.value = searchFabText.textContent
            input.dispatchEvent(new Event('input', { bubbles: true }))

            // 文本更新到搜索页搜索
            handleInput = () => {
              searchFabText.textContent = input.value
              if (input.value === '') {
                searchFab.style.cssText = ''
                svg.style.flex = ''
              } else {
                searchFab.style.cssText = `
                  background-color: var(--graph_bg_thick);
                  border-radius: 16px;
                `
                svg.style.flex = '0 0 20px'
              }
            }
            input.addEventListener('input', handleInput)
          }
        }
      }, 300)
    })

    // 避免点击阴影时 input 先失焦,导致分两次隐藏
    searchOverlay.addEventListener('click', () => document.querySelector(`${searchContainer} input`)?.focus())

    // 移动端 click 会先触发 touchstart, touchend 和 mousemove
    function handleTouchMove () { searchFab.click() && searchOverlay.removeEventListener('touchmove', handleTouchMove)() }
    searchOverlay.addEventListener('touchstart', () => searchOverlay.addEventListener('touchmove', handleTouchMove))
    searchOverlay.addEventListener('touchend', () => searchOverlay.removeEventListener('touchmove', handleTouchMove))

    if (page === 'search') {
      searchFab.addEventListener('dblclick', () => {
        clearTimeout(clickTimer)

        const input = document.querySelector('.center-search-container input')

        if (input) {
          document.querySelector('.center-search-container').classList.toggle('show')
          input.focus()
          searchOverlay.classList.toggle('show')
          searchFab.classList.toggle('active')

          input.value = ''
          input.dispatchEvent(new Event('input', { bubbles: true }))

          searchFabText.textContent = input.value
          searchFab.style.cssText = ''
          svg.style.flex = ''

          input.removeEventListener('input', handleInput)
          // 文本更新到搜索页搜索
          handleInput = () => {
            searchFabText.textContent = input.value
            if (input.value === '') {
              searchFab.style.cssText = ''
              svg.style.flex = ''
            } else {
              searchFab.style.cssText = `
                background-color: var(--graph_bg_thick);
                border-radius: 16px;
              `
              svg.style.flex = '0 0 20px'
            }
          }
          input.addEventListener('input', handleInput)
        }
      })
    }
  }

  function setMenuBtn () {
    const menuFab = document.getElementById('menu-fab')

    // headerInMenu
    const menuOverlay = Object.assign(document.createElement('div'), {
      id: 'menu-overlay',
      innerHTML: `
    <div id="header-in-menu">
      <ul>
        <li data-refer="#copy-category-dialog">分类</li>
        <li data-refer=".right-entry--message">消息</li>
        <li data-refer=".right-entry__outside[href='//t.bilibili.com/']">动态</li>
        <li data-refer=".header-favorite-container">收藏</li>
        <li data-refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li data-refer=".header-avatar-wrap">主页</li>
      </li>
    </div>
    `
    })
    menuFab.appendChild(menuOverlay)
    const menu = menuOverlay.querySelector('#header-in-menu')

    menuFab.addEventListener('click', () => {
      menu.classList.add('show')
      // 显示消息数
      document.body.setAttribute('menu', '')
      menuOverlay.classList.add('show')
      menuFab.classList.add('active')
    })

    const items = menuOverlay.querySelectorAll('li')
    items.forEach(item =>
      item.addEventListener('click', event => {
        event.stopPropagation()
        menu.classList.remove('show')
        document.body.removeAttribute('menu')

        const refer = item.dataset.refer
        sessionStorage.setItem('opened-dailog', refer)

        const referElement = document.querySelector(`${refer}`)
        referElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      })
    )

    menuOverlay.addEventListener('click', event => {
      event.stopPropagation()
      menu.classList.remove('show')
      document.body.removeAttribute('menu')
      menuOverlay.classList.remove('show')
      menuFab.classList.remove('active')

      const refer = sessionStorage.getItem('opened-dailog') || ''

      const referElement = document.querySelector(`${refer}`)
      referElement.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    })

    function handleTouchMove () { menuOverlay.click() && menuOverlay.removeEventListener('touchmove', handleTouchMove)() }
    menuOverlay.addEventListener('touchstart', () => menuOverlay.addEventListener('touchmove', handleTouchMove))
    menuOverlay.addEventListener('touchend', () => menuOverlay.removeEventListener('touchmove', handleTouchMove))

    const categoryDialog = Object.assign(document.createElement('div'), {
      className: 'v-popover',
      id: 'copy-category-dialog',
      innerHTML: categoryInnerHTML
    })
    const falseHeader = document.createElement('div')
    falseHeader.className = 'bili-header false-header'
    falseHeader.appendChild(categoryDialog)
    document.body.appendChild(falseHeader)

    categoryDialog.addEventListener('mouseenter', () => { categoryDialog.style.display = 'block' })
    categoryDialog.addEventListener('mouseleave', () => { categoryDialog.style.cssText = '' })
  }

  function setRefreshBtn () {
    const refreshFab = document.getElementById('refresh-fab')

    refreshFab.addEventListener('click', document.querySelector('.flexible-roll-btn-inner')?.click)
  }

  function setShowMoreBtn () {
    const showMoreFab = document.getElementById('show-more-fab')

    const handleClick = () => {
      const searchConditions = document.querySelector('.search-conditions')

      if (searchConditions) {
        if (sessionStorage.getItem('show-conditions') !== 'true') {
          searchConditions.classList.add('show')
          showMoreFab.classList.add('reverse')
          sessionStorage.setItem('show-conditions', 'true')
        } else {
          searchConditions.classList.remove('show')
          showMoreFab.classList.remove('reverse')
          sessionStorage.setItem('show-conditions', '')
        }
      }
    }
    showMoreFab.addEventListener('click', handleClick)
  }
}

// 侧边栏(使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。)

/**
 * 处理侧边栏事件的函数
 * @param {string} page - 简短描述页面的字符串: video, message
 */
export function handleSidebar (page) {
  if (page === 'message') {
    handleMessageSidebar()
  } else {
    handleVideoSidebar()
  }

  function handleVideoSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab')
    const videoContainer = document.querySelector('#mirror-vdcon')

    sidebarFab.addEventListener('click', () => videoContainer.toggleAttribute('sidebar'))

    function closeSidebar () {
      videoContainer.removeAttribute('sidebar')
    }

    const recommendLiist = document.getElementById('reco_list')

    recommendLiist.addEventListener('click', event => {
      const nextPlay = document.querySelector('.rec-title')
      const recommendFooter = document.querySelector('.rec-footer')
      if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
    })
  }

  function handleMessageSidebar () {
    const sidebarFab = document.getElementById('sidebar-fab')
    const messageContainer = document.querySelector('body>.container')

    sidebarFab.addEventListener('click', () => {
      messageContainer.toggleAttribute('sidebar')
      sidebarOverlay.classList.toggle('show')
      sidebarFab.classList.toggle('active')
    })

    const sidebarOverlay = document.createElement('div')
    sidebarOverlay.id = 'sidebar-overlay'
    sidebarFab.appendChild(sidebarOverlay)
  }
}
