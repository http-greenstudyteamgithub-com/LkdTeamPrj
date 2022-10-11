import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import time from './modules/time'
import sku from './modules/sku' // by xh
import createPersistedState from 'vuex-persistedstate'// 引入持久化插件
import Cookies from 'js-cookie'// 引入cookie插件

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    time,
    sku
  },
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: key => Cookies.remove(key)
      },
      paths: ['user']
    })
  ]
})

export default store
