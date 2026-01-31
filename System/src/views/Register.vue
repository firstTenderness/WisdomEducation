<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <h2 class="register-title">慧学澄明学习教育平台</h2>
        <p class="register-subtitle">创建您的账户，开启学习之旅</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group" :class="{ 'has-error': errors.username }">
          <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input 
              type="text" 
              v-model="formData.username"
              placeholder="请输入用户名"
              @focus="clearError('username')"
              @blur="validateField('username')"
            />
          </div>
          <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
        </div>
        
        <div class="form-group" :class="{ 'has-error': errors.identity }">
          <div class="identity-wrapper">
            <label class="identity-label">请选择身份</label>
            <div class="identity-options">
              <label class="identity-option" :class="{ 'active': formData.identity === 'student' }">
                <input 
                  type="radio" 
                  v-model="formData.identity" 
                  value="student"
                  @change="validateField('identity')"
                />
                <div class="identity-card">
                  <i class="fas fa-user-graduate identity-icon"></i>
                  <span class="identity-name">学生</span>
                </div>
              </label>
              <label class="identity-option" :class="{ 'active': formData.identity === 'teacher' }">
                <input 
                  type="radio" 
                  v-model="formData.identity" 
                  value="teacher"
                  @change="validateField('identity')"
                />
                <div class="identity-card">
                  <i class="fas fa-chalkboard-teacher identity-icon"></i>
                  <span class="identity-name">教师</span>
                </div>
              </label>
            </div>
          </div>
          <span class="error-message" v-if="errors.identity">{{ errors.identity }}</span>
        </div>
        
        <div class="form-group" :class="{ 'has-error': errors.email }">
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input 
              type="email" 
              v-model="formData.email"
              placeholder="请输入邮箱"
              @focus="clearError('email')"
              @blur="validateField('email')"
            />
          </div>
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
        
        <div class="form-group" :class="{ 'has-error': errors.phone }">
          <div class="input-wrapper">
            <i class="fas fa-phone input-icon"></i>
            <input 
              type="tel" 
              v-model="formData.phone"
              placeholder="请输入手机号"
              @focus="clearError('phone')"
              @blur="validateField('phone')"
            />
          </div>
          <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
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
          <div class="password-strength">
            <div class="strength-bar">
              <div 
                class="strength-fill" 
                :class="passwordStrengthClass"
                :style="{ width: passwordStrength + '%' }"
              ></div>
            </div>
            <span class="strength-text">{{ passwordStrengthText }}</span>
          </div>
        </div>
        
        <div class="form-group" :class="{ 'has-error': errors.confirmPassword }">
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input 
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="formData.confirmPassword"
              placeholder="请确认密码"
              @focus="clearError('confirmPassword')"
              @blur="validateField('confirmPassword')"
            />
            <button 
              type="button" 
              class="toggle-password"
              @click="toggleConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>
        
        <div class="form-group" :class="{ 'has-error': errors.code }">
          <div class="input-wrapper code-input">
            <i class="fas fa-shield-alt input-icon"></i>
            <input 
              type="text" 
              v-model="formData.code"
              placeholder="请输入验证码"
              @focus="clearError('code')"
              @blur="validateField('code')"
            />
            <button 
              type="button" 
              class="send-code-btn"
              :disabled="isSending || countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : isSending ? '发送中...' : '获取验证码' }}
            </button>
          </div>
          <span class="error-message" v-if="errors.code">{{ errors.code }}</span>
        </div>
        
        <div class="form-options">
          <label class="agree-terms">
            <input type="checkbox" v-model="formData.agreeTerms" />
            <span>我已阅读并同意 <a href="#" @click.prevent="showTerms">《用户协议》</a> 和 <a href="#" @click.prevent="showPrivacy">《隐私政策》</a></span>
          </label>
        </div>
        
        <button 
          type="submit" 
          class="register-button"
          :disabled="isLoading || !formData.agreeTerms"
        >
          <span v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i>
            注册中...
          </span>
          <span v-else>立即注册</span>
        </button>
      </form>
      
      <div class="register-footer">
        <p>已有账户？<a href="#" @click.prevent="goToLogin">立即登录</a></p>
      </div>
      
      <div v-if="errorMessage" class="error-alert">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="success-alert">
        <i class="fas fa-check-circle"></i>
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
  username: '',
  identity: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  code: '',
  agreeTerms: false
});

const errors = reactive({
  username: '',
  identity: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  code: ''
});

const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSending = ref(false);
const countdown = ref(0);
const errorMessage = ref('');
const successMessage = ref('');

const passwordStrength = computed(() => {
  const password = formData.password;
  if (!password) return 0;
  
  let strength = 0;
  if (password.length >= 6) strength += 20;
  if (password.length >= 8) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  
  return strength;
});

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 20) return 'weak';
  if (strength <= 40) return 'medium';
  if (strength <= 60) return 'good';
  return 'strong';
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 20) return '弱';
  if (strength <= 40) return '中';
  if (strength <= 60) return '良';
  return '强';
});

const validateField = (field) => {
  if (field === 'identity') {
    if (!formData.identity) {
      errors.identity = '请选择身份';
      return false;
    }
    errors.identity = '';
  }
  
  if (field === 'username') {
    if (!formData.username.trim()) {
      errors.username = '请输入用户名';
      return false;
    }
    if (formData.username.length < 3) {
      errors.username = '用户名长度至少为3个字符';
      return false;
    }
    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(formData.username)) {
      errors.username = '用户名只能包含字母、数字、下划线和中文';
      return false;
    }
    errors.username = '';
  }
  
  if (field === 'email') {
    if (!formData.email.trim()) {
      errors.email = '请输入邮箱';
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '请输入有效的邮箱地址';
      return false;
    }
    errors.email = '';
  }
  
  if (field === 'phone') {
    if (!formData.phone.trim()) {
      errors.phone = '请输入手机号';
      return false;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '请输入有效的手机号';
      return false;
    }
    errors.phone = '';
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
  
  if (field === 'confirmPassword') {
    if (!formData.confirmPassword) {
      errors.confirmPassword = '请确认密码';
      return false;
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = '两次输入的密码不一致';
      return false;
    }
    errors.confirmPassword = '';
  }
  
  if (field === 'code') {
    if (!formData.code.trim()) {
      errors.code = '请输入验证码';
      return false;
    }
    if (formData.code.length !== 6) {
      errors.code = '验证码为6位数字';
      return false;
    }
    errors.code = '';
  }
  
  return true;
};

const validateForm = () => {
  const fields = ['identity', 'username', 'email', 'phone', 'password', 'confirmPassword', 'code'];
  return fields.every(field => validateField(field));
};

const clearError = (field) => {
  errors[field] = '';
  errorMessage.value = '';
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const sendCode = async () => {
  if (!validateField('phone')) {
    return;
  }
  
  isSending.value = true;
  
  setTimeout(() => {
    isSending.value = false;
    countdown.value = 60;
    
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    alert(`验证码已发送至 ${formData.phone}，验证码为：123456`);
  }, 1000);
};

const handleRegister = async () => {
  if (!formData.agreeTerms) {
    errorMessage.value = '请先阅读并同意用户协议和隐私政策';
    return;
  }
  
  if (!validateForm()) {
    return;
  }
  
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  setTimeout(() => {
    const roleType = formData.identity === 'teacher' ? 2 : 1;
    const userData = {
      username: formData.username,
      identity: formData.identity,
      role_type: roleType,
      email: formData.email,
      phone: formData.phone,
      token: 'mock-token-' + Date.now(),
      userId: 'user-' + Date.now(),
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
    
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    
    successMessage.value = '注册成功！正在跳转...';
    
    setTimeout(() => {
      router.push('/home');
    }, 1500);
  }, 2000);
};

const goToLogin = () => {
  router.push('/login');
};

const showTerms = () => {
  alert('用户协议内容...\n（此处为演示，实际应跳转到用户协议页面）');
};

const showPrivacy = () => {
  alert('隐私政策内容...\n（此处为演示，实际应跳转到隐私政策页面）');
};
</script>

<style scoped>
.register-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow-y: auto;
}

.register-container::before {
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

.register-box {
  width: 100%;
  max-width: 460px;
  padding: 40px 35px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.5s ease-out;
  margin: 20px 0;
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

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-title {
  font-size: 26px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.register-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
}

.register-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 18px;
}

.identity-wrapper {
  width: 100%;
}

.identity-label {
  display: block;
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 10px;
}

.identity-options {
  display: flex;
  gap: 15px;
}

.identity-option {
  flex: 1;
  cursor: pointer;
  position: relative;
}

.identity-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.identity-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: #fff;
}

.identity-icon {
  font-size: 32px;
  color: #95a5a6;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.identity-name {
  font-size: 15px;
  font-weight: 500;
  color: #7f8c8d;
  transition: color 0.3s ease;
}

.identity-option:hover .identity-card {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.identity-option:hover .identity-icon {
  color: #667eea;
}

.identity-option:hover .identity-name {
  color: #667eea;
}

.identity-option.active .identity-card {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.identity-option.active .identity-icon {
  color: #667eea;
}

.identity-option.active .identity-name {
  color: #667eea;
  font-weight: 600;
}

.form-group.has-error .identity-card {
  border-color: #e74c3c;
}

.form-group.has-error .identity-option.active .identity-card {
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.05);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
}

.form-group.has-error .identity-option.active .identity-icon,
.form-group.has-error .identity-option.active .identity-name {
  color: #e74c3c;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper.code-input {
  gap: 10px;
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
  height: 46px;
  padding: 0 45px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
}

.input-wrapper.code-input input {
  flex: 1;
  padding-right: 15px;
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

.send-code-btn {
  height: 46px;
  padding: 0 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.send-code-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
}

.send-code-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background: #e74c3c;
}

.strength-fill.medium {
  background: #f39c12;
}

.strength-fill.good {
  background: #3498db;
}

.strength-fill.strong {
  background: #27ae60;
}

.strength-text {
  font-size: 12px;
  color: #7f8c8d;
}

.form-options {
  margin-bottom: 20px;
}

.agree-terms {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 13px;
  color: #7f8c8d;
  user-select: none;
  line-height: 1.5;
}

.agree-terms input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #667eea;
}

.agree-terms a {
  color: #667eea;
  text-decoration: none;
  margin: 0 3px;
  transition: color 0.3s;
}

.agree-terms a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.register-button {
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

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.register-button:active:not(:disabled) {
  transform: translateY(0);
}

.register-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.register-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.register-footer p {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
}

.register-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.register-footer a:hover {
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

.success-alert {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  background: #d4edda;
  color: #155724;
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
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
  .register-box {
    padding: 30px 20px;
    margin: 10px 0;
  }
  
  .register-title {
    font-size: 22px;
  }
  
  .form-group input {
    height: 44px;
  }
  
  .register-button {
    height: 46px;
  }
  
  .send-code-btn {
    font-size: 12px;
    padding: 0 12px;
  }
}
</style>
