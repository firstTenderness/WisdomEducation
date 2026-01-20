<template>
  <div style="width: 800px; margin: 100px auto; text-align: center;">
    <h1 style="color: #409eff; font-size: 32px; margin-bottom: 30px;">✅ 登录成功！</h1>
    <div style="font-size: 16px; line-height: 2;">
      <p>当前Token：<span style="color: #f56c6c;">{{ token }}</span></p>
      <p>当前路径：/home</p>
    </div>
    <button 
      style="margin-top: 40px; padding: 10px 30px; background: #f56c6c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;"
      @click="logout"
    >
      退出登录
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const token = ref('')
const router = useRouter()

// 页面挂载时读取Token
onMounted(() => {
  token.value = localStorage.getItem('token') || '未获取到Token'
  console.log('首页读取Token：', token.value)
})

// 退出登录
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
  ElMessage.info('已退出登录，返回登录页！')
}
</script>