import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

// 导入所有页面组件（懒加载）
const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')
const Profile = () => import('@/views/Profile.vue')
const Settings = () => import('@/views/Settings.vue')
const Inbox = () => import('@/views/Inbox.vue')
const Topic = () => import('@/views/Topic.vue')
const Notes = () => import('@/views/Notes.vue')
const Cloud = () => import('@/views/Cloud.vue')
const AiSummary = () => import('@/views/AiSummary.vue')
const SmartPractice = () => import('@/views/SmartPractice.vue')

// 路由规则（覆盖所有菜单路径）
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/inbox',
    name: 'Inbox',
    component: Inbox,
    meta: { requiresAuth: true }
  },
  {
    path: '/topic',
    name: 'Topic',
    component: Topic,
    meta: { requiresAuth: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { requiresAuth: true }
  },
  {
    path: '/cloud',
    name: 'Cloud',
    component: Cloud,
    meta: { requiresAuth: true }
  },
  {
    path: '/ai-summary',
    name: 'AiSummary',
    component: AiSummary,
    meta: { requiresAuth: true }
  },
  {
    path: '/smart-practice',
    name: 'SmartPractice',
    component: SmartPractice,
    meta: { requiresAuth: true }
  },
  // 404页面重定向
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局路由守卫（验证登录状态）
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      ElMessage.warning('请先登录后再操作')
      next('/login')
    }
  } else {
    next()
  }
})

export default router