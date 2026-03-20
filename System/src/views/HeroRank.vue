<template>
  <div class="hero-rank-container">
    <!-- 页面头部 -->
    <div class="rank-header">
      <div class="rank-header-top">
        <div class="rank-title">

          <h2>鸿鹄榜</h2>
          <p class="rank-subtitle">鸿鹄之志，志在千里</p>
        </div>
        <div class="rank-actions">
          <el-button type="primary" @click="refreshRank" size="small">
            <i class="el-icon-refresh"></i> 刷新
          </el-button>
          <el-button @click="shareRank" size="small">
            <i class="el-icon-share"></i> 分享
          </el-button>
        </div>
        <div class="rank-tabs">
          <el-tabs v-model="activeTab" @tab-change="switchTab" class="rank-tabs-container">
            <el-tab-pane label="数学榜" name="math"></el-tab-pane>
            <el-tab-pane label="语文榜" name="chinese"></el-tab-pane>
            <el-tab-pane label="英语榜" name="english"></el-tab-pane>
            <el-tab-pane label="物理榜" name="physics"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- 排行榜内容 -->
    <div class="rank-content">
      <!-- 前三名展示 -->
      <div class="top-three" v-if="topThreeData.length > 0">
        <div class="rank-item second" v-if="topThreeData[1]" @click="viewUserDetail(topThreeData[1])">
          <div class="rank-number">2</div>
          <div class="rank-avatar">
            <img :src="topThreeData[1].avatar || defaultAvatar" :alt="topThreeData[1].name">
          </div>
          <div class="rank-info">
            <h3 class="rank-name">{{ topThreeData[1].name }}</h3>
            <p class="rank-score">{{ topThreeData[1].score }} 积分</p>
          </div>
          <div class="rank-reward">
            <span class="reward-icon">🥈</span>
          </div>
        </div>

        <div class="rank-item first" v-if="topThreeData[0]" @click="viewUserDetail(topThreeData[0])">
          <div class="rank-number">1</div>
          <div class="rank-avatar">
            <img :src="topThreeData[0].avatar || defaultAvatar" :alt="topThreeData[0].name">
          </div>
          <div class="rank-info">
            <h3 class="rank-name">{{ topThreeData[0].name }}</h3>
            <p class="rank-score">{{ topThreeData[0].score }} 积分</p>
            <p class="rank-level">等级：{{ topThreeData[0].level }}</p>
          </div>
          <div class="rank-reward">
            <span class="reward-icon">🥇</span>
          </div>
        </div>

        <div class="rank-item third" v-if="topThreeData[2]" @click="viewUserDetail(topThreeData[2])">
          <div class="rank-number">3</div>
          <div class="rank-avatar">
            <img :src="topThreeData[2].avatar || defaultAvatar" :alt="topThreeData[2].name">
          </div>
          <div class="rank-info">
            <h3 class="rank-name">{{ topThreeData[2].name }}</h3>
            <p class="rank-score">{{ topThreeData[2].score }} 积分</p>
          </div>
          <div class="rank-reward">
            <span class="reward-icon">🥉</span>
          </div>
        </div>
      </div>

      <!-- 排行榜列表 -->
      <div class="rank-list">
        <div class="rank-list-header">
          <div class="header-item rank-column">排名</div>
          <div class="header-item user-column">用户</div>
          <div class="header-item score-column">积分</div>
          <div class="header-item level-column">等级</div>
          <div class="header-item progress-column">学习进度</div>
        </div>
        <div class="rank-list-body">
          <div 
            v-for="(item, index) in rankListData" 
            :key="item.id" 
            class="rank-list-item"
            :class="{ 'current-user': item.isCurrentUser }"
            @click="viewUserDetail(item)"
          >
            <div class="list-item rank-column">
              <span class="rank-number">{{ index + 4 }}</span>
            </div>
            <div class="list-item user-column">
              <div class="user-info">
                <img :src="item.avatar || defaultAvatar" :alt="item.name" class="user-avatar">
                <span class="user-name">{{ item.name }}</span>
              </div>
            </div>
            <div class="list-item score-column">
              <span class="user-score">{{ item.score }}</span>
            </div>
            <div class="list-item level-column">
              <span class="user-level">{{ item.level }}</span>
            </div>
            <div class="list-item progress-column">
              <el-progress 
                :percentage="item.progress" 
                :color="getProgressColor(item.progress)"
                :stroke-width="8"
                :show-text="false"
              ></el-progress>
              <span class="progress-text">{{ item.progress }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的排名 -->
      <div class="my-rank" v-if="myRankData">
        <div class="my-rank-header">
          <h3>我的排名</h3>
        </div>
        <div class="my-rank-content">
          <div class="my-rank-info">
            <div class="my-avatar">
              <img :src="myRankData.avatar || defaultAvatar" :alt="myRankData.name">
            </div>
            <div class="my-details">
              <div class="my-name">{{ myRankData.name }}</div>
              <div class="my-stats">
                <div class="stat-item">
                  <span class="stat-label">排名：</span>
                  <span class="stat-value">{{ myRankData.rank }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">积分：</span>
                  <span class="stat-value">{{ myRankData.score }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">等级：</span>
                  <span class="stat-value">{{ myRankData.level }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">学习进度：</span>
                  <span class="stat-value">{{ myRankData.progress }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="my-rank-tips">
            <el-alert
              title="积分获取方式"
              type="info"
              :closable="false"
              show-icon
            >
              <div class="tips-content">
                <p>1. 完成课程学习 +10/课时</p>
                <p>2. 完成作业练习 +5/题</p>
                <p>3. 参与讨论 +2/条</p>
                <p>4. 获得优秀作业 +20/次</p>
                <p>5. 连续登录 +1/天</p>
              </div>
            </el-alert>
          </div>
        </div>
      </div>
    </div>

    <!-- 排行榜规则 -->
    <div class="rank-rules">
      <h3>排行榜规则</h3>
      <div class="rules-content">
        <p>1. 总榜：根据用户总积分排名，实时更新</p>
        <p>2. 周榜：每周一0:00更新，统计上周积分</p>
        <p>3. 月榜：每月1日0:00更新，统计上月积分</p>
        <p>4. 学科榜：按不同学科积分排名</p>
        <p>5. 排行榜前10名用户将获得平台奖励</p>
        <p>6. 如有作弊行为，将取消排名资格</p>
      </div>
    </div>

    <!-- 用户详情弹窗 -->
    <el-dialog v-model="showUserDetail" :title="`用户详情：${currentUserDetail?.name || ''}`" width="600px">
      <div v-if="currentUserDetail" class="user-detail-content">
        <div class="detail-header">
          <div class="detail-avatar">
            <img :src="currentUserDetail.avatar || defaultAvatar" :alt="currentUserDetail.name">
          </div>
          <div class="detail-info">
            <h3 class="detail-name">{{ currentUserDetail.name }}</h3>
            <div class="detail-tags">
              <el-tag type="success" size="small">{{ currentUserDetail.level }}</el-tag>
              <el-tag type="primary" size="small">第{{ currentUserDetail.rank || (currentUserDetail.id <= 3 ? currentUserDetail.id : currentUserDetail.id + 3) }}名</el-tag>
            </div>
          </div>
        </div>
        
        <div class="detail-stats">
          <div class="stat-item">
            <div class="stat-icon"><i class="el-icon-trophy"></i></div>
            <div class="stat-content">
              <div class="stat-label">总积分</div>
              <div class="stat-value">{{ currentUserDetail.score }}</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon"><i class="el-icon-data-line"></i></div>
            <div class="stat-content">
              <div class="stat-label">学习进度</div>
              <div class="stat-value">{{ currentUserDetail.progress }}%</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon"><i class="el-icon-time"></i></div>
            <div class="stat-content">
              <div class="stat-label">学习时长</div>
              <div class="stat-value">{{ currentUserDetail.studyHours || 120 }}小时</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon"><i class="el-icon-medal"></i></div>
            <div class="stat-content">
              <div class="stat-label">获得徽章</div>
              <div class="stat-value">{{ currentUserDetail.badges || 8 }}个</div>
            </div>
          </div>
        </div>
        
        <div class="detail-achievements">
          <h4 class="section-title">学习成就</h4>
          <div class="achievements-list">
            <div class="achievement-item">
              <span class="achievement-icon">🏆</span>
              <span class="achievement-name">学习达人</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-icon">⭐</span>
              <span class="achievement-name">连续学习7天</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-icon">🎯</span>
              <span class="achievement-name">作业全对</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-icon">📚</span>
              <span class="achievement-name">课程完成者</span>
            </div>
          </div>
        </div>
        
        <div class="detail-footer">
          <div class="detail-meta">
            <span class="meta-item">
              <i class="el-icon-user"></i> 用户ID：{{ currentUserDetail.id }}
            </span>
            <span class="meta-item">
              <i class="el-icon-date"></i> 注册时间：{{ currentUserDetail.registerTime || '2024-01-01' }}
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="showUserDetail = false">关闭</el-button>
        <el-button type="primary" @click="followUser">关注</el-button>
        <el-button type="success" @click="sendMessage">发消息</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()


// 默认头像
const defaultAvatar = '/src/assets/logo.svg'

// 当前激活的标签页
const activeTab = ref('total')

// 用户详情弹窗
const showUserDetail = ref(false)
const currentUserDetail = ref(null)

// 数学榜数据
const mathRankData = {
  topThree: [
    {
      id: 1,
      name: '张明',
      score: 15000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20math%20genius&image_size=square',
      progress: 100,
      subject: '数学'
    },
    {
      id: 2,
      name: '李华',
      score: 13500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20math%20expert&image_size=square',
      progress: 98,
      subject: '数学'
    },
    {
      id: 3,
      name: '王强',
      score: 12000,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20calculus%20expert&image_size=square',
      progress: 96,
      subject: '数学'
    }
  ],
  rankList: [
    {
      id: 4,
      name: '陈静',
      score: 10500,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20statistics%20expert&image_size=square',
      progress: 94,
      subject: '数学'
    },
    {
      id: 5,
      name: '刘阳',
      score: 9800,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20number%20theory%20expert&image_size=square',
      progress: 92,
      subject: '数学'
    },
    {
      id: 6,
      name: '赵雨',
      score: 9200,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20probability%20expert&image_size=square',
      progress: 90,
      subject: '数学'
    },
    {
      id: 7,
      name: '孙伟',
      score: 8500,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20geometry%20enthusiast&image_size=square',
      progress: 88,
      subject: '数学'
    },
    {
      id: 8,
      name: '周佳',
      score: 8000,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20algebra%20enthusiast&image_size=square',
      progress: 85,
      subject: '数学'
    },
    {
      id: 9,
      name: '吴浩',
      score: 7500,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20math%20learner&image_size=square',
      progress: 82,
      subject: '数学'
    },
    {
      id: 10,
      name: '郑琳',
      score: 7000,
      level: '中等',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20math%20beginner&image_size=square',
      progress: 78,
      subject: '数学',
      isCurrentUser: true
    }
  ],
  myRank: {
    id: 10,
    name: '郑琳',
    score: 7000,
    level: '中等',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20math%20beginner&image_size=square',
    rank: 10,
    progress: 78,
    subject: '数学'
  }
}

// 语文榜数据
const chineseRankData = {
  topThree: [
    {
      id: 11,
      name: '林芳',
      score: 14000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20chinese%20literature%20expert&image_size=square',
      progress: 99,
      subject: '语文'
    },
    {
      id: 12,
      name: '周明',
      score: 12500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20literature%20master&image_size=square',
      progress: 97,
      subject: '语文'
    },
    {
      id: 13,
      name: '吴芳',
      score: 11000,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20writing%20expert&image_size=square',
      progress: 95,
      subject: '语文'
    }
  ],
  rankList: [
    {
      id: 14,
      name: '郑强',
      score: 9800,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20poetry%20expert&image_size=square',
      progress: 93,
      subject: '语文'
    },
    {
      id: 15,
      name: '孙丽',
      score: 9200,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20reading%20comprehension%20expert&image_size=square',
      progress: 91,
      subject: '语文'
    },
    {
      id: 16,
      name: '刘小刚',
      score: 8500,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20grammar%20expert&image_size=square',
      progress: 89,
      subject: '语文'
    },
    {
      id: 17,
      name: '李小红',
      score: 7800,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20literature%20enthusiast&image_size=square',
      progress: 87,
      subject: '语文'
    },
    {
      id: 18,
      name: '王大力',
      score: 7200,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20writing%20enthusiast&image_size=square',
      progress: 84,
      subject: '语文'
    },
    {
      id: 19,
      name: '张小丽',
      score: 6800,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20chinese%20learner&image_size=square',
      progress: 81,
      subject: '语文'
    },
    {
      id: 20,
      name: '林小明',
      score: 6500,
      level: '中等',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20chinese%20beginner&image_size=square',
      progress: 78,
      subject: '语文',
      isCurrentUser: true
    }
  ],
  myRank: {
    id: 20,
    name: '林小明',
    score: 6500,
    level: '中等',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20chinese%20beginner&image_size=square',
    rank: 20,
    progress: 78,
    subject: '语文'
  }
}

// 英语榜数据
const englishRankData = {
  topThree: [
    {
      id: 21,
      name: '陈明',
      score: 13500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20expert&image_size=square',
      progress: 98,
      subject: '英语'
    },
    {
      id: 22,
      name: '刘芳',
      score: 12000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20speaking%20expert&image_size=square',
      progress: 96,
      subject: '英语'
    },
    {
      id: 23,
      name: '赵强',
      score: 10500,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20writing%20expert&image_size=square',
      progress: 94,
      subject: '英语'
    }
  ],
  rankList: [
    {
      id: 24,
      name: '孙伟',
      score: 9800,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20listening%20expert&image_size=square',
      progress: 92,
      subject: '英语'
    },
    {
      id: 25,
      name: '周佳',
      score: 9200,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20reading%20expert&image_size=square',
      progress: 90,
      subject: '英语'
    },
    {
      id: 26,
      name: '吴浩',
      score: 8500,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20grammar%20expert&image_size=square',
      progress: 88,
      subject: '英语'
    },
    {
      id: 27,
      name: '郑琳',
      score: 7800,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20vocabulary%20expert&image_size=square',
      progress: 86,
      subject: '英语'
    },
    {
      id: 28,
      name: '陈静',
      score: 7200,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20enthusiast&image_size=square',
      progress: 83,
      subject: '英语'
    },
    {
      id: 29,
      name: '刘阳',
      score: 6800,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20learner&image_size=square',
      progress: 80,
      subject: '英语'
    },
    {
      id: 30,
      name: '赵雨',
      score: 6500,
      level: '中等',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20beginner&image_size=square',
      progress: 77,
      subject: '英语',
      isCurrentUser: true
    }
  ],
  myRank: {
    id: 30,
    name: '赵雨',
    score: 6500,
    level: '中等',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20beginner&image_size=square',
    rank: 30,
    progress: 77,
    subject: '英语'
  }
}

// 物理榜数据
const physicsRankData = {
  topThree: [
    {
      id: 31,
      name: '张小明',
      score: 14500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20physics%20expert&image_size=square',
      progress: 99,
      subject: '物理'
    },
    {
      id: 32,
      name: '李小红',
      score: 13000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20mechanics%20expert&image_size=square',
      progress: 97,
      subject: '物理'
    },
    {
      id: 33,
      name: '王强',
      score: 11500,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20electromagnetism%20expert&image_size=square',
      progress: 95,
      subject: '物理'
    }
  ],
  rankList: [
    {
      id: 34,
      name: '刘小刚',
      score: 10000,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20optics%20expert&image_size=square',
      progress: 93,
      subject: '物理'
    },
    {
      id: 35,
      name: '张小丽',
      score: 9400,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20thermodynamics%20expert&image_size=square',
      progress: 91,
      subject: '物理'
    },
    {
      id: 36,
      name: '林小明',
      score: 8800,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20quantum%20physics%20enthusiast&image_size=square',
      progress: 89,
      subject: '物理'
    },
    {
      id: 37,
      name: '王大力',
      score: 8200,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20mechanics%20enthusiast&image_size=square',
      progress: 87,
      subject: '物理'
    },
    {
      id: 38,
      name: '李华',
      score: 7600,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20electromagnetism%20enthusiast&image_size=square',
      progress: 84,
      subject: '物理'
    },
    {
      id: 39,
      name: '张明',
      score: 7200,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20physics%20learner&image_size=square',
      progress: 81,
      subject: '物理'
    },
    {
      id: 40,
      name: '陈静',
      score: 6800,
      level: '中等',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20physics%20beginner&image_size=square',
      progress: 78,
      subject: '物理',
      isCurrentUser: true
    }
  ],
  myRank: {
    id: 40,
    name: '陈静',
    score: 6800,
    level: '中等',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20physics%20beginner&image_size=square',
    rank: 40,
    progress: 78,
    subject: '物理'
  }
}

// 当前显示的数据
const topThreeData = ref(mathRankData.topThree)
const rankListData = ref(mathRankData.rankList)
const myRankData = ref(mathRankData.myRank)

// 获取进度条颜色
const getProgressColor = (progress) => {
  if (progress >= 80) {
    return '#67C23A'
  } else if (progress >= 60) {
    return '#E6A23C'
  } else {
    return '#F56C6C'
  }
}

// 查看用户详情
const viewUserDetail = (user) => {
  currentUserDetail.value = {
    ...user,
    rank: user.id <= 3 ? user.id : user.id + 3
  }
  showUserDetail.value = true
  ElMessage.success(`查看用户：${user.name}`)
}

// 关注用户
const followUser = () => {
  if (currentUserDetail.value) {
    ElMessage.success(`已关注用户：${currentUserDetail.value.name}`)
  }
}

// 发送消息
const sendMessage = () => {
  if (currentUserDetail.value) {
    ElMessage.success(`已打开与${currentUserDetail.value.name}的聊天窗口`)
  }
}

// 切换排行榜标签
const switchTab = (tabName) => {
  activeTab.value = tabName
  ElMessage.info(`切换到${getTabName(tabName)}`)
  
  // 切换排行榜数据
  switch (tabName) {
    case 'math':
      topThreeData.value = mathRankData.topThree
      rankListData.value = mathRankData.rankList
      myRankData.value = mathRankData.myRank
      break
    case 'chinese':
      topThreeData.value = chineseRankData.topThree
      rankListData.value = chineseRankData.rankList
      myRankData.value = chineseRankData.myRank
      break
    case 'english':
      topThreeData.value = englishRankData.topThree
      rankListData.value = englishRankData.rankList
      myRankData.value = englishRankData.myRank
      break
    case 'physics':
      topThreeData.value = physicsRankData.topThree
      rankListData.value = physicsRankData.rankList
      myRankData.value = physicsRankData.myRank
      break
    default:
      topThreeData.value = mathRankData.topThree
      rankListData.value = mathRankData.rankList
      myRankData.value = mathRankData.myRank
  }
}

// 获取标签名称
const getTabName = (tabName) => {
  const tabMap = {
    'math': '数学榜',
    'chinese': '语文榜',
    'english': '英语榜',
    'physics': '物理榜'
  }
  return tabMap[tabName] || '数学榜'
}

// 刷新排行榜
const refreshRank = () => {
  ElMessage.loading('正在刷新排行榜数据...')
  setTimeout(() => {
    ElMessage.success('排行榜数据已刷新')
  }, 1500)
}

// 分享排行榜
const shareRank = () => {
  ElMessage.success('排行榜分享链接已复制到剪贴板')
  setTimeout(() => {
    ElMessage.info('链接有效期：24小时')
  }, 1000)
}
</script>

<style scoped>
.hero-rank-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 200px);
}

/* 页面头部 */
.rank-header {
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 50%, #409eff 100%);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.rank-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.rank-title {
  flex: 1;
  min-width: 200px;
}

.rank-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.rank-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.rank-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  border-color: white;
  z-index: 10;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: white;
  color: white;
}

.rank-title {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.rank-title h2 {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rank-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.rank-tabs {
  flex: 2;
  min-width: 300px;
}

.rank-tabs-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 5px;
  backdrop-filter: blur(10px);
}

.rank-tabs-container .el-tabs__nav {
  border-bottom: none;
}

.rank-tabs-container .el-tabs__active-bar {
  background-color: #fff;
}

.rank-tabs-container .el-tab-pane {
  padding: 0;
}

.rank-tabs-container .el-tabs__item {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 6px;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.rank-tabs-container .el-tabs__item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.rank-tabs-container .el-tabs__item.is-active {
  color: #409eff;
  background: #fff;
  font-weight: 600;
}

/* 前三名展示 */
.top-three {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.rank-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 180px;
}

.rank-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.2);
}

.rank-item.first {
  order: 2;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  border: 2px solid #ffc107;
  transform: scale(1.1);
}

.rank-item.second {
  order: 1;
  background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%);
  border: 2px solid #6c757d;
}

.rank-item.third {
  order: 3;
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border: 2px solid #dc3545;
}

.rank-number {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
  opacity: 0.2;
}

.rank-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.rank-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rank-info {
  text-align: center;
  margin-bottom: 15px;
}

.rank-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #303133;
}

.rank-score {
  font-size: 16px;
  color: #606266;
  margin: 0 0 5px 0;
}

.rank-level {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.rank-reward {
  font-size: 32px;
}

/* 排行榜列表 */
.rank-list {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  overflow: hidden;
}

.rank-list-header {
  display: flex;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  padding: 15px 20px;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
}

.header-item {
  display: flex;
  align-items: center;
}

.rank-column {
  width: 100px;
}

.user-column {
  flex: 2;
  min-width: 200px;
}

.score-column {
  width: 120px;
}

.level-column {
  width: 100px;
}

.progress-column {
  flex: 1;
  min-width: 200px;
}

.rank-list-body {
  padding: 0 20px;
}

.rank-list-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.rank-list-item:hover {
  background-color: rgba(64, 158, 255, 0.05);
}

.rank-list-item.current-user {
  background-color: rgba(103, 194, 58, 0.1);
  border-left: 4px solid #67C23A;
}

.list-item {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.user-score {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.user-level {
  font-size: 14px;
  color: #909399;
}

.progress-text {
  margin-left: 10px;
  font-size: 12px;
  color: #909399;
}

/* 我的排名 */
.my-rank {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  overflow: hidden;
}

.my-rank-header {
  background: linear-gradient(135deg, #67C23A 0%, #85ce61 100%);
  padding: 15px 20px;
}

.my-rank-header h3 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

.my-rank-content {
  padding: 20px;
}

.my-rank-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.my-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #67C23A;
}

.my-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.my-details {
  flex: 1;
}

.my-name {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.my-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stat-label {
  font-size: 14px;
  color: #606266;
}

.stat-value {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.tips-content p {
  margin: 5px 0;
  font-size: 14px;
}

/* 排行榜规则 */
.rank-rules {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.rank-rules h3 {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}

.rules-content p {
  font-size: 14px;
  color: #606266;
  margin: 8px 0;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-rank-container {
    padding: 10px;
  }

  .rank-header {
    padding: 20px;
  }

  .rank-header-top {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .top-three {
    flex-direction: column;
    align-items: stretch;
  }

  .rank-item {
    flex-direction: row;
    justify-content: space-between;
    min-width: auto;
  }

  .rank-item.first {
    order: 1;
  }

  .rank-item.second {
    order: 2;
  }

  .rank-item.third {
    order: 3;
  }

  .rank-list-header {
    flex-wrap: wrap;
    gap: 10px;
  }

  .rank-list-item {
    flex-wrap: wrap;
    gap: 10px;
  }

  .my-rank-info {
    flex-direction: column;
    text-align: center;
  }

  .my-stats {
    justify-content: center;
  }
}

/* 用户详情弹窗样式 */
.user-detail-content {
  max-height: 600px;
  overflow-y: auto;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  border-radius: 8px;
  margin-bottom: 20px;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.detail-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info {
  flex: 1;
}

.detail-name {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 10px 0;
}

.detail-tags {
  display: flex;
  gap: 8px;
}

.detail-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-stats .stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: white;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.detail-stats .stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.detail-stats .stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.detail-stats .stat-content {
  flex: 1;
}

.detail-stats .stat-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.detail-stats .stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.detail-achievements {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f0f9ff;
  border-radius: 8px;
}

.detail-achievements .section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-achievements .section-title::before {
  content: '';
  width: 4px;
  height: 16px;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  border-radius: 2px;
}

.achievements-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.achievement-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

.achievement-icon {
  font-size: 24px;
}

.achievement-name {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.detail-footer {
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

.detail-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #909399;
  font-size: 13px;
}

.detail-meta .meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-meta .meta-item i {
  font-size: 14px;
}

/* 前三名排名项添加点击效果 */
.top-three .rank-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.top-three .rank-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(64, 158, 255, 0.2);
}

.top-three .rank-item.first:hover {
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4);
}

.top-three .rank-item.second:hover {
  box-shadow: 0 8px 24px rgba(192, 192, 192, 0.4);
}

.top-three .rank-item.third:hover {
  box-shadow: 0 8px 24px rgba(205, 127, 50, 0.4);
}
</style>