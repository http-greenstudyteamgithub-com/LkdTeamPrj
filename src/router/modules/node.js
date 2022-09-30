// 点位管理模块
import Layout from '@/layout'

export default {
  path: '/node',
  // redirect: '/node/region',
  component: Layout,
  meta: { title: '点位管理', icon: 'icon-weizhi' },
  children: [
    {
      path: '/node/region',
      component: () => import('@/views/node/region'),
      meta: { title: '区域管理' }
    },
    {
      path: '/node/node',
      component: () => import('@/views/node/node'),
      meta: { title: '点位管理' }
    },
    {
      path: '/node/partner',
      component: () => import('@/views/node/partner'),
      meta: { title: '合作商管理' }
    }
  ]
}
