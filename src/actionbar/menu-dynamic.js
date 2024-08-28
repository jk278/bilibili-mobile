import { getDynamicList } from '../api.js'

// 设置动态自动展开
export function handleDynamicShowMore () {
  let offset = ''

  let i = 0
  async function getLoadedData () {
    const data = await getDynamicList(offset)
    offset = data.offset
    if (i < 2) { getLoadedData(); i++ }
  }
  getLoadedData()

  const dynamicContent = document.querySelector('.dynamic-panel-popover>.header-tabs-panel__content')
  const dynamicAll = dynamicContent.querySelector('.dynamic-all')

  let loadedTitle = []

  async function onScroll () {
    const { scrollTop, scrollHeight, clientHeight } = dynamicContent
    if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) { return }

    dynamicContent.removeEventListener('scroll', onScroll) // 内容加载后再重新监听滚动
    setTimeout(() => { dynamicContent.addEventListener('scroll', onScroll) }, 2000)
    console.log('Scroll to bottom')

    const data = await getDynamicList(offset)
    offset = data.offset
    data.items.forEach(checkIsLoaded) // 简写形式有时需绑定 this

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
      // /* html */
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
