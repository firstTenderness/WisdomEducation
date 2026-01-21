<template>
  <div class="profile-container">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <el-icon><ArrowLeft /></el-icon>
      返回上一页
    </button>
    
    <!-- 顶部标题 -->
    <div class="page-header">
      <h2>个人中心</h2>
      <p>完善信息，提升学习体验</p>
    </div>

    <!-- 内容卡片 -->
    <el-card class="profile-card">
      <el-tabs v-model="activeTab" type="card" class="profile-tabs">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="baseInfo">
          <el-form
            ref="baseInfoFormRef"
            :model="baseInfoForm"
            :rules="baseInfoRules"
            label-width="100px"
            class="base-info-form"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="baseInfoForm.name" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="baseInfoForm.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="baseInfoForm.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="角色">
              <el-input v-model="baseInfoForm.role" disabled />
            </el-form-item>
            <el-form-item label="学号/工号">
              <el-input v-model="baseInfoForm.userId" disabled />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="saveBaseInfo"
                :loading="baseInfoLoading"
              >
                保存修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 修改密码 -->
        <el-tab-pane label="修改密码" name="changePwd">
          <el-form
            ref="pwdFormRef"
            :model="pwdForm"
            :rules="pwdRules"
            label-width="100px"
            class="pwd-form"
          >
            <el-form-item label="原密码" prop="oldPwd">
              <el-input
                v-model="pwdForm.oldPwd"
                type="password"
                placeholder="请输入原密码"
                show-password
              />
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input
                v-model="pwdForm.newPwd"
                type="password"
                placeholder="不少于6位"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPwd">
              <el-input
                v-model="pwdForm.confirmPwd"
                type="password"
                placeholder="再次输入新密码"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="changePassword"
                :loading="pwdLoading"
              >
                确认修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/home')
  }
}

// 状态管理
const activeTab = ref('baseInfo')
const baseInfoFormRef = ref(null)
const pwdFormRef = ref(null)
const baseInfoLoading = ref(false)
const pwdLoading = ref(false)

// 表单数据
const baseInfoForm = reactive({
  name: '张三',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  role: '学生',
  userId: '20230001'
})
const pwdForm = reactive({
  oldPwd: '',
  newPwd: '',
  confirmPwd: ''
})

// 校验规则
const baseInfoRules = reactive({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[\w-]+@[\w-]+\.[a-z]{2,}$/, message: '邮箱格式错误', trigger: 'blur' }
  ]
})
const pwdRules = reactive({
  oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码不少于6位', trigger: 'blur' }
  ],
  confirmPwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, val, cb) => val === pwdForm.newPwd ? cb() : cb(new Error('两次密码不一致')),
      trigger: 'blur'
    }
  ]
})

// 模拟获取用户信息
const getBaseInfo = async () => {
  ElMessage.success('获取个人信息成功')
}

// 保存基本信息
const saveBaseInfo = async () => {
  try {
    await baseInfoFormRef.value.validate()
    baseInfoLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('基本信息修改成功！')
  } catch (err) {
    ElMessage.error('请完善表单信息')
  } finally {
    baseInfoLoading.value = false
  }
}

// 模拟修改密码
const changePassword = async () => {
  try {
    await pwdFormRef.value.validate()
    pwdLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (pwdForm.oldPwd !== '123456') {
      ElMessage.error('原密码错误')
      pwdLoading.value = false
      return
    }
    ElMessage.success('密码修改成功，请重新登录')
    localStorage.removeItem('token')
    window.location.href = '/#/login'
  } catch (err) {
    ElMessage.error('请完善表单信息')
  } finally {
    pwdLoading.value = false
  }
}

onMounted(() => getBaseInfo())
</script>

<style scoped>
.profile-container {
  width: 100%;
  min-height: calc(100vh - 120px);
  background-color: #f5f7fa;
  padding: 20px;
}
.page-header {
  margin-bottom: 20px;
}
.page-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}
.page-header p {
  font-size: 14px;
  color: #909399;
  margin: 8px 0 0 0;
}
.profile-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
.profile-tabs {
  margin-bottom: 20px;
}
.base-info-form, .pwd-form {
  padding: 0 20px 20px;
}
.el-form-item {
  margin-bottom: 20px;
}
/* 返回按钮样式 */
.back-btn {
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #f5f7fa;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  color: #2c3e50;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.back-btn:hover {
  background-color: #e6e6e6;
  color: #3498db;
}
.back-btn .el-icon {
  margin-right: 6px;
}
</style>