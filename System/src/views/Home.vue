<template>
  <div class="home-container" style="height: 100vh; display: flex;">
    <!-- 侧边导航栏 -->
    <div class="sidebar" style="width: 200px; background: #2f4050; color: #fff;">
      <div class="logo" style="padding: 20px; text-align: center; font-size: 18px; font-weight: bold; border-bottom: 1px solid #3d5069;">
        慧学澄明平台
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
        style="height: calc(100% - 60px); border-right: none;"
      >
        <el-menu-item index="1">
          <el-icon><Menu /></el-icon>
          <span slot="title">课程中心</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Message /></el-icon>
          <span slot="title">收件箱</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Edit /></el-icon>
          <span slot="title">专题创作</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Document /></el-icon>
          <span slot="title">学习笔记</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><Folder /></el-icon>
          <span slot="title">个人云盘</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><Lightning /></el-icon>
          <span slot="title">AI课堂总结</span>
        </el-menu-item>
        <el-menu-item index="7">
          <el-icon><Brush /></el-icon>
          <span slot="title">智能练习中心</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区 -->
    <div style="flex: 1; display: flex; flex-direction: column;">
      <!-- 顶部栏：新增退出登录按钮 + 显示用户名 -->
      <div class="header" style="height: 60px; padding: 0 20px; display: flex; justify-content: flex-end; align-items: center; border-bottom: 1px solid #e6e6e6;">
        <span style="margin-right: 20px;">欢迎回来：{{ userInfo.name }}</span>
        <el-button type="primary" plain @click="handleTeacherSwitch" style="margin-right: 10px;">
          切换教师端
        </el-button>
        <!-- 新增：退出登录按钮 -->
        <el-button type="danger" plain @click="handleLogout">
          退出登录
        </el-button>
      </div>

      <!-- 主内容区 -->
      <div class="main-content" style="flex: 1; padding: 20px; overflow-y: auto; background: #f3f3f4;">
        <component :is="currentView"></component>
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
// 导入接口（若没有getUserInfo接口，可注释，仅用本地缓存）
// import { getUserInfo } from '@/api'

const router = useRouter()
// 核心：从localStorage读取登录用户信息（优先）
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{"name":"未知用户"}'))
const currentView = ref(Course) // 默认显示课程页面

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
    console.log('获取用户信息失败，使用本地缓存：', error)
  }
})

// 菜单切换事件
const handleMenuSelect = (index) => {
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