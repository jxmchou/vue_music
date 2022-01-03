import axios from 'axios'
import NProgress from 'nprogress'
// 导入根路径
import { baseUrl } from './config'
/**
 *  @BSER_URL 网络请求路径
 * **/

export function ajax(config) {
  // axios实例
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use((config) => {
    NProgress.start()
    if (process.env.NODE_ENV === 'development') {
      config.headers.Authorization =
        window.sessionStorage.getItem('token') || ''
    }
    return config
  })
  // 响应拦截
  instance.interceptors.response.use((res) => {
    NProgress.done()
    return res
  })
  return instance(config)
}
