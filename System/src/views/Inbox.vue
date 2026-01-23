<template>
  <div class="inbox-page">
    <el-page-header content="收件箱"></el-page-header>
    <el-table :data="messages" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="title" label="标题" min-width="200"></el-table-column>
      <el-table-column prop="content" label="内容" min-width="400"></el-table-column>
      <el-table-column prop="time" label="时间" width="180"></el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="!scope.row.read" type="danger">未读</el-tag>
          <el-tag v-else type="success">已读</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMessageList } from '@/api'

const messages = ref([])

onMounted(async () => {
  const res = await getMessageList()
  messages.value = res.data.list
})
</script>