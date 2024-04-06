/* global GM_getValue GM_setValue GM_registerMenuCommand */
function waitDOMContentLoaded (callback) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback() }
function ensureHeadGetted (element) { document.head ? document.head.appendChild(element) : waitDOMContentLoaded(document.head.appendChild(element)) }

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
      .show-more {display:none;}`,
    css4: '.trending {display:none;}',
    css5: '.bpx-player-ctrl-volume, .bpx-player-ctrl-full, .bpx-player-ctrl-web {position:fixed !important; z-index:-10; visibility:hidden;}',
    css6: '.bpx-player-contextmenu {display:none;}'
  } // 对象的值可通过 object[key] 获取

  readScriptSetting()

  waitDOMContentLoaded(() => {
    createSettingPanel()

    GM_registerMenuCommand('元素隐藏设置', () => {
      document.getElementById('setting-panel-style').classList.add('show')
    })
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
              id: `script-pre-style-${index}`,
              textContent: values[index]
            })
            ensureHeadGetted(scriptPreStyle)
          } else {
            document.head
              ? document.getElementById(`script-pre-style-${index}`)?.remove()
              : waitDOMContentLoaded(document.getElementById(`script-pre-style-${index}`))
          }
        }
      }
    } else {
      for (const [index, value] of values.entries()) {
        if (settingShowHidden[index]) {
          const scriptPreStyle = Object.assign(document.createElement('style'), {
            id: `script-pre-style-${index}`,
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
        <div class="setting-title">隐藏元素</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox"><span>弹幕行与评论行</span></label>
          <label><input type="checkbox"><span>标签块</span></label>
          <label><input type="checkbox"><span>转载声明</span></label>
          <label><input type="checkbox"><span>热搜榜</span></label>
          <label><input type="checkbox"><span>播放器全屏音量键</span></label>
          <label><input type="checkbox"><span>视频色彩音效调节</span></label>
        </div>
        `
    })

    const settingConform = Object.assign(document.createElement('button'), {
      className: 'setting-conform',
      textContent: '确认'
    })

    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    const oldValues = GM_getValue('settingShowHidden', defaultValue)
    for (const [index, element] of checkboxElements.entries()) {
      element.checked = oldValues[index]
    }

    settingConform.addEventListener('click', () => {
      const oldValues = GM_getValue('settingShowHidden', defaultValue)
      const selectedValues = Array.from(checkboxElements).map(checkbox => checkbox.checked)

      GM_setValue('settingShowHidden', selectedValues)
      const difference = selectedValues.map((value, index) => value !== oldValues[index])

      readScriptSetting(difference)

      settingPanel.classList.remove('show')
    })

    settingPanel.appendChild(settingConform)
    document.body.appendChild(settingPanel)
  }
}

// 脚本设置
export function handleScriptSetting () {
  const keyValue = {
    key1: 'full-unmuted',
    key2: 'ban-action-hidden',
    key3: 'custom-longpress-speed'
  }

  if (GM_getValue('ban-action-hidden', false) === true) {
    banActionHidden()
  }

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

    GM_registerMenuCommand('操作偏好设置', () => {
      document.getElementById('setting-panel-preference').classList.add('show')
    })
  })

  function createSettingPanel () {
    const settingPanel = Object.assign(document.createElement('div'), {
      id: 'setting-panel-preference',
      className: 'setting-panel',
      innerHTML: `
        <div class="setting-title">操作偏好</div>
        <div class="setting-checkboxes">
          <label><input type="checkbox"><span>用底部全屏键播放和打开声音</span></label>
          <label><input type="checkbox"><span>禁止底栏滚动时隐藏</span></label>
          <label><input type="number" value="2"><span>自定义视频长按倍速</span></label>
        </div>
        `
    })

    const settingConform = Object.assign(document.createElement('button'), {
      className: 'setting-conform',
      textContent: '确认'
    })

    const speedIndex = 2

    const values = Object.values(keyValue) // 返回 [v1, v2]
    const checkboxElements = settingPanel.querySelectorAll('.setting-checkboxes input[type="checkbox"]')
    for (const [index, value] of values.entries()) { // 返回 [ [1,v1], [2,v2] ]
      if (index !== speedIndex) {
        checkboxElements[index].checked = GM_getValue(value, false)
      }
    }
    settingPanel.querySelector('input[type="number"]').value = GM_getValue(values[speedIndex], 2)

    settingConform.addEventListener('click', () => {
      const isBanActionHidden = GM_getValue('ban-action-hidden', false)

      for (const [index, value] of values.entries()) {
        if (index !== speedIndex) {
          GM_setValue(value, checkboxElements[index].checked)
        }
      }
      GM_setValue(values[speedIndex], Number(settingPanel.querySelector('input[type="number"]').value))
      settingPanel.classList.remove('show')

      const newIsBanActionHidden = GM_getValue('ban-action-hidden', false)
      if (newIsBanActionHidden !== isBanActionHidden) {
        if (newIsBanActionHidden) {
          banActionHidden()
        } else {
          document.getElementById('ban-action-hidden').remove()
        }
      }
    })

    settingPanel.appendChild(settingConform)
    document.body.appendChild(settingPanel)
  }
}
