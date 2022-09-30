import request from '@/utils/request'
/**
 * 获取图片验证码
 * @param {*} clientToken
 * @returns
 */
export const getImageCodeAPI = (clientToken) => {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    // 图片流：指定responseType为blob
    responseType: 'blob'
  })
}

/**
 *用户登录
 * @param {String} loginName
 * @param {String} password
 * @param {String} code
 * @returns
 */
export const loginAPI = ({ loginName, password, code, clientToken }) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data: {
      loginName,
      password,
      code,
      clientToken,
      loginType: 0
    }
  })
}
