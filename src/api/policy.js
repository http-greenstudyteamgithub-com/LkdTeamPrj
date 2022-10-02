import request from '@/utils/request'
// 策略详情弹出层
export const getVmPolicyAPI = (policyId) => {
  return request({
    url: `/api/vm-service/policy/vmList/${policyId}`,
    params: {
      policyId
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
