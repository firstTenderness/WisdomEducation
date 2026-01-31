import { createRouter, createWebHistory } from 'vue-router'

// 懒加载导入页面组件
const StudentHome = () => import('../views/StudentHome.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Teacher = () => import('../views/Teacher.vue') // 教师端页面（若有）
const PortalHome = () => import('../views/PortalHome.vue') // 门户网站
const CourseDetail = () => import('../views/CourseDetail.vue') // 课程详情页面
const PolicyDetail = () => import('../views/PolicyDetail.vue') // 政策详情页面
const VideoDetail = () => import('../views/VideoDetail.vue') // 视频详情页面
const FeatureDetail = () => import('../views/FeatureDetail.vue') // 特色功能详情页面

// 路由规则配置
const routes = [
  {
    path: '/', // 首页默认跳门户网站
    redirect: '/portal' // 重定向到/portal
  },
  {
    path: '/portal',
    name: 'Portal',
    component: PortalHome,
    meta: { 
      title: '慧学澄明教育学习平台' 
    }
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: { 
      title: '课程详情' 
    }
  },
  {
    path: '/policy/:id',
    name: 'PolicyDetail',
    component: PolicyDetail,
    meta: { 
      title: '政策详情' 
    }
  },
  {
    path: '/video/:id',
    name: 'VideoDetail',
    component: VideoDetail,
    meta: { 
      title: '视频详情' 
    }
  },
  {
    path: '/feature/:id',
    name: 'FeatureDetail',
    component: FeatureDetail,
    meta: { 
      title: '功能详情' 
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: StudentHome,
    meta: { 
      requiresAuth: true, // 标记：需要登录才能访问
      title: '慧学澄明平台-首页' 
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      title: '慧学澄明平台-登录' 
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { 
      title: '慧学澄明平台-注册' 
    }
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher,
    meta: { 
      requiresAuth: true, // 教师端也需要登录
      title: '慧学澄明平台-教师端' 
    }
  },
  // 404页面（可选，优化用户体验）
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home' // 未知路由跳首页
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 适配Vite环境变量
  routes
})

// 全局路由守卫：核心登录拦截逻辑
router.beforeEach((to, from, next) => {
  // 1. 设置页面标题
  document.title = to.meta.title || '慧学澄明平台'

  // 2. 登录态校验：判断目标页面是否需要登录
  const requiresAuth = to.meta.requiresAuth
  // 从本地缓存获取token（登录成功后存储）
  const token = localStorage.getItem('token')

  // 3. 核心规则：需要登录但无token → 跳登录页
  if (requiresAuth && !token) {
    next('/login') // 强制跳登录页
    // 可选：记录跳转前的页面，登录后可返回
    // localStorage.setItem('redirectPath', to.fullPath)
  } 
  // 4. 已登录但访问登录页或注册页 → 跳首页
  else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/home')
  } 
  // 5. 其他情况正常放行
  else {
    next()
  }
})

export default router