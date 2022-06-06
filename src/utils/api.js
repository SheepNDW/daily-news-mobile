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
