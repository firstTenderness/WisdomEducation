import { createRouter, createWebHistory } from 'vue-router'
// 组件导入路径（确保和你的文件结构一致）
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

// 路由规则
const routes = [
  { path: '/', redirect: '/login' },          // 默认跳登录页
  { path: '/login', name: 'Login', component: Login }, // 登录页
  { path: '/home', name: 'Home', component: Home }     // 首页
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // Vite项目必用
  routes
})

// 全局路由守卫（权限控制）
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 规则：访问首页无Token → 跳登录；访问登录页有Token → 跳首页；其他放行
  if (to.path === '/home' && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/home')
  } else {
    next()
  }
})

export default router