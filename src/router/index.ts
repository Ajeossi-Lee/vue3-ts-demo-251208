import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { AppRouteModule } from './types'
import { allRoutes, basicRoutes } from './routes'
import { setupRouterGuard } from './guard'

/**
 * 白名单路由名称列表
 * 这些路由不会被 resetRouter 清除
 */
const WHITE_NAME_LIST: string[] = []

/**
 * 递归获取所有路由名称
 * @param routes 路由数组
 */
const getRouteNames = (routes: AppRouteModule[]): void => {
  routes.forEach((route) => {
    if (route.name) {
      WHITE_NAME_LIST.push(route.name as string)
    }
    if (route.children && route.children.length > 0) {
      getRouteNames(route.children)
    }
  })
}

// 初始化白名单（只包含基础路由）
getRouteNames(basicRoutes)

/**
 * 路由实例
 */
export const router = createRouter({
  // 使用 hash 模式
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
  // 路由配置
  routes: allRoutes as unknown as RouteRecordRaw[],
  // 严格模式：禁止尾部斜杠
  strict: true,
  // 滚动行为：路由切换时滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 重置路由
 * 清除所有非白名单路由，用于权限变更时重新加载路由
 */
export function resetRouter(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      if (router.hasRoute(name)) {
        router.removeRoute(name)
      }
    }
  })
}

/**
 * 配置路由
 * @param app Vue 应用实例
 */
export function setupRouter(app: App<Element>): void {
  app.use(router)
  // 设置路由守卫
  setupRouterGuard(router)
}
