import { hideHeader } from './actionbar.js'
// eslint-disable-next-line no-undef
const _unsafeWindow = /* @__PURE__ */ (() => (typeof unsafeWindow !== 'undefined' ? unsafeWindow : window))() // 立即执行表达式只调用一次

function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }
function ensureHeadGetted (element) { document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element)) }

// 脚本预加载设置
export function handleScriptPreSetting () {
  const defaultValue = [0, 0, 0, 0, 0]

  const css = {
    css1: `
      .bpx-player-sending-area.bpx-player-sending-area {display: none !important;}
      .left-container.left-container {padding: calc(var(--video-height) + 5px ) 10px 0;}
    `,
    css2: '.main-reply-box.main-reply-box {display: none !important;}',
    css3: '#v_tag {display: none !important;}',
    css4: `
      .copyright.item {display: none !important;}
      .show-more {display: none;}`,
    css5: '.trending {display: none;}',
    css6: '.bpx-player-ctrl-volume, .bpx-player-ctrl-full {position: fixed !important;z-index: -10;visibility: hidden;}',
    css7: '.bpx-player-contextmenu {display: none;}'
  }

  readScriptSetting()

  waitDOMContentLoaded(() => {
    createSettingPanel()

    // eslint-disable-next-line no-undef
    GM_registerMenuCommand('元素隐藏设置', () => {
      document.getElementById('setting-panel-style').classList.add('show')
    })
  })

  // 形参 diference 隐式声明成 let
  function readScriptSetting (diference) {
    diference = diference || false

    const settingShowHidden = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
    const values = Object.values(css)

    if (diference) {
      for (const [index, value] of diference.entries()) {
        if (value) {
          if (settingShowHidden[index]) {
            const scriptPreStyle = Object.assign(document.createElement('style'), {
              id: `script-pre-style-${index + 1}`,
              textContent: css[`css${index + 1}`]
            })
            ensureHeadGetted(scriptPreStyle)
          } else {
            document.head
              ? document.getElementById(`script-pre-style-${index + 1}`)?.remove()
              : waitDOMContentLoaded(document.getElementById(`script-pre-style-${index + 1}`))
          }
        }
      }
    } else {
      for (const [index, value] of values.entries()) {
        if (settingShowHidden[index]) {
          const scriptPreStyle = Object.assign(document.createElement('style'), {
            id: `script-pre-style-${index + 1}`,
            textContent: value
          })
          ensureHeadGetted(scriptPreStyle)
        }
      }
    }
  }

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-style',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">选择隐藏元素：</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox" value="1"><span>弹幕行</span></label>
          <label><input type="checkbox" value="2"><span>评论行</span></label>
          <label><input type="checkbox" value="3"><span>标签块</span></label>
          <label><input type="checkbox" value="4"><span>转载声明</span></label>
          <label><input type="checkbox" value="5"><span>热搜榜</span></label>
          <label><input type="checkbox" value="6"><span>播放器全屏音量键</span></label>
          <label><input type="checkbox" value="7"><span>视频色彩音效调节</span></label>
        </div>
        `
    })

    const settingConform = Object.assign(document.createElement('button'), {
      class: 'setting-conform',
      textContent: '确认'
    })

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    const oldValues = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
    for (const [index, value] of oldValues.entries()) {
      checkboxElements[index].checked = value
    }

    settingConform.addEventListener('click', () => {
      const oldValues = JSON.parse(localStorage.getItem('settingShowHidden')) || defaultValue
      const selectedValues = Array.from(checkboxElements).map((checkbox) => (checkbox.checked ? 1 : 0))

      localStorage.setItem('settingShowHidden', JSON.stringify(selectedValues))
      const difference = selectedValues.map((value, index) => (value === oldValues[index] ? 0 : 1))

      readScriptSetting(difference)

      settingPanel.classList.remove('show')
    })

    settingPanel.appendChild(settingConform)
    document.body.appendChild(settingPanel)
  }
}

// 脚本设置
export function handleScriptSetting () {
  const defaultValue = '0'

  const keyValue = {
    key1: 'full-unmuted',
    key2: 'ban-action-hidden',
    key3: 'header-in-menu'
  }

  if ((localStorage.getItem('ban-action-hidden') || '0') === '1') { banActionHidden() }
  if ((localStorage.getItem('header-in-menu') || '0') === '1') { headerInMenu() }

  function banActionHidden () {
    const style = Object.assign(document.createElement('style'), {
      id: 'ban-action-hidden',
      textContent: `
        [scroll-hidden=true] #actionbar,
        [scroll-hidden=true] .flexible-roll-btn-inner,
        [scroll-hidden=true] .top-btn {
          transform: none !important;
        }
      `
    })
    ensureHeadGetted(style)
  }

  waitDOMContentLoaded(() => {
    createSettingPanel()

    // eslint-disable-next-line no-undef
    GM_registerMenuCommand('操作偏好设置', () => {
      document.getElementById('setting-panel-preference').classList.add('show')
    })
  })

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-preference',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">选择操作偏好：</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox" value="1"><span>用底部全屏键播放和打开声音</span></label>
          <label><input type="checkbox" value="2"><span>禁止底栏滚动时隐藏</span></label>
          <label><input type="checkbox" value="3"><span>以菜单形式打开原顶栏入口</span></label>
        </div>
        `
    })

    const settingConform = Object.assign(document.createElement('button'), {
      class: 'setting-conform',
      textContent: '确认'
    })

    const values = Object.values(keyValue)
    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    for (const [index, value] of values.entries()) {
      checkboxElements[index].checked = (localStorage.getItem(value) || defaultValue) === '1'
    }

    settingConform.addEventListener('click', () => {
      const isBanActionHidden = localStorage.getItem('ban-action-hidden') || '0'
      const isHeaderInMenu = localStorage.getItem('header-in-menu') || '0'

      for (const [index, value] of values.entries()) {
        localStorage.setItem(value, checkboxElements[index].checked ? '1' : '0')
      }
      settingPanel.classList.remove('show')

      const newIsBanActionHidden = localStorage.getItem('ban-action-hidden')
      if (newIsBanActionHidden !== isBanActionHidden) {
        if (newIsBanActionHidden === '1') {
          banActionHidden()
        } else {
          document.getElementById('ban-action-hidden').remove()
        }
      }

      const newIsHeaderInMenu = localStorage.getItem('header-in-menu')
      if (newIsHeaderInMenu !== isHeaderInMenu) {
        if (newIsHeaderInMenu === '1') {
          headerInMenu()
          if ((localStorage.getItem('hidden-header') || '0') !== '1') {
            hideHeader()
            localStorage.setItem('hidden-header', '1')
          }
        } else {
          document.getElementById('menu-overlay').remove()
        }
      }
    })

    settingPanel.appendChild(settingConform)
    document.body.appendChild(settingPanel)
  }
}

export function headerInMenu () {
  const menuOverlay = Object.assign(document.createElement('div'), {
    id: 'menu-overlay',
    innerHTML: `
    <div id="header-in-menu">
      <ul>
        <li refer=".right-entry--message">私信</li>
        <li refer=".right-entry__outside[href='//t.bilibili.com/']">动态</li>
        <li refer=".header-favorite-container">收藏</li>
        <li refer=".right-entry__outside[href='//www.bilibili.com/account/history']">历史</li>
        <li refer=".header-avatar-wrap">主页</li>
      </li>
    </div>
    `
  })
  waitDOMContentLoaded(() => {
    addMenu()

    function addMenu () {
      if (document.getElementsByClassName('header-avatar-wrap')[0]) {
        const menuFab = document.getElementById('menu-fab')
        menuFab.appendChild(menuOverlay)

        const items = menuOverlay.querySelectorAll('li')
        const header = document.getElementsByClassName('bili-header__bar')[0]
        items.forEach(item => {
          item.addEventListener('click', (event) => {
            event.stopPropagation()
            const refer = item.getAttribute('refer')

            const openedDailog = sessionStorage.getItem('opened-dailog') || ''
            if (openedDailog) simulateMouseLeave(header.querySelector(openedDailog))

            simulateMouseEnter(header.querySelector(refer))
            sessionStorage.setItem('opened-dailog', refer)
          })
        })

        const menu = menuOverlay.querySelector('#header-in-menu')

        menuOverlay.addEventListener('click', (event) => {
          event.stopPropagation()
          const openedDailog = sessionStorage.getItem('opened-dailog') || ''
          if (openedDailog) simulateMouseLeave(header.querySelector(openedDailog))

          if (event.target !== menu) {
            menu.style.display = 'block'
            menu.classList.remove('show')
            setTimeout(() => {
              menu.style.display = ''
            }, 400)
          }
        })
      } else {
        setTimeout(addMenu, 500)
      }
    }

    function simulateMouseEnter (element) {
      const event = new MouseEvent('mouseenter', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }

    function simulateMouseLeave (element) {
      const event = new MouseEvent('mouseleave', { bubbles: true, view: _unsafeWindow })
      element.dispatchEvent(event)
    }
  })
}
