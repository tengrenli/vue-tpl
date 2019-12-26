import router from '../../router'
{{#if vuex}}
import store from '../../store'
{{/if}}
import { Toast } from 'vant'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 3000,
    forbidClick: true
  })
}

let loadingInstance = null

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login'
    // query: {
    //   redirect: router.currentRoute.fullPath
    // }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
// eslint-disable-next-line no-unused-vars
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      {{#if vuex}}
      store.commit('loginSuccess', null)
      {{/if}}
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      // console.log(other)
  }
}

// 创建axios实例
/**
 * 拦截器发起请求
 * */
const requestSuccess = config => {
  loadingInstance = Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 1000 * 30
  })
  // 登录流程控制中，根据本地是否存在token判断用户的登录情况
  // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
  // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
  // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
  // const token = store.state.token
  // token && (config.headers.Authorization = token)

  // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
  // if (config.url.includes('pur/contract/export')) {
  //   config.headers['responseType'] = 'blob'
  // }
  // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
  // if (config.url.includes('pur/contract/upload')) {
  //   config.headers['Content-Type'] = 'multipart/form-data'
  // }
  return config
}
/**
 * 拦截器发起请求失败
 * */
const requestFail = error => {
  // console.log('req_err:::', error)
  loadingInstance.close()
  Promise.error(error)
}
/**
 * 拦截器响应请求成功
 * */
const responseSuccess = res => {
  loadingInstance.close()
  return res
}
/**
 * 拦截器响应请求失败
 * responseError.message 和 responseError.response.status 来做监控处理
 * */
const responseFail = error => {
  // console.log('res_error:::', error)
  loadingInstance.close()
  return Promise.reject(error)
}
export {
  requestSuccess,
  requestFail,
  responseSuccess,
  responseFail
}
