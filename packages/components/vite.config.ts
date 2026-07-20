import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

/**
 * cjx-zdy-ui 组件库构建配置
 * 产物目录：cjx-zdy-ui/es（ESM）与 cjx-zdy-ui/lib（CJS）
 */
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'es',
    // 样式由 gulp 单独处理，避免清空已有产物
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      // peer 依赖与样式源文件不打进包，由使用方 / gulp 处理
      external: [
        'vue',
        /\.scss/,
        'element-plus',
        '@element-plus/icons-vue'
      ],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          // 保持源码目录结构，便于按需引入
          preserveModules: true,
          exports: 'named',
          dir: resolve(__dirname, './cjx-zdy-ui/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: resolve(__dirname, './cjx-zdy-ui/lib')
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'cjx'
    }
  },

  plugins: [
    vue(),
    vueJsx(),
    // 生成 .d.ts，同步输出到 es / lib
    dts({
      include: ['./index.ts', './src', './t-utils'],
      cleanVueFileName: true,
      copyDtsFiles: true,
      entryRoot: './',
      outDir: [
        resolve(__dirname, './cjx-zdy-ui/es/'),
        resolve(__dirname, './cjx-zdy-ui/lib/')
      ],
      // 使用本包专用 tsconfig，避免扫到 monorepo 其它目录
      tsconfigPath: resolve(__dirname, './tsconfig.build.json')
    }),
    {
      // scss 由 gulp 编译成 css，这里把产物里的 .scss 引用改成 .css
      name: 'style',
      generateBundle(_config, bundle) {
        for (const key of Object.keys(bundle)) {
          const chunk = bundle[key]
          if (chunk.type === 'chunk' && typeof chunk.code === 'string') {
            chunk.code = chunk.code.replace(/\.scss/g, '.css')
          }
        }
      }
    }
  ],
  resolve: {
    alias: [
      // 必须写在 @ 前面，否则会被 @ 前缀吞掉
      {
        find: '@utils',
        replacement: resolve(__dirname, 't-utils')
      },
      {
        find: /^@\//,
        replacement: `${resolve(__dirname, 'src')}/`
      }
    ]
  }
})
