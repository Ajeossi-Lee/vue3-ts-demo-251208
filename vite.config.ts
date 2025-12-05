import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
    tailwindcss(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹目录
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgIcons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
      //svgo额外配置，具体配置参考https://github.com/svg/svgo
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: { attrs: ['class', 'data-name', 'fill', 'stroke'] }
          }
        ]
      }
    })
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
