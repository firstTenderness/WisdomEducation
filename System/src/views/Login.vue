<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2 class="login-title">慧学澄明学习教育平台</h2>
        <p class="login-subtitle">欢迎回来，请登录您的账户</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group" :class="{ 'has-error': errors.account }">
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
          class="login-button"
          :disabled="isLoading"
        >
          <span v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i>
            登录中...
          </span>
          <span v-else>登录</span>
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
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

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
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        account: formData.account, 
        password: formData.password 
      })
    });
    
    const data = await res.json();
    const userData = data.data;
    
    if (res.ok && userData?.token) {
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
      
      router.push('/home');
    } else {
      errorMessage.value = data.message || '登录失败，请检查账号和密码';
    }
  } catch (err) {
    console.error('请求错误:', err);
    errorMessage.value = '连接服务器失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
};

const handleForgotPassword = () => {
  alert('请联系管理员重置密码');
};

const handleRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://picsum.photos/id/180/1920/1080');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
}

.login-box {
  width: 100%;
  max-width: 420px;
  padding: 45px 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 35px;
}

.login-title {
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
}

.login-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 22px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  color: #95a5a6;
  font-size: 16px;
  z-index: 2;
}

.form-group input {
  width: 100%;
  height: 48px;
  padding: 0 45px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
}

.form-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group.has-error input {
  border-color: #e74c3c;
}

.form-group.has-error input:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.toggle-password {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  transition: color 0.3s;
}

.toggle-password:hover {
  color: #667eea;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 6px;
  padding-left: 5px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #7f8c8d;
  user-select: none;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
  accent-color: #667eea;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #764ba2;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.login-footer p {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.login-footer a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.error-alert {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  background: #fee;
  color: #c33;
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
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

@media (max-width: 480px) {
  .login-box {
    padding: 35px 25px;
  }
  
  .login-title {
    font-size: 22px;
  }
  
  .form-group input {
    height: 44px;
  }
  
  .login-button {
    height: 46px;
  }
}
</style>
