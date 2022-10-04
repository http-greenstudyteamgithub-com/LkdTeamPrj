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

/**
 *获取地区
 * @param
 * @returns
 */
export const getregionList = () => {
  return request({
    url: '/api/vm-service/region/search'
  })
}

/**
 *
 * @param {page,pagelist} params
 * @returns  人员列表
 */
export const getuserlist = (params) => {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}
export const updateFile = () => {
  return request({
    url: '/api/vm-service/sku/fileUpload',
    method: 'POST'
  })
}

/**
 *
 * @param {page,pagelist} params
 * @returns  人员工作量
 */
export const getuserWorklist = (params) => {
  return request({
    url: '/api/user-service/user/searchUserWork',
    params
  })
}

/**
 *
 * @param
 * @returns  个人信息
 */
export const getuserInfo = (id) => {
  return request({
    url: `/api/user-service/user/${id}`
  })
}

/**
 *
 * @param userId, start, end
 * @returns  个人工作量信息
 */
export const getuserWorkInfo = (userId, start, end) => {
  return request({
    url: '/api/task-service/task/userWork',
    params: {
      userId,
      start,
      end
    }
  })
}
