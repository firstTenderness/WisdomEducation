<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="nav-bg"></div>
      <div class="nav-content">
        <div class="nav-left">
          <el-avatar :size="40" src="/src/assets/logo.svg" class="nav-logo"></el-avatar>
          <h1 class="platform-name">慧学澄明学习教育平台-学生端</h1>
        </div>
        <div class="nav-right">
          <div class="nav-stats">
            <div class="stat-item">
              <span class="stat-label">今日学习</span>
              <span class="stat-value">{{ todayStudyTime }}分钟</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">未读消息</span>
              <span class="stat-value">{{ unreadMessages }}</span>
            </div>
          </div>
          <div class="user-info">
            <el-avatar :size="36" :src="userInfo.avatar || defaultAvatar" class="user-avatar"></el-avatar>
            <span class="user-name">欢迎回来：{{ userInfo.name }}</span>
          </div>
          <el-button 
            type="primary" 
            @click="handleTeacherSwitch"
            class="interactive-btn"
          >
            切换教师端
          </el-button>
          <el-button 
            type="danger" 
            @click="handleLogout"
            class="interactive-btn"
          >
            退出登录
          </el-button>
        </div>
      </div>
    </div>

    <!-- 主体布局 -->
    <div class="main-layout">
      <!-- 左侧折叠菜单 -->
      <div class="sidebar" :class="{ 'is-collapse': isCollapse }">
        <el-menu
          :default-active="currentMenu"
          class="sidebar-menu"
          background-color="#f5f7fa"
          text-color="#303133"
          active-text-color="#409eff"
          :collapse="isCollapse"
          @select="handleMenuSelect"
        >
          <div class="logo-container" @click="toggleCollapse">
            <i class="el-icon-s-unfold" :class="{ 'rotate-icon': isCollapse }"></i>
            <span v-show="!isCollapse" class="collapse-text">收起菜单</span>
          </div>
          
          <el-menu-item index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>智学课栈</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <template #title>
              <i class="el-icon-message"></i>
              <span>灵犀消息台</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <template #title>
              <i class="el-icon-edit"></i>
              <span>妙思创作间</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4">
            <template #title>
              <i class="el-icon-document"></i>
              <span>智记手札</span>
            </template>
          </el-menu-item>
          <el-menu-item index="5">
            <template #title>
              <i class="el-icon-folder"></i>
              <span>智存云空间</span>
            </template>
          </el-menu-item>
          <el-menu-item index="6">
            <template #title>
              <i class="el-icon-lightning"></i>
              <span>灵智知识集</span>
            </template>
          </el-menu-item>
          <el-menu-item index="7">
            <template #title>
              <i class="el-icon-brush"></i>
              <span>智适应练场</span>
            </template>
          </el-menu-item>
          <el-menu-item index="8">
            <template #title>
              <i class="el-icon-trophy"></i>
              <span>鸿鹄榜</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="content-area">
        <!-- 页面头部 -->
        <div class="page-header">
          <div class="page-header-top">
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ getPageTitle() }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="header-decoration"></div>
          </div>
          <h2 class="page-title">{{ getPageTitle() }}</h2>
        </div>

        <!-- 主内容区 -->
        <div class="main-content">
          <component :is="currentView"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
// 导入子页面组件
import Course from './Course.vue'
import Inbox from './Inbox.vue'
import Topic from './Topic.vue'
import Notes from './Notes.vue'
import Cloud from './Cloud.vue'
import AiSummary from './AiSummary.vue'
import SmartPractice from './SmartPractice.vue'
import HeroRank from './HeroRank.vue'
// 导入接口（若没有getUserInfo接口，可注释，仅用本地缓存）
// import { getUserInfo } from '@/api'

const router = useRouter()
// 核心：从localStorage读取登录用户信息（优先）
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{"name":"未知用户"}'))
const currentView = ref(Course) // 默认显示课程页面
const currentMenu = ref('1') // 当前选中菜单
const isCollapse = ref(false) // 侧边栏折叠状态
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' // 默认头像
// 新增：页面装饰性数据
const todayStudyTime = ref(Math.floor(Math.random() * 120) + 10) // 今日学习时间
const unreadMessages = ref(Math.floor(Math.random() * 5)) // 未读消息数

// 菜单与组件映射
const menuMap = {
  '1': Course,
  '2': Inbox,
  '3': Topic,
  '4': Notes,
  '5': Cloud,
  '6': AiSummary,
  '7': SmartPractice,
  '8': HeroRank
}

// 菜单与标题映射
const menuTitleMap = {
  '1': '智学课栈',
  '2': '灵犀消息台',
  '3': '妙思创作间',
  '4': '智记手札',
  '5': '智存云空间',
  '6': '灵智知识集',
  '7': '智适应练场',
  '8': '鸿鹄榜'
}

// 获取页面标题
const getPageTitle = () => {
  return menuTitleMap[currentMenu.value] || '课程中心'
}

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 初始化：1. 校验登录态 2. 获取用户信息
onMounted(async () => {
  // 关键修复：登录态校验（无token则强制跳登录页）
  const token = localStorage.getItem('token')
  if (!token) {
    ElMessage.warning('请先登录！')
    router.push('/login') // 跳转到登录页，需确保路由配置了/login
    return // 终止后续逻辑
  }

  // 可选：调用后端接口获取最新用户信息（无接口则注释此段）
  try {
    // const res = await getUserInfo()
    // const userData = res.data || res
    // if (userData.name) {
    //   userInfo.value = userData
    //   localStorage.setItem('userInfo', JSON.stringify(userData))
    // }
  } catch (error) {
    ElMessage.error('获取用户信息失败，使用本地缓存')
  }
})

// 菜单切换事件
const handleMenuSelect = (index) => {
  currentMenu.value = index
  currentView.value = menuMap[index]
}

// 切换教师端逻辑
const handleTeacherSwitch = () => {
  const roleType = userInfo.value.role_type || JSON.parse(localStorage.getItem('userInfo') || '{}').role_type
  if (roleType === 2) {
    router.push('/teacher')
  } else {
    ElMessage.warning('当前账号为学生身份，无法进入教师端')
  }
}

// 新增：退出登录逻辑（清除登录态+跳登录页）
const handleLogout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '退出确认',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 清除所有登录态
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    sessionStorage.clear()
    // 跳转到登录页
    router.push('/login')
    ElMessage.success('退出登录成功！')
  }).catch(() => {
    ElMessage.info('已取消退出登录')
  })
}
</script>

<style scoped>
/* 全局样式变量 */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7fa;
  --bg-header: #409eff;
  --text-primary: #303133;
  --text-secondary: #606266;
  --text-light: #ffffff;
  --border-color: #e4e7ed;
  --accent-primary: #409eff;
  --accent-secondary: #66b1ff;
  --accent-tertiary: #9ecaff;
  --transition-normal: 0.3s ease;
}

/* 主容器样式 */
.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-secondary);
}

/* 顶部导航栏 */
.navbar {
  height: 80px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.3);
  z-index: 100;
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  z-index: 1;
}

.nav-content {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  z-index: 2;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-logo {
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.platform-name {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: var(--text-light);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-stats {
  display: flex;
  gap: 25px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-light);
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.user-avatar {
  border: 2px solid var(--text-light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-light);
  white-space: nowrap;
}

/* 交互按钮 */
.interactive-btn {
  transition: all var(--transition-normal);
  border-radius: 4px;
  font-weight: 500;
}

.interactive-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 主体布局 */
.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧折叠菜单 */
.sidebar {
  width: 220px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  transition: all var(--transition-normal);
  overflow-y: auto;
}

.sidebar.is-collapse {
  width: 64px;
}

/* Logo容器 */
.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-normal);
  background-color: var(--bg-primary);
}

.logo-container:hover {
  background-color: rgba(64, 158, 255, 0.1);
}

.logo-container i {
  font-size: 16px;
  color: var(--accent-primary);
  transition: all var(--transition-normal);
}

.collapse-text {
  font-size: 14px;
  color: var(--text-secondary);
  transition: all var(--transition-normal);
}

.rotate-icon {
  transform: rotate(180deg);
}

/* 侧边栏菜单 */
.sidebar-menu {
  height: calc(100vh - 60px);
  background-color: var(--bg-secondary) !important;
  border-right: none !important;
}

.sidebar-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  margin: 5px 10px;
  border-radius: 4px;
  transition: all var(--transition-normal);
  border: 1px solid transparent;
}

.sidebar-menu .el-menu-item:hover {
  background-color: rgba(64, 158, 255, 0.1);
  border-color: rgba(64, 158, 255, 0.2);
}

.sidebar-menu .el-menu-item.is-active {
  background-color: rgba(64, 158, 255, 0.15);
  border-color: var(--accent-primary);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.sidebar-menu .el-menu-item i {
  font-size: 18px;
  margin-right: 12px;
  transition: all var(--transition-normal);
  color: var(--text-secondary);
}

.sidebar-menu .el-menu-item:hover i {
  color: var(--accent-primary);
}

.sidebar-menu .el-menu-item.is-active i {
  color: var(--accent-primary);
}

.sidebar-menu .el-menu-item span {
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-normal);
  color: var(--text-primary);
}

.sidebar-menu .el-menu-item:hover span {
  color: var(--accent-primary);
}

.sidebar-menu .el-menu-item.is-active span {
  color: var(--accent-primary);
  font-weight: 600;
}

/* 右侧内容区 */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--bg-primary);
}

/* 页面头部 */
.page-header {
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  position: relative;
}

.page-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.breadcrumb {
  font-size: 14px;
  color: var(--text-secondary);
}

.header-decoration {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 2px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  position: relative;
  padding-left: 15px;
}

.page-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background-color: var(--accent-primary);
  border-radius: 2px;
}

/* 主内容区 */
.main-content {
  flex: 1;
  padding: 24px 30px;
  overflow-y: auto;
  background-color: var(--bg-secondary);
}

/* 滚动条样式 */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: all var(--transition-normal);
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    padding: 0 16px;
    height: 50px;
  }
  
  .platform-name {
    font-size: 16px;
  }
  
  .nav-right {
    gap: 12px;
  }
  
  .user-info {
    padding: 6px 12px;
  }
  
  .user-name {
    font-size: 13px;
  }
  
  .sidebar {
    width: 200px;
  }
  
  .sidebar.is-collapse {
    width: 60px;
  }
  
  .logo-container {
    padding: 12px 16px;
  }
  
  .sidebar-menu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }
  
  .sidebar-menu .el-menu-item i {
    font-size: 16px;
  }
  
  .page-header {
    padding: 16px;
  }
  
  .page-title {
    font-size: 18px;
  }
  
  .main-content {
    padding: 16px;
  }
}
</style>