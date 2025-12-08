import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/style.css'
import '@/styles/global.scss'
import { setupStore } from '@/store'
import { setupI18n } from '@/locales/index'
import { registerGlobComp } from '@/components'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'

async function bootstrap() {
  const app = createApp(App)
  // 多语言配置
  setupI18n(app)
  // 配置 store
  setupStore(app)
  // 配置路由
  setupRouter(app)
  // 路由守卫
  setupRouterGuard(router)
  // 注册全局组件
  registerGlobComp(app)

  app.mount('#app')
}

bootstrap()
