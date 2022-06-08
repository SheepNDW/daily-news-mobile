import request from './http'

/**
 * 獲取今日新聞
 * @returns Promise
 */
export const getNewsLatest = () => {
  return request('/news_latest', 'get')
}

/**
 * 獲取往日新聞
 * @param {String} time - 日期
 * @returns Promise
 */
export const getNewsBefore = (time) => {
  return request(`/news_before`, 'get', { time })
}

/**
 * 獲取新聞詳情
 * @param {String} id - NewsId
 * @returns Promise
 */
export const getNewsDetailById = (id) => {
  return request(`/news_info`, 'get', { id })
}

/**
 * 獲取新聞點讚&評論數
 * @param {String} id - NewsId
 * @returns Promise
 */
export const getNewsCommentsById = (id) => {
  return request(`/story_extra`, 'get', { id })
}

/**
 * 用戶手機登入
 * @param {String} phone - 手機號碼
 * @param {String} code - 驗證碼
 * @returns Promise
 */
export const login = (phone, code) => {
  return request('/login', 'post', { phone, code })
}

/**
 * 獲取手機驗證碼
 * @param {String} phone - 手機號碼
 * @returns Promise
 */
export const getPhoneCode = (phone) => {
  return request('/phone_code', 'post', { phone })
}

// ---------- 以下需要有 Token ------------
/**
 * 檢查是否登入
 * @returns Promise
 */
export const checkLogin = () => {
  return request('/check_login', 'get')
}

/**
 * 獲取登入者資訊
 * @returns Promise
 */
export const getUserInfo = () => {
  return request('/user_info', 'get')
}

/**
 * 修改用戶名和頭像
 * @param {String} username - 用戶名
 * @param {File} file - 頭像圖片
 * @returns Promise
 */
export const updateUser = (username, file) => {
  const fm = new FormData()
  fm.append('username', username)
  fm.append('file', file)
  return request('/user_update', 'post', fm)
}

/**
 * 收藏一篇新聞
 * @param {String} newsId - 新聞ID
 * @returns Promise
 */
export const setStoreNews = (newsId) => {
  return request('/store', 'post', { newsId })
}

/**
 * 移除收藏
 * @param {String} id - 收藏ID
 * @returns Promise
 */
export const removeStoreNews = (id) => {
  return request('/store_remove', 'get', { id })
}

/**
 * 取得收藏列表
 * @returns Promise
 */
export const getStoreNews = () => {
  return request('/store_list', 'get')
}
