import request from '@/utils/request'

export const getOrderSearchAPI = (pageIndex, pageSize, orderNo, startDate, endDate) => {
  return request({
    url: '/api/order-service/order/search',
    params: {
      pageIndex,
      pageSize,
      orderNo,
      startDate,
      endDate
    }
  })
}
