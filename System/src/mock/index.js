import Mock from 'mockjs'

// 设置Mock延迟
Mock.setup({
  timeout: '300-600'
})

// 过滤登录/用户信息接口（走真实后端）
Mock.mock(/login|user\/info/, 'any', (options) => {
  // 放行，不拦截
  return options
})

// 1. 课程模块（无API前缀）
Mock.mock(/courses/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'list|8-12': [{
        'id|+1': 1,
        title: '@ctitle(8, 16)',
        teacher: '@cname',
        cover: '@image("200x120", "#4A7BF7", "#fff", "课程")',
        'progress|0-100': 1,
        'total|10-20': 1,
        'finished|0-20': 1,
        updateTime: '@date("yyyy-MM-dd")'
      }],
      total: 50,
      page: 1,
      size: 10
    }
  })
})

// 2. 收件箱模块
Mock.mock(/messages/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'list|5-10': [{
        'id|+1': 1,
        title: '@ctitle(5, 10)',
        content: '@cparagraph(1, 3)',
        time: '@datetime("MM-dd HH:mm")',
        'read|1': [true, false]
      }],
      total: 20
    }
  })
})

// 3. 专题创作模块
Mock.mock(/topics/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'list|6': [{
        'id|+1': 1,
        title: '@ctitle(10, 20)',
        'status|1': ['草稿', '已发布', '审核中'],
        createTime: '@date("yyyy-MM-dd")',
        'viewCount|0-500': 1
      }]
    }
  })
})

// 4. 笔记模块
Mock.mock(/notes/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'list|6': [{
        'id|+1': 1,
        title: '@ctitle(10, 20)',
        content: '@cparagraph(2, 5)',
        createTime: '@date("yyyy-MM-dd")',
        course: '@ctitle(5, 10)'
      }]
    }
  })
})

// 5. 云盘模块
Mock.mock(/cloud\/files/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'list|10': [{
        'id|+1': 1,
        name: '@ctitle(5, 10)',
        'type|1': ['file', 'folder'],
        size: '@integer(1024, 102400)',
        updateTime: '@datetime("MM-dd HH:mm")'
      }]
    }
  })
})

// 6. AI课堂总结
Mock.mock(/ai\/summary/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      summary: '@cparagraph(10, 20)',
      keywords: '@word(5, 10)'
    }
  })
})

// 7. 智能练习
Mock.mock(/practice\/questions/, 'get', () => {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'list|5': [{
        'id|+1': 1,
        title: '@ctitle(15, 30)',
        'type|1': ['单选', '多选', '判断'],
        'difficulty|1': ['简单', '中等', '困难']
      }]
    }
  })
})

export default Mock