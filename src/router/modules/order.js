// 订单管理模块
import Layout from '@/layout'

export default {
  path: '/order',
  component: Layout,
  meta: { title: '订单管理', icon: 'icon-74wodedingdan' },
  children: [
    {
      path: '/order/index',
      component: () => import('@/views/order'),
      meta: { title: '订单管理' }
    }
  ]
}
