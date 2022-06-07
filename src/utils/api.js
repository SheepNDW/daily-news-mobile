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
