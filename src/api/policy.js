import request from '@/utils/request'
// 策略详情弹出层
export const getVmPolicyAPI = (policyId, pageIndex, pageSize) => {
  return request({
    url: `/api/vm-service/policy/vmList/${policyId}`,
    params: {
      pageIndex,
      pageSize
    }
  })
}
// 策略列表
export const getTacticsListAPI = () => {
  return request({
    url: '/api/vm-service/policy'
  })
}

// 搜索
export const getSearthListAPI = (pageIndex, pageSize, policyName) => {
  return request({
    url: `/api/vm-service/policy/search`,
    params: {
      pageIndex, pageSize, policyName
    }
  })
}
// 新增策略
export const getNewStrategyAPI = (policyName, discount) => {
  return request({
    url: '/api/vm-service/policy',
    method: 'POST',
    data: {
      policyName,
      discount
    }
  })
}
// 修改策略
export const getAmendStrategyAPI = (policyId, policyName, discount) => {
  return request({
    url: `/api/vm-service/policy/${policyId}`,
    method: 'PUT',
    data: {
      policyName,
      discount
    }
  })
}

// 删除策略
export const deletefnAPI = (policyId, pageIndex, pageSize, policyName) => {
  return request({
    url: `/api/vm-service/policy/${policyId}`,
    method: 'DELETE',
    pageIndex,
    pageSize,
    policyName

  })
}

