import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例（无API前缀，对接真实后端）
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// 强制启用Mock（仅拦截非登录/用户信息接口）
console.log('%c[Mock Mode] 仅拦截业务接口，登录/用户信息走真实后端', 'color: #ff4444; font-weight: bold;')
import('../mock/index.js')
  .then(() => console.log('✅ Mock 数据加载成功'))
  .catch(err => console.error('❌ Mock 加载失败:', err))

// 请求拦截器：自动携带Token
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器：适配真实后端返回格式
service.interceptors.response.use(
  response => {
    const res = response.data
    // 兼容后端直接返回对象/无code字段的情况
    if (res.token || res.id) { // 登录/用户信息接口直接返回数据
      return res
    }
    // 业务接口按code判断
    if (typeof res !== 'object' || res === null) {
      ElMessage.error('接口返回格式异常')
      return Promise.reject(new Error('接口返回格式异常'))
    }
    if (res.code !== 200 && res.code !== 201) {
      ElMessage.error(res.msg || '请求失败')
      if (res.code === 401 || res.code === 403) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    ElMessage.error(error.message || '服务器连接异常')
    return Promise.reject(error)
  }
)

export default service