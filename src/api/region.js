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
/**
 * 删除点位
 * @param {*} name
 * @param {*} regionId
 * @returns
 */
export const delNode = (name, regionId) => {
  return request({
    url: `/api/vm-service/node/${regionId}`,
    method: 'DELETE'
  })
}

export const addPartner = ({ name, account, password, ratio, contact, mobile }) => {
  const res = { name, account, password, ratio, contact, mobile }
  return request({
    url: '/api/user-service/partner',
    method: 'POST',
    data: res
  })
}

/**
 * 删除合作商
 * @param {*} id
 * @returns
 */
export const delPartner = (id) => {
  return request({
    url: `/api/user-service/partner/${id}`,
    method: 'DELETE'

  })
}
/**
 * 修改合作商
 * @param {*} param0
 * @returns
 */
export const changePartner = ({ name, ratio, contact, mobile, id }) => {
  const result = { name, ratio, contact, mobile, id }
  return request({
    url: `/api/user-service/partner/${id}`,
    method: 'PUT',
    data: result
  })
}
/**
 * 修改点位
 * @param {*} param0
 * @returns
 */
export const changeNode = ({ name, addr, areaCode, createUserId, regionId, businessId, ownerId, ownerName }) => {
  const res = { name, addr, areaCode, createUserId, regionId, businessId, ownerId, ownerName }
  return request({
    url: `/api/vm-service/node/${createUserId}`,
    method: 'PUT',
    data: res
  })
}
/**
 * 新增点位
 * @param {*} params
 * @returns
 */
export const addNode = (params) => {
  return request({
    url: '/api/vm-service/node',
    method: 'POST',
    params
  })
}
