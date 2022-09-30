import request from '@/utils/request'

/**
 *工单状态统计
 * @param {*} start 2020-11-01	开始日期
 * @param {*} end 2020-12-31	结束日期
 * @returns Promise
 */
export const workOrderStatic = (start, end) => {
  return request({
    url: `/api/task-service/task/collectReport/${start}/${end}`
  })
}
/**
 *获取当时工单汇总信息(人员统计头部信息)
 * @param {*} start 2020-01-01 00:00:00	开始时间
 * @param {*} end 2020-01-01 23:59:59	结束时间
 * @returns
 */
export const getNowWorkOrderInfo = (start, end) => {
  return request({
    url: `/api/task-service/task/taskReportInfo/${start}/${end}`
  })
}
/**
 *获取用户基本信息
 * @param {*} id
 * @returns
 */
export const getUserInfo = (id) => {
  return request({
    url: `/api/user-service/user/${id}`
  })
}
/**
 *根据售货机获取运营人员列表
 * @param {*} innerCode 设备编号
 * @returns
 */
export const getOperatorListByInnderCode = (innerCode) => {
  return request({
    url: `/api/user-service/user/operatorList/${innerCode}`
  })
}
