<template>
  <div class="teacher-platform">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="nav-left">
        <h1 class="platform-name">慧学澄明教育平台-教师端</h1>
      </div>
      <div class="nav-right">
        <div class="refresh-control">
          <span>手动刷新</span>
          <el-switch 
            v-model="autoRefresh" 
            active-text="自动刷新" 
            inactive-text="关闭"
            @change="handleRefreshChange"
          />
        </div>
        <el-button 
          type="primary" 
          @click="goBack"
          :loading="btnLoading.back"
          class="interactive-btn"
        >
<i class="el-icon-back"></i> 返回首页        </el-button>
      </div>
    </div>

    <!-- 主体布局 -->
    <div class="main-layout">
      <!-- 左侧折叠菜单 -->
      <div class="sidebar" :class="{ 'is-collapse': isCollapse }">
        <el-menu
          :default-active="currentMenu"
          class="sidebar-menu"
          background-color="#f5f7fa"
          text-color="#303133"
          active-text-color="#409eff"
          :collapse="isCollapse"
          @select="handleMenuSelect"
        >
          <div class="logo-container" @click="toggleCollapse">
<i class="el-icon-s-unfold" :class="{ 'rotate-icon': isCollapse }"></i>            <span v-show="!isCollapse" class="collapse-text">收起菜单</span>
          </div>
          
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
              <i class="el-icon-edit"></i>
              <span>作业管理</span>
            </template>
            <el-menu-item index="2-1">布置作业</el-menu-item>
            <el-menu-item index="2-2">作业批改</el-menu-item>
            <el-menu-item index="2-3">作业统计</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="3">
            <template #title>
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item index="3-1">教师管理</el-menu-item>
            <el-menu-item index="3-2">学生管理</el-menu-item>
            <el-menu-item index="3-3">班级通知</el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="4">
            <template #title>
              <i class="el-icon-s-tools"></i>
              <span>教学工具</span>
            </template>
            <el-menu-item index="4-1">在线备课</el-menu-item>
            <el-menu-item index="4-2">资源库</el-menu-item>
            <el-menu-item index="4-3">教学计划</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <i class="el-icon-s-data"></i>
              <span>成绩管理</span>
            </template>
            <el-menu-item index="5-1">成绩录入</el-menu-item>
            <el-menu-item index="5-2">成绩统计</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="content-area">
        <!-- 课程管理模块 -->
        <template v-if="currentMenu.startsWith('1-')">
          <div class="page-header">
            <h2 class="page-title">{{ getCoursePageTitle() }}</h2>
          </div>

          <div class="action-bar">
            <div class="left-actions">
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
            </div>
            <div class="right-actions">
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
          </div>

          <div class="search-panel">
            <el-form :inline="true" :model="courseSearchForm" class="search-form">
              <el-form-item label="课程名称">
                <el-input 
                  v-model="courseSearchForm.name" 
                  placeholder="请输入课程名称" 
                  clearable
                />
              </el-form-item>
              <el-form-item label="课程类型" v-if="currentMenu !== '1-3'">
                <el-select 
                  v-model="courseSearchForm.type" 
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
                  v-model="courseSearchForm.status" 
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
                <el-button icon="el-icon-refresh" @click="resetCourseSearch">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="table-container">
            <el-table
              :data="courseList"
              border
              stripe
              v-loading="courseLoading"
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

            <div class="pagination-container">
              <el-pagination
                v-model:current-page="coursePagination.page"
                v-model:page-size="coursePagination.pageSize"
                :total="coursePagination.total"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleCourseSizeChange"
                @current-change="handleCourseCurrentChange"
                background
              />
            </div>
          </div>
        </template>

        <!-- 作业管理模块 -->
        <template v-else-if="currentMenu.startsWith('2-')">
          <div class="page-header">
            <h2 class="page-title">{{ getHomeworkPageTitle() }}</h2>
          </div>

          <div class="action-bar">
            <div class="left-actions">
              <!-- 布置作业操作 -->
              <template v-if="currentMenu === '2-1'">
                <el-button type="primary" icon="el-icon-plus" @click="openAssignHomework">布置作业</el-button>
                <el-button type="info" icon="el-icon-download" @click="exportHomeworkData">导出作业列表</el-button>
              </template>

              <!-- 作业批改操作 -->
              <template v-if="currentMenu === '2-2'">
                <el-button 
                  type="success" 
                  icon="el-icon-check" 
                  @click="batchGradeHomework"
                  :disabled="selectedHomeworks.length === 0"
                >
                  批量批改
                </el-button>
                <el-button 
                  type="warning" 
                  icon="el-icon-refresh" 
                  @click="refreshHomeworkList"
                >
                  刷新列表
                </el-button>
              </template>

              <!-- 作业统计操作 -->
              <template v-if="currentMenu === '2-3'">
                <el-button 
                  type="primary" 
                  icon="el-icon-s-data" 
                  @click="showHomeworkChart"
                >
                  数据可视化
                </el-button>
                <el-button 
                  type="success" 
                  icon="el-icon-download" 
                  @click="exportHomeworkStats"
                >
                  导出统计报告
                </el-button>
              </template>
            </div>
            <div class="right-actions">
              <el-button 
                v-if="currentMenu !== '2-3'"
                type="danger" 
                icon="el-icon-delete" 
                @click="batchDeleteHomework"
                :disabled="selectedHomeworks.length === 0"
              >
                批量删除({{ selectedHomeworks.length }})
              </el-button>
            </div>
          </div>

          <div class="search-panel">
            <el-form :inline="true" :model="homeworkSearchForm" class="search-form">
              <el-form-item label="作业名称">
                <el-input 
                  v-model="homeworkSearchForm.name" 
                  placeholder="请输入作业名称" 
                  clearable
                />
              </el-form-item>
              <el-form-item label="课程">
                <el-select 
                  v-model="homeworkSearchForm.course" 
                  placeholder="请选择课程" 
                  clearable
                >
                  <el-option label="语文" value="chinese" />
                  <el-option label="数学" value="math" />
                  <el-option label="英语" value="english" />
                  <el-option label="科学" value="science" />
                </el-select>
              </el-form-item>
              <el-form-item label="状态" v-if="currentMenu === '2-2'">
                <el-select 
                  v-model="homeworkSearchForm.status" 
                  placeholder="请选择状态" 
                  clearable
                >
                  <el-option label="未批改" value="pending" />
                  <el-option label="已批改" value="graded" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchHomework">查询</el-button>
                <el-button icon="el-icon-refresh" @click="resetHomeworkSearch">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="table-container">
            <el-table
              :data="homeworkList"
              border
              stripe
              v-loading="homeworkLoading"
              @selection-change="handleHomeworkSelect"
              empty-text="暂无作业数据"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="作业ID" width="100" />
              <el-table-column prop="name" label="作业名称" min-width="150" />
              <el-table-column prop="course" label="课程" width="100">
                <template #default="{ row }">
                  <el-tag :type="getCourseTagType(row.course)">{{ getCourseName(row.course) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="classes" label="班级" width="150" />
              <el-table-column prop="deadline" label="截止时间" width="160" />
              
              <!-- 作业批改页面显示状态 -->
              <el-table-column prop="status" label="批改状态" width="100" v-if="currentMenu === '2-2'">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'graded' ? 'success' : 'warning'">
                    {{ row.status === 'graded' ? '已批改' : '未批改' }}
                  </el-tag>
                </template>
              </el-table-column>

              <!-- 作业统计页面显示数据 -->
              <el-table-column label="提交人数" width="100" v-if="currentMenu === '2-3'">
                <template #default="{ row }">
                  <el-tag type="primary">{{ row.submittedCount || 0 }} 人</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="完成率" width="120" v-if="currentMenu === '2-3'">
                <template #default="{ row }">
                  <el-progress 
                    :percentage="row.completionRate || 0" 
                    size="small" 
                    :color="getProgressColor(row.completionRate || 0)"
                  />
                </template>
              </el-table-column>
              <el-table-column label="平均分" width="100" v-if="currentMenu === '2-3'">
                <template #default="{ row }">
                  <span style="font-weight: bold; color: #667eea;">{{ row.avgScore || 0 }}</span>
                </template>
              </el-table-column>

              <!-- 操作列 -->
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <!-- 布置作业页面操作 -->
                  <template v-if="currentMenu === '2-1'">
                    <el-button size="small" type="primary" @click="editHomework(row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteHomework(row)">删除</el-button>
                  </template>

                  <!-- 作业批改页面操作 -->
                  <template v-if="currentMenu === '2-2'">
                    <el-button 
                      size="small" 
                      type="success" 
                      @click="gradeHomework(row)"
                    >
                      批改
                    </el-button>
                    <el-button 
                      size="small" 
                      type="primary" 
                      @click="viewHomeworkDetail(row)"
                    >
                      查看
                    </el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination
                v-model:current-page="homeworkPagination.page"
                v-model:page-size="homeworkPagination.pageSize"
                :total="homeworkPagination.total"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleHomeworkSizeChange"
                @current-change="handleHomeworkCurrentChange"
                background
              />
            </div>
          </div>
        </template>

        <!-- 教学工具模块 -->
        <template v-else-if="currentMenu.startsWith('4-')">
          <div class="page-header">
            <h2 class="page-title">{{ getTeachingToolPageTitle() }}</h2>
            <div class="page-description">
              {{ currentMenu === '4-1' ? '在线备课管理，支持创建、编辑和查看备课内容' : 
                 currentMenu === '4-2' ? '教学资源库，支持上传、下载和管理各类教学资源' : 
                 '教学计划管理，支持创建、跟踪和统计教学计划' }}
            </div>
          </div>

          <div class="action-bar">
            <div class="left-actions">
              <!-- 在线备课操作 -->
              <template v-if="currentMenu === '4-1'">
                <el-button type="primary" icon="el-icon-plus" @click="openLessonDialog">创建备课</el-button>
                <el-button type="info" icon="el-icon-download" @click="exportLessonData">导出备课列表</el-button>
              </template>

              <!-- 资源库操作 -->
              <template v-if="currentMenu === '4-2'">
                <el-button type="primary" icon="el-icon-upload" @click="uploadResource">上传资源</el-button>
                <el-button type="success" icon="el-icon-folder-add" @click="createFolder">新建文件夹</el-button>
                <el-button type="info" icon="el-icon-download" @click="exportResourceData">导出资源</el-button>
              </template>

              <!-- 教学计划操作 -->
              <template v-if="currentMenu === '4-3'">
                <el-button type="primary" icon="el-icon-plus" @click="openPlanDialog">创建计划</el-button>
                <el-button type="success" icon="el-icon-s-data" @click="showPlanChart">计划统计</el-button>
                <el-button type="info" icon="el-icon-download" @click="exportPlanData">导出计划</el-button>
              </template>
            </div>
            <div class="right-actions">
              <el-button 
                v-if="currentMenu !== '4-2'"
                type="danger" 
                icon="el-icon-delete" 
                @click="batchDeleteTeachingTool"
                :disabled="selectedTeachingTools.length === 0"
              >
                批量删除({{ selectedTeachingTools.length }})
              </el-button>
            </div>
          </div>

          <div class="search-panel">
            <div class="search-header">
              <h3>{{ currentMenu === '4-1' ? '备课搜索' : currentMenu === '4-2' ? '资源搜索' : '计划搜索' }}</h3>
            </div>
            <el-form :inline="true" :model="teachingToolSearchForm" class="search-form">
              <el-form-item :label="currentMenu === '4-1' ? '备课名称' : currentMenu === '4-2' ? '资源名称' : '计划名称'">
                <el-input 
                  v-model="teachingToolSearchForm.name" 
                  :placeholder="currentMenu === '4-1' ? '请输入备课名称' : currentMenu === '4-2' ? '请输入资源名称' : '请输入计划名称'" 
                  clearable
                  style="width: 200px;"
                />
              </el-form-item>
              <el-form-item label="课程" v-if="currentMenu !== '4-2'">
                <el-select 
                  v-model="teachingToolSearchForm.course" 
                  placeholder="请选择课程" 
                  clearable
                  style="width: 120px;"
                >
                  <el-option label="语文" value="chinese" />
                  <el-option label="数学" value="math" />
                  <el-option label="英语" value="english" />
                  <el-option label="科学" value="science" />
                </el-select>
              </el-form-item>
              <el-form-item label="类型" v-if="currentMenu === '4-2'">
                <el-select 
                  v-model="teachingToolSearchForm.type" 
                  placeholder="请选择资源类型" 
                  clearable
                  style="width: 120px;"
                >
                  <el-option label="文档" value="document" />
                  <el-option label="视频" value="video" />
                  <el-option label="音频" value="audio" />
                  <el-option label="图片" value="image" />
                </el-select>
              </el-form-item>
              <el-form-item label="状态" v-if="currentMenu === '4-3'">
                <el-select 
                  v-model="teachingToolSearchForm.status" 
                  placeholder="请选择状态" 
                  clearable
                  style="width: 120px;"
                >
                  <el-option label="进行中" value="ongoing" />
                  <el-option label="已完成" value="completed" />
                  <el-option label="已延期" value="delayed" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchTeachingTool">查询</el-button>
                <el-button icon="el-icon-refresh" @click="resetTeachingToolSearch">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="table-container">
            <div class="table-header">
              <span>数据列表</span>
              <span class="data-count">共 {{ teachingToolPagination.total }} 条数据</span>
            </div>
            <el-table
              :data="teachingToolList"
              border
              stripe
              v-loading="teachingToolLoading"
              @selection-change="handleTeachingToolSelect"
              empty-text="暂无数据"
              style="width: 100%;"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" :label="currentMenu === '4-1' ? '备课ID' : currentMenu === '4-2' ? '资源ID' : '计划ID'" width="100" />
              <el-table-column prop="name" :label="currentMenu === '4-1' ? '备课名称' : currentMenu === '4-2' ? '资源名称' : '计划名称'" min-width="150" />
              
              <!-- 在线备课和教学计划显示课程 -->
              <el-table-column prop="course" label="课程" width="100" v-if="currentMenu !== '4-2'">
                <template #default="{ row }">
                  <el-tag :type="getCourseTagType(row.course)">{{ getCourseName(row.course) }}</el-tag>
                </template>
              </el-table-column>
              
              <!-- 资源库显示类型 -->
              <el-table-column prop="type" label="资源类型" width="100" v-if="currentMenu === '4-2'">
                <template #default="{ row }">
                  <el-tag :type="getResourceTagType(row.type)">{{ getResourceTypeName(row.type) }}</el-tag>
                </template>
              </el-table-column>
              
              <el-table-column prop="grade" label="适用年级" width="100" v-if="currentMenu !== '4-2'" />
              <el-table-column prop="size" label="文件大小" width="100" v-if="currentMenu === '4-2'" />
              <el-table-column prop="uploadTime" label="上传时间" width="160" v-if="currentMenu === '4-2'" />
              
              <!-- 教学计划显示状态 -->
              <el-table-column prop="status" label="状态" width="100" v-if="currentMenu === '4-3'">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'completed' ? 'success' : row.status === 'ongoing' ? 'primary' : 'danger'">
                    {{ row.status === 'completed' ? '已完成' : row.status === 'ongoing' ? '进行中' : '已延期' }}
                  </el-tag>
                </template>
              </el-table-column>
              
              <!-- 教学计划显示进度 -->
              <el-table-column label="进度" width="120" v-if="currentMenu === '4-3'">
                <template #default="{ row }">
                  <el-progress 
                    :percentage="row.progress || 0" 
                    size="small" 
                    :color="getProgressColor(row.progress || 0)"
                  />
                </template>
              </el-table-column>
              
              <el-table-column prop="createTime" :label="currentMenu === '4-1' ? '创建时间' : '开始时间'" width="160" v-if="currentMenu !== '4-2'" />
              
              <!-- 操作列 -->
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <!-- 在线备课操作 -->
                  <template v-if="currentMenu === '4-1'">
                    <el-button size="small" type="primary" @click="editLesson(row)">编辑</el-button>
                    <el-button size="small" @click="viewLesson(row)">查看</el-button>
                    <el-button size="small" type="danger" @click="deleteLesson(row)">删除</el-button>
                  </template>

                  <!-- 资源库操作 -->
                  <template v-if="currentMenu === '4-2'">
                    <el-button size="small" type="primary" @click="downloadResource(row)">下载</el-button>
                    <el-button size="small" type="danger" @click="deleteResource(row)">删除</el-button>
                  </template>

                  <!-- 教学计划操作 -->
                  <template v-if="currentMenu === '4-3'">
                    <el-button size="small" type="primary" @click="editPlan(row)">编辑</el-button>
                    <el-button size="small" @click="viewPlan(row)">查看</el-button>
                    <el-button size="small" type="danger" @click="deletePlan(row)">删除</el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination
                v-model:current-page="teachingToolPagination.page"
                v-model:page-size="teachingToolPagination.pageSize"
                :total="teachingToolPagination.total"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleTeachingToolSizeChange"
                @current-change="handleTeachingToolCurrentChange"
                background
              />
            </div>
          </div>
        </template>

        <!-- 师生管理模块 -->
        <template v-else>
          <div class="page-header">
            <h2 class="page-title">{{ currentModule }}管理</h2>
            <div class="module-switch">
              <el-radio-group v-model="currentModule" @change="switchModule">
                <el-radio value="教师">教师管理</el-radio>
                <el-radio value="学生">学生管理</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div class="action-bar">
            <div class="left-actions">
              <el-button 
                type="primary" 
                icon="el-icon-plus" 
                @click="handleAdd"
                :loading="btnLoading.add"
              >
                新增{{ currentModule }}
              </el-button>
              <el-button 
                type="success" 
                icon="el-icon-edit" 
                @click="openAssignHomework"
                :loading="btnLoading.homework"
              >
                布置作业
              </el-button>
              <el-button 
                type="warning" 
                icon="el-icon-bell" 
                @click="openClassNotice"
                :loading="btnLoading.notice"
              >
                班级通知
              </el-button>
              <el-button 
                type="info" 
                icon="el-icon-download" 
                @click="exportTableData"
                :loading="btnLoading.export"
              >
                导出{{ currentModule }}数据
              </el-button>
            </div>
            <div class="right-actions">
              <el-button 
                type="danger" 
                icon="el-icon-delete" 
                @click="handleBatchDelete"
                :loading="btnLoading.batchDel"
                :disabled="selectedItems.length === 0"
              >
                批量删除（{{ selectedItems.length }}）
              </el-button>
            </div>
          </div>

          <div class="search-panel">
            <el-form :inline="true" :model="searchForm">
              <el-form-item label="姓名：">
                <el-input
                  v-model="searchForm.name"
                  :placeholder="`请输入${currentModule}姓名`"
                  clearable
                />
              </el-form-item>
              <el-form-item label="班级ID：">
                <el-input
                  v-model="searchForm.classId"
                  placeholder="请输入班级ID"
                  clearable
                />
              </el-form-item>
              <el-form-item label="年级：">
                <el-select 
                  v-model="searchForm.grade" 
                  placeholder="请选择年级" 
                  clearable
                >
                  <el-option label="一年级" value="1" />
                  <el-option label="二年级" value="2" />
                  <el-option label="三年级" value="3" />
                  <el-option label="四年级" value="4" />
                  <el-option label="五年级" value="5" />
                  <el-option label="六年级" value="6" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button 
                  type="primary" 
                  icon="el-icon-search" 
                  @click="handleSearch"
                  :loading="btnLoading.search"
                >
                  查询
                </el-button>
                <el-button 
                  icon="el-icon-refresh" 
                  @click="handleReset"
                  :loading="btnLoading.reset"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="table-container">
            <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%"
              @selection-change="handleSelectionChange"
              v-loading="loading"
              empty-text="暂无数据"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="name" :label="`${currentModule}姓名`" width="120" />
              <el-table-column prop="gender" label="性别" width="80">
                <template #default="{ row }">
                  <el-tag size="small" :type="row.gender === 1 ? 'primary' : row.gender === 2 ? 'success' : 'info'">
                    {{ row.gender === 1 ? '男' : row.gender === 2 ? '女' : '未知' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="age" label="年龄" width="80" />
              <el-table-column prop="phone" label="联系电话" width="150" />
              <el-table-column prop="idCard" label="身份证号" min-width="180" />
              <el-table-column prop="grade" label="年级" width="80" v-if="currentModule === '学生'" />
              <el-table-column prop="className" label="班级" width="100" v-if="currentModule === '学生'" />
              <el-table-column prop="position" label="职位" width="120" v-if="currentModule === '教师'" />
              <el-table-column prop="attendance" label="考勤状态" width="100" v-if="currentModule === '教师'">
                <template #default="{ row }">
                  <el-tag 
                    size="small" 
                    :type="row.attendance === 'normal' ? 'success' : row.attendance === 'leave' ? 'warning' : 'danger'"
                  >
                    {{ row.attendance === 'normal' ? '正常' : row.attendance === 'leave' ? '请假' : '旷工' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180" fixed="right">
                <template #default="{ row }">
                  <el-button 
                    size="small" 
                    type="primary" 
                    @click.stop="handleEdit(row)"
                    :loading="btnLoading.edit"
                  >
                    编辑
                  </el-button>
                  <el-button 
                    size="small" 
                    type="danger" 
                    @click.stop="handleDelete(row)"
                    :loading="btnLoading.del"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-container">
              <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :total="pagination.total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id ? `编辑${currentModule}` : `新增${currentModule}`"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      draggable
      center
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        size="default"
      >
        <el-form-item label="ID" prop="id" v-if="formData.id">
          <el-input v-model="formData.id" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" :placeholder="`请输入${currentModule}姓名`" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio value="1">男</el-radio>
            <el-radio value="2">女</el-radio>
            <el-radio value="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number 
            v-model="formData.age" 
            :min="currentModule === '教师' ? 18 : 1" 
            :max="currentModule === '教师' ? 65 : 100" 
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        
        <el-form-item label="年级" prop="grade" v-if="currentModule === '学生'">
          <el-select v-model="formData.grade" placeholder="请选择年级">
            <el-option label="一年级" value="1" />
            <el-option label="二年级" value="2" />
            <el-option label="三年级" value="3" />
            <el-option label="四年级" value="4" />
            <el-option label="五年级" value="5" />
            <el-option label="六年级" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="className" v-if="currentModule === '学生'">
          <el-input v-model="formData.className" placeholder="请输入班级（如：1班）" />
        </el-form-item>
        
        <el-form-item label="职位" prop="position" v-if="currentModule === '教师'">
          <el-input v-model="formData.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="考勤状态" prop="attendance" v-if="currentModule === '教师'">
          <el-select v-model="formData.attendance" placeholder="请选择考勤状态">
            <el-option label="正常" value="normal" />
            <el-option label="请假" value="leave" />
            <el-option label="旷工" value="absent" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="btnLoading.savePerson">确定</el-button>
      </template>
    </el-dialog>

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

    <!-- 布置作业弹窗 -->
    <el-dialog
      v-model="homeworkDialogVisible"
      title="布置作业"
      width="700px"
      center
    >
      <el-form :model="homeworkForm" :rules="homeworkRules" ref="homeworkFormRef" label-width="100px">
        <el-form-item label="作业名称" prop="name">
          <el-input v-model="homeworkForm.name" placeholder="请输入作业名称" />
        </el-form-item>
        <el-form-item label="所属课程" prop="course">
          <el-select v-model="homeworkForm.course" placeholder="请选择课程">
            <el-option label="语文" value="chinese" />
            <el-option label="数学" value="math" />
            <el-option label="英语" value="english" />
            <el-option label="科学" value="science" />
            <el-option label="体育" value="pe" />
          </el-select>
        </el-form-item>
        <el-form-item label="作业内容" prop="content">
          <el-input type="textarea" v-model="homeworkForm.content" rows="4" placeholder="请输入作业内容" />
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker
            v-model="homeworkForm.deadline"
            type="datetime"
            placeholder="选择截止时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="适用班级" prop="classes">
          <el-select v-model="homeworkForm.classes" multiple placeholder="请选择班级">
            <el-option label="一年级1班" value="1-1" />
            <el-option label="一年级2班" value="1-2" />
            <el-option label="二年级1班" value="2-1" />
            <el-option label="二年级2班" value="2-2" />
            <el-option label="三年级1班" value="3-1" />
            <el-option label="三年级2班" value="3-2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="homeworkDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveHomework" :loading="btnLoading.saveHomework">发布作业</el-button>
      </template>
    </el-dialog>

    <!-- 班级通知弹窗 -->
    <el-dialog
      v-model="noticeDialogVisible"
      title="发布班级通知"
      width="600px"
      center
    >
      <el-form :model="noticeForm" :rules="noticeRules" ref="noticeFormRef" label-width="100px">
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="noticeForm.title" placeholder="请输入通知标题" />
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input type="textarea" v-model="noticeForm.content" rows="4" placeholder="请输入通知内容" />
        </el-form-item>
        <el-form-item label="接收班级" prop="classes">
          <el-select v-model="noticeForm.classes" multiple placeholder="请选择班级">
            <el-option label="一年级1班" value="1-1" />
            <el-option label="一年级2班" value="1-2" />
            <el-option label="二年级1班" value="2-1" />
            <el-option label="二年级2班" value="2-2" />
            <el-option label="三年级1班" value="3-1" />
            <el-option label="三年级2班" value="3-2" />
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度" prop="level">
          <el-radio-group v-model="noticeForm.level">
            <el-radio value="普通" />
            <el-radio value="重要" />
            <el-radio value="紧急" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="noticeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNotice" :loading="btnLoading.saveNotice">发布通知</el-button>
      </template>
    </el-dialog>

    <!-- 作业编辑弹窗 -->
    <el-dialog
      v-model="homeworkEditDialogVisible"
      :title="homeworkEditForm.id ? '编辑作业' : '新增作业'"
      width="600px"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="homeworkEditForm" :rules="homeworkRules" ref="homeworkFormRef" label-width="100px">
        <el-form-item label="作业名称" prop="name">
          <el-input v-model="homeworkEditForm.name" placeholder="请输入作业名称" />
        </el-form-item>
        <el-form-item label="课程" prop="course">
          <el-select v-model="homeworkEditForm.course" placeholder="请选择课程">
            <el-option label="语文" value="chinese" />
            <el-option label="数学" value="math" />
            <el-option label="英语" value="english" />
            <el-option label="科学" value="science" />
          </el-select>
        </el-form-item>
        <el-form-item label="作业内容" prop="content">
          <el-input type="textarea" v-model="homeworkEditForm.content" rows="4" placeholder="请输入作业内容" />
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker
            v-model="homeworkEditForm.deadline"
            type="datetime"
            placeholder="请选择截止时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="班级" prop="classes">
          <el-select v-model="homeworkEditForm.classes" multiple placeholder="请选择班级">
            <el-option label="1班" value="1班" />
            <el-option label="2班" value="2班" />
            <el-option label="3班" value="3班" />
            <el-option label="4班" value="4班" />
            <el-option label="5班" value="5班" />
            <el-option label="6班" value="6班" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="homeworkEditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveHomework" :loading="btnLoading.saveHomework">保存</el-button>
      </template>
    </el-dialog>

    <!-- 作业批改弹窗 -->
    <el-dialog
      v-model="homeworkGradeDialogVisible"
      title="作业批改"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <div v-if="currentHomeworkDetail" class="homework-detail-info">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="作业名称">{{ currentHomeworkDetail.name }}</el-descriptions-item>
          <el-descriptions-item label="课程">{{ getCourseName(currentHomeworkDetail.course) }}</el-descriptions-item>
          <el-descriptions-item label="班级">{{ currentHomeworkDetail.classes.join(', ') }}</el-descriptions-item>
          <el-descriptions-item label="截止时间">{{ currentHomeworkDetail.deadline }}</el-descriptions-item>
        </el-descriptions>
      </div>
      
      <el-table :data="homeworkGradeForm.submissions" border style="margin-top: 20px;">
        <el-table-column prop="studentName" label="学生姓名" width="120" />
        <el-table-column prop="score" label="分数" width="120">
          <template #default="{ row }">
            <el-input-number v-model="row.score" :min="0" :max="100" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="评语">
          <template #default="{ row }">
            <el-input v-model="row.comment" placeholder="请输入评语" size="small" />
          </template>
        </el-table-column>
      </el-table>
      
      <template #footer>
        <el-button @click="homeworkGradeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveHomeworkGrade">保存批改</el-button>
      </template>
    </el-dialog>

    <!-- 作业详情弹窗 -->
    <el-dialog
      v-model="homeworkDetailDialogVisible"
      title="作业详情"
      width="700px"
      center
    >
      <div v-if="currentHomeworkDetail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="作业ID">{{ currentHomeworkDetail.id }}</el-descriptions-item>
          <el-descriptions-item label="作业名称">{{ currentHomeworkDetail.name }}</el-descriptions-item>
          <el-descriptions-item label="课程">{{ getCourseName(currentHomeworkDetail.course) }}</el-descriptions-item>
          <el-descriptions-item label="班级">{{ currentHomeworkDetail.classes.join(', ') }}</el-descriptions-item>
          <el-descriptions-item label="截止时间">{{ currentHomeworkDetail.deadline }}</el-descriptions-item>
          <el-descriptions-item label="批改状态">
            <el-tag :type="currentHomeworkDetail.status === 'graded' ? 'success' : 'warning'">
              {{ currentHomeworkDetail.status === 'graded' ? '已批改' : '未批改' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="提交人数">{{ currentHomeworkDetail.submittedCount }} 人</el-descriptions-item>
          <el-descriptions-item label="完成率">
            <el-progress 
              :percentage="currentHomeworkDetail.completionRate" 
              size="small" 
              :color="getProgressColor(currentHomeworkDetail.completionRate)"
            />
          </el-descriptions-item>
          <el-descriptions-item label="平均分" :span="2">
            <span style="font-size: 24px; font-weight: bold; color: #667eea;">{{ currentHomeworkDetail.avgScore }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button type="primary" @click="homeworkDetailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 在线备课编辑弹窗 -->
    <el-dialog
      v-model="lessonDialogVisible"
      :title="lessonForm.id ? '编辑备课' : '创建备课'"
      width="700px"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="lessonForm" :rules="lessonRules" ref="lessonFormRef" label-width="100px">
        <el-form-item label="备课名称" prop="name">
          <el-input v-model="lessonForm.name" placeholder="请输入备课名称" />
        </el-form-item>
        <el-form-item label="课程" prop="course">
          <el-select v-model="lessonForm.course" placeholder="请选择课程">
            <el-option label="语文" value="chinese" />
            <el-option label="数学" value="math" />
            <el-option label="英语" value="english" />
            <el-option label="科学" value="science" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用年级" prop="grade">
          <el-select v-model="lessonForm.grade" placeholder="请选择年级">
            <el-option label="一年级" value="1" />
            <el-option label="二年级" value="2" />
            <el-option label="三年级" value="3" />
            <el-option label="四年级" value="4" />
            <el-option label="五年级" value="5" />
            <el-option label="六年级" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="备课内容" prop="content">
          <el-input type="textarea" v-model="lessonForm.content" rows="6" placeholder="请输入备课内容" />
        </el-form-item>
        <el-form-item label="教学目标" prop="objectives">
          <el-input type="textarea" v-model="lessonForm.objectives" rows="3" placeholder="请输入教学目标" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="lessonDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveLesson" :loading="btnLoading.saveLesson">保存</el-button>
      </template>
    </el-dialog>

    <!-- 教学计划编辑弹窗 -->
    <el-dialog
      v-model="planDialogVisible"
      :title="planForm.id ? '编辑计划' : '创建计划'"
      width="700px"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="planForm" :rules="planRules" ref="planFormRef" label-width="100px">
        <el-form-item label="计划名称" prop="name">
          <el-input v-model="planForm.name" placeholder="请输入计划名称" />
        </el-form-item>
        <el-form-item label="课程" prop="course">
          <el-select v-model="planForm.course" placeholder="请选择课程">
            <el-option label="语文" value="chinese" />
            <el-option label="数学" value="math" />
            <el-option label="英语" value="english" />
            <el-option label="科学" value="science" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用年级" prop="grade">
          <el-select v-model="planForm.grade" placeholder="请选择年级">
            <el-option label="一年级" value="1" />
            <el-option label="二年级" value="2" />
            <el-option label="三年级" value="3" />
            <el-option label="四年级" value="4" />
            <el-option label="五年级" value="5" />
            <el-option label="六年级" value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="planForm.startTime"
            type="date"
            placeholder="请选择开始时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="planForm.endTime"
            type="date"
            placeholder="请选择结束时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="计划内容" prop="content">
          <el-input type="textarea" v-model="planForm.content" rows="4" placeholder="请输入计划内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="planDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePlan" :loading="btnLoading.savePlan">保存</el-button>
      </template>
    </el-dialog>

    <!-- 成绩录入弹窗 -->
    <el-dialog
      v-model="scoreDialogVisible"
      title="成绩录入"
      width="600px"
      center
      :close-on-click-modal="false"
    >
      <el-form :model="scoreForm" :rules="scoreRules" ref="scoreFormRef" label-width="100px">
        <el-form-item label="学生" prop="studentId">
          <el-select v-model="scoreForm.studentId" placeholder="请选择学生">
            <el-option 
              v-for="student in studentData" 
              :key="student.id" 
              :label="student.name" 
              :value="student.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject">
          <el-select v-model="scoreForm.subject" placeholder="请选择科目">
            <el-option label="语文" value="chinese" />
            <el-option label="数学" value="math" />
            <el-option label="英语" value="english" />
          </el-select>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input-number v-model="scoreForm.score" :min="0" :max="100" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="考试类型" prop="examType">
          <el-radio-group v-model="scoreForm.examType">
            <el-radio value="单元测" />
            <el-radio value="期中" />
            <el-radio value="期末" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="scoreDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveScore" :loading="btnLoading.saveScore">保存成绩</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as XLSX from 'xlsx'
import * as echarts from 'echarts'

const STORAGE_KEYS = {
  TEACHER: 'mock_teachers',
  STUDENT: 'mock_students',
  SCORE: 'mock_scores',
  COURSE: 'mock_courses'
}

const DEFAULT_DATA = {
  teachers: [
    { id: 'T001', name: '张三', gender: 1, age: 35, phone: '13800138000', idCard: '110101198901011234', position: '数学教研组组长', attendance: 'normal' },
    { id: 'T002', name: '李四', gender: 2, age: 28, phone: '13900139000', idCard: '110101199602021234', position: '语文老师', attendance: 'normal' },
    { id: 'T003', name: '王五', gender: 1, age: 42, phone: '13700137000', idCard: '110101198203031234', position: '英语老师', attendance: 'leave' },
    { id: 'T004', name: '赵六', gender: 2, age: 31, phone: '13600136000', idCard: '110101199304041234', position: '科学老师', attendance: 'normal' },
    { id: 'T005', name: '钱七', gender: 1, age: 38, phone: '13500135000', idCard: '110101198605051234', position: '体育老师', attendance: 'absent' },
    { id: 'T006', name: '孙八', gender: 2, age: 29, phone: '13400134000', idCard: '110101199506061234', position: '美术老师', attendance: 'normal' }
  ],
  students: [
    { id: 'S001', name: '小明', gender: 1, age: 10, phone: '13811111111', idCard: '110101201403031234', grade: '3', className: '3班' },
    { id: 'S002', name: '小红', gender: 2, age: 9, phone: '13822222222', idCard: '110101201504041234', grade: '2', className: '2班' },
    { id: 'S003', name: '小刚', gender: 1, age: 11, phone: '13833333333', idCard: '110101201305051234', grade: '4', className: '4班' },
    { id: 'S004', name: '小丽', gender: 2, age: 8, phone: '13844444444', idCard: '110101201606061234', grade: '1', className: '1班' },
    { id: 'S005', name: '小亮', gender: 1, age: 12, phone: '13855555555', idCard: '110101201207071234', grade: '5', className: '5班' },
    { id: 'S006', name: '小美', gender: 2, age: 10, phone: '13866666666', idCard: '110101201408081234', grade: '3', className: '3班' },
    { id: 'S007', name: '小军', gender: 1, age: 9, phone: '13877777777', idCard: '110101201509091234', grade: '2', className: '2班' },
    { id: 'S008', name: '小雅', gender: 2, age: 11, phone: '13888888888', idCard: '110101201310101234', grade: '4', className: '4班' },
    { id: 'S009', name: '小虎', gender: 1, age: 8, phone: '13899999999', idCard: '110101201611111234', grade: '1', className: '1班' },
    { id: 'S010', name: '小婷', gender: 2, age: 12, phone: '13800000000', idCard: '110101201212121234', grade: '5', className: '5班' }
  ],
  courses: [
    { id: 'C001', name: '三年级数学上册', type: 'math', grade: '3', teacher: '张三', hour: 40, status: 'published', studentCount: 45, completionRate: 85, avgScore: 88, excellentRate: 35 },
    { id: 'C002', name: '二年级语文下册', type: 'chinese', grade: '2', teacher: '李四', hour: 36, status: 'draft', studentCount: 38, completionRate: 78, avgScore: 82, excellentRate: 25 },
    { id: 'C003', name: '四年级英语基础', type: 'english', grade: '4', teacher: '王五', hour: 45, status: 'published', studentCount: 28, completionRate: 92, avgScore: 90, excellentRate: 45 },
    { id: 'C004', name: '五年级科学实验', type: 'science', grade: '5', teacher: '赵六', hour: 30, status: 'draft', studentCount: 0, completionRate: 0, avgScore: 0, excellentRate: 0 },
    { id: 'C005', name: '三年级体育健康', type: 'pe', grade: '3', teacher: '钱七', hour: 20, status: 'offline', studentCount: 15, completionRate: 65, avgScore: 75, excellentRate: 10 }
  ]
}

const router = useRouter()

const isCollapse = ref(false)
const autoRefresh = ref(false)
const currentModule = ref('教师')
const currentMenu = ref('3-1')
const selectedItems = ref([])
const loading = ref(false)
let refreshTimer = null

const btnLoading = reactive({
  back: false, add: false, homework: false, notice: false,
  batchDel: false, search: false, reset: false, edit: false,
  del: false, savePerson: false, saveHomework: false, saveNotice: false,
  export: false, saveScore: false, saveLesson: false, savePlan: false
})

const dialogVisible = ref(false)
const homeworkDialogVisible = ref(false)
const noticeDialogVisible = ref(false)
const scoreDialogVisible = ref(false)
const lessonDialogVisible = ref(false)
const planDialogVisible = ref(false)

const formRef = ref(null)
const homeworkFormRef = ref(null)
const noticeFormRef = ref(null)
const scoreFormRef = ref(null)
const lessonFormRef = ref(null)
const planFormRef = ref(null)

const searchForm = reactive({
  name: '',
  classId: '',
  grade: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const teacherData = ref([])
const studentData = ref([])
const scoreData = ref([])

const tableData = ref([])

const formData = reactive({
  id: '', name: '', gender: '1', age: null,
  phone: '', idCard: '', position: '',
  grade: '', className: '', attendance: 'normal'
})

const homeworkForm = reactive({
  name: '', course: '', content: '', deadline: '', classes: []
})

const noticeForm = reactive({
  title: '', content: '', classes: [], level: '普通'
})

const scoreForm = reactive({
  studentId: '',
  subject: '',
  score: null,
  examType: '单元测'
})

const formRules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式错误', trigger: 'blur' }
  ],
  age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
  className: [{ required: true, message: '请输入班级', trigger: 'blur' }],
  attendance: [{ required: true, message: '请选择考勤状态', trigger: 'change' }]
})

const homeworkRules = reactive({
  name: [{ required: true, message: '请输入作业名称', trigger: 'blur' }],
  course: [{ required: true, message: '请选择课程', trigger: 'change' }],
  content: [{ required: true, message: '请输入作业内容', trigger: 'blur' }],
  deadline: [{ required: true, message: '请选择截止时间', trigger: 'change' }],
  classes: [{ required: true, message: '请选择班级', trigger: 'change' }]
})

const noticeRules = reactive({
  title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }],
  classes: [{ required: true, message: '请选择接收班级', trigger: 'change' }]
})

const scoreRules = reactive({
  studentId: [{ required: true, message: '请选择学生', trigger: 'change' }],
  subject: [{ required: true, message: '请选择科目', trigger: 'change' }],
  score: [{ required: true, message: '请输入分数', trigger: 'change' }]
})

// 课程管理相关数据
const courseLoading = ref(false)
const selectedCourses = ref([])
const courseData = ref([])
const courseList = ref([])
const coursePagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})
const courseSearchForm = reactive({
  name: '',
  type: '',
  status: ''
})
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
const courseRules = reactive({
  name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择课程类型', trigger: 'change' }],
  grade: [{ required: true, message: '请选择适用年级', trigger: 'change' }],
  teacher: [{ required: true, message: '请输入授课教师姓名', trigger: 'blur' }],
  hour: [{ required: true, message: '请输入课时数', trigger: 'change' }]
})

// 作业管理相关数据
const homeworkLoading = ref(false)
const selectedHomeworks = ref([])
const homeworkData = ref([])
const homeworkList = ref([])
const homeworkPagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})
const homeworkSearchForm = reactive({
  name: '',
  course: '',
  status: ''
})
const homeworkEditDialogVisible = ref(false)
const homeworkGradeDialogVisible = ref(false)
const homeworkDetailDialogVisible = ref(false)
const currentHomeworkDetail = ref(null)
const homeworkEditForm = reactive({
  id: '',
  name: '',
  course: '',
  content: '',
  deadline: '',
  classes: []
})
const homeworkGradeForm = reactive({
  homeworkId: '',
  submissions: []
})

// 教学工具相关数据
const teachingToolLoading = ref(false)
const selectedTeachingTools = ref([])
const teachingToolData = ref([])
const teachingToolList = ref([])
const teachingToolPagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})
const teachingToolSearchForm = reactive({
  name: '',
  course: '',
  type: '',
  status: ''
})
const lessonForm = reactive({
  id: '',
  name: '',
  course: '',
  grade: '',
  content: '',
  objectives: ''
})
const planForm = reactive({
  id: '',
  name: '',
  course: '',
  grade: '',
  startTime: '',
  endTime: '',
  content: ''
})
const lessonRules = reactive({
  name: [{ required: true, message: '请输入备课名称', trigger: 'blur' }],
  course: [{ required: true, message: '请选择课程', trigger: 'change' }],
  grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
  content: [{ required: true, message: '请输入备课内容', trigger: 'blur' }],
  objectives: [{ required: true, message: '请输入教学目标', trigger: 'blur' }]
})
const planRules = reactive({
  name: [{ required: true, message: '请输入计划名称', trigger: 'blur' }],
  course: [{ required: true, message: '请选择课程', trigger: 'change' }],
  grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
  content: [{ required: true, message: '请输入计划内容', trigger: 'blur' }]
})

// 默认作业数据
const DEFAULT_HOMEWORKS = [
  { id: 'HW001', name: '第一章练习', course: 'math', classes: ['1班', '2班'], deadline: '2024-02-15 23:59', status: 'pending', submittedCount: 45, totalStudents: 50, completionRate: 90, avgScore: 85 },
  { id: 'HW002', name: '英语单词听写', course: 'english', classes: ['3班'], deadline: '2024-02-16 23:59', status: 'graded', submittedCount: 30, totalStudents: 35, completionRate: 86, avgScore: 78 },
  { id: 'HW003', name: '语文阅读理解', course: 'chinese', classes: ['1班', '2班', '3班'], deadline: '2024-02-17 23:59', status: 'pending', submittedCount: 80, totalStudents: 100, completionRate: 80, avgScore: 82 },
  { id: 'HW004', name: '科学实验报告', course: 'science', classes: ['4班'], deadline: '2024-02-18 23:59', status: 'graded', submittedCount: 25, totalStudents: 30, completionRate: 83, avgScore: 88 },
  { id: 'HW005', name: '数学综合测试', course: 'math', classes: ['5班', '6班'], deadline: '2024-02-19 23:59', status: 'pending', submittedCount: 55, totalStudents: 60, completionRate: 92, avgScore: 90 }
]

// 默认在线备课数据
const DEFAULT_LESSONS = [
  { id: 'L001', name: '第一章数学备课', course: 'math', grade: '3', content: '第一章内容...', objectives: '掌握基础运算', createTime: '2024-01-15 10:00' },
  { id: 'L002', name: '英语单词教学', course: 'english', grade: '4', content: '单词记忆方法...', objectives: '掌握50个单词', createTime: '2024-01-16 14:00' },
  { id: 'L003', name: '语文阅读课', course: 'chinese', grade: '2', content: '阅读理解技巧...', objectives: '提高阅读能力', createTime: '2024-01-17 09:00' }
]

// 默认资源库数据
const DEFAULT_RESOURCES = [
  { id: 'R001', name: '数学课件.pptx', type: 'document', size: '2.5MB', uploadTime: '2024-01-10 15:30' },
  { id: 'R002', name: '英语听力.mp3', type: 'audio', size: '5.8MB', uploadTime: '2024-01-11 10:20' },
  { id: 'R003', name: '科学实验视频.mp4', type: 'video', size: '128MB', uploadTime: '2024-01-12 16:45' },
  { id: 'R004', name: '教学图片.jpg', type: 'image', size: '1.2MB', uploadTime: '2024-01-13 11:15' },
  { id: 'R005', name: '语文教案.docx', type: 'document', size: '0.8MB', uploadTime: '2024-01-14 09:30' }
]

// 默认教学计划数据
const DEFAULT_PLANS = [
  { id: 'P001', name: '第一学期教学计划', course: 'math', grade: '3', startTime: '2024-02-01', endTime: '2024-06-30', content: '完成第一章到第五章教学', status: 'ongoing', progress: 45 },
  { id: 'P002', name: '英语教学计划', course: 'english', grade: '4', startTime: '2024-02-01', endTime: '2024-06-30', content: '完成单词和语法教学', status: 'ongoing', progress: 60 },
  { id: 'P003', name: '语文阅读计划', course: 'chinese', grade: '2', startTime: '2024-01-01', endTime: '2024-01-31', content: '完成阅读理解训练', status: 'completed', progress: 100 },
  { id: 'P004', name: '科学实验计划', course: 'science', grade: '5', startTime: '2024-02-15', endTime: '2024-03-15', content: '完成基础实验', status: 'delayed', progress: 30 }
]

const courseDetailVisible = ref(false)
const currentCourseDetail = ref(null)
const chartVisible = ref(false)
let studentCountChart = null
let completionRateChart = null

const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    ElMessage.warning('本地存储读取失败，使用默认数据')
    return null
  }
}

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    ElMessage.warning('本地存储保存失败')
  }
}

const initMockData = () => {
  const savedTeachers = loadFromStorage(STORAGE_KEYS.TEACHER)
  teacherData.value = savedTeachers || [...DEFAULT_DATA.teachers]
  saveToStorage(STORAGE_KEYS.TEACHER, teacherData.value)

  const savedStudents = loadFromStorage(STORAGE_KEYS.STUDENT)
  studentData.value = savedStudents || [...DEFAULT_DATA.students]
  saveToStorage(STORAGE_KEYS.STUDENT, studentData.value)

  const savedScores = loadFromStorage(STORAGE_KEYS.SCORE)
  scoreData.value = savedScores || []
  saveToStorage(STORAGE_KEYS.SCORE, scoreData.value)

  const savedCourses = loadFromStorage(STORAGE_KEYS.COURSE)
  courseData.value = savedCourses || [...DEFAULT_DATA.courses]
  saveToStorage(STORAGE_KEYS.COURSE, courseData.value)

  const savedHomeworks = loadFromStorage('mock_homeworks')
  homeworkData.value = savedHomeworks || [...DEFAULT_HOMEWORKS]
  saveToStorage('mock_homeworks', homeworkData.value)

  const savedLessons = loadFromStorage('mock_lessons')
  teachingToolData.value = savedLessons || [...DEFAULT_LESSONS]
  saveToStorage('mock_lessons', teachingToolData.value)

  const savedResources = loadFromStorage('mock_resources')
  const savedResourcesData = savedResources || [...DEFAULT_RESOURCES]
  teachingToolData.value = [...teachingToolData.value, ...savedResourcesData]
  saveToStorage('mock_resources', savedResourcesData)

  const savedPlans = loadFromStorage('mock_plans')
  const savedPlansData = savedPlans || [...DEFAULT_PLANS]
  teachingToolData.value = [...teachingToolData.value, ...savedPlansData]
  saveToStorage('mock_plans', savedPlansData)

  ElMessage.info('数据初始化完成（本地模拟模式）')
}

const fetchData = async () => {
  loading.value = true
  try {
    const rawData = currentModule.value === '教师' 
      ? [...teacherData.value] 
      : [...studentData.value]

    const filteredData = rawData.filter(item => {
      let match = true
      if (searchForm.name) {
        match = match && item.name.includes(searchForm.name)
      }
      if (searchForm.grade) {
        match = match && item.grade === searchForm.grade
      }
      return match
    })

    pagination.total = filteredData.length
    const startIndex = (pagination.page - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    const paginatedData = filteredData.slice(startIndex, endIndex)

    tableData.value = paginatedData.map(item => formatTableItem(item))
  } catch (error) {
    ElMessage.error(`数据加载失败：${error.message}`)
    tableData.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

const formatTableItem = (item) => {
  const baseItem = {
    id: item.id || '',
    name: item.name || '',
    gender: item.gender || 0,
    age: item.age || '',
    phone: item.phone || '',
    idCard: item.idCard || ''
  }

  if (currentModule.value === '学生') {
    return {
      ...baseItem,
      grade: item.grade || '',
      className: item.className || ''
    }
  }

  return {
    ...baseItem,
    position: item.position || '',
    attendance: item.attendance || 'normal'
  }
}

const handleAdd = () => {
  Object.assign(formData, {
    id: '', name: '', gender: '1', age: null,
    phone: '', idCard: '', position: '',
    grade: '', className: '', attendance: 'normal'
  })

  nextTick(() => {
    dialogVisible.value = true
    formRef.value?.clearValidate()
    ElMessage.info(`开始新增${currentModule.value}`)
  })
}

const handleEdit = (row) => {
  if (!row.id) {
    ElMessage.warning('数据ID为空，无法编辑')
    return
  }

  btnLoading.edit = true
  try {
    Object.assign(formData, {
      id: row.id,
      name: row.name,
      gender: row.gender?.toString() || '1',
      age: row.age,
      phone: row.phone,
      idCard: row.idCard,
      grade: row.grade || '',
      className: row.className || '',
      position: row.position || '',
      attendance: row.attendance || 'normal'
    })

    nextTick(() => {
      dialogVisible.value = true
      formRef.value?.clearValidate()
      btnLoading.edit = false
    })
  } catch (error) {
    ElMessage.error(`编辑数据加载失败：${error.message}`)
    btnLoading.edit = false
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定删除${currentModule.value}【${row.name}】？`,
      '确认删除',
      { type: 'warning', confirmButtonText: '确认', cancelButtonText: '取消' }
    )

    btnLoading.del = true
    if (currentModule.value === '教师') {
      teacherData.value = teacherData.value.filter(item => item.id !== row.id)
      saveToStorage(STORAGE_KEYS.TEACHER, teacherData.value)
    } else {
      studentData.value = studentData.value.filter(item => item.id !== row.id)
      saveToStorage(STORAGE_KEYS.STUDENT, studentData.value)
    }

    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败：${error.message}`)
    }
  } finally {
    btnLoading.del = false
  }
}

const handleBatchDelete = async () => {
  if (selectedItems.value.length === 0) {
    ElMessage.warning('请选择要删除的记录')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定删除选中的${selectedItems.value.length}条${currentModule.value}记录？`,
      '批量删除',
      { type: 'warning', confirmButtonText: '确认', cancelButtonText: '取消' }
    )

    btnLoading.batchDel = true
    const idsToDelete = selectedItems.value.map(item => item.id)

    if (currentModule.value === '教师') {
      teacherData.value = teacherData.value.filter(item => !idsToDelete.includes(item.id))
      saveToStorage(STORAGE_KEYS.TEACHER, teacherData.value)
    } else {
      studentData.value = studentData.value.filter(item => !idsToDelete.includes(item.id))
      saveToStorage(STORAGE_KEYS.STUDENT, studentData.value)
    }

    ElMessage.success('批量删除成功')
    selectedItems.value = []
    fetchData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`批量删除失败：${error.message}`)
    }
  } finally {
    btnLoading.batchDel = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) {
    ElMessage.error('表单初始化异常')
    return
  }

  let isValid = false
  try {
    await formRef.value.validate()
    isValid = true
  } catch (error) {
    ElMessage.warning('请完善表单必填项')
    return
  }

  if (!isValid) return

  btnLoading.savePerson = true
  try {
    const submitData = {
      id: formData.id,
      name: formData.name,
      gender: parseInt(formData.gender),
      age: formData.age,
      phone: formData.phone,
      idCard: formData.idCard
    }

    if (currentModule.value === '教师') {
      submitData.position = formData.position
      submitData.attendance = formData.attendance
    } else {
      submitData.grade = formData.grade
      submitData.className = formData.className
    }

    if (formData.id) {
      const targetData = currentModule.value === '教师' ? teacherData.value : studentData.value
      const index = targetData.findIndex(item => item.id === formData.id)
      if (index > -1) {
        targetData[index] = { ...targetData[index], ...submitData }
        saveToStorage(currentModule.value === '教师' ? STORAGE_KEYS.TEACHER : STORAGE_KEYS.STUDENT, targetData)
        ElMessage.success('更新成功')
      }
    } else {
      const targetData = currentModule.value === '教师' ? teacherData.value : studentData.value
      const prefix = currentModule.value === '教师' ? 'T' : 'S'
      const maxId = targetData.reduce((max, item) => {
        const num = parseInt(item.id.slice(1))
        return num > max ? num : max
      }, 0)
      submitData.id = `${prefix}${String(maxId + 1).padStart(3, '0')}`
      targetData.unshift(submitData)
      saveToStorage(currentModule.value === '教师' ? STORAGE_KEYS.TEACHER : STORAGE_KEYS.STUDENT, targetData)
      ElMessage.success('创建成功')
    }

    dialogVisible.value = false
    fetchData()
  } catch (error) {
    ElMessage.error(`操作失败：${error.message}`)
  } finally {
    btnLoading.savePerson = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const handleReset = () => {
  searchForm.name = ''
  searchForm.classId = ''
  searchForm.grade = ''
  handleSearch()
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
  fetchData()
}

const handleCurrentChange = (page) => {
  pagination.page = page
  fetchData()
}

const handleSelectionChange = (val) => {
  selectedItems.value = val
}

const switchModule = () => {
  selectedItems.value = []
  handleReset()
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleMenuSelect = (index) => {
  currentMenu.value = index
  
  if (index.startsWith('1-')) {
    coursePagination.page = 1
    resetCourseSearch()
    loadCourseData()
  } else if (index.startsWith('2-')) {
    homeworkPagination.page = 1
    resetHomeworkSearch()
    loadHomeworkData()
  } else if (index.startsWith('4-')) {
    teachingToolPagination.page = 1
    resetTeachingToolSearch()
    loadTeachingToolData()
  } else {
    switch (index) {
      case '3-1':
        currentModule.value = '教师'
        switchModule()
        break
      case '3-2':
        currentModule.value = '学生'
        switchModule()
        break
      case '3-3':
        noticeDialogVisible.value = true
        break
      case '5-1':
        scoreDialogVisible.value = true
        break
      case '5-2':
        ElMessage.info('成绩统计功能已触发，可扩展表格展示成绩分布')
        break
      default:
        ElMessage.info('该功能正在开发中')
    }
  }
}

const handleRefreshChange = (isOpen) => {
  if (isOpen) {
    refreshTimer = setInterval(fetchData, 5000)
    ElMessage.success('已开启自动刷新（5秒/次）')
  } else {
    clearInterval(refreshTimer)
    ElMessage.success('已关闭自动刷新')
  }
}

const goBack = () => {
  btnLoading.back = true
  setTimeout(() => {
    try {
      router.push('/home')
    } catch (error) {
      ElMessage.warning(`返回首页失败：${error.message}`)
    } finally {
      btnLoading.back = false
    }
  }, 800)
}

const openAssignHomework = () => {
  homeworkDialogVisible.value = true
}

const openClassNotice = () => {
  noticeDialogVisible.value = true
}

const saveHomework = async () => {
  try {
    await homeworkFormRef.value.validate()
    btnLoading.saveHomework = true
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (homeworkEditDialogVisible.value) {
      const submitData = {
        id: homeworkEditForm.id,
        name: homeworkEditForm.name,
        course: homeworkEditForm.course,
        content: homeworkEditForm.content,
        deadline: homeworkEditForm.deadline,
        classes: homeworkEditForm.classes,
        status: 'pending',
        submittedCount: 0,
        totalStudents: homeworkEditForm.classes.length * 10,
        completionRate: 0,
        avgScore: 0
      }
      
      if (homeworkEditForm.id) {
        const index = homeworkData.value.findIndex(item => item.id === homeworkEditForm.id)
        if (index > -1) {
          homeworkData.value[index] = { ...homeworkData.value[index], ...submitData }
          ElMessage.success('作业更新成功')
        }
      } else {
        const maxId = homeworkData.value.reduce((max, item) => {
          const num = parseInt(item.id.slice(2))
          return num > max ? num : max
        }, 0)
        submitData.id = `HW${String(maxId + 1).padStart(3, '0')}`
        homeworkData.value.unshift(submitData)
        ElMessage.success('作业创建成功')
      }
      
      saveToStorage('mock_homeworks', homeworkData.value)
      homeworkEditDialogVisible.value = false
      loadHomeworkData()
    } else {
      ElMessage.success('作业发布成功（模拟）')
      homeworkDialogVisible.value = false
      Object.assign(homeworkForm, { name: '', course: '', content: '', deadline: '', classes: [] })
    }
  } catch (error) {
    ElMessage.warning('请完善作业信息')
  } finally {
    btnLoading.saveHomework = false
  }
}

const saveHomeworkGrade = async () => {
  try {
    btnLoading.saveHomework = true
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const homeworkIndex = homeworkData.value.findIndex(item => item.id === homeworkGradeForm.homeworkId)
    if (homeworkIndex > -1) {
      homeworkData.value[homeworkIndex].status = 'graded'
      const totalScore = homeworkGradeForm.submissions.reduce((sum, item) => sum + item.score, 0)
      homeworkData.value[homeworkIndex].avgScore = Math.round(totalScore / homeworkGradeForm.submissions.length)
      saveToStorage('mock_homeworks', homeworkData.value)
    }
    
    ElMessage.success('批改保存成功')
    homeworkGradeDialogVisible.value = false
    loadHomeworkData()
  } catch (error) {
    ElMessage.error(`批改保存失败：${error.message}`)
  } finally {
    btnLoading.saveHomework = false
  }
}

const saveNotice = async () => {
  try {
    await noticeFormRef.value.validate()
    btnLoading.saveNotice = true
    await new Promise(resolve => setTimeout(resolve, 800))
    ElMessage.success('通知发布成功（模拟）')
    noticeDialogVisible.value = false
    Object.assign(noticeForm, { title: '', content: '', classes: [], level: '普通' })
  } catch (error) {
    ElMessage.warning('请完善通知信息')
  } finally {
    btnLoading.saveNotice = false
  }
}

const saveScore = async () => {
  try {
    await scoreFormRef.value.validate()
    btnLoading.saveScore = true
    await new Promise(resolve => setTimeout(resolve, 800))
    const newScore = {
      id: Date.now().toString(),
      studentId: scoreForm.studentId,
      subject: scoreForm.subject,
      score: scoreForm.score,
      examType: scoreForm.examType,
      createTime: new Date().toISOString()
    }
    scoreData.value.unshift(newScore)
    saveToStorage(STORAGE_KEYS.SCORE, scoreData.value)
    ElMessage.success('成绩保存成功')
    scoreDialogVisible.value = false
    Object.assign(scoreForm, { studentId: '', subject: '', score: null, examType: '单元测' })
  } catch (error) {
    ElMessage.warning('请完善成绩信息')
  } finally {
    btnLoading.saveScore = false
  }
}

const exportTableData = () => {
  try {
    const sheetName = `${currentModule.value}列表_${new Date().toLocaleDateString()}`.replace(/[\/\\\*\?\[\]]/g, '')
    const ws = XLSX.utils.json_to_sheet(tableData.value)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    XLSX.writeFile(wb, `${sheetName}.xlsx`)
    ElMessage.success(`${currentModule.value}数据导出成功！`)
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  }
}

// 课程管理相关方法
const getCoursePageTitle = () => {
  switch (currentMenu.value) {
    case '1-1':
      return '创建课程'
    case '1-2':
      return '发布课程'
    case '1-3':
      return '课程数据'
    default:
      return '课程管理'
  }
}

// 作业管理相关方法
const getHomeworkPageTitle = () => {
  switch (currentMenu.value) {
    case '2-1':
      return '布置作业'
    case '2-2':
      return '作业批改'
    case '2-3':
      return '作业统计'
    default:
      return '作业管理'
  }
}

const getCourseName = (course) => {
  const courseMap = {
    chinese: '语文',
    math: '数学',
    english: '英语',
    science: '科学'
  }
  return courseMap[course] || '未知'
}

const getCourseTagType = (course) => {
  const courseMap = {
    chinese: 'primary',
    math: 'success',
    english: 'warning',
    science: 'danger'
  }
  return courseMap[course] || 'info'
}

const loadHomeworkData = () => {
  homeworkLoading.value = true
  setTimeout(() => {
    const rawData = [...homeworkData.value]
    
    const filteredData = rawData.filter(item => {
      let match = true
      if (homeworkSearchForm.name) {
        match = match && item.name.includes(homeworkSearchForm.name)
      }
      if (homeworkSearchForm.course) {
        match = match && item.course === homeworkSearchForm.course
      }
      if (homeworkSearchForm.status) {
        match = match && item.status === homeworkSearchForm.status
      }
      return match
    })

    homeworkPagination.total = filteredData.length
    const start = (homeworkPagination.page - 1) * homeworkPagination.pageSize
    const end = start + homeworkPagination.pageSize
    homeworkList.value = filteredData.slice(start, end)
    
    homeworkLoading.value = false
  }, 500)
}

const handleHomeworkSelect = (selection) => {
  selectedHomeworks.value = selection
}

const handleHomeworkSizeChange = (size) => {
  homeworkPagination.pageSize = size
  loadHomeworkData()
}

const handleHomeworkCurrentChange = (page) => {
  homeworkPagination.page = page
  loadHomeworkData()
}

const searchHomework = () => {
  homeworkPagination.page = 1
  loadHomeworkData()
}

const resetHomeworkSearch = () => {
  homeworkSearchForm.name = ''
  homeworkSearchForm.course = ''
  homeworkSearchForm.status = ''
  searchHomework()
}

const loadTeachingToolData = () => {
  teachingToolLoading.value = true
  setTimeout(() => {
    let rawData = []
    
    if (currentMenu.value === '4-1') {
      rawData = teachingToolData.value.filter(item => item.id.startsWith('L'))
    } else if (currentMenu.value === '4-2') {
      rawData = teachingToolData.value.filter(item => item.id.startsWith('R'))
    } else if (currentMenu.value === '4-3') {
      rawData = teachingToolData.value.filter(item => item.id.startsWith('P'))
    }
    
    const filteredData = rawData.filter(item => {
      let match = true
      if (teachingToolSearchForm.name) {
        match = match && item.name.includes(teachingToolSearchForm.name)
      }
      if (teachingToolSearchForm.course && currentMenu.value !== '4-2') {
        match = match && item.course === teachingToolSearchForm.course
      }
      if (teachingToolSearchForm.type && currentMenu.value === '4-2') {
        match = match && item.type === teachingToolSearchForm.type
      }
      if (teachingToolSearchForm.status && currentMenu.value === '4-3') {
        match = match && item.status === teachingToolSearchForm.status
      }
      return match
    })

    teachingToolPagination.total = filteredData.length
    const start = (teachingToolPagination.page - 1) * teachingToolPagination.pageSize
    const end = start + teachingToolPagination.pageSize
    teachingToolList.value = filteredData.slice(start, end)
    
    teachingToolLoading.value = false
  }, 500)
}

const handleTeachingToolSelect = (selection) => {
  selectedTeachingTools.value = selection
}

const handleTeachingToolSizeChange = (size) => {
  teachingToolPagination.pageSize = size
  loadTeachingToolData()
}

const handleTeachingToolCurrentChange = (page) => {
  teachingToolPagination.page = page
  loadTeachingToolData()
}

const searchTeachingTool = () => {
  teachingToolPagination.page = 1
  loadTeachingToolData()
}

const resetTeachingToolSearch = () => {
  teachingToolSearchForm.name = ''
  teachingToolSearchForm.course = ''
  teachingToolSearchForm.type = ''
  teachingToolSearchForm.status = ''
  searchTeachingTool()
}

const getTeachingToolPageTitle = () => {
  if (currentMenu.value === '4-1') return '在线备课'
  if (currentMenu.value === '4-2') return '资源库'
  if (currentMenu.value === '4-3') return '教学计划'
  return ''
}

const getResourceTagType = (type) => {
  const typeMap = {
    document: 'primary',
    video: 'success',
    audio: 'warning',
    image: 'info'
  }
  return typeMap[type] || 'info'
}

const getResourceTypeName = (type) => {
  const typeMap = {
    document: '文档',
    video: '视频',
    audio: '音频',
    image: '图片'
  }
  return typeMap[type] || type
}

const getProgressColor = (progress) => {
  if (progress < 30) return '#f56c6c'
  if (progress < 70) return '#e6a23c'
  return '#67c23a'
}

const openLessonDialog = () => {
  Object.assign(lessonForm, {
    id: '',
    name: '',
    course: '',
    grade: '',
    content: '',
    objectives: ''
  })
  lessonDialogVisible.value = true
}

const editLesson = (row) => {
  Object.assign(lessonForm, {
    id: row.id,
    name: row.name,
    course: row.course,
    grade: row.grade,
    content: row.content,
    objectives: row.objectives
  })
  lessonDialogVisible.value = true
}

const viewLesson = (row) => {
  ElMessageBox.alert(`
    <div style="text-align: left;">
      <p><strong>备课名称：</strong>${row.name}</p>
      <p><strong>课程：</strong>${getCourseName(row.course)}</p>
      <p><strong>适用年级：</strong>${row.grade}年级</p>
      <p><strong>教学目标：</strong>${row.objectives}</p>
      <p><strong>备课内容：</strong>${row.content}</p>
      <p><strong>创建时间：</strong>${row.createTime}</p>
    </div>
  `, '备课详情', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '关闭'
  })
}

const saveLesson = () => {
  lessonFormRef.value.validate((valid) => {
    if (valid) {
      btnLoading.saveLesson = true
      setTimeout(() => {
        if (lessonForm.id) {
          const index = teachingToolData.value.findIndex(item => item.id === lessonForm.id)
          if (index !== -1) {
            teachingToolData.value[index] = { ...lessonForm }
          }
          ElMessage.success('备课更新成功')
        } else {
          const newLesson = {
            ...lessonForm,
            id: `L${String(Date.now()).slice(-6)}`,
            createTime: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
          }
          teachingToolData.value.unshift(newLesson)
          ElMessage.success('备课创建成功')
        }
        saveToStorage('mock_lessons', teachingToolData.value.filter(item => item.id.startsWith('L')))
        lessonDialogVisible.value = false
        btnLoading.saveLesson = false
        loadTeachingToolData()
      }, 500)
    }
  })
}

const deleteLesson = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除备课"${row.name}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    teachingToolData.value = teachingToolData.value.filter(item => item.id !== row.id)
    saveToStorage('mock_lessons', teachingToolData.value.filter(item => item.id.startsWith('L')))
    ElMessage.success('删除成功')
    loadTeachingToolData()
  } catch (error) {
    console.log('取消删除')
  }
}

const openPlanDialog = () => {
  Object.assign(planForm, {
    id: '',
    name: '',
    course: '',
    grade: '',
    startTime: '',
    endTime: '',
    content: '',
    status: 'ongoing',
    progress: 0
  })
  planDialogVisible.value = true
}

const editPlan = (row) => {
  Object.assign(planForm, {
    id: row.id,
    name: row.name,
    course: row.course,
    grade: row.grade,
    startTime: row.startTime,
    endTime: row.endTime,
    content: row.content,
    status: row.status,
    progress: row.progress
  })
  planDialogVisible.value = true
}

const viewPlan = (row) => {
  ElMessageBox.alert(`
    <div style="text-align: left;">
      <p><strong>计划名称：</strong>${row.name}</p>
      <p><strong>课程：</strong>${getCourseName(row.course)}</p>
      <p><strong>适用年级：</strong>${row.grade}年级</p>
      <p><strong>开始时间：</strong>${row.startTime}</p>
      <p><strong>结束时间：</strong>${row.endTime}</p>
      <p><strong>状态：</strong>${row.status === 'completed' ? '已完成' : row.status === 'ongoing' ? '进行中' : '已延期'}</p>
      <p><strong>进度：</strong>${row.progress}%</p>
      <p><strong>计划内容：</strong>${row.content}</p>
    </div>
  `, '计划详情', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '关闭'
  })
}

const savePlan = () => {
  planFormRef.value.validate((valid) => {
    if (valid) {
      btnLoading.savePlan = true
      setTimeout(() => {
        if (planForm.id) {
          const index = teachingToolData.value.findIndex(item => item.id === planForm.id)
          if (index !== -1) {
            teachingToolData.value[index] = { ...planForm }
          }
          ElMessage.success('计划更新成功')
        } else {
          const newPlan = {
            ...planForm,
            id: `P${String(Date.now()).slice(-6)}`,
            progress: 0
          }
          teachingToolData.value.unshift(newPlan)
          ElMessage.success('计划创建成功')
        }
        saveToStorage('mock_plans', teachingToolData.value.filter(item => item.id.startsWith('P')))
        planDialogVisible.value = false
        btnLoading.savePlan = false
        loadTeachingToolData()
      }, 500)
    }
  })
}

const deletePlan = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除计划"${row.name}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    teachingToolData.value = teachingToolData.value.filter(item => item.id !== row.id)
    saveToStorage('mock_plans', teachingToolData.value.filter(item => item.id.startsWith('P')))
    ElMessage.success('删除成功')
    loadTeachingToolData()
  } catch (error) {
    console.log('取消删除')
  }
}

const uploadResource = () => {
  ElMessage.info('上传资源功能（模拟）')
}

const createFolder = () => {
  ElMessage.info('新建文件夹功能（模拟）')
}

const downloadResource = (row) => {
  ElMessage.success(`正在下载资源：${row.name}`)
}

const deleteResource = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除资源"${row.name}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    teachingToolData.value = teachingToolData.value.filter(item => item.id !== row.id)
    saveToStorage('mock_resources', teachingToolData.value.filter(item => item.id.startsWith('R')))
    ElMessage.success('删除成功')
    loadTeachingToolData()
  } catch (error) {
    console.log('取消删除')
  }
}

const exportLessonData = () => {
  const lessons = teachingToolData.value.filter(item => item.id.startsWith('L'))
  const ws = XLSX.utils.json_to_sheet(lessons.map(item => ({
    '备课ID': item.id,
    '备课名称': item.name,
    '课程': getCourseName(item.course),
    '适用年级': item.grade + '年级',
    '教学目标': item.objectives,
    '备课内容': item.content,
    '创建时间': item.createTime
  })))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '备课列表')
  XLSX.writeFile(wb, '备课列表.xlsx')
  ElMessage.success('导出成功')
}

const exportResourceData = () => {
  const resources = teachingToolData.value.filter(item => item.id.startsWith('R'))
  const ws = XLSX.utils.json_to_sheet(resources.map(item => ({
    '资源ID': item.id,
    '资源名称': item.name,
    '资源类型': getResourceTypeName(item.type),
    '文件大小': item.size,
    '上传时间': item.uploadTime
  })))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '资源列表')
  XLSX.writeFile(wb, '资源列表.xlsx')
  ElMessage.success('导出成功')
}

const exportPlanData = () => {
  const plans = teachingToolData.value.filter(item => item.id.startsWith('P'))
  const ws = XLSX.utils.json_to_sheet(plans.map(item => ({
    '计划ID': item.id,
    '计划名称': item.name,
    '课程': getCourseName(item.course),
    '适用年级': item.grade + '年级',
    '开始时间': item.startTime,
    '结束时间': item.endTime,
    '状态': item.status === 'completed' ? '已完成' : item.status === 'ongoing' ? '进行中' : '已延期',
    '进度': item.progress + '%',
    '计划内容': item.content
  })))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '计划列表')
  XLSX.writeFile(wb, '计划列表.xlsx')
  ElMessage.success('导出成功')
}

const showPlanChart = () => {
  const plans = teachingToolData.value.filter(item => item.id.startsWith('P'))
  const completedCount = plans.filter(item => item.status === 'completed').length
  const ongoingCount = plans.filter(item => item.status === 'ongoing').length
  const delayedCount = plans.filter(item => item.status === 'delayed').length
  
  ElMessageBox.alert(`
    <div style="text-align: center;">
      <h3>教学计划统计</h3>
      <p>已完成：${completedCount}</p>
      <p>进行中：${ongoingCount}</p>
      <p>已延期：${delayedCount}</p>
      <p>总计：${plans.length}</p>
    </div>
  `, '计划统计', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '关闭'
  })
}

const batchDeleteTeachingTool = async () => {
  try {
    await ElMessageBox.confirm(`确定要删除选中的${selectedTeachingTools.value.length}项吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const selectedIds = selectedTeachingTools.value.map(item => item.id)
    teachingToolData.value = teachingToolData.value.filter(item => !selectedIds.includes(item.id))
    
    if (currentMenu.value === '4-1') {
      saveToStorage('mock_lessons', teachingToolData.value.filter(item => item.id.startsWith('L')))
    } else if (currentMenu.value === '4-2') {
      saveToStorage('mock_resources', teachingToolData.value.filter(item => item.id.startsWith('R')))
    } else if (currentMenu.value === '4-3') {
      saveToStorage('mock_plans', teachingToolData.value.filter(item => item.id.startsWith('P')))
    }
    
    ElMessage.success('批量删除成功')
    selectedTeachingTools.value = []
    loadTeachingToolData()
  } catch (error) {
    console.log('取消删除')
  }
}

const editHomework = (row) => {
  Object.assign(homeworkEditForm, {
    id: row.id,
    name: row.name,
    course: row.course,
    content: row.content || '',
    deadline: row.deadline,
    classes: [...row.classes]
  })
  homeworkEditDialogVisible.value = true
}

const deleteHomework = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除作业"${row.name}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    homeworkData.value = homeworkData.value.filter(item => item.id !== row.id)
    saveToStorage('mock_homeworks', homeworkData.value)
    ElMessage.success('删除成功')
    loadHomeworkData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败：${error.message}`)
    }
  }
}

const batchDeleteHomework = async () => {
  if (selectedHomeworks.value.length === 0) {
    ElMessage.warning('请先选择要删除的作业')
    return
  }
  
  try {
    await ElMessageBox.confirm(`确定要删除选中的 ${selectedHomeworks.value.length} 个作业吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const idsToDelete = selectedHomeworks.value.map(item => item.id)
    homeworkData.value = homeworkData.value.filter(item => !idsToDelete.includes(item.id))
    saveToStorage('mock_homeworks', homeworkData.value)
    ElMessage.success('批量删除成功')
    selectedHomeworks.value = []
    loadHomeworkData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`批量删除失败：${error.message}`)
    }
  }
}

const gradeHomework = (row) => {
  currentHomeworkDetail.value = row
  homeworkGradeForm.homeworkId = row.id
  homeworkGradeForm.submissions = [
    { studentId: 'S001', studentName: '小明', score: 85, comment: '完成良好' },
    { studentId: 'S002', studentName: '小红', score: 92, comment: '优秀' },
    { studentId: 'S003', studentName: '小刚', score: 78, comment: '需要加强' }
  ]
  homeworkGradeDialogVisible.value = true
}

const batchGradeHomework = () => {
  ElMessage.info('批量批改功能已触发')
}

const refreshHomeworkList = () => {
  loadHomeworkData()
  ElMessage.success('刷新成功')
}

const viewHomeworkDetail = (row) => {
  currentHomeworkDetail.value = row
  homeworkDetailDialogVisible.value = true
}

const exportHomeworkData = () => {
  ElMessage.info('导出作业列表功能已触发')
}

const showHomeworkChart = () => {
  ElMessage.info('作业数据可视化功能已触发')
}

const exportHomeworkStats = () => {
  ElMessage.info('导出统计报告功能已触发')
}

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

// 生成课程ID
const generateCourseId = () => {
  const maxId = courseData.value.reduce((max, item) => {
    const num = parseInt(item.id.slice(1))
    return num > max ? num : max
  }, 0)
  return `C${String(maxId + 1).padStart(3, '0')}`
}

// 加载课程数据
const loadCourseData = () => {
  courseLoading.value = true
  
  // 筛选逻辑
  let filteredData = [...courseData.value]
  
  // 名称筛选
  if (courseSearchForm.name) {
    filteredData = filteredData.filter(item => item.name.includes(courseSearchForm.name))
  }
  
  // 类型筛选
  if (courseSearchForm.type) {
    filteredData = filteredData.filter(item => item.type === courseSearchForm.type)
  }
  
  // 状态筛选（仅发布课程页面）
  if (courseSearchForm.status && currentMenu.value === '1-2') {
    filteredData = filteredData.filter(item => item.status === courseSearchForm.status)
  }
  
  // 分页处理
  coursePagination.total = filteredData.length
  const start = (coursePagination.page - 1) * coursePagination.pageSize
  const end = start + coursePagination.pageSize
  courseList.value = filteredData.slice(start, end)
  
  courseLoading.value = false
}

// 搜索课程
const searchCourse = () => {
  coursePagination.page = 1
  loadCourseData()
}

// 重置搜索
const resetCourseSearch = () => {
  courseSearchForm.name = ''
  courseSearchForm.type = ''
  courseSearchForm.status = ''
  searchCourse()
}

// 分页大小变化
const handleCourseSizeChange = (size) => {
  coursePagination.pageSize = size
  loadCourseData()
}

// 页码变化
const handleCourseCurrentChange = (page) => {
  coursePagination.page = page
  loadCourseData()
}

// 课程选择
const handleCourseSelect = (val) => {
  selectedCourses.value = val
}

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
        saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
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
      saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
      ElMessage.success('课程创建成功！')
    }
    
    courseDialogVisible.value = false
    loadCourseData()
  } catch (error) {
    ElMessage.error('表单填写有误，请检查！')
  }
}

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
    saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
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
      saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
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
      saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
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
    saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
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
    saveToStorage(STORAGE_KEYS.COURSE, courseData.value)
    ElMessage.success('课程删除成功！')
    loadCourseData()
  })
}

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

// -------------------------- 生命周期钩子 --------------------------
onMounted(() => {
  initMockData()
  fetchData()
  
  // 监听窗口大小变化，自适应图表
  window.addEventListener('resize', () => {
    if (studentCountChart) studentCountChart.resize()
    if (completionRateChart) completionRateChart.resize()
  })
})

onUnmounted(() => {
  // 清理定时器和事件监听器
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  window.removeEventListener('resize', () => {
    if (studentCountChart) studentCountChart.resize()
    if (completionRateChart) completionRateChart.resize()
  })
})

// 监听菜单变化，重新加载数据
watch(currentMenu, () => {
  if (currentMenu.value.startsWith('1-')) {
    loadCourseData()
  }
})
</script>

<style scoped>
/* 教师端样式 */
.main-layout {
  display: flex;
  height: calc(100vh - 60px);
}

/* 顶部导航栏样式 */
.navbar {
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.1) 100%);
  pointer-events: none;
}

.platform-name {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.platform-name::before {
  content: "🎓";
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.refresh-control {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.refresh-control:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.interactive-btn {
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
}

.interactive-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.6);
  background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
}

/* 左侧菜单栏样式 */
.sidebar {
  width: 220px;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-medium);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  overflow-y: auto;
}

.sidebar.is-collapse {
  width: 64px;
}

.sidebar-menu {
  border-radius: 0;
  background-color: var(--bg-primary) !important;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  padding: 0 20px;
  border-bottom: 1px solid var(--border-medium);
}

.logo-container:hover {
  background-color: var(--primary-light);
}

.rotate-icon {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.sidebar-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  margin: 0 10px;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-menu .el-menu-item:hover {
  background-color: var(--primary-light) !important;
  color: var(--primary-color) !important;
}

.sidebar-menu .el-menu-item.is-active {
  background-color: var(--primary-light) !important;
  color: var(--primary-color) !important;
  font-weight: bold;
}

.sidebar-menu .el-sub-menu__title {
  height: 50px;
  line-height: 50px;
  margin: 0 10px;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-menu .el-sub-menu__title:hover {
  background-color: var(--primary-light) !important;
  color: var(--primary-color) !important;
}

.sidebar-menu .el-sub-menu__title.is-active {
  background-color: var(--primary-light) !important;
  color: var(--primary-color) !important;
}

/* 右侧内容区样式 */
.content-area {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: var(--bg-secondary);
  min-height: calc(100vh - 60px);
}

.page-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.page-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.page-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.page-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
  pointer-events: none;
}

/* 搜索面板样式 */
.search-panel {
  margin-bottom: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.search-header h3 {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

/* 表格容器样式 */
.table-container {
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.table-header span {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.data-count {
  font-size: 13px;
  color: #909399;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.page-title::before {
  content: "";
  width: 6px;
  height: 28px;
  background: linear-gradient(180deg, #f093fb 0%, #f5576c 100%);
  border-radius: 3px;
  box-shadow: 0 0 12px rgba(240, 147, 251, 0.6);
}

.action-bar {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12);
  border: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  overflow: hidden;
}

.action-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.left-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.left-actions .el-button {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.left-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.left-actions .el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.left-actions .el-button--success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  border: none;
}

.left-actions .el-button--warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
}

.left-actions .el-button--info {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
}

.right-actions {
  display: flex;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.right-actions .el-button {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.right-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.right-actions .el-button--danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
}

.search-panel {
  margin-bottom: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12);
  border: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  overflow: hidden;
}

.search-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.search-panel .el-form-item {
  margin-bottom: 0;
}

.search-panel .el-input,
.search-panel .el-select {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-panel .el-input:hover,
.search-panel .el-select:hover {
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.search-panel .el-input__inner {
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.search-panel .el-input__inner:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-panel .el-button {
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-panel .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-panel .el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.search-panel .el-button--default {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.search-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.table-container {
  margin-bottom: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12);
  border: 1px solid rgba(102, 126, 234, 0.1);
  overflow: hidden;
  position: relative;
}

.table-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.table-container .el-table {
  border-radius: 12px;
  overflow: hidden;
  border: none;
}

.table-container .el-table__header-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.table-container .el-table__header th {
  font-weight: 600;
  color: #ffffff;
  background: transparent;
  border: none;
  padding: 16px 12px;
}

.table-container .el-table__header th .cell {
  font-size: 14px;
  letter-spacing: 0.5px;
}

.table-container .el-table__body tr {
  transition: all 0.3s ease;
}

.table-container .el-table__body tr:hover {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%);
  transform: scale(1.005);
}

.table-container .el-table__body td {
  border: none;
  border-bottom: 1px solid rgba(102, 126, 234, 0.08);
  padding: 14px 12px;
  transition: all 0.3s ease;
}

.table-container .el-table__body tr:hover td {
  border-bottom-color: rgba(102, 126, 234, 0.15);
}

.table-container .el-tag {
  border-radius: 6px;
  padding: 4px 12px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.table-container .el-tag--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

.table-container .el-tag--success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  border: none;
  color: white;
}

.table-container .el-tag--warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  color: white;
}

.table-container .el-tag--danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
  color: white;
}

.table-container .el-button--small {
  border-radius: 6px;
  padding: 6px 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.table-container .el-button--small:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.table-container .el-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.table-container .el-button--danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
}

.pagination-container {
  margin-top: 0;
  padding: 20px 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-top: 1px solid rgba(102, 126, 234, 0.1);
  text-align: right;
}

.pagination-container .el-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pagination-container .el-pagination button {
  border-radius: 6px;
  margin: 0 4px;
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.pagination-container .el-pagination button:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-1px);
}

.pagination-container .el-pagination .el-pager li {
  border-radius: 6px;
  margin: 0 4px;
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.pagination-container .el-pagination .el-pager li:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-1px);
}

.pagination-container .el-pagination .el-pager li.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

/* 颜色变量定义 */
:root {
  /* 主色调 */
  --primary-color: #409eff;
  --primary-hover: #66b1ff;
  --primary-light: #ecf5ff;
  --primary-dark: #3a8ee6;
  
  /* 辅助色 */
  --success-color: #67c23a;
  --success-hover: #85ce61;
  --success-light: #f0f9eb;
  
  --warning-color: #e6a23c;
  --warning-hover: #ebb563;
  --warning-light: #fdf6ec;
  
  --danger-color: #f56c6c;
  --danger-hover: #f78989;
  --danger-light: #fef0f0;
  
  --info-color: #909399;
  --info-hover: #a6a9ad;
  --info-light: #f4f4f5;
  
  /* 中性色 */
  --text-primary: #303133;
  --text-secondary: #606266;
  --text-tertiary: #909399;
  --text-quaternary: #c0c4cc;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7fa;
  --bg-tertiary: #fafafa;
  --bg-quaternary: #f0f2f5;
  
  /* 边框色 */
  --border-light: #e4e7ed;
  --border-medium: #dcdfe6;
  --border-dark: #c0c4cc;
  
  /* 阴影 */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  
  /* 过渡 */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

/* 按钮样式优化 */
.el-button {
  transition: all var(--transition-normal);
  border-radius: var(--radius-md);
}

.el-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.el-button--primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.el-button--primary:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.el-button--success {
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.el-button--success:hover {
  background-color: var(--success-hover);
  border-color: var(--success-hover);
}

.el-button--warning {
  background-color: var(--warning-color);
  border-color: var(--warning-color);
}

.el-button--warning:hover {
  background-color: var(--warning-hover);
  border-color: var(--warning-hover);
}

.el-button--danger {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}

.el-button--danger:hover {
  background-color: var(--danger-hover);
  border-color: var(--danger-hover);
}

.el-button--info {
  background-color: var(--info-color);
  border-color: var(--info-color);
}

.el-button--info:hover {
  background-color: var(--info-hover);
  border-color: var(--info-hover);
}

/* 表单元素样式优化 */
.el-input,
.el-select,
.el-date-picker {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.el-input:hover,
.el-select:hover,
.el-date-picker:hover {
  border-color: #c6e2ff;
}

.el-input:focus-within,
.el-select:focus-within,
.el-date-picker:focus-within {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 标签样式优化 */
.el-tag {
  border-radius: var(--radius-md);
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  transition: all var(--transition-normal);
}

.el-tag:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 动画效果定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 页面加载动画 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  gap: 12px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--border-light);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

.loading-text {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 元素进入动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 滑入动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-normal);
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 缩放动画 */
.scale-enter-active,
.scale-leave-active {
  transition: all var(--transition-normal);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

/* 卡片悬停效果增强 */
.card-hover {
  transition: all var(--transition-normal);
}

.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

/* 表格行悬停效果 */
.el-table__row {
  transition: all var(--transition-fast);
}

.el-table__row:hover {
  background-color: var(--bg-tertiary) !important;
  transform: translateX(2px);
}

/* 按钮点击效果 */
.el-button {
  position: relative;
  overflow: hidden;
}

.el-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.el-button:active::after {
  width: 300px;
  height: 300px;
}

/* 表单元素焦点效果 */
.el-input:focus-within .el-input__wrapper,
.el-select:focus-within .el-select__wrapper {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2) !important;
  border-color: var(--primary-color) !important;
}

/* 滚动条样式优化 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb {
  background: var(--border-medium);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border-dark);
}

/* 数据加载状态动画 */
.data-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: var(--text-tertiary);
}

.data-loading::after {
  content: '';
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-light);
  border-top: 2px solid var(--primary-color);
  border-radius: 50%;
  margin-left: 10px;
  animation: rotate 1s linear infinite;
}

/* 进度条样式优化 */
.el-progress {
  border-radius: 10px;
}

.el-progress__bar {
  border-radius: 10px;
}

/* 卡片样式 */
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}


/* 课程详情样式 */
.course-detail {
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.detail-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e6e6e6;
}

.detail-header h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-header h3::before {
  content: "📚";
  font-size: 20px;
}

.detail-header p {
  margin: 0;
  font-size: 14px;
  color: #606266;
}

.detail-stats {
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-item {
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: center;
}

.stat-item:hover {
  background-color: #ecf5ff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  font-weight: normal;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  line-height: 1;
}

/* 图表容器样式 */
.chart-container {
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.chart-item {
  margin-bottom: 32px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.chart-item:hover {
  background-color: #f5f7fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-item h4 {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-item h4::before {
  content: "📊";
  font-size: 16px;
}

/* 图表容器 */
.chart-container #studentCountChart,
.chart-container #completionRateChart {
  height: 350px;
  transition: all 0.3s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .chart-container #studentCountChart,
  .chart-container #completionRateChart {
    height: 250px;
  }
  
  .detail-stats {
    grid-template-columns: 1fr;
  }
}


/* 响应式布局 */
@media (max-width: 1200px) {
  .detail-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .search-form {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  /* 顶部导航栏 */
  .navbar {
    padding: 0 16px;
  }
  
  .platform-name {
    font-size: 16px;
  }
  
  .nav-right {
    gap: 12px;
  }
  
  .refresh-control {
    font-size: 12px;
    gap: 6px;
  }
  
  /* 主体布局 */
  .main-layout {
    flex-direction: column;
  }
  
  /* 左侧菜单栏 */
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .sidebar.is-collapse {
    width: 100%;
  }
  
  .logo-container {
    height: 50px;
  }
  
  .sidebar-menu .el-menu-item {
    height: 44px;
    line-height: 44px;
  }
  
  .sidebar-menu .el-sub-menu__title {
    height: 44px;
    line-height: 44px;
  }
  
  /* 右侧内容区 */
  .content-area {
    padding: 16px;
    min-height: calc(100vh - 110px);
  }
  
  .page-header {
    margin-bottom: 16px;
    padding-bottom: 12px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .action-bar {
    margin-bottom: 16px;
    padding: 12px;
    gap: 8px;
  }
  
  .left-actions {
    gap: 8px;
  }
  
  .search-panel {
    margin-bottom: 16px;
    padding: 16px;
  }
  
  .search-form {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .search-form .el-form-item {
    margin-bottom: 0;
  }
  
  .table-container {
    margin-bottom: 16px;
  }
  
  .pagination-container {
    padding: 12px;
  }
  
  /* 课程详情 */
  .course-detail {
    padding: 16px;
  }
  
  .detail-header {
    margin-bottom: 16px;
    padding-bottom: 12px;
  }
  
  .detail-header h3 {
    font-size: 18px;
  }
  
  .detail-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .stat-item {
    padding: 12px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  /* 图表容器 */
  .chart-container {
    padding: 16px;
  }
  
  .chart-item {
    margin-bottom: 24px;
    padding: 16px;
  }
  
  .chart-container #studentCountChart,
  .chart-container #completionRateChart {
    height: 250px;
  }
  
  /* 按钮样式 */
  .el-button {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  /* 表格样式 */
  .el-table {
    font-size: 12px;
  }
  
  .el-table th,
  .el-table td {
    padding: 8px;
  }
  
  /* 标签样式 */
  .el-tag {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 6px;
  }
}

@media (max-width: 480px) {
  .navbar {
    flex-direction: column;
    height: auto;
    padding: 12px 16px;
    gap: 12px;
  }
  
  .nav-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .content-area {
    min-height: calc(100vh - 150px);
  }
  
  .page-title {
    font-size: 18px;
  }
  
  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .left-actions,
  .right-actions {
    justify-content: center;
  }
  
  .el-button {
    width: 100%;
  }
  
  .detail-stats {
    grid-template-columns: 1fr;
  }
  
  .chart-container #studentCountChart,
  .chart-container #completionRateChart {
    height: 200px;
  }
}

</style>
