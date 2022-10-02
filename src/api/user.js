import request from '@/utils/request'

/**
 *获取销售前几的商品
 * @param
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns
 */
export const getTodayData = (start, end) => {
  return request({
    url: `api/task-service/task/taskReportInfo/${start}/${end}`
  })
}
