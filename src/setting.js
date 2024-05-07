/* global GM_getValue GM_setValue GM_registerMenuCommand */
function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }

// 脚本预加载设置
export function handleScriptPreSetting () {
  const defaultValue = [false, false, false, false, false, false]

  const css = {
    css1: `
      .bpx-player-sending-area.bpx-player-sending-area {display:none !important;}
      .left-container.left-container {padding:5px 10px 0;}
      .main-reply-box.main-reply-box {display:none !important;}
    `,
    css2: '#v_tag {display:none !important;}',
    css3: `
      .copyright.item {display:none !important;}
      .show-more {display:none;}
    `,
    css4: '.trending {display:none;}',
    css5: '.bpx-player-ctrl-volume, .bpx-player-ctrl-full, .bpx-player-ctrl-web {display: none;}',
    css6: `
      .bili-footer {display: none;}
      .vui_pagenation {padding-bottom: var(--actionbar-height);}
    `
  } // 对象的值可通过 object[key] 获取

  readScriptSetting()

  waitDOMContentLoaded(() => {
    createSettingPanel()

    GM_registerMenuCommand('元素隐藏设置', () => document.getElementById('setting-panel-style').classList.add('show'))
  })

  // 形参 diference 隐式声明成 let
  function readScriptSetting (diference) {
    // 傻逼 GM_getValue 获取未设的值就报错加阻塞线程，值不自动转字符串
    const settingShowHidden = GM_getValue('settingShowHidden', defaultValue)
    const values = Object.values(css) // 可枚举属性值，返回 [v1, v2]

    if (diference) {
      for (const [index, value] of diference.entries()) { // 可枚举属性，对数组使用获得元素为索引加值的二维数组，返回 [ [1,v1], [2,v2] ]
        if (value) {
          if (settingShowHidden[index]) {
            const scriptPreStyle = Object.assign(document.createElement('style'), {
              id: `script-pre-style-${index}`, textContent: values[index]
            })
            document.head.appendChild(scriptPreStyle)
          } else {
            document.getElementById(`script-pre-style-${index}`)?.remove()
          }
        }
      }
    } else {
      for (const [index, value] of values.entries()) {
        if (settingShowHidden[index]) {
          const scriptPreStyle = Object.assign(document.createElement('style'), {
            id: `script-pre-style-${index}`, textContent: value
          })
          document.head.appendChild(scriptPreStyle)
        }
      }
    }
  }

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-style',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">隐藏元素</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox"><span>弹幕行与评论行</span></label>
          <label><input type="checkbox"><span>标签块</span></label>
          <label><input type="checkbox"><span>转载声明</span></label>
          <label><input type="checkbox"><span>热搜榜</span></label>
          <label><input type="checkbox"><span>播放器全屏音量键</span></label>
          <label><input type="checkbox"><span>页脚导航链接</span></label>
        </div>
        <button id="setting-conform-1" class="setting-conform">确认</button>
        `
    })
    document.body.appendChild(settingPanel)

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    const oldValues = GM_getValue('settingShowHidden', defaultValue)
    for (const [index, element] of checkboxElements.entries()) {
      element.checked = oldValues[index]
    }

    settingPanel.querySelector('#setting-conform-1').addEventListener('click', () => {
      const oldValues = GM_getValue('settingShowHidden', defaultValue)
      const selectedValues = Array.from(checkboxElements).map(checkbox => checkbox.checked)

      GM_setValue('settingShowHidden', selectedValues)
      const difference = selectedValues.map((value, index) => value !== oldValues[index])

      readScriptSetting(difference)

      settingPanel.classList.remove('show')
    })
  }
}

// 脚本设置
export function handleScriptSetting () {
  // 修改顺序后，更改下面的选项变更操作
  const keyValues = {
    key1: 'ban-video-click-play',
    key2: 'ban-action-hidden',
    key3: 'message-sidebar-change-right',
    key4: 'menu-dialog-move-down'
  }

  const customKeyValues = {
    'menu-dialog-down-value': '20',
    'video-longpress-speed': '2',
    'header-image-source': 'unsplash'
  }

  if (GM_getValue('ban-action-hidden', false)) { banActionHidden() }

  function banActionHidden () {
    const style = Object.assign(document.createElement('style'), {
      id: 'ban-action-hidden',
      textContent: `
        [scroll-hidden] #actionbar,
        [scroll-hidden] .flexible-roll-btn-inner,
        [scroll-hidden] .top-btn {
          transform: none !important;
        }
      `
    })
    document.head.appendChild(style)
  }

  if (GM_getValue('message-sidebar-change-right', false)) { messageSidebarRight() }

  function messageSidebarRight () {
    const style = Object.assign(document.createElement('style'), {
      id: 'message-sidebar-change-right',
      textContent: `
        .space-left.space-left { left: 100%; }      
        body>.container[sidebar] .space-left.space-left { transform: translateX(-100%); }

      `
    })
    document.head.appendChild(style)
  }

  if (GM_getValue('menu-dialog-move-down', false)) { menuDialogDown() }

  function menuDialogDown () {
    const downValue = GM_getValue('menu-dialog-move-down-value', '20')

    const style = Object.assign(document.createElement('style'), {
      id: 'menu-dialog-move-down',
      textContent: `
      .bili-header__bar .v-popover.v-popover {
          top: unset !important;
          bottom: var(--actionbar-height);
          transform: translate(-50%, -${downValue}px) !important;
        }
      `
    })
    document.head.appendChild(style)
  }

  createSettingPanel()

  GM_registerMenuCommand('操作偏好设置', () => document.getElementById('setting-panel-preference').classList.add('show'))

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-preference',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">操作偏好</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox"><span>禁用点击视频播放/暂停</span></label>
          <label><input type="checkbox"><span>禁止底栏滚动时隐藏</span></label>
          <label><input type="checkbox"><span>消息页侧边栏靠右</span></label>
          <label><input type="checkbox" class="menu-dialog-move-down"><span>菜单弹窗(收藏、历史等)靠下</span></label>
          <label><input type="number" value="20" class="menu-dialog-move-down-value"><span>自定义菜单弹窗底边距</span></label>
          <label><input type="number" value="2" class="video-longpress-speed"><span>自定义视频长按倍速</span></label>
          <label><select class="header-image-source">
              <option value="unsplash">unsplash</option>
              <option value="bing">必应每日</option>
              <option value="local">本地图片</option>
            </select><details><summary>主页头图换源</summary>本地图片限制大小</details></label>
          </div>
          <button id="setting-conform-2" class="setting-conform">确认</button>
        `
    })
    document.body.appendChild(settingPanel)

    const values = Object.values(keyValues) // 返回 [v1, v2]
    const customKeys = Object.keys(customKeyValues)
    const customValues = Object.values(customKeyValues)

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    for (const [index, value] of values.entries()) { // 返回 [ [1,v1], [2,v2] ]
      checkboxElements[index].checked = GM_getValue(value, false)
    }

    const customElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="number"], .setting-checkboxes select')
    for (const [index, value] of customKeys.entries()) {
      customElements[index].value = GM_getValue(value, Object.values(customValues)[index])
    }

    settingPanel.querySelector('#setting-conform-2').addEventListener('click', () => {
      settingPanel.classList.remove('show')

      const selectedValues = Array.from(checkboxElements).map(checkbox => checkbox.checked)
      const writenValues = Array.from(customElements).map(elem => elem.value)

      if (selectedValues[1] !== GM_getValue(values[1], false)) { selectedValues[1] ? banActionHidden() : document.getElementById(values[1]).remove() }
      if (selectedValues[2] !== GM_getValue(values[2], false)) { selectedValues[2] ? messageSidebarRight() : document.getElementById(values[2]).remove() }
      if (selectedValues[3] !== GM_getValue(values[3], false)) { selectedValues[3] ? menuDialogDown() : document.getElementById(values[3]).remove() }

      if (writenValues[0] !== GM_getValue(customKeys[0], customValues[0])) { document.getElementById(customKeys[0])?.remove(); menuDialogDown() }
      if (writenValues[2] !== GM_getValue(customKeys[2], customValues[2])) {
        writenValues[2] !== 'local' && window.dispatchEvent(new CustomEvent('variableChanged', { detail: { key: customKeys[2], newValue: writenValues[2] } }))
      }

      for (const [index, value] of values.entries()) { GM_setValue(value, selectedValues[index]) }
      for (const [index, value] of customKeys.entries()) { GM_setValue(value, writenValues[index]) }
    })

    settingPanel.querySelector('.header-image-source').addEventListener('change', event => {
      // unsafeWindow.document.querySelector('.header-image-source').addEventListener('change', () => { console.log(this.value) })
      if (event.target.value === 'local') {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.addEventListener('change', () => {
          const file = input.files[0]
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const base64Data = reader.result
            localStorage.setItem('header-image', base64Data)
          }
        })
        input.click()
      }
    })
  }
}
