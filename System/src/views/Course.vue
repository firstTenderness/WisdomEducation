<template>
  <div class="course-page">
    <div class="page-header">
      <h2>我的课程</h2>
      <el-button type="primary" icon="Plus" @click="addCourse">添加课程</el-button>
    </div>
    <el-card v-for="course in courseList" :key="course.id" class="course-card">
      <template #header>
        <div class="course-header">
          <h3>{{ course.courseName }}</h3>
          <span class="status" :class="course.status">{{ course.statusText }}</span>
        </div>
      </template>
      <div class="course-info">
        <p><strong>教师：</strong>{{ course.teacherName }}</p>
        <p><strong>进度：</strong>{{ course.progress }}%</p>
      </div>
      <div class="course-actions">
        <el-button size="small" @click="enterCourse(course.id)">进入学习</el-button>
        <el-button size="small" type="primary" @click="generateAiSummary(course.id)">生成AI总结</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const courseList = ref([])
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// 获取课程列表
const fetchCourseList = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/courses/my`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await res.json()
    if (data.code === 200) courseList.value = data.data
  } catch (err) {
    ElMessage.error('获取课程列表失败')
  }
}

// 生成AI总结
const generateAiSummary = (courseId) => {
  ElMessage.info(`正在为课程${courseId}生成AI总结`)
}

// 进入课程
const enterCourse = (courseId) => {
  ElMessage.info(`进入课程${courseId}`)
}

// 添加课程
const addCourse = () => {
  ElMessage.info('添加课程功能待开发')
}

onMounted(() => {
  fetchCourseList()
})
</script>

<style scoped>
.course-page {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.course-card {
  margin-bottom: 16px;
  transition: all 0.3s;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.进行中 {
  background: #e6f7ff;
  color: #1890ff;
}

.status.已结束 {
  background: #f6ffed;
  color: #52c41a;
}

.course-info {
  margin: 12px 0;
  color: #666;
}

.course-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>