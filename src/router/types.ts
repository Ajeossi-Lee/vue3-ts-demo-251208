import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由元信息类型
 */
export interface RouteMeta {
  // 标题
  title?: string
  // 是否隐藏菜单
  hideMenu?: boolean
  // 是否隐藏子菜单
  hideChildrenInMenu?: boolean
  // 是否在标签页中隐藏
  hideTab?: boolean
  // 是否缓存
  keepAlive?: boolean
  // 图标
  icon?: string
  // 排序
  order?: number
  // 是否已加载
  loaded?: boolean
  // 权限标识
  permission?: string | string[]
  // 是否固定标签页
  affixTab?: boolean
  // 是否显示面包屑
  hideBreadcrumb?: boolean
  // 是否显示在菜单中
  hideInMenu?: boolean
}

/**
 * 路由配置模块类型
 */
export type AppRouteModule = RouteRecordRaw & {
  meta?: RouteMeta
  children?: AppRouteModule[]
}

/**
 * 路由配置类型
 */
export type AppRouteRecordRaw = AppRouteModule

