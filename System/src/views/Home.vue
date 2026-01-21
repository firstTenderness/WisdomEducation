<template>
  <div class="hxcm-home-container">
    <!-- 顶部导航 -->
    <header class="hxcm-header">
      <div class="header-left">
        <span class="school-name">慧学澄明学习教育平台</span>
      </div>
      <div class="header-right">
        <input type="text" class="invite-code-input" placeholder="输入邀请码" />
        <button class="new-version-btn">体验新版</button>
        <el-badge :value="notificationCount" class="notification-badge">
          <el-icon :size="22" class="notification-icon">
            <Bell />
          </el-icon>
        </el-badge>
        <el-dropdown trigger="click" class="user-dropdown">
          <span class="user-info">
            <span class="user-name">{{ userInfo.name }}</span>
            <el-icon class="arrow-icon">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="goToSettings">设置</el-dropdown-item>
              <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- 主体内容 -->
    <div class="hxcm-main">
      <!-- 左侧导航栏 -->
      <aside class="hxcm-sidebar">
        <div class="sidebar-header">
          <span class="sidebar-username">{{ userInfo.name }}</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          background-color="#2c3e50"
          text-color="#ecf0f1"
          active-text-color="#ffffff"
          @select="handleMenuSelect"
          router
          unique-opened
          :collapse="false"
        >
          <el-menu-item index="/home">
            <el-icon class="menu-icon"><Menu /></el-icon>
            <span class="menu-text">课程</span>
          </el-menu-item>
          <el-menu-item index="/inbox">
            <el-icon class="menu-icon"><Message /></el-icon>
            <span class="menu-text">收件箱</span>
          </el-menu-item>
          <el-menu-item index="/topic">
            <el-icon class="menu-icon"><EditPen /></el-icon>
            <span class="menu-text">专题创作</span>
          </el-menu-item>
          <el-menu-item index="/notes">
            <el-icon class="menu-icon"><Document /></el-icon>
            <span class="menu-text">笔记</span>
          </el-menu-item>
          <el-menu-item index="/cloud">
            <el-icon class="menu-icon"><Folder /></el-icon>
            <span class="menu-text">云盘</span>
          </el-menu-item>
          <el-menu-item index="/ai-summary">
            <el-icon class="menu-icon"><Cpu /></el-icon>
            <span class="menu-text">AI 课堂总结</span>
          </el-menu-item>
          <el-menu-item index="/smart-practice">
            <el-icon class="menu-icon"><Edit /></el-icon>
            <span class="menu-text">智能练习中心</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 右侧内容区 -->
      <main class="hxcm-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Bell, ArrowDown, Menu, Message, EditPen, Document, Folder, Cpu, Edit } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 状态管理
const activeMenu = ref(route.path)
const notificationCount = ref(0)
const userInfo = reactive({
  name: '当前用户'
})

// 监听路由变化，同步菜单选中状态
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath
  },
  { immediate: true }
)

// 菜单点击事件
const handleMenuSelect = (path) => {
  activeMenu.value = path
  router.push({ path }).then(() => {
    ElMessage.success(`已切换至：${path.split('/')[1] || '首页'}`)
  }).catch(err => {
    ElMessage.error('页面跳转失败：' + err.message)
  })
}

// 初始化
onMounted(() => {
  activeMenu.value = route.path
  // 模拟获取用户信息
  userInfo.name = '慧学澄明用户'
})

// 跳转个人中心/设置/退出登录
const goToProfile = () => router.push('/profile')
const goToSettings = () => router.push('/settings')
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
  ElMessage.success('已安全退出登录')
}
</script>

<style scoped>
.hxcm-home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

/* 顶部导航 */
.hxcm-header {
  height: 60px;
  background: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.header-left .school-name {
  font-size: 18px;
  font-weight: 600;
  color: #ecf0f1;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.invite-code-input {
  padding: 6px 12px;
  border: 1px solid #34495e;
  border-radius: 4px;
  background: #34495e;
  color: #ecf0f1;
  font-size: 14px;
  width: 180px;
}
.new-version-btn {
  padding: 6px 16px;
  border: 1px solid #3498db;
  border-radius: 4px;
  background: transparent;
  color: #3498db;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.new-version-btn:hover {
  background: #3498db;
  color: #fff;
}
.notification-icon {
  color: #ecf0f1;
  cursor: pointer;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
  color: #ecf0f1;
  font-size: 14px;
}
.user-info:hover {
  background: #34495e;
}
.arrow-icon {
  font-size: 12px;
}

/* 主体内容 */
.hxcm-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧导航栏 */
.hxcm-sidebar {
  width: 200px;
  background: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
}
.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #34495e;
}
.sidebar-username {
  font-size: 16px;
  font-weight: 500;
  color: #ecf0f1;
}
.sidebar-menu {
  flex: 1;
  border-right: none;
}
.menu-icon {
  font-size: 18px;
  margin-right: 8px;
}
.menu-text {
  font-size: 15px;
  font-weight: 400;
  display: inline-block !important;
  width: auto !important;
}
.el-menu-item {
  height: 50px;
  line-height: 50px;
  padding-left: 24px !important;
  overflow: visible !important;
}
.el-menu-item.is-active {
  background-color: #3498db !important;
  color: #ffffff !important;
}

/* 右侧内容区 */
.hxcm-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
}
</style>