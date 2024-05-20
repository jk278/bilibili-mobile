import { getVideoInfo, getJudgeAI, getAIConclusion } from './api.js'

// 控制首页头图函数
export function handleHeaderImage () {
  let source
  // eslint-disable-next-line no-undef
  source = GM_getValue('custom-header-image-source', 'unsplash')

  const key = 'header-image'
  const formattedDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/')
  const url = source === 'unsplash' ? 'https://source.unsplash.com/random/840x400' : `https://api.ee123.net/img/bingimg/${formattedDate}.jpg`

  const elementSelector = '.bili-header__banner'

  loadImage(key, elementSelector)

  if (source !== 'local') { setTimeout(renewImage, 5000) }

  window.addEventListener('variableChanged', e => {
    if (e.detail.key === 'header-image-source') {
      source = e.detail.newValue
      setTimeout(renewImage, 0)
    }
  })

  async function renewImage () {
    try {
      const img = await getImage(url)
      const base64Data = imageToBase64(img)
      storeImage(key, base64Data)
    } catch (error) {
      console.error('Failed to get image:', error)
    }
  }

  function getImage (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = url
      img.onload = () => resolve(img)
      img.onerror = reject
    })
  }

  function imageToBase64 (img) {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL('image/jpeg')
  }

  function storeImage (key, base64Data) {
    localStorage.setItem(key, base64Data)
  }

  function loadImage (key, elementSelector) {
    const base64Data = localStorage.getItem(key)
    if (base64Data) {
      const style = document.createElement('style')
      style.innerHTML = `
        ${elementSelector}::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-image: url(${base64Data});
        background-size: cover;
        background-position: center;
        }
      `
      document.head.appendChild(style)
    } else {
      // 如果本地存储中不存在图片数据，则从 URL 中获取图片
      getImage(url).then((img) => {
        const base64Data = imageToBase64(img)
        storeImage(key, base64Data)
        loadImage(key, elementSelector)
      }).catch(error => console.error('Failed to get image:', error))
    }
  }
}

// 处理视频卡片
export function handleVideoCard () {
  judgeHasAi()

  let isLoading = false
  // 获取AI总结
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (isLoading) { return }

      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('bili-video-card')) {
          isLoading = true
          setTimeout(() => {
            judgeHasAi()
            isLoading = false
          }, 2000) // 两秒后获取 AI 总结判断
        }
      })
    })
  }).observe(document.querySelector('.recommended-container_floor-aside>.container'), { childList: true })

  function judgeHasAi () {
    const imageLinks = document.querySelectorAll('.bili-video-card__image--link')

    let delay = 0 // 初始化延迟变量
    imageLinks.forEach(async link => {
      await new Promise(resolve => setTimeout(resolve, delay)) // 在每次循环前等待当前延迟时间

      const card = link.closest('.bili-video-card:not(:has(.bili-video-card__info--ad))') // 排除广告卡片
      if (card) {
        if (!link.dataset.hasJudgedAi) {
          const aiJudgeRes = await judge(card)
          if (aiJudgeRes) { card.dataset.hasAi = true }
          delay += 100 // 将下一次循环的延迟时间往后延长 100 毫秒
        }
        link.dataset.hasJudgedAi = true
      }
    })
  }

  /**
   * 存储已点击卡片
   */
  let lastPreviewCard = null

  // 添加预览视频选项
  new MutationObserver(mutations => {
    mutations.forEach(async mutation => {
      const firstChild = mutation.addedNodes[0]?.firstChild // 未添加节点时 addedNodes 返回 []
      if (firstChild && firstChild.className === 'v-popover is-bottom-end') {
        const panel = firstChild.querySelector('.bili-video-card__info--no-interest-panel') // 不能用 document，直接切换不同视频面板时先添加第二个再移除第一个

        const previewOption = Object.assign(document.createElement('div'), {
          className: 'bili-video-card__info--no-interest-panel--item',
          textContent: '预览此视频'
        })
        panel.insertBefore(previewOption, panel.firstChild)

        previewOption.addEventListener('click', event => { onPreviewOptionClick(event, firstChild) }) // 移除父元素时，监听器和观察器均移除

        function getCard () {
          return new Promise(resolve => {
            setTimeout(() => {
              // 切换时筛选未使用的那一个
              const btn = document.querySelector('.bili-video-card__info--no-interest.active:not(.use)')
              const card = btn.closest('.bili-video-card')
              btn.classList.add('use') // 新按钮添加使用状态
              resolve(card)
            }, 50) // 等待按钮添加 active 类，切换时旧按钮即移除 active 类需要 200 ms
          })
        }

        const card = await getCard() // 异步函数返回结果，使用 async ... await 暂停执行，或使用 then 等待 promise 对象解析

        const hasAi = card.dataset.hasAi
        if (!hasAi) {
          return
        }

        const AIOption = Object.assign(document.createElement('div'), {
          className: 'bili-video-card__info--no-interest-panel--item',
          textContent: '生成视频总结'
        })
        panel.insertBefore(AIOption, previewOption.nextSibling)

        AIOption.addEventListener('click', async event => {
          event.stopPropagation()
          firstChild.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true })) // 面板鼠标移出，面板或按键的鼠标移入事件均会显示面板，此时后续事件按键自动鼠标移出

          const aiCardElement = createAICardElement(card.querySelector('.bili-video-card__image--wrap'))
          const aiConclusionRes = await aiConclusion(card)
          const bvid = card.querySelector('.bili-video-card__image--link').dataset.bvid
          genterateAIConclusionCard(aiConclusionRes, aiCardElement, bvid)
        })
      }
    })
  }).observe(document.body, { childList: true })

  // 先由外到内冒泡鼠标移入事件，再由内到外冒泡点击事件
  // 添加点击关闭逻辑，展开时才触发
  window.addEventListener('click', event => {
    const btn = document.querySelector('.bili-video-card__info--no-interest.active')
    if (btn?.contains(event.target)) {
      btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      btn.classList.remove('use') // 切换完成后才执行，移除旧按钮的使用状态

      btn.addEventListener('click', () => {
        btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      }, { once: true })
    }
  })

  /**
   * 预览按钮点击回调
   * @param {MouseEvent} event
   * @param {ChildNode} firstChild
   */
  function onPreviewOptionClick (event, firstChild) {
    event.stopPropagation()
    firstChild.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true })) // 面板或按键的鼠标移入事件均会显示面板，但此时后续事件按键自动鼠标移出

    // 先退出预览，否则切换时跳过前一个卡片
    window.addEventListener('click', () => {
      lastPreviewCard?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    }, { once: true })

    const card = document.querySelector('.bili-video-card__info--no-interest.active').closest('.bili-video-card')
    const cardEventWrap = card.querySelector('.bili-video-card__image--wrap')
    cardEventWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true })) // 移入移出状态不会叠加
    lastPreviewCard = cardEventWrap

    if (!cardEventWrap.querySelector('.inline-progress-bar')) {
      const intervalId = setInterval(() => {
        if (cardEventWrap.querySelector('video')) {
          createProgressBar()
          clearInterval(intervalId)
        }
      }, 1000)
    }

    function createProgressBar () {
      // 创建进度条
      const progressBar = Object.assign(document.createElement('div'), {
        className: 'inline-progress-bar',
        innerHTML: '<div class="inline-progress-bar-filled"></div><div class="inline-progress-bar-thumb"></div>'
      })
      cardEventWrap.appendChild(progressBar)

      // 获取视频元素和进度条元素
      const video = cardEventWrap.querySelector('video')
      const progressBarFilled = progressBar.querySelector('.inline-progress-bar-filled')
      const progressBarThumb = progressBar.querySelector('.inline-progress-bar-thumb')

      const progressBarWidth = progressBar.offsetWidth

      function updateProgressBar (progress) {
        progressBarFilled.style.width = `${progress * 100}%`
        progressBarThumb.style.left = `${progress * progressBarWidth}px`
      }

      // 为视频元素添加时间更新事件监听器
      video.addEventListener('timeupdate', () => {
        const initialProgress = video.currentTime / video.duration
        const progress = Math.min(Math.max(initialProgress, 0), 1)
        updateProgressBar(progress)
      }, true) // 避免被下面拦截，先执行捕获，再执行冒泡，默认为 false

      // 阻止后续捕获阶段监听器执行
      // 同一事件传播阶段中，监听器的执行顺序按照添加的顺序依次执行。不同事件传播阶段中，捕获阶段的监听器总是先于冒泡阶段的监听器执行。
      video.addEventListener('timeupdate', event => { event.stopImmediatePropagation() }, true)

      function onTouchEvent (event) {
        const initialProgress = (event.touches[0].clientX - progressBar.getBoundingClientRect().left) / progressBarWidth // offsetLeft 是相对于父元素的
        const progress = Math.min(Math.max(initialProgress, 0), 1)

        updateProgressBar(progress)

        video.currentTime = progress * video.duration
      }

      progressBar.addEventListener('touchstart', event => {
        onTouchEvent(event)
        document.addEventListener('touchmove', onTouchEvent)
      })

      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', onTouchEvent)
      })

      progressBar.addEventListener('click', event => {
        event.preventDefault() // a 标签内部元素默认事件
        event.stopPropagation() // 避免全局点击退出预览
      })
    }
  }

  /**
   * 判断是否有 AI 总结
   * @param {object} card 点击视频卡片
   * @returns AI 响应 data 节点
   */
  async function judge (card) {
    const cardImageLinkElement = card.querySelector('.bili-video-card__image--link')
    const match = /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.dataset.targetUrl) || /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.href)
    const bvid = match[1] // 第二个元素才是捕获组

    try {
      const videoInfo = await getVideoInfo(bvid)
      cardImageLinkElement.dataset.cid = videoInfo.cid
      cardImageLinkElement.dataset.bvid = videoInfo.bvid
      cardImageLinkElement.dataset.upMid = videoInfo.owner.mid
      const cid = videoInfo.cid
      const up_mid = videoInfo.owner.mid

      const aiJudgeRes = await getJudgeAI({ bvid, cid, up_mid })

      if (aiJudgeRes.judge === 1) {
        return true
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 临时缓存 AI 响应
   */
  const aiData = {}

  /**
 * 获取 AI 总结
 * @param {object} card 点击视频卡片
 * @returns AI 响应 data 节点
 */
  async function aiConclusion (card) {
    const cardImageLinkElement = card.querySelector('.bili-video-card__image--link')
    const match = /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.dataset.targetUrl) || /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.href)
    const bvid = match[1] // 第二个元素才是捕获组

    if (aiData[bvid] && aiData[bvid].code === 0) {
      return aiData[bvid]
    }

    if (cardImageLinkElement.dataset.hasGotAi === undefined) {
      const cid = cardImageLinkElement.dataset.cid
      const up_mid = cardImageLinkElement.dataset.upMid
      const aiConclusionRes = await getAIConclusion({ bvid, cid, up_mid })

      aiData[bvid] = aiConclusionRes
      cardImageLinkElement.dataset.hasGotAi = true
      if (aiConclusionRes.code === 0) {
        return aiData[bvid]
      }
    }
  }

  /**
   * 创建AI卡片
   */
  const createAICardElement = cardElement => {
    const overlay = Object.assign(document.createElement('div'), {
      id: 'ai-conclusion-overlay',
      innerHTML: `
    <div class="ai-conclusion-card resizable-component">
      <div class="ai-conclusion-card-header">正在加载 AI 总结</div>
    </div>
    `
    })

    cardElement.closest('.bili-video-card').appendChild(overlay)
    overlay.classList.add('show')

    overlay.addEventListener('click', () => {
      overlay.classList.remove('show')
      overlay.addEventListener('transitionend', overlay.remove)
    }, { once: true }) // 移除元素后监听器不会自动消失 (需要移除父元素)

    const div = overlay.querySelector('.ai-conclusion-card')
    div.addEventListener('click', event => event.stopPropagation())

    return div
  }

  /**
   * 生成AI总结
   */
  const genterateAIConclusionCard = (aiConclusionRes, aiCardElement, bvid) => {
    let aiCard = ''
    const { model_result: modelResult } = aiConclusionRes

    aiCard = `
    <div class="ai-conclusion-card-header">
      <div class="ai-conclusion-card-header-left">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="ai-summary-popup-icon"><g clip-path="url(#clip0_8728_3421)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.54 2.348a1.5 1.5 0 0 1 2.112.192l2.5 3a1.5 1.5 0 0 1-2.304 1.92l-2.5-3a1.5 1.5 0 0 1 .192-2.112z" fill="url(#paint0_linear_8728_3421)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.96 2.348a1.5 1.5 0 0 0-2.112.192l-2.5 3a1.5 1.5 0 0 0 2.304 1.92l2.5-3a1.5 1.5 0 0 0-.192-2.112z" fill="url(#paint1_linear_8728_3421)"/><path d="M27 18.253C27 25.021 21.627 27 15 27S3 25.02 3 18.253C3 11.486 3.923 6 15 6c11.538 0 12 5.486 12 12.253z" fill="#D9D9D9" opacity=".2" filter="url(#filter0_d_8728_3421)"/><path d="M28 18.949C28 26.656 22.18 28 15 28S2 26.656 2 18.949C2 10 3 6 15 6c12.5 0 13 4 13 12.949z" fill="url(#paint2_linear_8728_3421)" filter="url(#filter1_ii_8728_3421)"/><path d="M4.786 14.21c0-2.284 1.659-4.248 3.925-4.52 4.496-.539 8.057-.559 12.602-.01 2.257.274 3.902 2.234 3.902 4.507v5.005c0 2.14-1.46 4.034-3.57 4.396-4.742.815-8.474.658-13.086-.074-2.197-.35-3.773-2.282-3.773-4.506v-4.799z" fill="#191924"/><path d="M19.643 15.313v2.785" stroke="#2CFFFF" stroke-width="2.4" stroke-linecap="round"/><path d="M10.357 14.852l1.858 1.857-1.858 1.857" stroke="#2CFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g><defs><filter id="filter0_d_8728_3421" x="1" y="4" width="30" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="1" dy="1"/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0.039545 0 0 0 0 0.0845023 0 0 0 0 0.200107 0 0 0 0.85 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_8728_3421"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_8728_3421" result="shape"/></filter><filter id="filter1_ii_8728_3421" x="0" y="4.143" width="30.786" height="26.643" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="2.786" dy="3.714"/><feGaussianBlur stdDeviation="1.393"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/><feBlend in2="shape" result="effect1_innerShadow_8728_3421"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="-2" dy="-1.857"/><feGaussianBlur stdDeviation="1.857"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0.15445 0 0 0 0 0.454264 0 0 0 0.11 0"/><feBlend in2="effect1_innerShadow_8728_3421" result="effect2_innerShadow_8728_3421"/></filter><linearGradient id="paint0_linear_8728_3421" x1="6.804" y1="2.849" x2="9.019" y2="8.297" gradientUnits="userSpaceOnUse"><stop stop-color="#393946"/><stop offset=".401" stop-color="#23232E"/><stop offset="1" stop-color="#191924"/></linearGradient><linearGradient id="paint1_linear_8728_3421" x1="22.696" y1="2.849" x2="20.481" y2="8.297" gradientUnits="userSpaceOnUse"><stop stop-color="#393946"/><stop offset=".401" stop-color="#23232E"/><stop offset="1" stop-color="#191924"/></linearGradient><linearGradient id="paint2_linear_8728_3421" x1="7.671" y1="10.807" x2="19.931" y2="29.088" gradientUnits="userSpaceOnUse"><stop stop-color="#F4FCFF"/><stop offset="1" stop-color="#EAF5F9"/></linearGradient><clipPath id="clip0_8728_3421"><path fill="#fff" d="M0 0h30v30H0z"/></clipPath></defs></svg>
        <span class="tips-text">已为你生成视频总结</span>
      </div>
    </div>
    <div class="ai-conclusion-card-summary">
    ${modelResult.summary}
    </div>
    `
    modelResult.outline.forEach(item => {
      aiCard += `
      <div class="ai-conclusion-card-selection">
        <div class="ai-conclusion-card-selection-title">${item.title}</div>
        ${item.part_outline
          .map(
            s => `
          <a class="bullet" href="https://www.bilibili.com/video/${bvid}/?t=${s.timestamp}s">
            <span class="ai-conclusion-card-selection-timer">${timeNumberToTime(s.timestamp)}</span>
            <span>${s.content}</span>
          </a>
        `
          )
          .join('')}
      </div>
      `
    })

    // 函数表达式 ( const timeNumberToTime = time => {...} ) 不会被提升（Hoisted）到当前作用域的顶部，必须在声明函数之后才能调用
    function timeNumberToTime (time) {
      const min = Math.floor(time / 60)
      const sec = time % 60
      return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    aiCardElement.innerHTML = aiCard
  }
}
