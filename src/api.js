// fork 自 BiliPlus 项目：https://github.com/0xlau/biliplus

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
 * 获取导航栏用户信息
 * @returns 用户信息data
 */
async function getNavUserInfo () {
  const response = await fetch(`${BILIBILI_API}/x/web-interface/nav`, { credentials: 'include' })

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData.data
}

/**
 * 获取B站视频 aid、cid 等信息
 * @param {string} 视频 bvid
 * @returns 视频data
 */
export async function getVideoInfo (bvid) {
  const response = await fetch(`${BILIBILI_API}/x/web-interface/view?bvid=${bvid}`)

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData.data
}

/**
 * 获取 AI判断 响应
 * @param {object} params
 * @returns response.json().data
 */
export async function getJudgeAI (params) {
  const query = await getwts(params)
  const response = await fetch(`${BILIBILI_API}/x/web-interface/view/conclusion/judge?${query}`)

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData.data
}

/**
 * 获取 AI 总结
 * @param {object} params { bvid, cid, up_mid }
 * @returns response.json().data
 */
export async function getAIConclusion (params) {
  const query = await getwts(params)
  const response = await fetch(`${BILIBILI_API}/x/web-interface/view/conclusion/get?${query}`)

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData.data
}

/**
 * 获取用户ID
 * @returns cookie: DedeUserID
 */
function getUserID () {
  const cookies = document.cookie
  const cookieArray = cookies.split('; ')
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split('=')
    if (cookie[0] === 'DedeUserID') {
      return cookie[1]
    }
  }
  return null // 如果不返回 null，那么函数就会返回 undefined，这可能会导致一些意想不到的问题。
}

/**
 * 获取 CSRF
 * @returns cookie: bili_jct
 */
function getCSRF () {
  const cookies = document.cookie
  const cookieArray = cookies.split('; ')
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].split('=')
    if (cookie[0] === 'bili_jct') {
      return cookie[1]
    }
  }
  return null // 如果不返回 null，那么函数就会返回 undefined，这可能会导致一些意想不到的问题。
}

/**
 * 获取关注列表
 * @param {number} pageNumber 页码
 * @param {number} pageSize 每页显示的数据条数
 * @param {number} orderType 排序方式，1: 最常访问，2: 最近关注
 * @returns {object} response.json().data
 */
export async function getFollowList (pageNumber, pageSize, orderType) {
  const vmid = getUserID()
  const query = await getwts({})
  const response = await fetch(`${BILIBILI_API}/x/relation/followings?vmid=${vmid}&pn=${pageNumber}&ps=${pageSize}&order=desc&order_type=${orderType === 1 ? 'attention' : ''}&gaia_source=main_web&web_location=333.999&${query}`, { credentials: 'include' })

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData.data
}

/**
 * 获取动态列表
 * @param {string} offset the data.offset of last response
 * @returns {object} response.json().data
 */
export async function getDynamicList (offset) {
  const response = await fetch(`${BILIBILI_API}/x/polymer/web-dynamic/v1/feed/nav?offset=${offset}`, { credentials: 'include' })

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData.data
}

/**
 * 关注用户
 * @param {string} mid  user id
 * @param {boolean} isFollow  关注/取关
 * @returns response.json()
 */
export async function followUser (mid, isFollow) {
  const response = await fetch('https://api.bilibili.com/x/relation/modify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      fid: mid,
      act: isFollow ? '1' : '2',
      // eslint-disable-next-line camelcase
      re_src: '11',
      csrf: getCSRF()
    }).toString(),
    credentials: 'include' // 发送Cookie
  })

  const jsonData = await response.json()
  if (response.status !== 200 || !jsonData) { throw new Error() }
  return jsonData
}
