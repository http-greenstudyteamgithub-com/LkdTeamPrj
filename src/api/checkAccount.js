import request from '@/utils/request'
/**
 *
 * @param {*} start 2020-01-01 00:00:00	开始日期时间
 * @param {*} end 2020-01-01 00:00:00	结束日期时间
 * @returns
 */
export const getOrderCount = (start, end) => {
  return request({
    url: '/api/order-service/report/orderCount',
    params: {
      start,
      end
    }
  })
}
/**
 * 获取一定时间范围之内的收入
 * @param {*} start 2020-01-01 00:00:00	开始日期时间
 * @param {*} end 2020-01-01 00:00:00	结束日期时间
 * @returns
 */
export const getOrderAmount = (start, end) => {
  return request({
    url: '/api/order-service/report/orderAmount',
    params: {
      start,
      end
    }
  })
}

export const getFailureEquipmentNumber = () => {
  return request({
    url: '/api/status-service/status/top10'
  })
}
