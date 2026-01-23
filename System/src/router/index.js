import { createRouter, createWebHistory } from 'vue-router'

// 路由懒加载
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const Teacher = () => import('../views/Teacher.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/teacher',
      name: 'Teacher',
      component: Teacher,
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router