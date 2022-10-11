import request from '@/utils/request'

// 获取一定日期范围之内的合作商分成汇总数据
export const getCooperativePartnerAPI = (start, end, pageIndex, pageSize) => {
  return request({
    url: '/api/order-service/report/partnerCollect',
    params: {
      start,
      end,
      pageIndex,
      pageSize
    }
  })
}
// 获取一定时间范围之内的订单总数
export const getOrderCountAPI = (start, end) => {
  return request({
    url: '/api/order-service/report/orderCount',
    params: {
      start,
      end
    }
  })
}
// 获取一定时间范围之内的收入
export const getorderAmountAPI = (start, end) => {
  return request({
    url: '/api/order-service/report/orderAmount',
    params: {
      start,
      end
    }
  })
}
// 获取一定时间范围之内的分成总数

export const getTotalBillsAPI = (start, end) => {
  return request({
    url: '/api/order-service/report/totalBill',
    params: {
      start,
      end
    }
  })
}

// 合作商搜索

export const getPartnerSearchAPI = (pageIndex, pageSize) => {
  return request({
    url: '/api/user-service/partner/search',
    params: {
      pageIndex: 1,
      pageSize: 100000
    }
  })
}
