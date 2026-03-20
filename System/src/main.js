import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
// 按需导入ElementPlus样式
import 'element-plus/dist/index.css'
// 按需导入Font Awesome
import 'font-awesome/css/font-awesome.min.css'

const app = createApp(App)

// 按需导入ElementPlus组件
import {
  ElButton,
  ElCard,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElDropdown,
  ElMenu,
  ElBreadcrumb,
  ElTag,
  ElDialog,
  ElProgress,
  ElAvatar,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination
} from 'element-plus'

// 注册常用组件
app.use(ElButton)
app.use(ElCard)
app.use(ElInput)
app.use(ElMessage)
app.use(ElMessageBox)
app.use(ElDropdown)
app.use(ElMenu)
app.use(ElBreadcrumb)
app.use(ElTag)
app.use(ElDialog)
app.use(ElProgress)
app.use(ElAvatar)
app.use(ElForm)
app.use(ElFormItem)
app.use(ElSelect)
app.use(ElOption)
app.use(ElDatePicker)
app.use(ElTable)
app.use(ElTableColumn)
app.use(ElPagination)

app.use(router)
app.mount('#app')