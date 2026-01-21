<template>
  <div class="login-container" :style="{ backgroundImage: `url(${loginBg})` }">
    <div class="login-card">
      <div class="login-header">
        <h2 class="login-title">慧学澄明平台</h2>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            placeholder="请输入账号"
            prefix-icon="User"
            size="large"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            clearable
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="isLoading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-footer">
        <span>忘记密码？联系管理员重置</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
// 背景图：若不需要本地背景图，可注释此行并将下方 loginBg 改为空字符串
import loginBg from '@/assets/login-bg.png'

const router = useRouter()
const loginFormRef = ref(null)
const isLoading = ref(false)

// 表单数据（适配后端 account 参数）
const loginForm = reactive({
  account: '',
  password: ''
})

// 表单校验规则
const loginRules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录逻辑（修复 token 读取报错 + 完善错误处理）
const handleLogin = async () => {
  // 表单前置校验
  try {
    await loginFormRef.value.validate()
  } catch (error) {
    ElMessage.warning('请完善登录信息')
    return
  }

  isLoading.value = true
  try {
    // 发起登录请求
    const res = await request.post('/login', {
      account: loginForm.account,
      password: loginForm.password
    })

    // 严格校验返回数据结构，避免 token 读取报错
    if (!res || !res.data) {
      throw new Error('登录失败：服务器返回数据异常')
    }

    // 适配后端返回结构（优先读取一级 data.token，兼容多级）
    const token = res.data.token || (res.data.data && res.data.data.token)
    if (!token) {
      throw new Error('登录失败：未获取到登录凭证')
    }

    // 存储 token 并跳转首页
    localStorage.setItem('token', token)
    ElMessage.success('登录成功！')
    router.push('/home')
  } catch (err) {
    // 友好的错误提示
    ElMessage.error(err.message || '登录失败，请检查账号密码')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* 若不需要背景图，可添加默认背景色 */
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #3a466a;
  margin: 0;
}

.login-form {
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  background: #3a466a;
  border-color: #3a466a;
  height: 48px;
  font-size: 16px;
}

.login-btn:hover {
  background: #4b5a8a;
  border-color: #4b5a8a;
}

.login-footer {
  text-align: center;
  font-size: 12px;
  color: #909399;
}
</style>