import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

// 创建axios实例（适配后端实际地址）
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', // 移除/api后缀，适配后端
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器：统一携带token
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    ElMessage.error('请求发送失败：' + error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器：适配后端code=1为成功
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 后端约定code=1为成功，其他为失败
    if (res.code !== 1) {
      ElMessage.error(res.msg || '操作失败')
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    // 401 token过期/无效
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      ElMessageBox.confirm('登录已过期，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        const router = useRouter()
        router.push('/login').catch(() => {})
      })
    } else {
      ElMessage.error(error.message || '服务器错误')
    }
    return Promise.reject(error)
  }
)

export default service