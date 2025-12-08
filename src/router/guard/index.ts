import type { Router, RouteLocationNormalized } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { warn } from '@/utils/log'
import nProgress from 'nprogress'
import useConfigStore from '@/store/modules/config'
import { AxiosCanceler } from '@/service/request/axiosCancel'

type Nullable<T> = T | null

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
}

/**
 * Hooks for handling page state
 * 页面已经加载完毕，重新打开会更快，不需要再做加载等处理
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    // 通知路由变化
    // setRouteChange(to)
    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

// Used to handle page loading status
function createPageLoadingGuard(router: Router) {
  // MARK: 是否打开页面切换loading
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }

    useConfigStore().handlePageLoading(true)
    return true
  })
  router.afterEach(async () => {
    // TODO Looking for a better way
    // The timer simulates the loading time to prevent flashing too fast,
    setTimeout(() => {
      useConfigStore().handlePageLoading(false)
    }, 220)

    return true
  })
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * 路由切换时，清除所有等待中的请求
 * @param router
 */
function createHttpGuard(router: Router) {
  const axiosCanceler: Nullable<AxiosCanceler> = new AxiosCanceler()
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

// Routing switch back to the top
// 回到顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  router.afterEach(async (to) => {
    // scroll top
    // vue-vben-admin\src\layouts\default\content\index.vue 定义类名.vben-layout-content
    if (isHash((to as RouteLocationNormalized & { href: string })?.href)) {
      document.querySelector('.lee-layout-content')?.scrollTo(0, 0)
    }
    return true
  })
}

/**
 * Used to close the message instance when the route is switched
 * 切换理由时，移除未关闭的消息通知
 * @param router
 */
export function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      ElMessage.closeAll()
      ElNotification.closeAll()
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}

// 加载进度条守卫
export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    // to.meta.loaded 已经加载过了，不需要再次加载
    if (to.meta.loaded) {
      return true
    }
    // MARK: 顶部进度条动态设置
    nProgress.start()
    return true
  })

  router.afterEach(async () => {
    nProgress.done()
    return true
  })
}
