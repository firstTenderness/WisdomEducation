import request from '@/utils/request'

// 1. 登录（对接真实后端，参数为account/password）
export const login = (data) => request.post('/login', data)

// 2. 获取用户信息（含role_type）
export const getUserInfo = () => request.get('/user/info')

// 3. 课程/收件箱等模块（Mock拦截，无API前缀）
export const getCourseList = (params) => request.get('/courses', { params })
export const getMessageList = (params) => request.get('/messages', { params })
export const getTopicList = () => request.get('/topics')
export const getNoteList = () => request.get('/notes')
export const getFileList = () => request.get('/cloud/files')
export const getAISummary = () => request.get('/ai/summary')
export const getPracticeList = () => request.get('/practice/questions')