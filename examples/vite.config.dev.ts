import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const componentsRoot = resolve(__dirname, '../packages/components')

/**
 * 示例站开发配置
 * workspace 直接吃组件源码，需同步组件库内部 @ / @utils 别名
 */
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: [
      // 必须写在 @ 前面，否则会被 @ 前缀吞掉
      {
        find: '@utils',
        replacement: resolve(componentsRoot, 't-utils')
      },
      {
        find: /^@\//,
        replacement: `${resolve(componentsRoot, 'src')}/`
      }
    ]
  }
})
