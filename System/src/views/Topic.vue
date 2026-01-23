<template>
  <div class="topic-page">
    <el-page-header content="专题创作"></el-page-header>
    <el-table :data="topics" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="title" label="专题标题" min-width="300"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === '已发布' ? 'success' : 'warning'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="viewCount" label="浏览量" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTopicList } from '@/api'

const topics = ref([])

onMounted(async () => {
  const res = await getTopicList()
  topics.value = res.data.list
})
</script>