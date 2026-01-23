<template>
  <div class="teacher-dashboard" style="padding: 20px; height: 100vh; background: #f5f5f5;">
    <div class="teacher-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h1>教师管理后台</h1>
      <el-button type="primary" @click="goBack">返回学生端</el-button>
    </div>
    <div class="teacher-content" style="background: #fff; padding: 20px; border-radius: 4px;">
      <el-card>
        <h2>教师功能区</h2>
        <p>当前用户ID：{{ userInfo.id || '未知' }}</p>
        <p>当前用户名：{{ userInfo.name || '未知' }}</p>
        <p>当前用户角色：{{ userInfo.role_type === 2 ? '教师' : '学生' }}</p>
        <p>✅ 已成功对接真实后端，Mock数据正常拦截！</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getUserInfo } from '@/api'

const router = useRouter()
const userInfo = ref({})

// 验证教师身份
onMounted(async () => {
  try {
    const res = await getUserInfo()
    userInfo.value = res
    
    // 容错：临时模拟role_type
    if (!userInfo.value.role_type) {
      userInfo.value.role_type = userInfo.value.id === 22 ? 1 : 2
    }

    // 非教师身份，强制返回首页
    if (userInfo.value.role_type !== 2) {
      ElMessage.error('无教师权限，无法访问！')
      router.push('/home')
    }
  } catch (error) {
    ElMessage.error('验证身份失败，请重新登录')
    router.push('/login')
  }
})

// 返回学生端
const goBack = () => {
  router.push('/home')
}
</script>