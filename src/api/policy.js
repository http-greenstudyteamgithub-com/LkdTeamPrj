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

