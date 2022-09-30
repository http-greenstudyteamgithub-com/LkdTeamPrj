// 人员管理模块
import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  meta: { title: '人员管理', icon: 'icon-renyuanguanli' },
  children: [
    {
      path: '/user/index',
      component: () => import('@/views/user/index'),
      meta: { title: '人员列表' }
    },
    {
      path: '/user/user-task-stats',
      component: () => import('@/views/user/taskStats'),
      meta: { title: '人效统计' }
    },
    {
      path: '/user/user-work',
      component: () => import('@/views/user/userWork'),
      meta: { title: '工作量列表' }
    }
  ]
}
