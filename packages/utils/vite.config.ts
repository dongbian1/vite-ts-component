import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

/**
 * @npm_cjx/utils 工具包构建配置
 * 产物目录：dist/es（ESM）与 dist/lib（CJS）
 */
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'es',
    minify: true,
    rollupOptions: {
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          // 保持模块目录结构
          preserveModules: true,
          dir: resolve(__dirname, './dist/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: resolve(__dirname, './dist/lib')
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'utils'
    }
  },

  plugins: [
    // es / lib 各生成一份声明文件
    dts({
      entryRoot: './',
      include: ['index.ts', 'withinstall'],
      exclude: ['vite.config.ts'],
      outDir: resolve(__dirname, './dist/es'),
      // 使用本包专用 tsconfig，避免扫到 monorepo 其它目录
      tsconfigPath: resolve(__dirname, './tsconfig.build.json')
    }),
    dts({
      entryRoot: './',
      include: ['index.ts', 'withinstall'],
      exclude: ['vite.config.ts'],
      outDir: resolve(__dirname, './dist/lib'),
      tsconfigPath: resolve(__dirname, './tsconfig.build.json')
    })
  ]
})
