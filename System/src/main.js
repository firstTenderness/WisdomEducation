import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 导入路由
import ElementPlus from 'element-plus' // 导入Element Plus
import 'element-plus/dist/index.css' // 导入Element Plus样式
import './assets/css/global.css'
// 创建应用并挂载插件
const app = createApp(App)
app.use(router)        // 注册路由
app.use(ElementPlus)   // 注册Element Plus
app.mount('#app')      // 挂载到#app