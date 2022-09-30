// 策略管理模块
import Layout from '@/layout'

export default {
  path: '/policy',
  component: Layout,
  meta: { title: '策略管理', icon: 'icon-dengpao' },
  children: [
    {
      path: '/policy/index',
      component: () => import('@/views/policy'),
      meta: { title: '策略管理' }
    }
  ]
}
