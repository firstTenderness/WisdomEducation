/**
 * 反馈工具函数
 */

import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';

/**
 * 成功消息提示
 * @param {string} message - 消息内容
 * @param {object} options - 配置选项
 */
export function successMessage(message, options = {}) {
  const defaultOptions = {
    message,
    type: 'success',
    duration: 3000,
    showClose: true,
    customClass: 'custom-message success-message',
    offset: 80
  };
  
  const instance = ElMessage({ ...defaultOptions, ...options });
  
  // 添加动画效果
  setTimeout(() => {
    const messageEl = document.querySelector('.custom-message.success-message');
    if (messageEl) {
      messageEl.style.animation = 'bounce 0.5s ease-in-out';
    }
  }, 10);
  
  return instance;
}

/**
 * 错误消息提示
 * @param {string} message - 消息内容
 * @param {object} options - 配置选项
 */
export function errorMessage(message, options = {}) {
  const defaultOptions = {
    message,
    type: 'error',
    duration: 3000,
    showClose: true,
    customClass: 'custom-message error-message',
    offset: 80
  };
  
  const instance = ElMessage({ ...defaultOptions, ...options });
  
  // 添加动画效果
  setTimeout(() => {
    const messageEl = document.querySelector('.custom-message.error-message');
    if (messageEl) {
      messageEl.style.animation = 'shake 0.5s ease-in-out';
    }
  }, 10);
  
  return instance;
}

/**
 * 警告消息提示
 * @param {string} message - 消息内容
 * @param {object} options - 配置选项
 */
export function warningMessage(message, options = {}) {
  const defaultOptions = {
    message,
    type: 'warning',
    duration: 3000,
    showClose: true,
    customClass: 'custom-message warning-message',
    offset: 80
  };
  
  const instance = ElMessage({ ...defaultOptions, ...options });
  
  // 添加动画效果
  setTimeout(() => {
    const messageEl = document.querySelector('.custom-message.warning-message');
    if (messageEl) {
      messageEl.style.animation = 'pulse 0.5s ease-in-out';
    }
  }, 10);
  
  return instance;
}

/**
 * 信息消息提示
 * @param {string} message - 消息内容
 * @param {object} options - 配置选项
 */
export function infoMessage(message, options = {}) {
  const defaultOptions = {
    message,
    type: 'info',
    duration: 3000,
    showClose: true,
    customClass: 'custom-message info-message',
    offset: 80
  };
  
  const instance = ElMessage({ ...defaultOptions, ...options });
  
  // 添加动画效果
  setTimeout(() => {
    const messageEl = document.querySelector('.custom-message.info-message');
    if (messageEl) {
      messageEl.style.animation = 'fadeIn 0.5s ease-in-out';
    }
  }, 10);
  
  return instance;
}

/**
 * 自定义消息提示
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型
 * @param {object} options - 配置选项
 */
export function customMessage(message, type = 'info', options = {}) {
  const defaultOptions = {
    message,
    type,
    duration: 3000,
    showClose: true,
    customClass: `custom-message ${type}-message`,
    offset: 80
  };
  
  return ElMessage({ ...defaultOptions, ...options });
}

/**
 * 确认对话框
 * @param {string} message - 对话框内容
 * @param {string} title - 对话框标题
 * @param {object} options - 配置选项
 * @returns {Promise} - Promise对象
 */
export function confirmDialog(message, title = '确认', options = {}) {
  const defaultOptions = {
    title,
    message,
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    closeOnPressEscape: false
  };
  
  return ElMessageBox.confirm(message, title, { ...defaultOptions, ...options });
}

/**
 * 提示对话框
 * @param {string} message - 对话框内容
 * @param {string} title - 对话框标题
 * @param {object} options - 配置选项
 * @returns {Promise} - Promise对象
 */
export function alertDialog(message, title = '提示', options = {}) {
  const defaultOptions = {
    title,
    message,
    confirmButtonText: '确定',
    closeOnClickModal: false,
    closeOnPressEscape: false
  };
  
  return ElMessageBox.alert(message, title, { ...defaultOptions, ...options });
}

/**
 * 输入对话框
 * @param {string} message - 对话框内容
 * @param {string} title - 对话框标题
 * @param {object} options - 配置选项
 * @returns {Promise} - Promise对象
 */
export function promptDialog(message, title = '输入', options = {}) {
  const defaultOptions = {
    title,
    message,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    closeOnPressEscape: false,
    inputPlaceholder: '请输入'
  };
  
  return ElMessageBox.prompt(message, title, { ...defaultOptions, ...options });
}

/**
 * 加载状态
 * @param {string} text - 加载文本
 * @param {object} options - 配置选项
 * @returns {object} - 加载实例
 */
export function loading(text = '加载中...', options = {}) {
  const defaultOptions = {
    lock: true,
    text,
    background: 'rgba(0, 0, 0, 0.7)',
    spinner: 'el-icon-loading',
    customClass: 'custom-loading'
  };
  
  return ElLoading.service({ ...defaultOptions, ...options });
}

/**
 * 页面加载状态
 * @param {HTMLElement} target - 目标元素
 * @param {string} text - 加载文本
 * @param {object} options - 配置选项
 * @returns {object} - 加载实例
 */
export function pageLoading(target, text = '加载中...', options = {}) {
  const defaultOptions = {
    text,
    background: 'rgba(255, 255, 255, 0.9)',
    spinner: 'el-icon-loading',
    customClass: 'page-loading'
  };
  
  return ElLoading.service({ ...defaultOptions, ...options, target });
}

/**
 * 操作成功反馈
 * @param {string} message - 成功消息
 * @param {function} callback - 回调函数
 */
export function successFeedback(message = '操作成功', callback) {
  successMessage(message);
  
  if (callback && typeof callback === 'function') {
    setTimeout(callback, 1000);
  }
}

/**
 * 操作失败反馈
 * @param {string} message - 失败消息
 * @param {function} callback - 回调函数
 */
export function errorFeedback(message = '操作失败', callback) {
  errorMessage(message);
  
  if (callback && typeof callback === 'function') {
    setTimeout(callback, 1000);
  }
}

/**
 * 操作确认反馈
 * @param {string} message - 确认消息
 * @param {function} confirmCallback - 确认回调
 * @param {function} cancelCallback - 取消回调
 */
export function confirmFeedback(message, confirmCallback, cancelCallback) {
  confirmDialog(message).then(() => {
    if (confirmCallback && typeof confirmCallback === 'function') {
      confirmCallback();
    }
  }).catch(() => {
    if (cancelCallback && typeof cancelCallback === 'function') {
      cancelCallback();
    }
  });
}

/**
 * 表单验证反馈
 * @param {string} message - 验证消息
 */
export function validateFeedback(message) {
  warningMessage(message, { duration: 4000 });
}

/**
 * 网络请求反馈
 * @param {Promise} promise - 请求Promise
 * @param {object} options - 配置选项
 * @returns {Promise} - Promise对象
 */
export async function requestFeedback(promise, options = {}) {
  const { 
    loadingText = '加载中...', 
    successText = '操作成功', 
    errorText = '操作失败' 
  } = options;
  
  const loadingInstance = loading(loadingText);
  
  try {
    const result = await promise;
    loadingInstance.close();
    successMessage(successText);
    return result;
  } catch (error) {
    loadingInstance.close();
    errorMessage(errorText || error.message);
    throw error;
  }
}
