import axios from 'axios'
import { Notify } from 'vant'

const instance = axios.create({
  baseURL: '/api',
  timeout: 6000
})

instance.interceptors.request.use(
  (config) => {
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
