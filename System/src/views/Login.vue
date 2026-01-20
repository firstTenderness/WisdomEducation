<template>
  <!-- 背景容器（后期替换图片） -->
  <div class="login-bg">
    <div class="login-container">
      <!-- 左侧文字区域 -->
      <div class="login-left">
        <h1 class="title">慧学澄明智能学习管理系统</h1>
        <p class="subtitle">让学习更高效，让管理更智能</p>
      </div>

      <!-- 右侧登录卡片 -->
      <div class="login-card">
        <el-form :model="loginForm" class="login-form">
          <el-form-item label="用户名" label-width="60px">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              class="input-item"
            />
          </el-form-item>
          <el-form-item label="密码" label-width="60px">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              class="input-item"
            />
          </el-form-item>
          <div class="btn-group">
            <button @click="toLogin" class="login-btn">登录</button>
            <button @click="resetForm" class="reset-btn">重置</button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 响应式数据
const loginForm = ref({ username: '', password: '' })
const router = useRouter()
const port = '8080' // 固定端口

// 登录核心方法
const toLogin = () => {
  if (!loginForm.value.username) {
    ElMessage.warning('请输入用户名！')
    return
  }
  if (!loginForm.value.password) {
    ElMessage.warning('请输入密码！')
    return
  }

  const requestData = {
    account: loginForm.value.username,
    password: loginForm.value.password
  }

  axios.post(`http://localhost:${port}/login`, requestData, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json, text/plain, */*'
    }
  }).then(res => {
    console.log('后端返回数据：', res.data)
    if (res.data.code === 1 || res.data.msg === 'success') {
      const token = res.data.data?.token || 'login_success_token_2026'
      localStorage.setItem('token', token)
      router.push('/home').then(() => {
        ElMessage.success('登录成功！已跳转到首页')
      }).catch(err => {
        console.error('跳转失败：', err)
        ElMessage.error('跳转异常，请手动访问 /home 路径')
      })
    } else {
      ElMessage.error(res.data.msg || '账号或密码错误！')
    }
  }).catch(err => {
    console.error('请求失败：', err)
    ElMessage.error('网络异常，请检查后端服务是否启动！')
  })
}

// 重置表单
const resetForm = () => {
  loginForm.value.username = ''
  loginForm.value.password = ''
  ElMessage.info('表单已重置！')
}
</script>

<style scoped>
/* 背景容器（后期替换为你的图片） */
.login-bg {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/login-bg.png') no-repeat center center / cover;
  /* 测试用纯色背景（替换时注释掉上面一行） */
  /* background: #e8f4ff; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}

/* 登录整体容器 */
.login-container {
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  gap: 80px;
}

/* 左侧文字区域 */
.login-left {
  flex: 1;
  color: #fff;
  text-align: left;
}

.title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 18px;
  opacity: 0.9;
  line-height: 1.6;
}

/* 右侧登录卡片 */
.login-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 48px 36px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
}

/* 表单 */
.login-form {
  width: 100%;
}

/* 表单项 */
.el-form-item {
  margin-bottom: 24px;
}

.el-form-item__label {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

/* 输入框 */
.input-item {
  height: 44px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  transition: all 0.3s;
}

.input-item:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

/* 按钮组 */
.btn-group {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

/* 登录按钮 */
.login-btn {
  flex: 1;
  height: 44px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #66b1ff;
}

/* 重置按钮 */
.reset-btn {
  flex: 1;
  height: 44px;
  background: #f5f7fa;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn:hover {
  background: #e4e7ed;
  border-color: #c0c4cc;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    gap: 40px;
  }
  .login-left {
    text-align: center;
  }
  .title {
    font-size: 28px;
  }
}
</style>