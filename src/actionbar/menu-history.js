import { getHistoryList } from '../api.js'

// 设置历史自动展开
export async function handleHistoryShowMore () {
  let cursor = {
    max: 0,
    // eslint-disable-next-line camelcase
    view_at: 0
  }

  const data = await getHistoryList(cursor)
  cursor = data.cursor

  const historyContent = document.querySelector('.history-panel-popover>.header-tabs-panel__content')

  async function onScroll () {
    const { scrollTop, scrollHeight, clientHeight } = historyContent
    if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

    historyContent.removeEventListener('scroll', onScroll) // 内容加载后再重新监听滚动
    setTimeout(() => { historyContent.addEventListener('scroll', onScroll) }, 2000)
    console.log('Scroll to bottom')

    const data = await getHistoryList(cursor)
    cursor = data.cursor
    data.list.forEach(addElementByItem) // 简写形式有时需绑定 this
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
      // /* html */
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
