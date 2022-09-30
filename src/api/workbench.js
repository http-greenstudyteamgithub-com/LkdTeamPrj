import request from '@/utils/request'
/**
 *获取销售前几的商品
 * @param {Number} top 前几的商品
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns
 */
export const getTopSku = (top, start, end) => {
  return request({
    url: `/api/order-service/report/skuTop/${top}/${start}/${end}`
  })
}
/**
 *获取销售额统计
 * @param {Number} collectType 统计时间类型，1:按日统计，2:按月统计
 * @param {*} start 2020-01-01	开始日期
 * @param {*} end 2020-01-01	结束日期
 * @returns
 */
export const getAmountCollect = (collectType, start, end) => {
  return request({
    url: `/api/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

/**
 *根据地区汇总销售额数据(销售量分布)
 * @param {*} start 2020-01-01	开始日期
 * @param {*} end 2020-01-01	结束日期
 * @returns
 */
export const getRegionCollect = (start, end) => {
  return request({
    url: `/api/order-service/report/regionCollect/${start}/${end}`
  })
}

export const getNodeCollect = () => {
  return request({
    url: '/api/vm-service/node/nodeCollect'
  })
}
