<template>
  <div class="cloud-page">
    <el-page-header content="个人云盘"></el-page-header>
    <el-table :data="files" border style="width: 100%; margin-top: 20px;">
      <el-table-column label="图标" width="60">
        <template #default="scope">
          <el-icon v-if="scope.row.type === 'folder'"><Folder /></el-icon>
          <el-icon v-else><Document /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" min-width="300"></el-table-column>
      <el-table-column prop="size" label="大小" width="120">
        <template #default="scope">
          {{ (scope.row.size / 1024).toFixed(2) }} KB
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFileList } from '@/api'
import { Folder, Document } from '@element-plus/icons-vue'

const files = ref([])

onMounted(async () => {
  const res = await getFileList()
  files.value = res.data.list
})
</script>