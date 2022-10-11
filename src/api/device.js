import request from '@/utils/request'

//  获取策略
export const getPolicyAPI = () => {
  return request({
    url: 'api/vm-service/policy'
  })
}
//  应用策略
export const setApplyPolicyAPI = (data) => {
  return request({
    url: '/api/vm-service/vm/applyPolicy',
    method: 'PUT',
    data
  })
}
// 查询售货机策略
export const getVmPolicyAPI = (innerCode) => {
  return request({
    url: `/api/vm-service/policy/vmPolicy/${innerCode}`
  })
}

// 取消策略
export const cancelPolicyAPI = (data) => {
  return request({
    url: `/api/vm-service/vm/cancelPolicy/${data.innerCode}/${data.policyId}`,
    method: 'PUT'
  })
}

// 修改售货机点位
export const editPointAPI = (data) => {
  return request({
    url: `/api/vm-service/vm/${data.id}/${data.nodeId}`,
    method: 'PUT'
  })
}
//  货道
/**
 *搜索售货机(售货机列表)
 * @param {*} param0
 * @returns
 */
export const getVmSearchResult = ({ pageIndex, pageSize, status, innerCode }) => {
  const obj = { pageIndex, pageSize, status, innerCode }
  return request({
    url: '/api/vm-service/vm/search',
    params: obj
  })
}

/**
 *获取售货机货道详情
 * @param {*} param0
 * @returns
 */
export const getVmChannelList = (innerCode) => {
  return request({
    url: `/api/vm-service/channel/channelList/${innerCode}`
  })
}
/**
 *货道配置
 * @param {*} innerCode
 * @param {*} channelList
 * @returns
 */
export const setChannel = (innerCode, channelList) => {
  return request({
    url: '/api/vm-service/channel/channelConfig',
    method: 'PUT',
    data: {
      innerCode,
      channelList
    }
  })
}
export const searchGoods = ({ pageIndex, pageSize, skuName, classId }) => {
  const obj = { pageIndex, pageSize, skuName, classId }
  return request({
    url: '/api/vm-service/sku/search',
    params: obj
  })
}
// 获取商圈下销量前10的商品(补货推荐)
export const getBusinessTop10API = (id) => {
  return request({
    url: `/api/vm-service/sku/businessTop10/${id}`
  })
}
//  获取商圈名字
export const getName = (id) => {
  return request({
    url: `/api/vm-service/businessType/name/${id}`
  })
}
