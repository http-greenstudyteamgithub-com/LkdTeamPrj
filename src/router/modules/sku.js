// 商品管理模块
import Layout from '@/layout'

export default {
  path: '/sku',
  component: Layout,
  meta: { title: '商品管理', icon: 'icon-pintu' },
  children: [
    {
      path: '/sku/sku-class',
      component: () => import('@/views/sku/class'),
      meta: { title: '商品类型' }
    },
    {
      path: '/sku/sku',
      component: () => import('@/views/sku/sku'),
      meta: { title: '商品管理' }
    }
  ]
}
