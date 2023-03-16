import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

// 新建一个axios实例
const $axios = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '/api' : '//47.99.134.126:7008/api'
})
// 创建实例后修改axios默认配置
$axios.defaults.withCredentials = true
$axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
$axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
$axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加请求拦截器
$axios.interceptors.request.use()

// 添加响应拦截器
$axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.msg) Toast.fail(res.data.msg)
    // 401 unauthorized，跳转到登录页面
    if (res.data.code == 401) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default $axios