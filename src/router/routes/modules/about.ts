import type { AppRouteModule } from '../../types'

const LAYOUT = () => import('@/layout/index.vue')

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/demo',
  meta: {
    hideChildrenInMenu: true,
    title: 'About'
  },

  children: [
    {
      path: 'demo',
      name: 'demo',
      component: () => import('@/views/about/demo/index.vue'),
      meta: {
        title: 'demo',
        hideMenu: true
      }
    },
    {
      path: 'demo2',
      name: 'demo2',
      component: () => import('@/views/about/demo2/index.vue'),
      meta: {
        title: 'demo2',
        hideMenu: true
      }
    }
  ]
}

export default about
