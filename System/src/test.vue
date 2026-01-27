<template>
  <div class="teacher-platform">
    <!-- 顶部导航 -->
    <div class="navbar">
      <div class="nav-left">
        <h1>慧学澄明教育平台-教师端</h1>
      </div>
      <div class="nav-right">
        <el-button type="primary" @click="goBack">返回首页</el-button>
      </div>
    </div>

    <!-- 主体布局 -->
    <div class="main-layout">
      <!-- 左侧菜单 -->
      <el-menu
        default-active="1-1"
        class="sidebar-menu"
        @select="handleMenuSelect"
        :collapse="isCollapse"
      >
        <el-menu-item index="collapse-trigger" @click="toggleCollapse">
          <i class="el-icon-menu"></i>
          <template #title>{{ isCollapse ? '展开' : '收起' }}</template>
        </el-menu-item>
        
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-s-data"></i>
            <span>课程管理</span>
          </template>
          <el-menu-item index="1-1">创建课程</el-menu-item>
          <el-menu-item index="1-2">发布课程</el-menu-item>
          <el-menu-item index="1-3">课程数据</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="2">
          <template #title>
            <i class="el-icon-user"></i>
            <span>师生管理</span>
          </template>
          <el-menu-item index="2-1">教师管理</el-menu-item>
          <el-menu-item index="2-2">学生管理</el-menu-item>
        </el-sub-menu>
      </el-menu>

      <!-- 右侧内容区 -->
      <div class="content-wrapper">
        <!-- 页面标题 -->
        <div class="page-header">
          <h2>{{ pageTitle }}</h2>
        </div>

        <!-- 功能操作区 -->
        <div class="action-bar">
          <!-- 创建课程操作 -->
          <template v-if="currentMenu === '1-1'">
            <el-button type="primary" icon="el-icon-plus" @click="openCourseDialog">新增课程</el-button>
            <el-button type="info" icon="el-icon-download" @click="exportCourseData">导出课程列表</el-button>
          </template>

          <!-- 发布课程操作 -->
          <template v-if="currentMenu === '1-2'">
            <el-button 
              type="success" 
              icon="el-icon-send" 
              @click="batchPublishCourse"
              :disabled="selectedCourses.length === 0"
            >
              批量发布选中课程
            </el-button>
            <el-button 
              type="warning" 
              icon="el-icon-refresh" 
              @click="refreshCourseList"
            >
              刷新课程状态
            </el-button>
          </template>

          <!-- 课程数据操作 -->
          <template v-if="currentMenu === '1-3'">
            <el-button 
              type="primary" 
              icon="el-icon-s-data" 
              @click="viewCourseDetail"
              :disabled="selectedCourses.length !== 1"
            >
              查看课程详情
            </el-button>
            <el-button 
              type="success" 
              icon="el-icon-chart-pie" 
              @click="showCourseChart"
            >
              数据可视化
            </el-button>
          </template>

          <!-- 通用删除操作 -->
          <el-button 
            v-if="currentMenu !== '1-3'"
            type="danger" 
            icon="el-icon-delete" 
            @click="batchDeleteCourse"
            :disabled="selectedCourses.length === 0"
          >
            批量删除({{ selectedCourses.length }})
          </el-button>
        </div>

        <!-- 搜索区 -->
        <div class="search-panel">
          <el-form :inline="true" :model="searchForm" class="search-form">
            <el-form-item label="课程名称">
              <el-input 
                v-model="searchForm.name" 
                placeholder="请输入课程名称" 
                clearable
              />
            </el-form-item>
            <el-form-item label="课程类型" v-if="currentMenu !== '1-3'">
              <el-select 
                v-model="searchForm.type" 
                placeholder="请选择课程类型" 
                clearable
              >
                <el-option label="语文" value="chinese" />
                <el-option label="数学" value="math" />
                <el-option label="英语" value="english" />
                <el-option label="科学" value="science" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程状态" v-if="currentMenu === '1-2'">
              <el-select 
                v-model="searchForm.status" 
                placeholder="请选择课程状态" 
                clearable
              >
                <el-option label="未发布" value="draft" />
                <el-option label="已发布" value="published" />
                <el-option label="已下架" value="offline" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchCourse">查询</el-button>
              <el-button icon="el-icon-refresh" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 课程列表表格 -->
        <div class="table-container">
          <el-table
            :data="courseList"
            border
            stripe
            v-loading="loading"
            @selection-change="handleCourseSelect"
            empty-text="暂无课程数据"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="课程ID" width="80" />
            <el-table-column prop="name" label="课程名称" min-width="150" />
            <el-table-column prop="type" label="课程类型" width="100">
              <template #default="{ row }">
                <el-tag :type="getTypeTagType(row.type)">{{ getTypeName(row.type) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="grade" label="适用年级" width="100" />
            <el-table-column prop="teacher" label="授课教师" width="120" />
            <el-table-column prop="hour" label="课时数" width="80" />
            
            <!-- 发布课程页面显示状态 -->
            <el-table-column prop="status" label="课程状态" width="100" v-if="currentMenu === '1-2'">
              <template #default="{ row }">
                <el-tag 
                  :type="row.status === 'published' ? 'success' : row.status === 'draft' ? 'warning' : 'danger'"
                >
                  {{ row.status === 'published' ? '已发布' : row.status === 'draft' ? '未发布' : '已下架' }}
                </el-tag>
              </template>
            </el-table-column>

            <!-- 课程数据页面显示数据指标 -->
            <el-table-column label="选课人数" width="100" v-if="currentMenu === '1-3'">
              <template #default="{ row }">
                <el-tag type="primary">{{ row.studentCount || 0 }} 人</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="完成率" width="120" v-if="currentMenu === '1-3'">
              <template #default="{ row }">
                <el-progress 
                  :percentage="row.completionRate || 0" 
                  size="small" 
                  :color="getProgressColor(row.completionRate || 0)"
                />
              </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <!-- 创建课程页面操作 -->
                <template v-if="currentMenu === '1-1'">
                  <el-button size="small" type="primary" @click="editCourse(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteCourse(row)">删除</el-button>
                </template>

                <!-- 发布课程页面操作 -->
                <template v-if="currentMenu === '1-2'">
                  <el-button 
                    size="small" 
                    type="success" 
                    @click="publishSingleCourse(row)"
                    v-if="row.status === 'draft'"
                  >
                    发布
                  </el-button>
                  <el-button 
                    size="small" 
                    type="danger" 
                    @click="offlineCourse(row)"
                    v-if="row.status === 'published'"
                  >
                    下架
                  </el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.page"
            :page-sizes="[10, 20, 50]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            class="pagination"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 新增/编辑课程弹窗 -->
    <el-dialog
      v-model="courseDialogVisible"
      :title="courseForm.id ? '编辑课程' : '新增课程'"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="courseFormRef"
        :model="courseForm"
        :rules="courseRules"
        label-width="100px"
      >
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="courseForm.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课程类型" prop="type">
          <el-select v-model="courseForm.type" placeholder="请选择课程类型">
            <el-option label="语文" value="chinese" />
            <el-option label="数学" value="math" />
            <el-option label="英语" value="english" />
            <el-option label="科学" value="science" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用年级" prop="grade">
          <el-select v-model="courseForm.grade" placeholder="请选择适用年级">
            <el-option label="一年级" value="1" />
            <el-option label="二年级" value="2" />
            <el-option label="三年级" value="3" />
            <el-option label="四年级" value="4" />
            <el-option label="五年级" value="5" />
            <el-option label="六年级" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher">
          <el-input v-model="courseForm.teacher" placeholder="请输入授课教师姓名" />
        </el-form-item>
        <el-form-item label="课时数" prop="hour">
          <el-input-number 
            v-model="courseForm.hour" 
            :min="1" 
            :max="100" 
            placeholder="请输入课时数"
          />
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input 
            type="textarea" 
            v-model="courseForm.desc" 
            rows="4" 
            placeholder="请输入课程描述（选填）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="courseDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCourse">保存</el-button>
      </template>
    </el-dialog>

    <!-- 课程数据详情弹窗 -->
    <el-dialog
      v-model="courseDetailVisible"
      title="课程数据详情"
      width="800px"
    >
      <div v-if="currentCourseDetail" class="course-detail">
        <div class="detail-header">
          <h3>{{ currentCourseDetail.name }}（{{ getTypeName(currentCourseDetail.type) }}·{{ currentCourseDetail.grade }}年级）</h3>
          <p>授课教师：{{ currentCourseDetail.teacher }} | 课时数：{{ currentCourseDetail.hour }}节</p>
        </div>
        <el-divider />
        <div class="detail-stats">
          <div class="stat-item">
            <span class="stat-label">选课人数：</span>
            <span class="stat-value">{{ currentCourseDetail.studentCount }} 人</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">课程完成率：</span>
            <span class="stat-value">{{ currentCourseDetail.completionRate }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">平均成绩：</span>
            <span class="stat-value">{{ currentCourseDetail.avgScore }} 分</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">优秀率（≥90分）：</span>
            <span class="stat-value">{{ currentCourseDetail.excellentRate }}%</span>
          </div>
        </div>
        <el-divider />
        <h4>成绩分布</h4>
        <el-table
          :data="currentCourseDetail.scoreDistribution"
          border
          stripe
          style="width: 100%; margin-bottom: 20px;"
        >
          <el-table-column prop="range" label="分数段" width="100" />
          <el-table-column prop="count" label="人数" width="80" />
          <el-table-column prop="rate" label="占比" width="150">
            <template #default="{ row }">
              <el-progress :percentage="row.rate" size="small" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <el-button @click="courseDetailVisible = false">关闭</el-button>
        <el-button type="primary" @click="exportDetailData">导出详情</el-button>
      </template>
    </el-dialog>

    <!-- 数据可视化弹窗 -->
    <el-dialog
      v-model="chartVisible"
      title="课程数据可视化分析"
      width="900px"
    >
      <div class="chart-container">
        <div class="chart-item">
          <h4>各课程选课人数对比</h4>
          <div id="studentCountChart" style="width: 100%; height: 300px;"></div>
        </div>
        <div class="chart-item">
          <h4>各课程完成率对比</h4>
          <div id="completionRateChart" style="width: 100%; height: 300px;"></div>
        </div>
      </div>
      <template #footer>
        <el-button @click="chartVisible = false">关闭</el-button>
        <el-button type="primary" @click="downloadChart">下载图表</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as XLSX from 'xlsx'
import * as echarts from 'echarts'

// -------------------------- 基础数据定义 --------------------------
// 菜单状态
const isCollapse = ref(false)
const currentMenu = ref('1-1') // 默认选中创建课程
const pageTitle = ref('创建课程')

// 加载状态
const loading = ref(false)

// 选中的课程
const selectedCourses = ref([])

// 分页配置
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 搜索表单
const searchForm = reactive({
  name: '',
  type: '',
  status: ''
})

// 课程表单（新增/编辑）
const courseDialogVisible = ref(false)
const courseFormRef = ref(null)
const courseForm = reactive({
  id: '',
  name: '',
  type: '',
  grade: '',
  teacher: '',
  hour: null,
  desc: ''
})

// 课程表单校验规则
const courseRules = reactive({
  name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择课程类型', trigger: 'change' }],
  grade: [{ required: true, message: '请选择适用年级', trigger: 'change' }],
  teacher: [{ required: true, message: '请输入授课教师姓名', trigger: 'blur' }],
  hour: [{ required: true, message: '请输入课时数', trigger: 'change' }]
})

// 课程详情弹窗
const courseDetailVisible = ref(false)
const currentCourseDetail = ref(null)

// 图表弹窗
const chartVisible = ref(false)
let studentCountChart = null
let completionRateChart = null

// 模拟课程数据（实际项目中替换为接口请求）
const courseData = ref([
  { id: 'C001', name: '三年级数学上册', type: 'math', grade: '3', teacher: '张三', hour: 40, status: 'published', studentCount: 45, completionRate: 85, avgScore: 88, excellentRate: 35 },
  { id: 'C002', name: '二年级语文下册', type: 'chinese', grade: '2', teacher: '李四', hour: 36, status: 'draft', studentCount: 38, completionRate: 78, avgScore: 82, excellentRate: 25 },
  { id: 'C003', name: '四年级英语基础', type: 'english', grade: '4', teacher: '王五', hour: 45, status: 'published', studentCount: 28, completionRate: 92, avgScore: 90, excellentRate: 45 },
  { id: 'C004', name: '五年级科学实验', type: 'science', grade: '5', teacher: '赵六', hour: 30, status: 'draft', studentCount: 0, completionRate: 0, avgScore: 0, excellentRate: 0 },
  { id: 'C005', name: '三年级体育健康', type: 'pe', grade: '3', teacher: '钱七', hour: 20, status: 'offline', studentCount: 15, completionRate: 65, avgScore: 75, excellentRate: 10 }
])

// 课程列表（用于渲染）
const courseList = ref([])

// -------------------------- 工具函数 --------------------------
// 获取课程类型名称
const getTypeName = (type) => {
  const typeMap = {
    chinese: '语文',
    math: '数学',
    english: '英语',
    science: '科学',
    pe: '体育'
  }
  return typeMap[type] || '未知'
}

// 获取课程类型标签样式
const getTypeTagType = (type) => {
  const typeMap = {
    chinese: 'primary',
    math: 'success',
    english: 'warning',
    science: 'info',
    pe: 'danger'
  }
  return typeMap[type] || 'default'
}

// 获取进度条颜色
const getProgressColor = (rate) => {
  if (rate >= 80) return '#67c23a'
  if (rate >= 60) return '#e6a23c'
  return '#f56c6c'
}

// 生成课程ID
const generateCourseId = () => {
  const maxId = courseData.value.reduce((max, item) => {
    const num = parseInt(item.id.slice(1))
    return num > max ? num : max
  }, 0)
  return `C${String(maxId + 1).padStart(3, '0')}`
}

// -------------------------- 数据加载与筛选 --------------------------
// 加载课程数据
const loadCourseData = () => {
  loading.value = true
  
  // 筛选逻辑
  let filteredData = [...courseData.value]
  
  // 名称筛选
  if (searchForm.name) {
    filteredData = filteredData.filter(item => item.name.includes(searchForm.name))
  }
  
  // 类型筛选
  if (searchForm.type) {
    filteredData = filteredData.filter(item => item.type === searchForm.type)
  }
  
  // 状态筛选（仅发布课程页面）
  if (searchForm.status && currentMenu.value === '1-2') {
    filteredData = filteredData.filter(item => item.status === searchForm.status)
  }
  
  // 分页处理
  pagination.total = filteredData.length
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  courseList.value = filteredData.slice(start, end)
  
  loading.value = false
}

// 搜索课程
const searchCourse = () => {
  pagination.page = 1
  loadCourseData()
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.type = ''
  searchForm.status = ''
  searchCourse()
}

// 分页大小变化
const handleSizeChange = (size) => {
  pagination.pageSize = size
  loadCourseData()
}

// 页码变化
const handleCurrentChange = (page) => {
  pagination.page = page
  loadCourseData()
}

// -------------------------- 菜单切换 --------------------------
const handleMenuSelect = (index) => {
  if (index === 'collapse-trigger') return
  
  currentMenu.value = index
  // 更新页面标题
  switch (index) {
    case '1-1':
      pageTitle.value = '创建课程'
      break
    case '1-2':
      pageTitle.value = '发布课程'
      break
    case '1-3':
      pageTitle.value = '课程数据'
      break
    case '2-1':
      pageTitle.value = '教师管理'
      break
    case '2-2':
      pageTitle.value = '学生管理'
      break
  }
  
  // 重置分页和搜索
  pagination.page = 1
  resetSearch()
  loadCourseData()
}

// 折叠菜单切换
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// -------------------------- 课程选择 --------------------------
const handleCourseSelect = (val) => {
  selectedCourses.value = val
}

// -------------------------- 创建/编辑课程 --------------------------
// 打开课程弹窗
const openCourseDialog = () => {
  // 重置表单
  Object.assign(courseForm, {
    id: '',
    name: '',
    type: '',
    grade: '',
    teacher: '',
    hour: null,
    desc: ''
  })
  nextTick(() => {
    courseFormRef.value?.clearValidate()
  })
  courseDialogVisible.value = true
}

// 编辑课程
const editCourse = (row) => {
  Object.assign(courseForm, {
    id: row.id,
    name: row.name,
    type: row.type,
    grade: row.grade,
    teacher: row.teacher,
    hour: row.hour,
    desc: row.desc || ''
  })
  nextTick(() => {
    courseFormRef.value?.clearValidate()
  })
  courseDialogVisible.value = true
}

// 保存课程
const saveCourse = async () => {
  try {
    // 表单校验
    await courseFormRef.value.validate()
    
    if (courseForm.id) {
      // 编辑课程
      const index = courseData.value.findIndex(item => item.id === courseForm.id)
      if (index > -1) {
        courseData.value[index] = {
          ...courseData.value[index],
          name: courseForm.name,
          type: courseForm.type,
          grade: courseForm.grade,
          teacher: courseForm.teacher,
          hour: courseForm.hour,
          desc: courseForm.desc
        }
        ElMessage.success('课程编辑成功！')
      }
    } else {
      // 新增课程
      const newCourse = {
        id: generateCourseId(),
        name: courseForm.name,
        type: courseForm.type,
        grade: courseForm.grade,
        teacher: courseForm.teacher,
        hour: courseForm.hour,
        desc: courseForm.desc,
        status: 'draft', // 默认未发布
        studentCount: 0,
        completionRate: 0,
        avgScore: 0,
        excellentRate: 0
      }
      courseData.value.unshift(newCourse)
      ElMessage.success('课程创建成功！')
    }
    
    courseDialogVisible.value = false
    loadCourseData()
  } catch (error) {
    ElMessage.error('表单填写有误，请检查！')
  }
}

// -------------------------- 发布课程 --------------------------
// 批量发布课程
const batchPublishCourse = () => {
  ElMessageBox.confirm(
    '确定要发布选中的课程吗？',
    '发布确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    selectedCourses.value.forEach(course => {
      const index = courseData.value.findIndex(item => item.id === course.id)
      if (index > -1) {
        courseData.value[index].status = 'published'
      }
    })
    ElMessage.success('课程发布成功！')
    loadCourseData()
    selectedCourses.value = []
  })
}

// 单个发布课程
const publishSingleCourse = (row) => {
  ElMessageBox.confirm(
    `确定要发布课程【${row.name}】吗？`,
    '发布确认',
    {
      type: 'warning'
    }
  ).then(() => {
    const index = courseData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      courseData.value[index].status = 'published'
    }
    ElMessage.success('课程发布成功！')
    loadCourseData()
  })
}

// 课程下架
const offlineCourse = (row) => {
  ElMessageBox.confirm(
    `确定要下架课程【${row.name}】吗？`,
    '下架确认',
    {
      type: 'warning'
    }
  ).then(() => {
    const index = courseData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      courseData.value[index].status = 'offline'
    }
    ElMessage.success('课程已下架！')
    loadCourseData()
  })
}

// 刷新课程列表
const refreshCourseList = () => {
  loadCourseData()
  ElMessage.success('课程列表已刷新！')
}

// -------------------------- 删除课程 --------------------------
// 批量删除课程
const batchDeleteCourse = () => {
  ElMessageBox.confirm(
    '确定要删除选中的课程吗？此操作不可恢复！',
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }
  ).then(() => {
    const ids = selectedCourses.value.map(item => item.id)
    courseData.value = courseData.value.filter(item => !ids.includes(item.id))
    ElMessage.success('课程删除成功！')
    loadCourseData()
    selectedCourses.value = []
  })
}

// 单个删除课程
const deleteCourse = (row) => {
  ElMessageBox.confirm(
    `确定要删除课程【${row.name}】吗？此操作不可恢复！`,
    '删除确认',
    {
      type: 'error'
    }
  ).then(() => {
    courseData.value = courseData.value.filter(item => item.id !== row.id)
    ElMessage.success('课程删除成功！')
    loadCourseData()
  })
}

// -------------------------- 课程数据 --------------------------
// 查看课程详情
const viewCourseDetail = () => {
  const course = selectedCourses.value[0]
  // 模拟课程详情数据
  currentCourseDetail.value = {
    ...course,
    scoreDistribution: [
      { range: '90-100', count: Math.floor(course.studentCount * course.excellentRate / 100), rate: course.excellentRate },
      { range: '80-89', count: Math.floor(course.studentCount * 25 / 100), rate: 25 },
      { range: '70-79', count: Math.floor(course.studentCount * 20 / 100), rate: 20 },
      { range: '60-69', count: Math.floor(course.studentCount * 15 / 100), rate: 15 },
      { range: '0-59', count: Math.floor(course.studentCount * 15 / 100), rate: 15 }
    ]
  }
  courseDetailVisible.value = true
}

// 显示数据可视化图表
const showCourseChart = () => {
  chartVisible.value = true
  
  nextTick(() => {
    // 初始化选课人数图表
    if (!studentCountChart) {
      studentCountChart = echarts.init(document.getElementById('studentCountChart'))
    }
    studentCountChart.setOption({
      title: { text: '' },
      xAxis: {
        type: 'category',
        data: courseData.value.map(item => item.name)
      },
      yAxis: {
        type: 'value',
        name: '人数'
      },
      series: [{
        data: courseData.value.map(item => item.studentCount),
        type: 'bar',
        color: '#409eff'
      }],
      tooltip: {
        trigger: 'axis'
      }
    })
    
    // 初始化完成率图表
    if (!completionRateChart) {
      completionRateChart = echarts.init(document.getElementById('completionRateChart'))
    }
    completionRateChart.setOption({
      title: { text: '' },
      xAxis: {
        type: 'category',
        data: courseData.value.map(item => item.name)
      },
      yAxis: {
        type: 'value',
        name: '完成率(%)',
        max: 100
      },
      series: [{
        data: courseData.value.map(item => item.completionRate),
        type: 'line',
        color: '#67c23a',
        smooth: true
      }],
      tooltip: {
        trigger: 'axis'
      }
    })
  })
}

// -------------------------- 导出功能 --------------------------
// 导出课程列表
const exportCourseData = () => {
  try {
    // 过滤特殊字符，避免Excel报错
    const sheetName = `课程列表_${new Date().toLocaleDateString()}`.replace(/[\/\\\*\?\[\]]/g, '')
    const ws = XLSX.utils.json_to_sheet(courseList.value)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, `${sheetName}.xlsx`)
    ElMessage.success('课程数据导出成功！')
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  }
}

// 导出课程详情数据
const exportDetailData = () => {
  if (!currentCourseDetail.value) return
  
  try {
    const sheetName = `${currentCourseDetail.value.name}_详情`.replace(/[\/\\\*\?\[\]]/g, '')
    const ws = XLSX.utils.json_to_sheet(currentCourseDetail.value.scoreDistribution)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, `${sheetName}.xlsx`)
    ElMessage.success('详情数据导出成功！')
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  }
}

// 下载图表
const downloadChart = () => {
  try {
    // 下载选课人数图表
    const studentImg = studentCountChart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    const link1 = document.createElement('a')
    link1.href = studentImg
    link1.download = '选课人数图表.png'
    link1.click()
    
    // 下载完成率图表
    const rateImg = completionRateChart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    const link2 = document.createElement('a')
    link2.href = rateImg
    link2.download = '完成率图表.png'
    link2.click()
    
    ElMessage.success('图表下载成功！')
  } catch (error) {
    ElMessage.error('图表下载失败：' + error.message)
  }
}

// -------------------------- 页面跳转 --------------------------
const goBack = () => {
  // 实际项目中替换为路由跳转
  ElMessage.info('返回首页')
}

// -------------------------- 初始化 --------------------------
onMounted(() => {
  loadCourseData()
  
  // 监听窗口大小变化，自适应图表
  window.addEventListener('resize', () => {
    if (studentCountChart) studentCountChart.resize()
    if (completionRateChart) completionRateChart.resize()
  })
})

// 监听菜单变化，重新加载数据
watch(currentMenu, () => {
  loadCourseData()
})
</script>

<style scoped>
.teacher-platform {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.navbar {
  height: 60px;
  line-height: 60px;
  background-color: #409eff;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.navbar h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar-menu {
  width: 200px;
  border-right: none;
  background-color: #fff;
  height: calc(100vh - 60px);
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.action-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-panel {
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.search-form {
  display: flex;
  align-items: center;
}

.table-container {
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.course-detail {
  padding: 10px 0;
}

.detail-header {
  text-align: center;
  margin-bottom: 10px;
}

.detail-header h3 {
  margin: 0 0 5px 0;
  color: #303133;
}

.detail-header p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.detail-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

.stat-item {
  flex: 1;
  min-width: 150px;
}

.stat-label {
  color: #606266;
  font-size: 14px;
}

.stat-value {
  color: #409eff;
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-item h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 16px;
}
</style>