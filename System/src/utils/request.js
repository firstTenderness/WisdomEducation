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
    console.log('响应数据：', response.data);
    const res = response.data
    
    // 检查是否为Result格式
    if (res.code !== undefined && res.msg !== undefined) {
      console.log('检测到Result格式，code:', res.code, 'msg:', res.msg);
      
      // 业务接口按code判断
      // 注意：后端使用 code: 1 表示成功，而不是 200
      if (res.code !== 1) {
        console.log('响应失败，code:', res.code);
        ElMessage.error(res.msg || '请求失败')
        if (res.code === 401 || res.code === 403) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      
      console.log('响应成功，返回data字段：', res.data);
      
      // 直接返回data字段，无论它是什么格式
      return res.data
    }
    // 检查是否直接返回LoginInfo格式
    else if (res.token && res.account) {
      console.log('直接返回LoginInfo格式：', res);
      return res
    }
    // 兼容其他格式
    console.log('兼容其他格式：', res);
    return res
  },
  error => {
    console.error('响应错误：', error);
    console.error('错误详情：', error.response);
    ElMessage.error(error.message || '服务器连接异常')
    return Promise.reject(error)
  }
)

export default service