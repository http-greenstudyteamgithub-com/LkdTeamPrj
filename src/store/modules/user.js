// 登录模块
import { loginAPI, getUserInfo } from '@/api'
import { Message } from 'element-ui'
const state = {
  loginUserInfo: {},
  userToken: null,
  loginTime: 0
}
const mutations = {
  SET_LOGIN_USERINFO(state, userInfo) {
    state.loginUserInfo = userInfo
    state.userToken = userInfo.token
  },
  SET_TOKEN(state, token) {
    state.userToken = token
  },
  REMOVE_USERINFO(state) {
    state.loginUserInfo = null
  },
  REMOVE_TOKEN(state) {
    state.userToken = null
  },
  SET_LOGIN_TIME(state) {
    state.loginTime = +new Date()
  },
  REMOVE_LOGIN_TIME(state) {
    state.loginTime = 0
  }
}
const actions = {
  // 不把路由跳转的逻辑放在这里面 清除数据不一定要跳转
  async login(context, loginForm) {
    try {
      const data = await loginAPI(loginForm)
      context.commit('SET_TOKEN', data.token)
      if (data.userId) {
        const data2 = await getUserInfo(data.userId)
        const userInfo = {
          ...data, ...data2
        }
        context.commit('SET_LOGIN_USERINFO', userInfo)
        context.commit('SET_LOGIN_TIME')
        return userInfo
      } else {
        Message({
          message: data.msg,
          type: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  logout(context) {
    context.commit('REMOVE_USERINFO')
    context.commit('REMOVE_TOKEN')
    context.commit('REMOVE_LOGIN_TIME')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

