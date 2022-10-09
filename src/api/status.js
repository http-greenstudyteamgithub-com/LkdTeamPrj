import request from '@/utils/request'

/** 搜索售货机(售货机列表)
 *
 * @param {*} data  Object  pageImdex页码  pageSize 每一页数量
 * @returns
 */
export const getAutomatAPI = (data) => {
  return request({
    url: '/api/vm-service/vm/search',
    params: data
  })
}
// 售货机类型列表(搜索)
/**
 *  售货机类型列表(搜索)
 * @param {*} data
 * @returns
 */
export const getTypeAPI = (data) => {
  return request({
    url: '/api/vm-service/vmType/search',
    params: data
  })
}
// 获取
export const getNodeAPI = (data) => {
  return request({
    url: '/api/vm-service/node/search',
    params: data
  })
}
// 新增售货机
export const getVmAPI = (data) => {
  return request({
    url: '/api/vm-service/vm',
    method: 'POST',
    data
  })
}
// 获取一定时间范围之内的订单总数

export const orderCountAPI = (data) => {
  return request({
    url: '/api/order-service/report/orderCount',
    params: data
  })
}
// 获取一定时间范围之内的收入
export const gteOrderAmountAPI = (data) => {
  return request({
    url: '/api/order-service/report/orderAmount',
    params: data
  })
}

// 获取售货机补货次数
export const getSupplyCountAPI = (data) => {
  return request({
    url: `/api/task-service/task/supplyCount/${data.innerCode}/${data.start}/${data.end}`
  })
}

// 获取售货机维修次数
export const getRepairCountAPI = (data) => {
  return request({
    url: `/api/task-service/task/repairCount/${data.innerCode}/${data.start}/${data.end}`
  })
}

// 获取售货机商品销量

export const getSkuCollectAPI = (data) => {
  return request({
    url: `/api/order-service/report/skuCollect/${data.innerCode}/${data.start}/${data.end}`
  })
}

/**
 *新增售货机类型
 * @param {*} data
 * @returns
 */
export const addVmType = (data) => {
  return request({
    url: '/api/vm-service/vmType',
    method: 'POST',
    data
  })
}

/**
 *修改售货机类型
 * @param {*} typeId
 * @returns
 */
export const modifyVmType = (data) => {
  return request({
    url: `/api/vm-service/vmType/${data.typeId}`,
    method: 'PUT',
    data
  })
}

/**
 *删除售货机类型
 * @param {*} typeId
 * @returns
 */
export const delVmType = (typeId) => {
  return request({
    url: `/api/vm-service/vmType/${typeId}`,
    method: 'DELETE'
  })
}
