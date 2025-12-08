import type { AppRouteModule } from '../types'

const LAYOUT = () => import('@/layout/index.vue')

/**
 * 根路由
 */
export const RootRoute: AppRouteModule = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root',
    hideMenu: true,
    hideTab: true
  }
}

/**
 * 重定向路由
 */
export const RedirectRoute: AppRouteModule = {
  path: '/redirect',
  name: 'Redirect',
  component: LAYOUT,
  meta: {
    title: 'Redirect',
    hideMenu: true,
    hideTab: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'RedirectTo',
      component: () => import('@/views/system/redirect/index.vue'),
      meta: {
        title: 'Redirect',
        hideMenu: true,
        hideTab: true
      }
    }
  ]
}

/**
 * 404 路由
 */
export const PAGE_NOT_FOUND_ROUTE: AppRouteModule = {
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  component: LAYOUT,
  meta: {
    title: 'PageNotFound',
    hideMenu: true,
    hideTab: true
  },
  children: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/system/exception/index.vue'),
      meta: {
        title: '404',
        hideMenu: true,
        hideTab: true
      }
    }
  ]
}

/**
 * 基础路由列表
 */
export const basicRoutes: AppRouteModule[] = [
  RootRoute,
  RedirectRoute,
  PAGE_NOT_FOUND_ROUTE
]
