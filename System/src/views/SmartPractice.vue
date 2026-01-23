<template>
  <div class="practice-page">
    <el-page-header content="智能练习中心"></el-page-header>
    <div style="margin-top: 20px;">
      <el-card v-for="(item, index) in questions" :key="item.id" style="margin-bottom: 15px;">
        <h3 style="margin: 0 0 10px 0;">第 {{ index + 1 }} 题 ({{ item.type }})</h3>
        <p style="font-weight: bold; margin: 0 0 10px 0;">{{ item.title }}</p>
        <div style="padding-left: 20px;">
          <el-radio-group v-model="answers[item.id]">
            <el-radio label="A">A. 选项内容...</el-radio><br>
            <el-radio label="B">B. 选项内容...</el-radio><br>
            <el-radio label="C">C. 选项内容...</el-radio><br>
            <el-radio label="D">D. 选项内容...</el-radio>
          </el-radio-group>
        </div>
      </el-card>
      <el-button type="primary">提交答案</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getPracticeList } from '@/api'

const questions = ref([])
const answers = reactive({})

onMounted(async () => {
  const res = await getPracticeList()
  questions.value = res.data.list
})
</script>