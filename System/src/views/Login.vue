<template>
  <div class="login-container">
    <!-- 左侧背景区域 -->
    <div class="login-bg-section">
      <div class="bg-content">
        <h2 class="bg-title">慧学澄明教育学习平台</h2>
        <p class="bg-subtitle">智能教育，引领未来学习新方式</p>
        <div class="bg-features">
          <div class="feature-item">
            <i class="fas fa-book"></i>
            <span>智能课程推荐</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-lightbulb"></i>
            <span>AI辅助创意生成</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-chart-line"></i>
            <span>个性化学习路径</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧登录区域 -->
    <div class="login-form-section">
      <router-link to="/portal" class="back-to-portal">
        <i class="fas fa-home"></i>
        首页
      </router-link>
      
      <!-- 装饰元素 -->
      <div class="decorative-elements">
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
        <div class="decorative-circle circle-3"></div>
      </div>
      
      <div class="login-box">
        <div class="login-header">
          <h3 class="login-title">欢迎回来</h3>
          <p class="login-subtitle">请登录您的账户继续学习之旅</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group" :class="{ 'has-error': errors.account }">
            <label class="form-label">账号</label>
            <div class="input-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input 
                type="text" 
                v-model="formData.account"
                placeholder="请输入账号"
                @focus="clearError('account')"
                @blur="validateField('account')"
              />
            </div>
            <span class="error-message" v-if="errors.account">{{ errors.account }}</span>
          </div>
          
          <div class="form-group" :class="{ 'has-error': errors.password }">
            <label class="form-label">密码</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input 
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                placeholder="请输入密码"
                @focus="clearError('password')"
                @blur="validateField('password')"
              />
              <button 
                type="button" 
                class="toggle-password"
                @click="togglePassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          </div>
          
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="formData.rememberMe" />
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">忘记密码？</a>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-lg"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i>
              登录中...
            </span>
            <span v-else>登录</span>
          </button>
          
          <div class="divider">
            <span>或</span>
          </div>
          
          <button 
            type="button" 
            class="btn btn-secondary btn-lg"
            @click="handleDemoLogin"
          >
            <i class="fas fa-play-circle"></i>
            演示专用通道
          </button>
        </form>
        
        <div class="login-footer">
          <p>还没有账户？<a href="#" @click.prevent="handleRegister">立即注册</a></p>
        </div>
        
        <div v-if="errorMessage" class="error-alert">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/api/index';

const router = useRouter();

const formData = reactive({
  account: '',
  password: '',
  rememberMe: false
});

const errors = reactive({
  account: '',
  password: ''
});

const isLoading = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');

onMounted(() => {
  loadRememberedCredentials();
});

const loadRememberedCredentials = () => {
  const remembered = localStorage.getItem('rememberedCredentials');
  if (remembered) {
    const credentials = JSON.parse(remembered);
    formData.account = credentials.account || '';
    formData.password = credentials.password || '';
    formData.rememberMe = true;
  }
};

const validateField = (field) => {
  if (field === 'account') {
    if (!formData.account.trim()) {
      errors.account = '请输入账号';
      return false;
    }
    if (formData.account.length < 3) {
      errors.account = '账号长度至少为3个字符';
      return false;
    }
    errors.account = '';
  }
  
  if (field === 'password') {
    if (!formData.password) {
      errors.password = '请输入密码';
      return false;
    }
    if (formData.password.length < 6) {
      errors.password = '密码长度至少为6个字符';
      return false;
    }
    errors.password = '';
  }
  
  return true;
};

const validateForm = () => {
  const isAccountValid = validateField('account');
  const isPasswordValid = validateField('password');
  return isAccountValid && isPasswordValid;
};

const clearError = (field) => {
  errors[field] = '';
  errorMessage.value = '';
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (!validateForm()) {
    return;
  }
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // 调用后端登录API
    const response = await login({
      account: formData.account,
      password: formData.password
    });
    
    // 后端返回的用户数据
    let userData = response;
    
    // 检查用户数据是否存在
    if (!userData) {
      throw new Error('登录响应数据为空');
    }
    
    // 检查是否包含token
    if (!userData.token) {
      throw new Error('登录响应数据中缺少token');
    }
    
    // 保存用户信息到本地存储
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    
    if (formData.rememberMe) {
      localStorage.setItem('rememberedCredentials', JSON.stringify({
        account: formData.account,
        password: formData.password
      }));
    } else {
      localStorage.removeItem('rememberedCredentials');
    }
    
    // 强制跳转到学生端页面
    setTimeout(() => {
      router.push('/home');
    }, 500);
    
  } catch (err) {
    ElMessage.error(err.message || '登录失败，请稍后重试');
    errorMessage.value = err.message || '登录失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
};

const handleForgotPassword = () => {
  ElMessage.info('请联系管理员重置密码');
};

const handleRegister = () => {
  router.push('/register');
};

const handleDemoLogin = () => {
  // 创建演示用户数据，拥有全部权限
  const demoUser = {
    token: 'demo_token_123456',
    id: 1,
    name: '演示用户',
    role_type: 2, // 同时拥有学生和教师权限
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20student%20avatar%20portrait&image_size=square',
    permissions: ['student', 'teacher', 'admin'],
    hasAllAccess: true
  };
  
  // 保存用户信息到本地存储
  localStorage.setItem('token', demoUser.token);
  localStorage.setItem('userInfo', JSON.stringify(demoUser));
  
  // 跳转到学生端页面
  ElMessage.success('演示模式已启动，您拥有全部权限');
  
  // 强制跳转，不受路由守卫影响
  setTimeout(() => {
    window.location.href = '#/home';
    window.location.reload();
  }, 100);
};
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

/* 左侧背景区域 */
.login-bg-section {
  flex: 1;
  background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.login-bg-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20education%20classroom%20with%20students%20learning%20happy%20teacher%20digital%20technology%20study%20environment%20green%20theme&image_size=landscape_16_9');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  animation: bgParallax 20s ease-in-out infinite;
}

@keyframes bgParallax {
  0%, 100% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.05) translate(-5px, -5px);
  }
}

.bg-content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  max-width: 400px;
  animation: fadeInLeft 1s ease-out;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.bg-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.bg-subtitle {
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.5;
}

.bg-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 25px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 280px;
  justify-content: center;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.feature-item i {
  font-size: 20px;
  color: #fff;
}

.feature-item span {
  font-size: 16px;
  font-weight: 500;
}

/* 右侧登录区域 */
.login-form-section {
  flex: 1;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

/* 装饰元素 */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.1);
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
  animation-delay: 2s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: -75px;
  transform: translateY(-50%);
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.back-to-portal {
  position: fixed;
  top: 20px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4CAF50;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 0 25px 25px 0;
  background: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.back-to-portal:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.25);
  background: #f0fdf4;
  color: #45a049;
}

.back-to-portal i {
  font-size: 16px;
}

.login-box {
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  animation: fadeInRight 1s ease-out;
  overflow: hidden;
}

.login-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #81C784);
  border-radius: 24px 24px 0 0;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  color: #94a3b8;
  font-size: 16px;
  z-index: 2;
}

.form-group input {
  width: 100%;
  height: 52px;
  padding: 0 45px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.form-group input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
  background: white;
}

.form-group.has-error input {
  border-color: #ef4444;
}

.form-group.has-error input:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.toggle-password {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 8px;
  font-size: 16px;
  transition: color 0.3s;
  border-radius: 6px;
}

.toggle-password:hover {
  color: #3b82f6;
  background: #f0f9ff;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px;
  padding-left: 5px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  user-select: none;
  gap: 8px;
}

.remember-me input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.forgot-password {
  color: #4CAF50;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
  font-weight: 500;
}

.forgot-password:hover {
  color: #45a049;
  text-decoration: underline;
}

.btn {
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  margin-top: 16px;
}

.btn:first-child {
  margin-top: 0;
}

.btn-primary {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
  filter: brightness(1.05);
}

.btn-secondary {
  background: #f8fafc;
  color: #334155;
  border: 2px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-color: #cbd5e1;
  background: #f1f5f9;
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  padding: 0 16px;
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
}

.login-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

.login-footer p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.login-footer a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.login-footer a:hover {
  color: #45a049;
  text-decoration: underline;
}

.error-alert {
  position: absolute;
  top: -70px;
  left: 0;
  right: 0;
  background: #fee2e2;
  color: #dc2626;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.2);
  animation: slideDown 0.3s ease-out;
  z-index: 10;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .login-container {
    flex-direction: column;
  }
  
  .login-bg-section {
    width: 100%;
    min-height: 400px;
  }
  
  .login-form-section {
    width: 100%;
    min-height: 60vh;
  }
  
  .bg-title {
    font-size: 28px;
  }
  
  .bg-subtitle {
    font-size: 16px;
  }
  
  .feature-item {
    max-width: 240px;
  }
}

@media (max-width: 768px) {
  .login-bg-section,
  .login-form-section {
    padding: 30px 20px;
  }
  
  .back-to-portal {
    top: 20px;
    left: 20px;
    padding: 8px 14px;
    font-size: 13px;
  }
  
  .login-box {
    padding: 40px 30px;
    max-width: 100%;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .login-subtitle {
    font-size: 14px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group input {
    height: 48px;
    font-size: 15px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .btn {
    height: 48px;
    font-size: 15px;
  }
  
  .bg-features {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .feature-item {
    flex: 1;
    min-width: 150px;
    max-width: 180px;
    padding: 12px 20px;
  }
  
  .feature-item span {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 35px 25px;
  }
  
  .login-title {
    font-size: 22px;
  }
  
  .login-subtitle {
    font-size: 13px;
  }
  
  .form-group input {
    height: 44px;
    font-size: 14px;
  }
  
  .btn {
    height: 44px;
    font-size: 14px;
  }
  
  .back-to-portal {
    padding: 7px 12px;
    font-size: 12px;
  }
  
  .error-alert {
    font-size: 13px;
    padding: 12px 16px;
  }
  
  .bg-features {
    flex-direction: column;
  }
  
  .feature-item {
    max-width: 100%;
  }
}
</style>
