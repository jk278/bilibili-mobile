import { getAIConclusion } from './api.js'
import { aiData } from './values.js'

export async function loadAI (card) {
  const aiCardElement = createAICardElement(card.querySelector('.bili-video-card__image--wrap'))

  const aiConclusionRes = await aiConclusion(card)
  const bvid = card.querySelector('.bili-video-card__image--link').dataset.bvid
  genterateAIConclusionCard(aiConclusionRes, aiCardElement, bvid)
}

async function aiConclusion (card) {
  const cardImageLinkElement = card.querySelector('.bili-video-card__image--link')
  const match = /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.dataset.targetUrl) || /\/video\/([A-Za-z0-9]+)/.exec(cardImageLinkElement.href)
  const bvid = match[1]

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

function createAICardElement (cardElement) {
  const overlay = document.createElement('div')
  overlay.id = 'ai-conclusion-overlay'
  overlay.innerHTML = `
      <div class="ai-conclusion-card resizable-component">
        <div class="ai-conclusion-card-header">正在加载 AI 总结</div>
      </div>
    `
  cardElement.closest('.bili-video-card').appendChild(overlay)
  overlay.classList.add('show')

  overlay.addEventListener('click', () => {
    overlay.classList.remove('show')
    overlay.addEventListener('transitionend', overlay.remove)
  }, { once: true })

  const div = overlay.querySelector('.ai-conclusion-card')
  div.addEventListener('click', event => event.stopPropagation())

  return div
}

function genterateAIConclusionCard (aiConclusionRes, aiCardElement, bvid) {
  let aiCard = `
      <div class="ai-conclusion-card-header">
        <div class="ai-conclusion-card-header-left">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="ai-summary-popup-icon">
            <g clip-path="url(#clip0_8728_3421)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.54 2.348a1.5 1.5 0 0 1 2.112.192l2.5 3a1.5 1.5 0 0 1-2.304 1.92l-2.5-3a1.5 1.5 0 0 1 .192-2.112z" fill="url(#paint0_linear_8728_3421)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.96 2.348a1.5 1.5 0 0 0-2.112.192l-2.5 3a1.5 1.5 0 0 0 2.304 1.92l2.5-3a1.5 1.5 0 0 0-.192-2.112z" fill="url(#paint1_linear_8728_3421)"/>
              <path d="M27 18.253C27 25.021 21.627 27 15 27S3 25.02 3 18.253C3 11.486 3.923 6 15 6c11.538 0 12 5.486 12 12.253z" fill="#D9D9D9" opacity=".2" filter="url(#filter0_d_8728_3421)"/>
              <path d="M28 18.949C28 26.656 22.18 28 15 28S2 26.656 2 18.949C2 10 3 6 15 6c12.5 0 13 4 13 12.949z" fill="url(#paint2_linear_8728_3421)" filter="url(#filter1_ii_8728_3421)"/>
              <path d="M4.786 14.21c0-2.284 1.659-4.248 3.925-4.52 4.496-.539 8.057-.559 12.602-.01 2.257.274 3.902 2.234 3.902 4.507v5.005c0 2.14-1.46 4.034-3.57 4.396-4.742.815-8.474.658-13.086-.074-2.197-.35-3.773-2.282-3.773-4.506v-4.799z" fill="#191924"/>
              <path d="M19.643 15.313v2.785" stroke="#2CFFFF" stroke-width="2.4" stroke-linecap="round"/>
              <path d="M10.357 14.852l1.858 1.857-1.858 1.857" stroke="#2CFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
              <filter id="filter0_d_8728_3421" x="1" y="4" width="30" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="1" dy="1"/>
                <feGaussianBlur stdDeviation="1.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix values="0 0 0 0 0.039545 0 0 0 0 0.0845023 0 0 0 0 0.200107 0 0 0 0.85 0"/>
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_8728_3421"/>
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_8728_3421" result="shape"/>
              </filter>
              <filter id="filter1_ii_8728_3421" x="0" y="4.143" width="30.786" height="26.643" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="2.786" dy="3.714"/>
                <feGaussianBlur stdDeviation="1.393"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
                <feBlend in2="shape" result="effect1_innerShadow_8728_3421"/>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="-2" dy="-1.857"/>
                <feGaussianBlur stdDeviation="1.857"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.15445 0 0 0 0 0.454264 0 0 0 0.11 0"/>
                <feBlend in2="effect1_innerShadow_8728_3421" result="effect2_innerShadow_8728_3421"/>
              </filter>
              <linearGradient id="paint0_linear_8728_3421" x1="6.804" y1="2.849" x2="9.019" y2="8.297" gradientUnits="userSpaceOnUse">
                <stop stop-color="#393946"/>
                <stop offset=".401" stop-color="#23232E"/>
                <stop offset="1" stop-color="#191924"/>
              </linearGradient>
              <linearGradient id="paint1_linear_8728_3421" x1="22.696" y1="2.849" x2="20.481" y2="8.297" gradientUnits="userSpaceOnUse">
                <stop stop-color="#393946"/>
                <stop offset=".401" stop-color="#23232E"/>
                <stop offset="1" stop-color="#191924"/>
              </linearGradient>
              <linearGradient id="paint2_linear_8728_3421" x1="7.671" y1="10.807" x2="19.931" y2="29.088" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F4FCFF"/>
                <stop offset="1" stop-color="#EAF5F9"/>
              </linearGradient>
              <clipPath id="clip0_8728_3421">
                <path fill="#fff" d="M0 0h30v30H0z"/>
              </clipPath>
            </defs>
          </svg>
          <span class="tips-text">已为你生成视频总结</span>
        </div>
      </div>
      <div class="ai-conclusion-card-summary">
        ${aiConclusionRes.model_result.summary}
      </div>
    `
  aiConclusionRes.model_result.outline.forEach(item => {
    aiCard += `
        <div class="ai-conclusion-card-selection">
          <div class="ai-conclusion-card-selection-title">${item.title}</div>
          ${item.part_outline.map(s => `
            <a class="bullet" href="https://www.bilibili.com/video/${bvid}/?t=${s.timestamp}s">
              <span class="ai-conclusion-card-selection-timer">${timeNumberToTime(s.timestamp)}</span>
              <span>${s.content}</span>
            </a>
          `).join('')}
        </div>
      `
  })

  function timeNumberToTime (time) {
    const min = Math.floor(time / 60)
    const sec = time % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  aiCardElement.innerHTML = aiCard
}
