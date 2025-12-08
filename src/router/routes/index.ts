import type { AppRouteModule } from '../types'
import { basicRoutes } from './basic'

/**
 * 动态加载路由模块
 * 自动导入 modules 目录下的所有路由模块
 */
const modules = import.meta.glob<{ default: AppRouteModule }>('./modules/**/*.ts', {
  eager: true
})

/**
 * 路由模块列表
 */
const routeModuleList: AppRouteModule[] = []

// 遍历所有模块并添加到路由列表
Object.keys(modules).forEach((key) => {
  const mod = modules[key]?.default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

/**
 * 所有路由配置
 * 基础路由 + 动态加载的路由模块
 */
export const allRoutes: AppRouteModule[] = [...basicRoutes, ...routeModuleList]

/**
 * 基础路由（用于白名单）
 */
export { basicRoutes }

