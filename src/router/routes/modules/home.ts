import type { AppRouteModule } from '../../types'

const LAYOUT = () => import('@/layout/index.vue')

/**
 * Home 路由模块
 * 示例：基础路由模块配置
 */
const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  meta: {
    title: '首页',
    icon: 'home',
    order: 1
  },
  children: [
    {
      path: '',
      name: 'HomeIndex',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        hideMenu: false
      }
    }
  ]
}

export default home

