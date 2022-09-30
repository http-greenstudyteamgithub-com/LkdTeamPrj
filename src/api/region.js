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
