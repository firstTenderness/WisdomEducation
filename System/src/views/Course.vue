<template>
  <div class="course-page">
    <el-page-header content="课程中心"></el-page-header>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6" v-for="course in courses" :key="course.id">
        <el-card :body-style="{ padding: 0 }">
          <img :src="course.cover" style="width: 100%; height: 120px; object-fit: cover;" />
          <div style="padding: 10px;">
            <h3 style="font-size: 16px; margin: 0 0 10px 0;">{{ course.title }}</h3>
            <p style="margin: 0 0 10px 0; color: #666;">讲师：{{ course.teacher }}</p>
            <el-progress :percentage="course.progress" :stroke-width="6"></el-progress>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
              已学 {{ course.finished }} / 共 {{ course.total }} 课时
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCourseList } from '@/api'

const courses = ref([])

onMounted(async () => {
  try {
    // 无/api前缀请求
    const res = await getCourseList({ page: 1 })
    courses.value = res.data.list
  } catch (error) {
    console.error('获取课程失败：', error)
  }
})
</script>