import { judge, aiConclusion, createAICardElement, genterateAIConclusionCard } from './ai-conclusion.js'

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

          const aiConclusionRes = await aiConclusion(card)
          const aiCardElement = createAICardElement(card.querySelector('.bili-video-card__image--wrap'))
          const bvid = card.querySelector('.bili-video-card__image--link').dataset.bvid
          genterateAIConclusionCard(aiConclusionRes, aiCardElement, bvid)
        })
      }
    })
  }).observe(document.body, { childList: true })

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
}
