<template>
  <!-- 路由出口：所有页面都会渲染在这里 -->
  <transition name="page-transition" mode="out-in">
    <router-view></router-view>
  </transition>
  
  <!-- 右下角功能按钮 -->
  <div class="floating-action-button">
    <el-dropdown trigger="click" placement="top" @command="handleFloatingAction">
      <div class="fab-button">
        <i class="el-icon-plus"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="backToTop">
            <i class="el-icon-top"></i> 返回顶部
          </el-dropdown-item>
          <el-dropdown-item command="quickAccess">
            <i class="el-icon-s-home"></i> 快速导航
          </el-dropdown-item>
          <el-dropdown-item command="contactSupport">
            <i class="el-icon-phone"></i> 联系支持
          </el-dropdown-item>
          <el-dropdown-item command="feedback">
            <i class="el-icon-message"></i> 反馈建议
          </el-dropdown-item>
          <el-dropdown-item command="darkMode">
            <i class="el-icon-moon"></i> 深色模式
          </el-dropdown-item>
          <el-dropdown-item command="fontSize">
            <i class="el-icon-s-operation"></i> 字体大小
          </el-dropdown-item>
          <el-dropdown-item command="help">
            <i class="el-icon-question"></i> 帮助中心
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

// 处理浮动操作按钮命令
const handleFloatingAction = (command) => {
  switch (command) {
    case 'backToTop':
      // 返回顶部功能
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // 添加视觉反馈
      ElMessage.success('已返回顶部');
      break;
    case 'quickAccess':
      // 快速导航功能
      router.push('/');
      ElMessage.success('正在导航到首页');
      break;
    case 'contactSupport':
      // 联系支持功能
      ElMessage.info('联系支持：support@wisdomeducation.com');
      // 可以添加一个模态框显示联系表单
      break;
    case 'feedback':
      // 反馈建议功能
      ElMessage.prompt('请输入您的反馈建议', '反馈建议', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入您的反馈...',
        inputType: 'textarea',
        inputRows: 4
      }).then(({ value }) => {
        ElMessage.success('反馈提交成功，感谢您的建议！');
      }).catch(() => {
        ElMessage.info('已取消反馈');
      });
      break;
    case 'darkMode':
      // 深色模式功能
      const isDark = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDark);
      ElMessage.success(isDark ? '已开启深色模式' : '已关闭深色模式');
      break;
    case 'fontSize':
      // 字体大小调整功能
      ElMessage.alert(
        `<div style="text-align: center;">
          <p style="margin-bottom: 15px;">选择字体大小</p>
          <div style="display: flex; justify-content: center; gap: 15px;">
            <button class="font-size-btn" data-size="14">小</button>
            <button class="font-size-btn" data-size="16">中</button>
            <button class="font-size-btn" data-size="18">大</button>
          </div>
        </div>`,
        '字体大小调整',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          callback: () => {
            // 清理事件监听器
            document.querySelectorAll('.font-size-btn').forEach(btn => {
              btn.removeEventListener('click', handleFontSizeClick);
            });
          }
        }
      );
      
      // 添加字体大小按钮点击事件
      setTimeout(() => {
        document.querySelectorAll('.font-size-btn').forEach(btn => {
          btn.addEventListener('click', handleFontSizeClick);
        });
      }, 100);
      break;
    case 'help':
      // 帮助中心功能
      ElMessage.info('帮助中心功能开发中，即将上线！');
      // 可以导航到帮助页面
      // router.push('/help');
      break;
    default:
      break;
  }
};

// 处理字体大小点击
const handleFontSizeClick = (e) => {
  const size = e.target.dataset.size;
  document.documentElement.style.fontSize = size + 'px';
  localStorage.setItem('fontSize', size);
  ElMessage.success(`字体大小已设置为 ${size}px`);
};

// 初始化主题和字体大小
const initTheme = () => {
  // 检查深色模式设置
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.documentElement.classList.add('dark-mode');
  }
  
  // 检查字体大小设置
  const fontSize = localStorage.getItem('fontSize');
  if (fontSize) {
    document.documentElement.style.fontSize = fontSize + 'px';
  }
};

// 初始化
initTheme();
</script>

<style>
/* 导入全局CSS文件 */
@import './assets/css/global.css';

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 全局链接样式 */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* 全局选择器样式 */
::selection {
  background-color: var(--primary-color);
  color: white;
}

/* 全局禁用状态 */
[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 全局加载状态 */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

/* 页面过渡动画 */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.5s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 浮动操作按钮 */
.floating-action-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

.fab-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff, #667eea);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(64, 158, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
}

.fab-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  transform: rotate(45deg);
  animation: shimmer 3s infinite linear;
}

.fab-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.6);
  background: linear-gradient(135deg, #667eea, #764ba2);
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.fab-button i {
  font-size: 24px;
}

/* 下拉菜单样式 */
.el-dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: none;
}

.el-dropdown-item {
  padding: 12px 16px;
  transition: all 0.2s ease;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.el-dropdown-item:last-child {
  border-bottom: none;
}

.el-dropdown-item:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

.el-dropdown-item i {
  margin-right: 8px;
  color: #409eff;
  font-size: 16px;
}

/* 字体大小调整按钮样式 */
.font-size-btn {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.font-size-btn:hover {
  border-color: #409eff;
  color: #409eff;
  background-color: #ecf5ff;
}

/* 深色模式样式 */
.dark-mode {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2c2c2c;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
}

.dark-mode body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.dark-mode .el-dropdown-menu {
  background-color: var(--bg-secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .el-dropdown-item {
  color: var(--text-primary);
  border-bottom: 1px solid #3a3a3a;
}

.dark-mode .el-dropdown-item:hover {
  background-color: #3a3a3a;
  color: #409eff;
}

/* 按钮点击动画 */
.fab-button:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

/* 下拉菜单动画 */
.el-dropdown-menu {
  animation: dropdownFadeIn 0.3s ease;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>