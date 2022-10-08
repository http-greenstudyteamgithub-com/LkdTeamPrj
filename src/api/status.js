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
