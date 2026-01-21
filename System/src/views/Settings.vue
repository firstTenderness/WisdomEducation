<template>
  <div class="settings-container">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <el-icon><ArrowLeft /></el-icon>
      返回上一页
    </button>
    
    <div class="page-header">
      <h2>系统设置</h2>
      <p>配置平台使用偏好</p>
    </div>

    <el-card class="settings-card">
      <el-form
        ref="settingsFormRef"
        :model="settingsForm"
        label-width="120px"
        class="settings-form"
      >
        <el-form-item label="消息通知">
          <el-switch
            v-model="settingsForm.notification"
            active-text="开启"
            inactive-text="关闭"
          />
        </el-form-item>

        <el-form-item label="主题风格">
          <el-select v-model="settingsForm.theme" placeholder="选择主题">
            <el-option label="默认主题" value="default" />
            <el-option label="深色模式" value="dark" />
          </el-select>
        </el-form-item>

        <el-form-item label="自动登录">
          <el-switch
            v-model="settingsForm.autoLogin"
            active-text="开启"
            inactive-text="关闭"
          />
        </el-form-item>

        <el-form-item label="缓存清理">
          <el-button type="primary" @click="clearCache">清理本地缓存</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="saveSettings"
            :loading="saveLoading"
          >
            保存设置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/home')
  }
}

// 状态管理
const settingsFormRef = ref(null)
const saveLoading = ref(false)
// 模拟设置数据
const settingsForm = reactive({
  notification: true,
  theme: 'default',
  autoLogin: false
})

// 模拟获取设置
const getSettings = async () => {
  ElMessage.success('获取设置成功')
}

// 模拟保存设置
const saveSettings = async () => {
  saveLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  ElMessage.success('设置保存成功！')
  saveLoading.value = false
}

// 清理缓存
const clearCache = () => {
  localStorage.clear()
  ElMessage.success('本地缓存已清理！')
}

onMounted(() => {
  getSettings()
})
</script>

<style scoped>
.settings-container {
  width: 100%;
  min-height: calc(100vh - 120px);
  background-color: #f5f7fa;
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.page-header p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.settings-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.settings-form {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 20px;
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