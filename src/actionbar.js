import categoryInnerHTML from './html/category.html'

/**
 * 管理操作栏的函数 (DOMContentLoaded 之后)
 * @param {string} page - 简短描述页面的字符串: home, video, search, space, message
 */
export function handleActionbar (page) {
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

  document.body.appendChild(Object.assign(document.createElement('div'), { id: 'toast' }))

  actionbar.classList.add(page)
  setHomeBtn()
  setSearchBtn()
  if (page !== 'message') { setMenuBtn() }

  switch (page) {
    case 'home':
      setTopBtn()
      setRefreshBtn()
      break
    case 'video':
      setFullbtn()
      setSidebarBtn()
      break
    case 'search':
      setTopBtn()
      setShowMoreBtn()
      break
    case 'space':
      setTopBtn()
      setShowMoreBtn()
      break
    case 'message':
      setSidebarBtn()
      break
    default:
      break
  }

  function setFullbtn () {
    let clickTimer = null

    const fullBtn = document.getElementById('full-now')

    function playVideo () {
      const video = document.querySelector('video')
      video.play()
      video.muted = false
      if (video.volume === 0) { document.querySelector('.bpx-player-ctrl-muted-icon').click() }
    }

    fullBtn.addEventListener('click', () => {
      clearTimeout(clickTimer) // 双击会产生两次单击事件和两个定时器, 双击事件只能清除第二个定时器

      // via 报错：DOMException: play() can only be initiated by a user gesture. 是浏览器为防止未经请求的视频播放而实施的安全措施。
      // 如果 video.play() 方法是在 setTimeout 函数中调用的，这不被视为直接用户手势。
      playVideo()

      clickTimer = setTimeout(() => {
        const videoWrap = document.querySelector('.bpx-player-video-wrap')
        videoWrap.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
      }, 250)
    })

    fullBtn.addEventListener('dblclick', () => { clearTimeout(clickTimer) })
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
   */
  function setSearchBtn () {
    const searchFab = document.getElementById('search-fab')
    const svg = searchFab.querySelector('svg')

    const searchOverlay = document.createElement('div')
    searchOverlay.id = 'search-overlay'
    searchFab.appendChild(searchOverlay)

    const searchContainerSelector = page === 'message' ? '.nav-search-box' : '.center-search-container'

    let clickTimer = null

    function handleClick (input) {
      // 滑动时 .center-search-container 的 class 会刷新
      const searchContainer = document.querySelector(`${searchContainerSelector}`)

      searchContainer.style.cssText = 'display: block !important' // 修复搜索页优先隐藏
      // 在同一个执行上下文中修改多个 CSS 属性时，浏览器会将这些属性的变化合并为一个重绘和重排操作
      setTimeout(() => { searchContainer.setAttribute('show', '') }, 10)

      input.focus()
      searchOverlay.classList.add('show')
      searchFab.classList.add('active')
    }

    /**
     * 单击事件、双击事件、searchOverlay 共用的 input
     */
    let input = null

    if (page !== 'search' && page !== 'space') {
      searchFab.addEventListener('click', () => {
        input = document.querySelector(`${searchContainerSelector} input`)
        if (!input) { return }

        handleClick(input)
      })
    }

    if (page === 'search') {
      // 底部显示搜索文本
      const pageInput = document.querySelector('.search-input input')

      const searchFabText = Object.assign(document.createElement('div'), { id: 'search-fab-text', textContent: pageInput.value })
      searchFab.appendChild(searchFabText)

      searchFab.style.cssText = 'background-color: var(--graph_bg_thick); border-radius: 16px;'
      svg.style.flex = '0 0 20px'

      // 文本更新到底部搜索
      const handleInput = () => {
        searchFabText.textContent = input.value
        if (input.value === '') {
          searchFab.style.cssText = ''
          svg.style.flex = ''
        } else {
          searchFab.style.cssText = 'background-color: var(--graph_bg_thick); border-radius: 16px;'
          svg.style.flex = '0 0 20px'
        }
      }

      searchFab.addEventListener('click', () => {
        input = document.querySelector(`${searchContainerSelector} input`)
        if (!input) { return }

        clearTimeout(clickTimer)

        clickTimer = setTimeout(() => {
          handleClick(input)

          // 移除之前添加的 input 事件监听器
          input.removeEventListener('input', handleInput)

          // 模拟输入: 将文本填入底部搜索
          input.value = searchFabText.textContent
          input.dispatchEvent(new Event('input', { bubbles: true }))

          handleInput()

          input.addEventListener('input', handleInput)
        }, 300)
      })

      searchFab.addEventListener('dblclick', () => {
        if (!input) { return } // return 语句结束当前函数的执行

        clearTimeout(clickTimer)

        handleClick(input)

        input.value = ''
        input.dispatchEvent(new Event('input', { bubbles: true }))

        searchFabText.textContent = input.value
        searchFab.style.cssText = ''
        svg.style.flex = ''

        handleInput()

        input.removeEventListener('input', handleInput)
        input.addEventListener('input', handleInput)
      })
    }

    if (page === 'space') {
      // 使用 let handleInput 声明变量并在内部块中赋值时，实际上是在创建一个新的函数。即使引用移除事件监听器时能访问到 let handleInput 变量，但是此时 handleInput 变量引用的函数并不是添加事件监听器时使用的那个函数
      const spaceHandleInput = event => {
        if (event.key === 'Enter') {
          const spaceInput = document.querySelector('#navigator .space_input')
          const spaceSearchBtn = document.querySelector('#navigator .search-btn')

          event.preventDefault()
          spaceInput.value = input.value
          spaceInput.dispatchEvent(new Event('input', { bubbles: true }))
          spaceSearchBtn.click()

          searchOverlay.click()
        }
      }

      searchFab.addEventListener('click', () => {
        input = document.querySelector(`${searchContainerSelector} input`)
        if (!input) { return }

        clearTimeout(clickTimer)

        clickTimer = setTimeout(() => {
          handleClick(input)
          // 移除之前添加的 keydown 事件监听器
          input.removeEventListener('keydown', spaceHandleInput)

          // 移除事件监听器时，回调函数需要与添加事件监听器时使用的回调函数完全一致。内联定义的新箭头函数不是添加事件监听器时使用的原始回调函数
          // 引用回调函数时，形参写在函数声明中，不需要内联一个匿名函数 (匿名内部函数, 无函数名)
          input.addEventListener('keydown', spaceHandleInput)

          const searchPanel = document.querySelector('.search-panel')
          const firstChild = searchPanel.firstChild
          if (firstChild.nodeType === Node.COMMENT_NODE || !firstChild.classList.contains('space-search-tip')) {
            const spaceSearchTip = Object.assign(document.createElement('div'), {
              className: 'header space-search-tip', innerHTML: '<div class="title">搜索 up 的视频、动态</div>'
            })
            searchPanel.insertBefore(spaceSearchTip, firstChild)
          }
        }, 300)
      })

      searchFab.addEventListener('dblclick', () => {
        if (!input) { return }

        clearTimeout(clickTimer)

        handleClick(input)

        input.removeEventListener('keydown', spaceHandleInput)

        document.querySelector('.space-search-tip')?.remove()
      })
    }

    // 避免存在双击事件时的延时操作导致视频页滑动阴影无法滚动内容以及卡顿感
    searchOverlay.addEventListener('click', event => {
      event.stopPropagation()

      const searchContainer = document.querySelector(`${searchContainerSelector}`)

      searchContainer.removeAttribute('show')
      searchContainer.addEventListener('transitionend', () => { searchContainer.style.cssText = '' }, { once: true })

      searchOverlay.classList.remove('show')
      searchFab.classList.remove('active')
    })

    // 移动端 click 会先触发 touchstart, touchend 和 mousemove
    function handleTouchMove () { searchOverlay.click() } // searchOverlay.click() 返回值为 undefined
    searchOverlay.addEventListener('touchstart', () => searchOverlay.addEventListener('touchmove', handleTouchMove, { once: true }))
    searchOverlay.addEventListener('touchend', () => searchOverlay.removeEventListener('touchmove', handleTouchMove))
  }

  function setMenuBtn () {
    // 覆盖显隐，初始化加载动态、收藏、历史、主页
    const preloadeditems = [
      '.v-popover-wrap:has(>.right-entry__outside[href="//t.bilibili.com/"])',
      '.v-popover-wrap:has(>.header-favorite-container)',
      '.right-entry__outside[href="//www.bilibili.com/account/history"]',
      '.header-avatar-wrap']

    const waitRightEntry = () => {
      document.querySelector('.right-entry') ? tryPreload() : setTimeout(waitRightEntry, 200)
    }
    waitRightEntry()

    function tryPreload () {
      if (document.querySelector(preloadeditems[2])) {
        preloadeditems.forEach(item => { document.querySelector(item).dispatchEvent(new MouseEvent('mouseenter')) })
        setTimeout(handleHistoryShowMore, 50)
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
        <li data-refer=".right-entry__outside[copy]">分类</li>
        <li data-refer=".right-entry__outside[href='//message.bilibili.com']">消息</li>
        <li data-refer=".right-entry__outside[href='//t.bilibili.com/']">动态</li>
        <li data-refer=".header-favorite-container">收藏</li>
        <li data-refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li data-refer=".header-avatar-wrap--container">主页</li>
      </li>
    </div>
    `
    })
    menuFab.appendChild(menuOverlay)
    const menu = menuOverlay.querySelector('#header-in-menu')

    menuFab.addEventListener('click', () => {
      menu.classList.add('show')
      document.body.setAttribute('menu', '') // 显示消息数
      menuOverlay.classList.add('show')
      menuFab.classList.add('active')
    })

    let openedDialog = '' // sessionStorage 刷新网页不变

    const items = menuOverlay.querySelectorAll('li')
    items.forEach(item =>
      item.addEventListener('click', event => {
        event.stopPropagation()
        menu.classList.remove('show')
        document.body.removeAttribute('menu')

        const refer = item.dataset.refer

        const referElement = document.querySelector(`${refer}+.v-popover`)
        if (!referElement) {
          const toast = document.querySelector('#toast')
          toast.textContent = '请稍后，网页菜单加载中'
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

        referElement.style.display = 'block'
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
      referElement.addEventListener('transitionend', () => { referElement.style.cssText = '' }, { once: true }) // 鼠标一动就会触发 mouseleave
    })

    function handleTouchMove () { menuOverlay.click() }
    menuOverlay.addEventListener('touchstart', () => menuOverlay.addEventListener('touchmove', handleTouchMove, { once: true }))
    menuOverlay.addEventListener('touchend', () => menuOverlay.removeEventListener('touchmove', handleTouchMove))

    const falseHeader = Object.assign(document.createElement('div'), {
      className: 'bili-header false-header',
      innerHTML: categoryInnerHTML
    })
    document.body.appendChild(falseHeader)

    // 设置历史自动展开
    function handleHistoryShowMore () {
      let cursor = {}
      fetch('https://api.bilibili.com/x/web-interface/history/cursor?max=0&view_at=0&business=', { credentials: 'include' })
        .then(response => response.json())
        .then(data => { cursor = data.data.cursor })
        .catch(error => console.error(error))

      const historyContent = document.querySelector('.history-panel-popover>.header-tabs-panel__content')

      function onScroll () {
        const { scrollTop, scrollHeight, clientHeight } = historyContent
        if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

        historyContent.removeEventListener('scroll', onScroll) // 内容加载后再重新监听滚动
        setTimeout(() => { historyContent.addEventListener('scroll', onScroll) }, 2000)

        console.log('Scroll to bottom')
        fetch(`https://api.bilibili.com/x/web-interface/history/cursor?max=${cursor.max}&view_at=${cursor.view_at}&business=archive`, { credentials: 'include' })
          .then(response => response.json())
          .then(data => {
            cursor = data.data.cursor
            data.data.list.forEach(addElementByItem) // 简写形式有时需绑定 this
          })
          .catch(error => console.error(error))
      }
      historyContent.addEventListener('scroll', onScroll)

      function addElementByItem (item) {
        const record = Object.assign(document.createElement('a'), {
          href: `//www.bilibili.com/video/${item.history.bvid}/?`,
          className: 'header-history-card header-history-video',
          target: '_blank',
          'data-mod': 'top_right_bar_window_history',
          'data-idx': 'content',
          'data-ext': 'click',
          /* html */
          innerHTML: `
          <div class="header-history-video__image">
            <picture class="v-img">
              <source srcset="${formatUrl(item.cover)}@256w_144h_1c.avif" type="image/avif">
              <source srcset="${formatUrl(item.cover)}@256w_144h_1c.webp" type="image/webp">
              <img src="${formatUrl(item.cover)}@256w_144h_1c" alt="" loading="lazy" onload="" onerror="typeof window.imgOnError === 'function' &amp;&amp; window.imgOnError(this)">
            </picture>
            <div class="header-history-video__duration"><span class="header-history-video__duration--text">${formatProgressTime(item.progress) + '/' + formatProgressTime(item.duration)}</span></div>
            <div class="header-history-video__progress"><div class="header-history-video__progress--inner" style="width: ${item.progress / item.duration * 100}%; border-radius: 0px;"></div></div>
          </div>
          <div class="header-history-card__info">
            <div title="${item.title}" class="header-history-card__info--title">${item.title}</div>
            <div class="header-history-card__info--date">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="device-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.55 13C10.8262 13 11.05 13.2239 11.05 13.5C11.05 13.7761 10.8262 14 10.55 14H5.55005C5.27391 14 5.05005 13.7761 5.05005 13.5C5.05005 13.2239 5.27391 13 5.55005 13H10.55ZM13.05 2C14.1546 2 15.05 2.89543 15.05 4V10C15.05 11.1046 14.1546 12 13.05 12H3.05005C1.94548 12 1.05005 11.1046 1.05005 10V4C1.05005 2.89543 1.94548 2 3.05005 2H13.05ZM13.05 3H3.05005C2.53721 3 2.11454 3.38604 2.05678 3.88338L2.05005 4V10C2.05005 10.5128 2.43609 10.9355 2.93343 10.9933L3.05005 11H13.05C13.5629 11 13.9856 10.614 14.0433 10.1166L14.05 10V4C14.05 3.44772 13.6023 3 13.05 3Z" fill="#999999"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7 11H9L10 14H6L7 11Z" fill="#999999"></path></svg>
              <span>${formatViewTime(item.view_at)}</span>
            </div>
            <div class="header-history-card__info--name" title="${item.author_name}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="up-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.33334 5.16669C1.33334 3.78597 2.45263 2.66669 3.83334 2.66669H12.1667C13.5474 2.66669 14.6667 3.78597 14.6667 5.16669V10.8334C14.6667 12.2141 13.5474 13.3334 12.1667 13.3334H3.83334C2.45263 13.3334 1.33334 12.2141 1.33334 10.8334V5.16669ZM3.83334 3.66669C3.00492 3.66669 2.33334 4.33826 2.33334 5.16669V10.8334C2.33334 11.6618 3.00492 12.3334 3.83334 12.3334H12.1667C12.9951 12.3334 13.6667 11.6618 13.6667 10.8334V5.16669C13.6667 4.33826 12.9951 3.66669 12.1667 3.66669H3.83334ZM4.33334 5.50002C4.60949 5.50002 4.83334 5.72388 4.83334 6.00002V8.50002C4.83334 9.05231 5.28106 9.50002 5.83334 9.50002C6.38563 9.50002 6.83334 9.05231 6.83334 8.50002V6.00002C6.83334 5.72388 7.0572 5.50002 7.33334 5.50002C7.60949 5.50002 7.83334 5.72388 7.83334 6.00002V8.50002C7.83334 9.60459 6.93791 10.5 5.83334 10.5C4.72877 10.5 3.83334 9.60459 3.83334 8.50002V6.00002C3.83334 5.72388 4.0572 5.50002 4.33334 5.50002ZM9.00001 5.50002C8.72387 5.50002 8.50001 5.72388 8.50001 6.00002V10C8.50001 10.2762 8.72387 10.5 9.00001 10.5C9.27615 10.5 9.50001 10.2762 9.50001 10V9.33335H10.5833C11.6419 9.33335 12.5 8.47523 12.5 7.41669C12.5 6.35814 11.6419 5.50002 10.5833 5.50002H9.00001ZM10.5833 8.33335H9.50001V6.50002H10.5833C11.0896 6.50002 11.5 6.91043 11.5 7.41669C11.5 7.92295 11.0896 8.33335 10.5833 8.33335Z" fill="#999999"></path></svg>
              <span>${item.author_name}</span>
            </div>
          </div>
          `
        })
        historyContent.appendChild(record)
      }

      const formatUrl = url => url.slice(url.indexOf(':') + 1)

      function formatProgressTime (seconds) {
        const hrs = Math.floor(seconds / 3600) // Math.floor() 向下取整
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        return `${hrs ? (hrs + ':') : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      }

      function formatViewTime (timestamp) {
        const days = Math.floor(timestamp / 86400)
        const hrs = Math.floor((timestamp % 86400) / 3600)
        const mins = Math.floor((timestamp % 3600) / 60)

        const now = Math.floor(Date.now() / 1000)
        const today = Math.floor(now / 86400)

        const dayTextMap = {
          0: '今天',
          1: '昨天',
          2: '前天'
        }

        const dayText = dayTextMap[today - days] || (today - days) + '天前'

        return `${dayText} ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
      }
    }

    // 设置动态自动展开
    function handleDynamicShowMore () {
      let offset = ''

      let i = 0
      async function getLoadedData () {
        try {
          const response = await fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/nav?offset=${offset}`, { credentials: 'include' })
          const data = await response.json()
          offset = data.data.offset
          if (i < 2) { getLoadedData(); i++ }
        } catch (error) {
          console.error(error)
        }
      }
      getLoadedData()

      const dynamicContent = document.querySelector('.dynamic-panel-popover>.header-tabs-panel__content')
      const dynamicAll = dynamicContent.querySelector('.dynamic-all')

      let loadedTitle = []
      function onScroll () {
        const { scrollTop, scrollHeight, clientHeight } = dynamicContent
        if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

        dynamicContent.removeEventListener('scroll', onScroll) // 内容加载后再重新监听滚动
        setTimeout(() => { dynamicContent.addEventListener('scroll', onScroll) }, 2000)

        console.log('Scroll to bottom')
        fetch(`https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/nav?offset=${offset}`, { credentials: 'include' })
          .then(response => response.json())
          .then(data => {
            offset = data.data.offset
            data.data.items.forEach(checkIsLoaded) // 简写形式有时需绑定 this
          })
          .catch(error => console.error(error))

        const dynamics = dynamicAll.querySelectorAll(':scope>a')
        loadedTitle = Array.from(dynamics).map(a => a.title)
      }
      dynamicContent.addEventListener('scroll', onScroll)

      function checkIsLoaded (item) { if (!loadedTitle.includes(item.title)) { addElementByItem(item) } }

      function addElementByItem (item) {
        const record = Object.assign(document.createElement('a'), {
          href: `${item.jump_url}`,
          title: `${item.title}`,
          target: '_blank',
          'data-mod': 'top_right_bar_window_dynamic',
          'data-idx': 'content',
          'data-ext': 'click',
          /* html */
          innerHTML: `
          <div data-v-16c69722="" data-v-0290fa94="" class="header-dynamic-list-item" title="${item.title}" target="_blank">
            <div data-v-16c69722="" class="header-dynamic-container">
              <div data-v-16c69722="" class="header-dynamic__box--left"><a data-v-16c69722="" class="header-dynamic-avatar" href="${item.author.jump_url}" title="${item.author.name}" target="_blank">
                <div class="bili-avatar" style="width: 100%;height:100%;">
                  <img class="bili-avatar-img bili-avatar-face bili-avatar-img-radius" data-src="${formatUrl(item.author.face)}@96w_96h_1c_1s_!web-avatar.avif" alt="" src="${formatUrl(item.author.face)}@96w_96h_1c_1s_!web-avatar.avif">
                </div>
              </a></div>
              <div data-v-16c69722="" class="header-dynamic__box--center">
                <div data-v-16c69722="" class="dynamic-name-line">
                  <div data-v-16c69722="" class="user-name">
                    <a data-v-16c69722="" href="${item.author.jump_url}" title="${item.author.name}" target="_blank">${item.author.name}</a>
                  </div>
                </div>
                <div data-v-16c69722="" class="dynamic-info-content" title="">
                  <div data-v-0290fa94="" class="all-in-one-article-title">${item.title}</div>
                </div>
                <span data-v-0290fa94="" class="publish-time">${item.pub_time}</span>
              </div>
              <a data-v-16c69722="" class="header-dynamic__box--right" href="${item.jump_url}" target="_blank">
                <div data-v-0290fa94="" class="cover">
                  <picture data-v-0290fa94="" class="v-img">
                    <source srcset="${formatUrl(item.cover)}@164w_92h_1c.avif" type="image/avif">
                    <source srcset="${formatUrl(item.cover)}@164w_92h_1c.webp" type="image/webp">
                    <img src="${formatUrl(item.cover)}@164w_92h_1c" alt="" loading="lazy" onload="" onerror="typeof window.imgOnError === 'function' &amp;&amp; window.imgOnError(this)">
                  </picture>
                  <div data-v-0290fa94="" class="watch-later"><svg data-v-0290fa94="" class="bili-watch-later__icon"><use xlink:href="#widget-watch-later"></use></svg></div>
                </div>
              </a>
            </div>
          </div>
          `
        })
        dynamicAll.appendChild(record)
      }

      const formatUrl = url => url.slice(url.indexOf(':') + 1)
    }
  }

  function setRefreshBtn () {
    const refreshFab = document.getElementById('refresh-fab') // 返回动态 HTML Collection

    // 使用rollBtn?.click可选链操作符前的rollBtn会立即执行，如果rollBtn存在才传递该元素的click函数引用。而创建了一个新的箭头函数()=>{rollBtn?.click()}则会在监听事件触发时才执行rollBtn
    refreshFab.addEventListener('click', () => { document.querySelector('.flexible-roll-btn-inner')?.click() })
  }

  function setShowMoreBtn () {
    const showMoreFab = document.getElementById('show-more-fab')

    const handleClick = () => {
      if (page === 'search') {
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
      } else if (page === 'space') {
        const followRow = document.querySelector('.h .h-action')

        followRow?.classList.toggle('show')
        showMoreFab.classList.toggle('reverse')
      }
    }
    showMoreFab.addEventListener('click', handleClick)
  }

  // 侧边栏(使用 sessionStorage + heade style 绕过 DOM 依赖以解决刷新缓加载导致的内容跳动。head 中的 style 也会暂缓。最后确定是元素在样式表加载前的初始样式问题。)

  /**
 * 处理侧边栏事件的函数
 */
  function setSidebarBtn () {
    if (page === 'video') {
      handleVideoSidebar()
      showMoreRecommend()
    } else if (page === 'message') {
      handleMessageSidebar()
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
        const recommendFooter = document.querySelector('.rec-footer') // 自动点击
        if (!nextPlay.contains(event.target) && !recommendFooter.contains(event.target)) { closeSidebar() }
      })
    }

    function showMoreRecommend () {
      const recommendFooter = document.querySelector('.rec-footer')
      setTimeout(() => { recommendFooter?.click() }, 2000) // 直接传递 recommendFooter?.click: 可选链操作符前的 recommendFooter 条件判断将会立即执行

      document.querySelector('video').addEventListener('canplay', showMoreRecommend, { once: true })
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
}
