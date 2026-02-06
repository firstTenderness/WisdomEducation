<template>
  <div class="student-home-container">
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
            <el-dropdown trigger="click" @command="handleUserMenuCommand">
              <div class="user-avatar-wrapper">
                <el-avatar :size="36" :src="userInfo.avatar || defaultAvatar" class="user-avatar"></el-avatar>
                <span class="user-name">欢迎回来：{{ userInfo.name }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <i class="el-icon-user"></i> 个人信息
                  </el-dropdown-item>
                  <el-dropdown-item command="settings">
                    <i class="el-icon-setting"></i> 个人设置
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          :background-color="'var(--bg-secondary)'"
          :text-color="'var(--text-primary)'"
          :active-text-color="'var(--bg-primary)'"
          :collapse="isCollapse"
          @select="handleMenuSelect"
        >
          <div class="logo-container" @click="toggleCollapse">
            <i class="el-icon-s-unfold" :class="{ 'rotate-icon': isCollapse }"></i>
            <span v-show="!isCollapse" class="collapse-text">收起菜单</span>
          </div>
          
          <el-menu-item index="0">
            <template #title>
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
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
              <i class="el-icon-video-camera"></i>
              <span>破茧视界</span>
            </template>
          </el-menu-item>
          <el-menu-item index="9">
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
          <!-- 首页内容 -->
          <div v-if="currentMenu === '0'" class="home-content">
            <!-- 欢迎横幅 -->
            <div class="welcome-banner">
              <div class="banner-bg"></div>
              <div class="banner-content">
                <h3>欢迎来到慧学澄明学习教育平台</h3>
                <p>探索知识的海洋，开启智慧的旅程</p>
              </div>
            </div>

            <!-- 学习概览卡片 -->
            <div class="overview-cards">
              <el-card shadow="hover" class="overview-card">
                <div class="card-icon study-icon"><i class="el-icon-book"></i></div>
                <h4>课程学习</h4>
                <p>探索丰富的课程资源，开启学习之旅</p>
                <el-button type="primary" @click="navigateTo('1')">开始学习</el-button>
              </el-card>
              <el-card shadow="hover" class="overview-card">
                <div class="card-icon practice-icon"><i class="el-icon-brush"></i></div>
                <h4>智能练习</h4>
                <p>个性化练习，针对性提升</p>
                <el-button type="success" @click="navigateTo('7')">开始练习</el-button>
              </el-card>
              <el-card shadow="hover" class="overview-card">
                <div class="card-icon create-icon"><i class="el-icon-edit"></i></div>
                <h4>创意创作</h4>
                <p>发挥想象力，创作精彩内容</p>
                <el-button type="warning" @click="navigateTo('3')">开始创作</el-button>
              </el-card>
              <el-card shadow="hover" class="overview-card">
                <div class="card-icon break-icon"><i class="el-icon-video-camera"></i></div>
                <h4>破茧视界</h4>
                <p>打破信息茧房，拓展视野</p>
                <el-button type="danger" @click="navigateTo('8')">探索世界</el-button>
              </el-card>
            </div>

            <!-- 推荐课程 -->
            <div class="recommended-courses">
              <h3 class="section-title">推荐课程</h3>
              <div class="course-list">
                <el-card 
                  v-for="course in recommendedCourses" 
                  :key="course.id"
                  shadow="hover"
                  class="course-card"
                >
                  <img :src="course.cover" :alt="course.title" class="course-cover">
                  <h4 class="course-title">{{ course.title }}</h4>
                  <p class="course-teacher">教师：{{ course.teacher }}</p>
                  <div class="course-progress">
                    <el-progress :percentage="course.progress" :stroke-width="8"></el-progress>
                    <span class="progress-text">{{ course.progress }}%</span>
                  </div>
                  <el-button type="primary" size="small" class="course-btn" @click="continueLearning(course)">继续学习</el-button>
                </el-card>
              </div>
            </div>

            <!-- 破茧视界 -->
            <div class="break-cocoon-section">
              <h3 class="section-title">破茧视界</h3>
              <p class="section-subtitle">打破信息茧房，探索多元世界</p>
              <div class="video-list">
                <el-card 
                  v-for="video in breakthroughVideos" 
                  :key="video.id"
                  shadow="hover"
                  class="video-card"
                >
                  <div class="video-thumbnail">
                    <img :src="video.thumbnail" :alt="video.title" class="thumbnail-img">
                    <div class="play-icon"><i class="el-icon-video-play"></i></div>
                  </div>
                  <h4 class="video-title">{{ video.title }}</h4>
                  <p class="video-description">{{ video.description }}</p>
                  <a :href="video.url" target="_blank" class="video-link">
                    <el-button type="info">观看视频</el-button>
                  </a>
                </el-card>
              </div>
            </div>
          </div>

          <!-- 破茧视界内容 -->
          <div v-else-if="currentMenu === '8'" class="breakthrough-content">
            <div class="breakthrough-header">
              <h3>破茧视界</h3>
              <p>打破信息茧房，拓展多元视野</p>
            </div>
            <div class="video-categories">
              <el-tag 
                v-for="category in videoCategories" 
                :key="category"
                :class="{ active: selectedCategory === category }"
                @click="selectedCategory = category"
                class="category-tag"
              >
                {{ category }}
              </el-tag>
            </div>
            <div class="video-grid">
              <el-card 
                v-for="video in filteredVideos" 
                :key="video.id"
                shadow="hover"
                class="video-card-large"
              >
                <div class="video-thumbnail-large">
                  <img :src="video.thumbnail" :alt="video.title" class="thumbnail-img-large">
                  <div class="play-icon-large"><i class="el-icon-video-play"></i></div>
                </div>
                <h4 class="video-title-large">{{ video.title }}</h4>
                <p class="video-description-large">{{ video.description }}</p>
                <div class="video-meta">
                  <span class="video-category">{{ video.category }}</span>
                  <span class="video-duration">{{ video.duration }}</span>
                </div>
                <a :href="video.url" target="_blank" class="video-link-large">
                  <el-button type="primary" class="watch-btn">立即观看</el-button>
                </a>
              </el-card>
            </div>
          </div>

          <!-- 其他页面内容 -->
          <component v-else :is="currentView"></component>
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

const router = useRouter()
// 核心：从localStorage读取登录用户信息（优先）
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{"name":"未知用户","avatar":""}'))
const currentMenu = ref('0') // 当前选中菜单
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
  '9': HeroRank
}

// 菜单与标题映射
const menuTitleMap = {
  '0': '首页',
  '1': '智学课栈',
  '2': '灵犀消息台',
  '3': '妙思创作间',
  '4': '智记手札',
  '5': '智存云空间',
  '6': '灵智知识集',
  '7': '智适应练场',
  '8': '破茧视界',
  '9': '鸿鹄榜'
}

// 获取页面标题
const getPageTitle = () => {
  return menuTitleMap[currentMenu.value] || '首页'
}

// 获取当前视图组件
const currentView = ref(null)

// 处理菜单选择
const handleMenuSelect = (key) => {
  currentMenu.value = key
  if (menuMap[key]) {
    currentView.value = menuMap[key]
  } else {
    currentView.value = null
  }
}

// 导航到指定菜单
const navigateTo = (menuKey) => {
  currentMenu.value = menuKey
  if (menuMap[menuKey]) {
    currentView.value = menuMap[menuKey]
  } else {
    currentView.value = null
  }
}

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 推荐课程数据
const recommendedCourses = ref([
  {
    id: 1,
    title: '趣味语文：童话阅读与写作',
    teacher: '李老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20chinese%20language%20course%20cover%20with%20fairy%20tales%20and%20books%20for%20elementary%20students&image_size=square',
    progress: 60
  },
  {
    id: 2,
    title: '数学王国大冒险',
    teacher: '王老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20math%20adventure%20course%20cover%20with%20numbers%20and%20games%20for%20children&image_size=square',
    progress: 45
  },
  {
    id: 3,
    title: '科学实验室：自然奥秘',
    teacher: '张老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20laboratory%20course%20cover%20with%20nature%20elements%20and%20experiments%20for%20kids&image_size=square',
    progress: 75
  }
])

// 破茧视界视频数据
const breakthroughVideos = ref([
  {
    id: 1,
    title: '探索宇宙的奥秘',
    description: '带你了解太阳系的行星和宇宙的起源',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20exploration%20video%20thumbnail%20with%20planets%20and%20galaxies&image_size=landscape_16_9',
    url: 'https://www.example.com/video1',
    category: '科学探索',
    duration: '15:30'
  },
  {
    id: 2,
    title: '世界各地的文化',
    description: '了解不同国家和地区的文化传统',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=world%20cultures%20video%20thumbnail%20with%20different%20cultural%20elements&image_size=landscape_16_9',
    url: 'https://www.example.com/video2',
    category: '人文历史',
    duration: '20:15'
  },
  {
    id: 3,
    title: '大自然的奇妙现象',
    description: '探索自然界中的神奇现象和生物',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20wonders%20video%20thumbnail%20with%20beautiful%20natural%20phenomena&image_size=landscape_16_9',
    url: 'https://www.example.com/video3',
    category: '自然科学',
    duration: '12:45'
  }
])

// 视频分类
const videoCategories = ref(['全部', '科学探索', '人文历史', '自然科学', '艺术欣赏', '科技创新'])
const selectedCategory = ref('全部')

// 过滤后的视频
const filteredVideos = ref(breakthroughVideos.value)

// 切换分类
const switchCategory = (category) => {
  selectedCategory.value = category
  if (category === '全部') {
    filteredVideos.value = breakthroughVideos.value
  } else {
    filteredVideos.value = breakthroughVideos.value.filter(video => video.category === category)
  }
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
    // if (res.code === 200) {
    //   userInfo.value = res.data
    // }
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
})

// 切换到教师端
const handleTeacherSwitch = () => {
  ElMessageBox.confirm('确定要切换到教师端吗？', '切换角色', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 更可靠的角色类型获取方式
    const userInfoStr = localStorage.getItem('userInfo')
    let roleType = 0
    if (userInfoStr) {
      try {
        const userInfoObj = JSON.parse(userInfoStr)
        roleType = userInfoObj.role_type || 0
      } catch (e) {
        ElMessage.error('解析用户信息失败')
      }
    }
    
    // 明确检查只有角色类型为2的用户才能切换到教师端
    if (roleType === 2) {
      ElMessage.success('切换到教师端')
      router.push('/teacher')
    } else {
      ElMessage.warning('当前账号为学生身份，无法进入教师端')
    }
  }).catch(() => {
    ElMessage.info('取消切换')
  })
}

// 继续学习
const continueLearning = (course) => {
  // 导航到智学课栈页面
  currentMenu.value = '1'
  currentView.value = Course
  // 触发课程学习功能
  ElMessage.success(`正在继续学习课程：${course.title}`)
}

// 处理用户菜单命令
const handleUserMenuCommand = (command) => {
  if (command === 'profile') {
    ElMessage.success('跳转到个人信息页面')
    // 这里可以添加跳转到个人信息页面的逻辑
  } else if (command === 'settings') {
    ElMessage.success('跳转到个人设置页面')
    // 这里可以添加跳转到个人设置页面的逻辑
  }
}

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '退出登录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    ElMessage.success('退出登录成功')
    router.push('/login')
  }).catch(() => {
    ElMessage.info('取消退出')
  })
}
</script>

<style scoped>
/* 学生端绿色主题样式 */
.student-home-container {
  /* 主色：草绿/蒲荷绿 */
  --primary-color: #67c23a;
  --primary-light: #85ce61;
  --primary-lighter: #a5d881;
  --primary-dark: #529b2e;
  
  /* 辅色：木色/浅卡其 */
  --secondary-color: #d4a76a;
  --secondary-light: #e6c998;
  --secondary-lighter: #f0d9b5;
  --secondary-dark: #b88a46;
  
  /* 点缀色：黄色（阳光） */
  --accent-color: #e6a23c;
  --accent-light: #ebb563;
  --accent-lighter: #f0c48c;
  
  /* 功能色 */
  --success-color: #67c23a;
  --success-light: #85ce61;
  --warning-color: #e6a23c;
  --warning-light: #ebb563;
  --danger-color: #f56c6c;
  --danger-light: #f78989;
  
  /* 文字色 */
  --text-primary: #303133;
  --text-secondary: #606266;
  --text-light: #909399;
  --text-lighter: #c0c4cc;
  
  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7fa;
  --bg-tertiary: #f0f9eb;
  --bg-quaternary: #f9f2e9;
  
  /* 边框色 */
  --border-color: #e4e7ed;
  --border-light: #ebeef5;
  --border-dark: #dcdfe6;
  
  /* 阴影 */
  --shadow-sm: 0 2px 12px 0 rgba(103, 194, 58, 0.1);
  --shadow-md: 0 10px 20px rgba(103, 194, 58, 0.15);
  --shadow-lg: 0 20px 30px rgba(103, 194, 58, 0.2);
  
  /* 其他 */
  --border-radius: 8px;
  --transition: all 0.3s ease;
  min-height: 100vh;
  background-color: var(--bg-tertiary);
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(103, 194, 58, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(212, 167, 106, 0.1) 0%, transparent 20%);
}

/* 导航栏样式 */
.navbar {
  position: relative;
  height: 70px;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  opacity: 0.1;
  z-index: -1;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 30px;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-logo {
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.1);
}

.platform-name {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.platform-name:hover {
  color: var(--primary-dark);
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-stats {
  display: flex;
  margin-right: 30px;
  gap: 20px;
}

.stat-item {
  text-align: center;
  padding: 8px 16px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.stat-item:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
}

.stat-item:hover .stat-label,
.stat-item:hover .stat-value {
  color: var(--bg-primary);
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-light);
  transition: var(--transition);
}

.stat-value {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: var(--text-primary);
  transition: var(--transition);
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user-avatar-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 25px;
  transition: var(--transition);
  background-color: var(--bg-secondary);
}

.user-avatar-wrapper:hover {
  background-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.user-avatar-wrapper:hover .user-name {
  color: var(--bg-primary);
}

.user-avatar {
  margin-right: 10px;
  border: 2px solid var(--primary-light);
  transition: var(--transition);
}

.user-avatar-wrapper:hover .user-avatar {
  border-color: var(--bg-primary);
  transform: scale(1.05);
}

.user-name {
  font-size: 14px;
  color: var(--text-primary);
  transition: var(--transition);
  font-weight: 500;
}

.interactive-btn {
  margin-left: 10px;
  transition: var(--transition);
}

.interactive-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* 主体布局 */
.main-layout {
  display: flex;
  min-height: calc(100vh - 70px);
}

/* 侧边栏样式 */
.sidebar {
  width: 220px;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  transition: var(--transition);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
}

.sidebar.is-collapse {
  width: 64px;
}

.sidebar-menu {
  border-right: none;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 1px solid var(--border-color);
}

.logo-container:hover {
  background-color: var(--bg-secondary);
}

.collapse-text {
  font-size: 14px;
  color: var(--text-secondary);
  transition: var(--transition);
}

.logo-container:hover .collapse-text {
  color: var(--primary-color);
}

.rotate-icon {
  transform: rotate(180deg);
  transition: var(--transition);
}

/* 侧边栏菜单项样式 */
.sidebar-menu .el-menu-item {
  transition: var(--transition);
  height: 60px;
  line-height: 60px;
  margin: 5px 10px;
  border-radius: var(--border-radius);
}

.sidebar-menu .el-menu-item:hover {
  background-color: rgba(103, 194, 58, 0.1);
  transform: translateX(5px);
}

.sidebar-menu .el-menu-item.is-active {
  background-color: var(--primary-light);
  color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.sidebar-menu .el-menu-item.is-active:hover {
  background-color: var(--primary-color);
}

/* 内容区样式 */
.content-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  margin-bottom: 30px;
  position: relative;
}

.page-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.breadcrumb {
  font-size: 14px;
  color: var(--text-light);
}

.header-decoration {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
  transition: var(--transition);
}

.page-header:hover .header-decoration {
  width: 150px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0 0 10px 0;
  transition: var(--transition);
}

.page-header:hover .page-title {
  color: var(--primary-color);
}

.main-content {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.main-content:hover {
  box-shadow: var(--shadow-md);
}

/* 首页内容样式 */
.home-content {
  padding: 0;
}

/* 欢迎横幅 */
.welcome-banner {
  position: relative;
  height: 220px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.welcome-banner:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-5px);
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  opacity: 0.95;
  z-index: 1;
  transition: var(--transition);
}

.welcome-banner:hover .banner-bg {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-color));
}

.banner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--bg-primary);
  text-align: center;
  padding: 0 30px;
  animation: bannerSlideIn 1s ease-out;
}

@keyframes bannerSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-content h3 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: var(--transition);
}

.banner-content p {
  font-size: 18px;
  margin: 0;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transition: var(--transition);
}

.welcome-banner:hover .banner-content h3 {
  transform: scale(1.05);
}

.welcome-banner:hover .banner-content p {
  transform: scale(1.05);
}

/* 装饰元素 */
.banner-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* 概览卡片 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  text-align: center;
  padding: 30px;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.overview-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transform: scaleX(0);
  transition: var(--transition);
}

.overview-card:hover::before {
  transform: scaleX(1);
}

.overview-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-md);
}

.card-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: var(--bg-primary);
  transition: var(--transition);
  position: relative;
  z-index: 1;
  box-shadow: var(--shadow-sm);
}

.card-icon::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: var(--transition);
}

.overview-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: var(--shadow-md);
}

.study-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
}

.practice-icon {
  background: linear-gradient(135deg, var(--success-color), var(--success-light));
}

.create-icon {
  background: linear-gradient(135deg, var(--warning-color), var(--warning-light));
}

.break-icon {
  background: linear-gradient(135deg, var(--danger-color), var(--danger-light));
}

.overview-card h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-primary);
  transition: var(--transition);
}

.overview-card:hover h4 {
  color: var(--primary-color);
}

.overview-card p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 25px;
  line-height: 1.6;
  transition: var(--transition);
}

.overview-card:hover p {
  color: var(--text-primary);
}

.overview-card .el-button {
  transition: var(--transition);
  border-radius: 20px;
  padding: 8px 24px;
}

.overview-card .el-button:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

/* 推荐课程 */
.recommended-courses {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 3px solid var(--border-color);
  position: relative;
  transition: var(--transition);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transition: var(--transition);
}

.section-title:hover::after {
  width: 120px;
}

.section-title:hover {
  color: var(--primary-color);
}

.section-subtitle {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 25px;
  transition: var(--transition);
}

.section-title:hover + .section-subtitle {
  color: var(--text-secondary);
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.course-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  position: relative;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  transform: scaleX(0);
  transition: var(--transition);
}

.course-card:hover::before {
  transform: scaleX(1);
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-md);
}

.course-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: var(--transition);
}

.course-card:hover .course-cover {
  transform: scale(1.05);
}

.course-info {
  padding: 20px;
}

.course-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
  transition: var(--transition);
  line-height: 1.4;
}

.course-card:hover .course-title {
  color: var(--primary-color);
}

.course-teacher {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 15px;
  transition: var(--transition);
}

.course-card:hover .course-teacher {
  color: var(--text-secondary);
}

.course-progress {
  margin-bottom: 15px;
}

.progress-text {
  font-size: 12px;
  color: var(--text-light);
  float: right;
  margin-top: 5px;
  transition: var(--transition);
}

.course-card:hover .progress-text {
  color: var(--primary-color);
}

.el-progress-bar__inner {
  transition: var(--transition);
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
}

.course-btn {
  width: 100%;
  transition: var(--transition);
  border-radius: 20px;
  padding: 10px 0;
}

.course-btn:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

/* 破茧视界 */
.break-cocoon-section {
  margin-bottom: 30px;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.video-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  position: relative;
}

.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--success-color), var(--success-light));
  transform: scaleX(0);
  transition: var(--transition);
}

.video-card:hover::before {
  transform: scaleX(1);
}

.video-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-md);
}

.video-thumbnail {
  position: relative;
  margin-bottom: 15px;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  overflow: hidden;
  transition: var(--transition);
}

.video-card:hover .video-thumbnail {
  transform: scale(1.02);
}

.thumbnail-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: var(--transition);
}

.video-card:hover .thumbnail-img {
  transform: scale(1.05);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--bg-primary);
  cursor: pointer;
  transition: var(--transition);
  z-index: 1;
  box-shadow: var(--shadow-md);
}

.play-icon:hover {
  transform: translate(-50%, -50%) scale(1.2);
  background-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
}

.video-info {
  padding: 20px;
}

.video-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
  transition: var(--transition);
  line-height: 1.4;
}

.video-card:hover .video-title {
  color: var(--primary-color);
}

.video-description {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 15px;
  line-height: 1.5;
  transition: var(--transition);
}

.video-card:hover .video-description {
  color: var(--text-secondary);
}

.video-link {
  display: block;
  text-align: center;
  transition: var(--transition);
}

.video-link .el-button {
  border-radius: 20px;
  padding: 8px 24px;
  transition: var(--transition);
}

.video-link .el-button:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-sm);
}

/* 破茧视界页面样式 */
.breakthrough-content {
  padding: 0;
}

.breakthrough-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.breakthrough-header:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-5px);
}

.breakthrough-header h3 {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 15px;
  transition: var(--transition);
}

.breakthrough-header:hover h3 {
  color: var(--primary-color);
}

.breakthrough-header p {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  transition: var(--transition);
}

.breakthrough-header:hover p {
  color: var(--text-primary);
}

.video-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
  justify-content: center;
}

.category-tag {
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: var(--transition);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.category-tag:hover {
  background-color: rgba(103, 194, 58, 0.1);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.category-tag.active {
  background-color: var(--primary-light);
  color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.category-tag.active:hover {
  background-color: var(--primary-color);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.video-card-large {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  position: relative;
}

.video-card-large::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--success-color), var(--success-light));
  transform: scaleX(0);
  transition: var(--transition);
}

.video-card-large:hover::before {
  transform: scaleX(1);
}

.video-card-large:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-md);
}

.video-thumbnail-large {
  position: relative;
  margin-bottom: 20px;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  overflow: hidden;
  transition: var(--transition);
}

.video-card-large:hover .video-thumbnail-large {
  transform: scale(1.02);
}

.thumbnail-img-large {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: var(--transition);
}

.video-card-large:hover .thumbnail-img-large {
  transform: scale(1.05);
}

.play-icon-large {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: var(--bg-primary);
  cursor: pointer;
  transition: var(--transition);
  z-index: 1;
  box-shadow: var(--shadow-md);
}

.play-icon-large:hover {
  transform: translate(-50%, -50%) scale(1.2);
  background-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
}

.video-info-large {
  padding: 25px;
}

.video-title-large {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 15px;
  transition: var(--transition);
  line-height: 1.4;
}

.video-card-large:hover .video-title-large {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-content {
    padding: 0 15px;
  }
  
  .platform-name {
    font-size: 16px;
  }
  
  .nav-stats {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .content-area {
    padding: 20px;
  }
  
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .course-list,
  .video-list,
  .video-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: fixed;
    left: -220px;
    top: 70px;
    height: calc(100vh - 70px);
    z-index: 99;
    box-shadow: var(--shadow-lg);
  }
  
  .sidebar.is-collapse {
    left: 0;
    width: 220px;
  }
}

/* 滚动条样式 */
.content-area::-webkit-scrollbar {
  width: 8px;
}

.content-area::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb {
  background: var(--primary-light);
  border-radius: 4px;
  transition: var(--transition);
}

.content-area::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* 加载动画 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-secondary);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 卡片悬浮效果增强 */
.overview-card,
.course-card,
.video-card,
.video-card-large {
  perspective: 1000px;
}

.overview-card:hover,
.course-card:hover,
.video-card:hover,
.video-card-large:hover {
  transform: translateY(-10px) rotateX(5deg);
}

/* 按钮样式增强 */
.el-button {
  transition: var(--transition);
}

.el-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.el-button--primary {
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border: none;
}

.el-button--primary:hover {
  background: linear-gradient(90deg, var(--primary-light), var(--primary-color));
}

.el-button--success {
  background: linear-gradient(90deg, var(--success-color), var(--success-light));
  border: none;
}

.el-button--success:hover {
  background: linear-gradient(90deg, var(--success-light), var(--success-color));
}

.el-button--warning {
  background: linear-gradient(90deg, var(--warning-color), var(--warning-light));
  border: none;
}

.el-button--warning:hover {
  background: linear-gradient(90deg, var(--warning-light), var(--warning-color));
}

.el-button--danger {
  background: linear-gradient(90deg, var(--danger-color), var(--danger-light));
  border: none;
}

.el-button--danger:hover {
  background: linear-gradient(90deg, var(--danger-light), var(--danger-color));
}
</style>