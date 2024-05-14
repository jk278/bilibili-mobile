const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
  61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
  36, 20, 34, 44, 52
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig) =>
  mixinKeyEncTab
    .map((n) => orig[n])
    .join('')
    .slice(0, 32)

// 为请求参数进行 wbi 签名
function encWbi (params, imgKey, subKey) {
  const mixinKey = getMixinKey(imgKey + subKey)
  const currTime = Math.round(Date.now() / 1000)
  const chrFilter = /[!'()*]/g

  Object.assign(params, { wts: currTime }) // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chrFilter, '')
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  // 在脚本 metadata 中引用 AI 总结使用的 md5 算法
  // eslint-disable-next-line no-undef
  const wbiSign = md5(query + mixinKey) // 计算 w_rid

  return query + '&w_rid=' + wbiSign
}

// 获取最新的 imgKey 和 subKey
async function getWbiKeys () {
  const {
    wbi_img: { img_url: imgUrl, sub_url: subUrl }
  } = await getNavUserInfo()

  return {
    imgKey: imgUrl.slice(
      imgUrl.lastIndexOf('/') + 1,
      imgUrl.lastIndexOf('.')
    ),
    subKey: subUrl.slice(
      subUrl.lastIndexOf('/') + 1,
      subUrl.lastIndexOf('.')
    )
  }
}

// 刷新 wts 和 wrid
async function getwts (params) {
  const webKeys = await getWbiKeys()
  const imgKey = webKeys.imgKey
  const subKey = webKeys.subKey
  const query = encWbi(params, imgKey, subKey)
  return query
}

const BILIBILI_API = 'https://api.bilibili.com'

/**
 * 获取B站视频 aid、cid 等信息
 * @param {string} 视频 bvid
 * @returns 视频data
 */
async function getVideoInfo (bvid) {
  const response = await fetch(`${BILIBILI_API}/x/web-interface/view?bvid=${bvid}`)
  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) {
    throw new Error()
  }
  return jsonData.data
}

/**
 * 获取导航栏用户信息
 * @returns 用户信息data
 */
async function getNavUserInfo () {
  const response = await fetch(`${BILIBILI_API}/x/web-interface/nav`, { credentials: 'include' })
  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) {
    throw new Error()
  }
  return jsonData.data
}

/**
 * 获取ai简介
 * @param {object} params
 * @returns ai简介data
 */
async function getAIConclusion (params) {
  const query = await getwts(params)
  const response = await fetch(`${BILIBILI_API}/x/web-interface/view/conclusion/get?${query}`)
  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) {
    throw new Error()
  }
  return jsonData.data
}

export function aiConclusion () {
  const aiData = {}

  const container = document.querySelector('body')

  container.addEventListener('mouseover', async e => {
    const target = e.target
    if (target.nodeName === 'IMG' && target.parentElement.classList.contains('bili-video-card__cover')) {
      const cardImageLinkElement = target.closest('.bili-video-card__image--link')
      const cardImageWrapElement = target.closest('.bili-video-card__image--wrap')

      let bvid = getBvidFromUrl(cardImageLinkElement.dataset.targetUrl)
      if (aiData[bvid]) {
        if (aiData[bvid].code === 0) {
          const aiCardElement = createAICardElement(cardImageWrapElement)
          genterateAIConclusionCard(aiData[bvid], aiCardElement, bvid)
        }
        return
      }
      let cid = cardImageLinkElement.getAttribute('data-biliplus-cid')
      let up_mid = cardImageLinkElement.getAttribute('data-biliplus-upMid')
      if (cid == null || up_mid == null) {
        try {
          const videoInfo = await getVideoInfo(bvid)
          console.log(videoInfo)
          cardImageLinkElement.setAttribute('data-biliplus-aid', videoInfo.aid)
          cardImageLinkElement.setAttribute('data-biliplus-cid', videoInfo.cid)
          cardImageLinkElement.setAttribute('data-biliplus-bvid', videoInfo.bvid)
          cardImageLinkElement.setAttribute('data-biliplus-upMid', videoInfo.owner.mid)
          // aid = videoInfo.aid
          cid = videoInfo.cid
          bvid = videoInfo.bvid
          up_mid = videoInfo.owner.mid
        } catch (e) {
          console.error(e)
          return
        }
      }
      const aiConclusionRes = await getAIConclusion({
        bvid,
        cid,
        up_mid
      })
      aiData[bvid] = aiConclusionRes
      console.log('aiConclusionRes', aiConclusionRes)
      if (aiConclusionRes.code === 0) {
        const aiCardElement = createAICardElement(cardImageWrapElement)
        genterateAIConclusionCard(aiData[bvid], aiCardElement, bvid)
      }
    }
  })

  function getBvidFromUrl (url) {
    const match = /\/video\/([A-Za-z0-9]+)/.exec(url)
    if (match) {
      return match[1]
    }
    return null
  }
}

const genterateAIConclusionCard = (aiConclusionRes, aiCardElement, bvid) => {
  let aiCard = ''
  const { model_result: modelResult } = aiConclusionRes
  if (aiConclusionRes.code !== 0) {
    aiCard = `
    <div class="biliplus-ai-conclusion-card-header">当前视频暂不支持AI视频总结</div>
    `
  } else {
    aiCard = `
    <div class="biliplus-ai-conclusion-card-header">
      <div class="biliplus-ai-conclusion-card-header-left">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="ai-summary-popup-icon" >
            <g clip-path="url(#clip0_8728_3421)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53976 2.34771C8.17618 1.81736 9.12202 1.90335 9.65237 2.53976L12.1524 5.53976C12.6827 6.17618 12.5967 7.12202 11.9603 7.65237C11.3239 8.18272 10.3781 8.09673 9.84771 7.46031L7.34771 4.46031C6.81736 3.8239 6.90335 2.87805 7.53976 2.34771Z" fill="url(#paint0_linear_8728_3421)"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9602 2.34771C21.3238 1.81736 20.378 1.90335 19.8476 2.53976L17.3476 5.53976C16.8173 6.17618 16.9033 7.12202 17.5397 7.65237C18.1761 8.18272 19.1219 8.09673 19.6523 7.46031L22.1523 4.46031C22.6826 3.8239 22.5967 2.87805 21.9602 2.34771Z" fill="url(#paint1_linear_8728_3421)"></path>
                <g opacity="0.2" filter="url(#filter0_d_8728_3421)">
                    <path d="M27 18.2533C27 25.0206 21.6274 27 15 27C8.37258 27 3 25.0206 3 18.2533C3 11.486 3.92308 6 15 6C26.5385 6 27 11.486 27 18.2533Z" fill="#D9D9D9"></path>
                </g>
                <g filter="url(#filter1_ii_8728_3421)">
                    <path d="M28 18.9489C28 26.656 22.1797 28 15 28C7.8203 28 2 26.656 2 18.9489C2 10 3 6 15 6C27.5 6 28 10 28 18.9489Z" fill="url(#paint2_linear_8728_3421)"></path>
                </g>
                <path d="M4.78613 14.2091C4.78613 11.9263 6.44484 9.96205 8.71139 9.6903C13.2069 9.1513 16.7678 9.13141 21.3132 9.68091C23.5697 9.95371 25.2147 11.9138 25.2147 14.1868V19.192C25.2147 21.3328 23.7551 23.2258 21.6452 23.5884C16.903 24.4032 13.1705 24.2461 8.55936 23.5137C6.36235 23.1647 4.78613 21.2323 4.78613 19.0078V14.2091Z" fill="#191924"></path>
                <path d="M19.6426 15.3125L19.6426 18.0982" stroke="#2CFFFF" stroke-width="2.4" stroke-linecap="round"></path>
                <path d="M10.3574 14.8516L12.2146 16.7087L10.3574 18.5658" stroke="#2CFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <defs>
                <filter id="filter0_d_8728_3421" x="1" y="4" width="30" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dx="1" dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.039545 0 0 0 0 0.0845023 0 0 0 0 0.200107 0 0 0 0.85 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8728_3421"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8728_3421" result="shape"></feBlend>
                </filter>
                <filter id="filter1_ii_8728_3421" x="0" y="4.14286" width="30.7857" height="26.6429" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dx="2.78571" dy="3.71429"></feOffset>
                    <feGaussianBlur stdDeviation="1.39286"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"></feColorMatrix>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_8728_3421"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset dx="-2" dy="-1.85714"></feOffset>
                    <feGaussianBlur stdDeviation="1.85714"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.15445 0 0 0 0 0.454264 0 0 0 0.11 0"></feColorMatrix>
                    <feBlend mode="normal" in2="effect1_innerShadow_8728_3421" result="effect2_innerShadow_8728_3421"></feBlend>
                </filter>
                <linearGradient id="paint0_linear_8728_3421" x1="6.80424" y1="2.84927" x2="9.01897" y2="8.29727" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#393946"></stop>
                    <stop offset="0.401159" stop-color="#23232E"></stop>
                    <stop offset="1" stop-color="#191924"></stop>
                </linearGradient>
                <linearGradient id="paint1_linear_8728_3421" x1="22.6958" y1="2.84927" x2="20.481" y2="8.29727" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#393946"></stop>
                    <stop offset="0.401159" stop-color="#23232E"></stop>
                    <stop offset="1" stop-color="#191924"></stop>
                </linearGradient>
                <linearGradient id="paint2_linear_8728_3421" x1="7.67091" y1="10.8068" x2="19.9309" y2="29.088" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F4FCFF"></stop>
                    <stop offset="1" stop-color="#EAF5F9"></stop>
                </linearGradient>
                <clipPath id="clip0_8728_3421">
                    <rect width="30" height="30" fill="white"></rect>
                </clipPath>
            </defs>
        </svg>
        <span class="tips-text">已为你生成视频总结</span>
      </div>
    </div>
    <div class="biliplus-ai-conclusion-card-summary">
    ${modelResult.summary}
    </div>
    `
    modelResult.outline.forEach(item => {
      aiCard += `
      <div class="biliplus-ai-conclusion-card-selection">
        <div class="biliplus-ai-conclusion-card-selection-title">${item.title}</div>
        ${item.part_outline
          .map(
            s => `
          <a class="bullet" href="https://www.bilibili.com/video/${bvid}/?t=${s.timestamp}s">
            <span class="biliplus-ai-conclusion-card-selection-timer">${timeNumberToTime(s.timestamp)}</span>
            <span>${s.content}</span>
          </a>
        `
          )
          .join('')}
      </div>
      `
    })
  }
  aiCardElement.innerHTML = aiCard
}

const createAICardElement = cardElement => {
  const div = document.createElement('div')
  div.className = 'biliplus-ai-conclusion-card'
  div.innerHTML = '<div class="biliplus-ai-conclusion-card-header">正在加载 AI 总结</div>'
  // 获取屏幕宽度
  const clientWidth = document.documentElement.clientWidth
  // 根据cardElement位置判断卡片应该在左边还是右边
  if (clientWidth - cardElement.getBoundingClientRect().right < 400) {
    div.style.left = cardElement.getBoundingClientRect().left - 400 + 'px'
  } else {
    div.style.left = cardElement.getBoundingClientRect().right + 'px'
  }
  // 根据屏幕滚动高度计算卡片位置
  div.style.top = cardElement.getBoundingClientRect().top + 'px'
  // div.style.top = (cardElement.getBoundingClientRect().top - 50) + 'px'
  const videoCard = cardElement.closest('.bili-video-card')
  videoCard.appendChild(div)
  // 鼠标移出卡片消失
  videoCard.addEventListener('mouseleave', () => {
    div.remove()
  })
  return div
}

const timeNumberToTime = time => {
  let min = Math.floor(time / 60)
  let sec = time % 60
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  return `${min}:${sec}`
}
