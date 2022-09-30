import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// 创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // timeout: 3000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  if (store.state.user.userToken) {
    config.headers.Authorization = store.state.user.userToken
  }
  return config
})
// 响应拦截器
request.interceptors.response.use((response) => {
  // 登录验证 如果没有token 回到登录页 清除本地token
  // console.log(response)
  if (response.status === 401) {
    Message({
      type: 'error',
      message: '登录信息过期 请重新登录'
    })
    store.commit('user/logout')
    return response
  }
  const { data } = response
  return data
}, (error) => {
  if (error.message === 'Request failed with status code 401' && error.response.status === 401) {
    Message({
      type: 'error',
      message: '登录信息过期 请重新登录'
    })
    store.dispatch('user/logout')
  }
  return Promise.reject(error)
})

export default request
