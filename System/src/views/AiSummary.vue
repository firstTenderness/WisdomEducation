<template>
  <div class="ai-summary-page">
    <el-page-header content="AI课堂总结"></el-page-header>
    <el-card style="margin-top: 20px;">
      <h3 style="margin: 0 0 10px 0;">本次课堂核心知识点：</h3>
      <div class="keywords" style="margin: 10px 0;">
        <el-tag v-for="kw in keywords" :key="kw" closable style="margin-right: 5px;">{{ kw }}</el-tag>
      </div>
      <div class="summary-content" style="line-height: 1.6; text-indent: 2em;">
        <p>{{ summary }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAISummary } from '@/api'

const summary = ref('')
const keywords = ref([])

onMounted(async () => {
  const res = await getAISummary()
  summary.value = res.data.summary
  keywords.value = res.data.keywords.split(' ')
})
</script>