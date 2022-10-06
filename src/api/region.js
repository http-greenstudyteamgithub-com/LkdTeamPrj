import request from '@/utils/request'

/**
 *区域列表
 * @param {*} param0 传入一个对象
 * @returns Promise
 */
export const getRegion = ({ pageIndex, pageSize, name }) => {
  const obj = { pageIndex, pageSize, name }
  return request({
    url: '/api/vm-service/region/search',
    params: obj
  })
}

/**
 *合作商列表
 * @param {*} param0
 * @returns Promise
 */
export const getPartner = ({ pageIndex, pageSize, name }) => {
  const obj = { pageIndex, pageSize, name }
  return request({
    url: '/api/user-service/partner/search',
    params: obj
  })
}

/**
 * 点位列表
 * @param {*} param0
 * @returns Promise
 */
export const getNode = ({ pageIndex, pageSize, name, regionId }) => {
  const obj = { pageIndex, pageSize, name, regionId }
  return request({
    url: '/api/vm-service/node/search',
    params: obj
  })
}
/**
 * 区域详情
 * @param {*} regionId
 * @returns Promise
 */
export const getNodeRegion = (regionId) => {
  return request({
    url: `/api/vm-service/region/${regionId}`
  })
}

/**
 * 点位详情
 * @param {*} id
 * @returns Promise
 */
export const getNodeStatus = (regionId) => {
  return request({
    url: `/api/vm-service/node/vmList/${regionId}`
  })
}
/**
 * 删除区域
 * @param {*} regionId
 * @returns
 */
export const delRegion = (regionId) => {
  return request({
    url: `/api/vm-service/region/${regionId}`,
    method: 'DELETE'
  })
}

/**
 * 新增区域
 * @param {*} param0
 * @returns
 */
export const addRegion = (regionName, remark) => {
  return request({
    url: '/api/vm-service/region',
    method: 'POST',
    data: regionName, remark

  })
}
