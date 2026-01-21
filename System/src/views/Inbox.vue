<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <el-icon><ArrowLeft /></el-icon>
      返回上一页
    </button>
    
    <div class="page-header">
      <h2>收件箱</h2>
      <p>您的消息通知中心</p>
    </div>
    <el-card class="page-card">
      <el-empty description="暂无新消息通知" :image-size="120" />
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

// 返回上一页（若无上一页则返回首页）
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/home')
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  padding: 10px 0;
}
.page-header {
  margin-bottom: 20px;
}
.page-header h2 {
  font-size: 22px;
  color: #2c3e50;
  margin: 0;
}
.page-header p {
  font-size: 14px;
  color: #909399;
  margin: 5px 0 0 0;
}
.page-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
/* 返回按钮样式 */
.back-btn {
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #f5f7fa;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  color: #2c3e50;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.back-btn:hover {
  background-color: #e6e6e6;
  color: #3498db;
}
.back-btn .el-icon {
  margin-right: 6px;
}
</style>