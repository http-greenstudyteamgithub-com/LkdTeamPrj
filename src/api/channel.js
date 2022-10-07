import request from '@/utils/request'

/**
 *获取售货机货道详情
 * @param {*} innerCode
 * @returns Promise
 */
export const getChannelList = (innerCode) => {
  return request({
    url: `/api/vm-service/channel/channelList/${innerCode}`
  })
}
