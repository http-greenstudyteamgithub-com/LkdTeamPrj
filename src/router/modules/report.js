// 对账统计模块
import Layout from '@/layout'

export default {
  path: '/report',
  component: Layout,
  meta: { title: '对账统计', icon: 'icon-zhangdan_o' },
  children: [
    {
      path: '/report/index',
      component: () => import('@/views/report'),
      meta: { title: '对账统计' }
    }
  ]
}
