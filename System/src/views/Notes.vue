<template>
  <div class="notes-page">
    <el-page-header content="学习笔记"></el-page-header>
    <el-table :data="notes" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="title" label="笔记标题" min-width="300"></el-table-column>
      <el-table-column prop="course" label="所属课程" width="150"></el-table-column>
      <el-table-column prop="content" label="内容预览" min-width="400">
        <template #default="scope">
          {{ scope.row.content.substring(0, 100) }}...
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNoteList } from '@/api'

const notes = ref([])

onMounted(async () => {
  const res = await getNoteList()
  notes.value = res.data.list
})
</script>