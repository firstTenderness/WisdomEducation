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
  router.back()
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

/* 响应式设计 */
@media (max-width: 768px) {
  .settings-container {
    padding: 10px;
  }
  
  .back-btn {
    padding: 10px 16px;
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .page-header h2 {
    font-size: 18px;
  }
  
  .page-header p {
    font-size: 13px;
  }
  
  .settings-form {
    padding: 15px;
  }
  
  .el-form-item {
    margin-bottom: 15px;
  }
  
  .el-form-item label {
    font-size: 14px;
  }
  
  .el-switch {
    transform: scale(0.9);
  }
  
  .el-select {
    width: 100%;
  }
  
  .el-select .el-input__wrapper {
    height: 44px;
  }
  
  .el-select .el-input__inner {
    font-size: 14px;
    padding: 0 12px;
  }
  
  .el-button {
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
  }
  
  /* 确保表单在移动端显示正常 */
  .el-form {
    width: 100%;
  }
  
  .el-form-item__content {
    width: 100%;
  }
}
</style>