<template>
  <div class="login-container" style="width: 100%;height: 100vh;display: flex;align-items: center;justify-content: center;background-image: url('https://picsum.photos/id/180/1920/1080');background-size: cover;">
    <div class="login-box" style="width: 350px;padding: 40px;background: rgba(255,255,255,0.9);border-radius: 12px;box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <h2 style="text-align: center;margin-bottom: 30px;color: #333;">慧学澄明学习教育平台</h2>
      
      <div style="margin-bottom: 20px;">
        <input 
          type="text" 
          id="account"
          placeholder="请输入账号"
          style="width: 100%;height: 45px;padding: 0 15px;border: 1px solid #ddd;border-radius: 6px;outline: none;"
          value="in"
        >
      </div>
      
      <div style="margin-bottom: 25px;">
        <input 
          type="password" 
          id="password"
          placeholder="请输入密码"
          style="width: 100%;height: 45px;padding: 0 15px;border: 1px solid #ddd;border-radius: 6px;outline: none;"
          value="c7wn26OokFiiTcs"
        >
      </div>
      
      <!-- 修复：使用Vue的@click绑定，避免作用域问题 -->
      <button 
        @click="handleLogin"
        style="width: 100%;height: 45px;background: #2c3e50;color: #fff;border: none;border-radius: 6px;font-size: 16px;cursor: pointer;"
      >
        登录
      </button>
      
      <div style="text-align: center;margin-top: 15px;font-size: 12px;color: #999;">
        忘记密码？联系管理员重置
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 修复：使用Vue的函数定义，避免作用域问题
const handleLogin = async () => {
  const account = document.getElementById('account').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password })
    });
    const data = await res.json();
    const userData = data.data;
    
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userInfo', JSON.stringify(userData));
      window.location.href = '/home';
    } else {
      alert('登录成功，但未获取到凭证');
    }
  } catch (err) {
    console.error('请求错误:', err);
    alert('连接后端失败');
  }
};
</script>