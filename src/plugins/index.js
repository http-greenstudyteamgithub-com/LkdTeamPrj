import * as directives from './directives.js'
import * as filters from './filters'
import * as components from './components'

export default {
  install(Vue) {
    // 注册自定义指令
    Object.keys(directives).forEach(item => {
      Vue.directive(item, directives[item])
    })
    // 注册组件
    Object.keys(components).forEach(item => {
      Vue.component(item, components[item])
    })
    // 注册全局过滤器
    Object.keys(filters).forEach(item => {
      Vue.filter(item, filters[item])
    })
  }
}
