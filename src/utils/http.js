import axios from 'axios'
import qs from 'qs'
import { Notify } from 'vant'
import { isPlainObject } from '@/assets/utils'
import md5 from 'blueimp-md5'

const instance = axios.create({
  baseURL: '/api',
  timeout: 6000,
  transformRequest: (data) => {
    if (isPlainObject(data)) {
      return qs.stringify(data)
    }
    return data
  }
})

instance.interceptors.request.use(
  (config) => {
    const apiList = [
      '/check_login',
      '/user_info',
      '/user_update',
      '/store',
      '/store_remove',
      '/store_list'
    ]
    const token = localStorage.getItem('dailyNewsToken')

    if (apiList.includes(config.url) && token) {
      const time = +new Date()
      const sign = md5(`${token}@${time}@zhufeng`)

      config.headers['authorzation'] = token
      config.headers['time'] = time
      config.headers['sign'] = sign
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    Notify({
      type: 'danger',
      message: '網路忙線中'
    })
    return Promise.reject(err)
  }
)

function request(url, method, submitData) {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
