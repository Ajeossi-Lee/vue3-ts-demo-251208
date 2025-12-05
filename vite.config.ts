import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })] // 按需导入样式
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 在每个按需导入的 SCSS 文件前自动注入变量覆盖
        additionalData: `@use "@/styles/element-variables.scss" as *;`
      }
    }
  },
  server: {
    port: 3111,
    proxy: {
      '/api': {
        // https://zhuanlan.zhihu.com/p/378228376
        // target: loadEnv(mode, process.cwd()).VITE_URL,
        // target: 'http://127.0.0.1:8000',
        changeOrigin: true
        // 将api替换为空
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
