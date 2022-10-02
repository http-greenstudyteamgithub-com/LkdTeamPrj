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
