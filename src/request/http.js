/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { requestSuccess, requestFail, responseSuccess, responseFail } from './interceptors/axios'

let BASEURL = ''
if (process.env.VUE_APP_ENV === 'development') {
  BASEURL = process.env.VUE_APP_API_HOST
} else {
  BASEURL = `${window.location.protocol}//${window.location.host}`
}
let instance = axios.create({
  timeout: 1000 * 12,
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  requestSuccess,
  requestFail
)

/**
* 响应拦截器
*/
instance.interceptors.response.use(
  // 请求成功
  responseSuccess,
  // 请求失败
  responseFail
)

function http (obj) {
  return new Promise((resolve, reject) => {
    let { type, url, data, ...config } = obj
    instance({
      method: type || 'get',
      url: url,
      params: data || {},
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => { // error
      reject(error)
    })
  })
}

export {
  http
}
