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
