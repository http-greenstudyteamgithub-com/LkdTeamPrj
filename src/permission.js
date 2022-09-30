import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

const tokenActiveTime = 7200// 秒

const isTokenTimeout = () => {
  const interval = (+new Date() - store.getters.loginTime) / 1000
  return interval > tokenActiveTime
}

// 全局前置守卫
// 通过token来判断登录状态
// 如果token存在 判断要去的路径是是不是登录页面 是登录页面就跳转到首页 不是就放行
// 如果token不存在 判断要去的路径是不是白名单 如果是就放行 不是就跳转到登录页面
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  // 存在token
  if (store.getters.token) {
    // console.log('纯在token')
    if (!isTokenTimeout()) {
      if (to.path === '/login') {
        next('/')
      } else {
        next()
      }
    } else {
      store.dispatch('user/logout')
      Message.error('token过期')
      next('/login')
    }
  } else {
    // console.log('不纯在token')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.dispatch('user/logout')
      Message.error('token过期')
      next('/login')
    }
  }
})
