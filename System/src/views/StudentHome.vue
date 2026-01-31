<template>
  <div class="student-home-container">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="nav-bg"></div>
      <div class="nav-content">
        <div class="nav-left">
          <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="nav-logo"></el-avatar>
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
                  <el-button type="primary" size="small" class="course-btn">继续学习</el-button>
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
  '7': SmartPractice
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
  '8': '破茧视界'
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
    console.error('获取用户信息失败:', error)
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
        console.error('解析用户信息失败:', e)
      }
    }
    
    console.log('当前角色类型:', roleType)
    
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
.student-home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 导航栏样式 */
.navbar {
  position: relative;
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
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
}

.platform-name {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-stats {
  display: flex;
  margin-right: 30px;
}

.stat-item {
  margin-right: 20px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #909399;
}

.stat-value {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #303133;
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.user-avatar {
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
  color: #303133;
}

.interactive-btn {
  margin-left: 10px;
}

/* 主体布局 */
.main-layout {
  display: flex;
  min-height: calc(100vh - 70px);
}

/* 侧边栏样式 */
.sidebar {
  width: 220px;
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  transition: width 0.3s;
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
}

.collapse-text {
  font-size: 14px;
  color: #606266;
}

.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.3s;
}

/* 内容区样式 */
.content-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.breadcrumb {
  font-size: 14px;
}

.header-decoration {
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 3px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.main-content {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 首页内容样式 */
.home-content {
  padding: 0;
}

/* 欢迎横幅 */
.welcome-banner {
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #409eff, #69c0ff);
  opacity: 0.9;
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-align: center;
  padding: 0 30px;
}

.banner-content h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.banner-content p {
  font-size: 16px;
  margin: 0;
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
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
  font-size: 24px;
  color: #ffffff;
}

.study-icon {
  background: linear-gradient(135deg, #409eff, #69c0ff);
}

.practice-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.create-icon {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.break-icon {
  background: linear-gradient(135deg, #f56c6c, #f78989);
}

.overview-card h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.overview-card p {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
}

/* 推荐课程 */
.recommended-courses {
  margin-bottom: 30px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
}

.section-subtitle {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.course-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  margin-bottom: 15px;
}

.course-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.course-teacher {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
}

.course-progress {
  margin-bottom: 15px;
}

.progress-text {
  font-size: 12px;
  color: #909399;
  float: right;
  margin-top: 5px;
}

.course-btn {
  width: 100%;
}

/* 破茧视界 */
.break-cocoon-section {
  margin-bottom: 30px;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.video-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.video-thumbnail {
  position: relative;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.thumbnail-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
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
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.3s;
}

.play-icon:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.video-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.video-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.5;
}

.video-link {
  display: block;
  text-align: center;
}

/* 破茧视界页面样式 */
.breakthrough-content {
  padding: 0;
}

.breakthrough-header {
  text-align: center;
  margin-bottom: 30px;
}

.breakthrough-header h3 {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.breakthrough-header p {
  font-size: 16px;
  color: #606266;
  margin: 0;
}

.video-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.category-tag {
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-tag.active {
  background-color: #409eff;
  color: #ffffff;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.video-card-large {
  transition: transform 0.3s, box-shadow 0.3s;
}

.video-card-large:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.video-thumbnail-large {
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.thumbnail-img-large {
  width: 100%;
  height: 200px;
  object-fit: cover;
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
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.3s;
}

.play-icon-large:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.video-title-large {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 15px;
}

.video-description-large {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.5;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #909399;
}

.video-link-large {
  display: block;
  text-align: center;
}

.watch-btn {
  width: 100%;
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

  .content-area {
    padding: 15px;
  }

  .main-content {
    padding: 20px;
  }

  .overview-cards {
    grid-template-columns: 1fr;
  }

  .course-list {
    grid-template-columns: 1fr;
  }

  .video-list {
    grid-template-columns: 1fr;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>