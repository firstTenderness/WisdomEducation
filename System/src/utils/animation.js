/**
 * 动画工具函数
 */

/**
 * 元素淡入动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {function} callback - 动画完成后的回调函数
 */
export function fadeIn(element, duration = 300, callback) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = `all ${duration}ms ease`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    if (callback && typeof callback === 'function') {
      setTimeout(callback, duration);
    }
  }, 10);
}

/**
 * 元素淡出动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {function} callback - 动画完成后的回调函数
 */
export function fadeOut(element, duration = 300, callback) {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
  element.style.transition = `all ${duration}ms ease`;
  
  setTimeout(() => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    if (callback && typeof callback === 'function') {
      setTimeout(callback, duration);
    }
  }, 10);
}

/**
 * 元素滑动进入动画
 * @param {HTMLElement} element - 目标元素
 * @param {string} direction - 滑动方向（left, right, top, bottom）
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {function} callback - 动画完成后的回调函数
 */
export function slideIn(element, direction = 'left', duration = 300, callback) {
  const directions = {
    left: { transform: 'translateX(-100px)' },
    right: { transform: 'translateX(100px)' },
    top: { transform: 'translateY(-100px)' },
    bottom: { transform: 'translateY(100px)' }
  };
  
  element.style.opacity = '0';
  element.style.transform = directions[direction]?.transform || 'translateX(-100px)';
  element.style.transition = `all ${duration}ms ease`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translate(0)';
    
    if (callback && typeof callback === 'function') {
      setTimeout(callback, duration);
    }
  }, 10);
}

/**
 * 元素脉冲动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} duration - 动画持续时间（毫秒）
 */
export function pulse(element, duration = 1000) {
  element.style.animation = `pulse ${duration}ms ease-in-out`;
  
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

/**
 * 元素缩放动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} scale - 缩放比例
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {function} callback - 动画完成后的回调函数
 */
export function scale(element, scale = 1.1, duration = 300, callback) {
  element.style.transform = `scale(${scale})`;
  element.style.transition = `transform ${duration}ms ease`;
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
    
    if (callback && typeof callback === 'function') {
      setTimeout(callback, duration);
    }
  }, duration);
}

/**
 * 滚动动画
 * @param {number} to - 滚动目标位置
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {function} callback - 动画完成后的回调函数
 */
export function scrollTo(to, duration = 500, callback) {
  const start = window.pageYOffset;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  
  function animateScroll() {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    window.scrollTo(0, val);
    
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }
  
  animateScroll();
}

/**
 * 缓动函数
 * @param {number} t - 当前时间
 * @param {number} b - 开始值
 * @param {number} c - 变化值
 * @param {number} d - 持续时间
 * @returns {number} - 计算后的值
 */
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

/**
 * 防抖函数
 * @param {function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {function} - 防抖后的函数
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * @param {function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {function} - 节流后的函数
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 元素交互动画
 * @param {HTMLElement} element - 目标元素
 * @param {string} type - 动画类型（hover, click）
 * @param {object} options - 动画选项
 */
export function addInteractionAnimation(element, type, options = {}) {
  const defaultOptions = {
    hover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease'
    },
    click: {
      transform: 'scale(0.95)',
      transition: 'all 0.1s ease'
    }
  };
  
  const config = defaultOptions[type] || {};
  const finalOptions = { ...config, ...options };
  
  if (type === 'hover') {
    element.addEventListener('mouseenter', () => {
      Object.entries(finalOptions).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });
    
    element.addEventListener('mouseleave', () => {
      Object.entries(finalOptions).forEach(([property, value]) => {
        if (property === 'transform') {
          element.style[property] = 'translateY(0)';
        } else if (property === 'boxShadow') {
          element.style[property] = '0 2px 4px rgba(0, 0, 0, 0.05)';
        } else if (property !== 'transition') {
          element.style[property] = '';
        }
      });
    });
  } else if (type === 'click') {
    element.addEventListener('mousedown', () => {
      Object.entries(finalOptions).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });
    
    element.addEventListener('mouseup', () => {
      Object.entries(finalOptions).forEach(([property, value]) => {
        if (property === 'transform') {
          element.style[property] = 'scale(1)';
        } else if (property !== 'transition') {
          element.style[property] = '';
        }
      });
    });
    
    element.addEventListener('mouseleave', () => {
      Object.entries(finalOptions).forEach(([property, value]) => {
        if (property === 'transform') {
          element.style[property] = 'scale(1)';
        } else if (property !== 'transition') {
          element.style[property] = '';
        }
      });
    });
  }
}

/**
 * 页面加载动画
 * @param {HTMLElement} element - 加载元素
 * @param {function} callback - 动画完成后的回调函数
 */
export function pageLoadAnimation(element, callback) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'all 0.6s ease';
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    if (callback && typeof callback === 'function') {
      setTimeout(callback, 600);
    }
  }, 100);
}

/**
 * 数字计数动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} from - 起始值
 * @param {number} to - 目标值
 * @param {number} duration - 动画持续时间（毫秒）
 */
export function countUp(element, from = 0, to, duration = 2000) {
  let start = from;
  const increment = (to - from) / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if ((increment > 0 && start >= to) || (increment < 0 && start <= to)) {
      start = to;
      clearInterval(timer);
    }
    element.textContent = Math.floor(start);
  }, 16);
}

/**
 * 滚动时元素渐入动画
 * @param {string} selector - 元素选择器
 * @param {number} threshold - 触发阈值（0-1）
 * @param {number} delay - 动画延迟（毫秒）
 */
export function scrollReveal(selector, threshold = 0.1, delay = 0) {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay + index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold
  });
  
  elements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
  });
}

/**
 * 滚动时元素缩放动画
 * @param {string} selector - 元素选择器
 * @param {number} threshold - 触发阈值（0-1）
 * @param {number} delay - 动画延迟（毫秒）
 */
export function scrollScale(selector, threshold = 0.1, delay = 0) {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, delay + index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold
  });
  
  elements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
  });
}

/**
 * 按钮点击波纹效果
 * @param {HTMLElement} element - 目标元素
 * @param {MouseEvent} event - 鼠标事件
 */
export function addRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * 输入框焦点效果
 * @param {HTMLElement} element - 目标元素
 */
export function addInputFocusEffect(element) {
  element.addEventListener('focus', () => {
    element.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
    element.style.transform = 'scale(1.02)';
  });
  
  element.addEventListener('blur', () => {
    element.style.boxShadow = '';
    element.style.transform = 'scale(1)';
  });
}

/**
 * 数字变化动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} from - 起始值
 * @param {number} to - 目标值
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {string} suffix - 后缀
 */
export function numberAnimate(element, from = 0, to, duration = 2000, suffix = '') {
  let start = from;
  const increment = (to - from) / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if ((increment > 0 && start >= to) || (increment < 0 && start <= to)) {
      start = to;
      clearInterval(timer);
    }
    element.textContent = Math.floor(start) + suffix;
  }, 16);
}

/**
 * 进度条动画
 * @param {HTMLElement} element - 目标元素
 * @param {number} to - 目标进度（0-100）
 * @param {number} duration - 动画持续时间（毫秒）
 */
export function progressAnimate(element, to, duration = 1000) {
  let start = 0;
  const increment = to / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= to) {
      start = to;
      clearInterval(timer);
    }
    element.style.width = `${start}%`;
  }, 16);
}
