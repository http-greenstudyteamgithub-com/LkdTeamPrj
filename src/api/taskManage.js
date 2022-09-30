import request from '@/utils/request'
/**
 *工单搜索
 * @param {*} param0 参数传入一个对象
 * @returns promise
 */
export const taskSearchResult = ({ pageIndex, pageSize, innerCode, userId, taskCode, status, isRepair, start, end }) => {
  const obj = { pageIndex, pageSize, innerCode, userId, taskCode, status, isRepair, start, end }
  return request({
    url: '/api/task-service/task/search',
    params: obj
  })
}
/**
 *工单状态列表 枚举: 待办中,进行中,已取消,已完成
 * @returns Promise
 */
export const getAllTaskStatus = () => {
  return request({
    url: '/api/task-service/task/allTaskStatus'
  })
}
/**
 *获取所有工单类型 投放工单,补货工单,维修工单,撤机工单
 * @returns
 */
export const getTaskType = () => {
  return request({
    url: '/api/task-service/taskType/list'
  })
}
/**
 * 创建工单
 * @param {*} data
 * @returns
 */
export const createTask = (data) => {
  return request({
    url: '/api/task-service/task/create',
    method: 'POST',
    data
  })
}
/**
 *获取补货预警值
 * @returns Promise
 */
export const getAlertValue = () => {
  return request({
    url: '/api/task-service/task/supplyAlertValue'
  })
}
export const setAutoSupplyConfig = (alertValue) => {
  return request({
    url: '/api/task-service/task/autoSupplyConfig',
    method: 'POST',
    data: {
      alertValue
    }
  })
}
/**
 *取消工单
 * @param {*} taskId
 * @returns
 */
export const cancelTask = (taskId) => {
  return request({
    url: `/api/task-service/task/cancel/${taskId}`,
    method: 'POST',
    data: {
      taskId,
      desc: ''
    }
  })
}
/**
 * 获取工单详情
 * @param {*} taskId
 * @returns
 */
export const getTaskInfo = (taskId) => {
  return request({
    url: `/api/task-service/task/taskInfo/${taskId}`
  })
}
/**
 *获取补货详情
 * @param {*} taskId
 * @returns
 */
export const getTaskDetails = (taskId) => {
  return request({
    url: `api/task-service/taskDetails/${taskId}`
  })
}
