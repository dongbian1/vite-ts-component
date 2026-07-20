import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'

const componentsRoot = fileURLToPath(
  new URL('../../packages/components', import.meta.url)
)

/**
 * cjx-zdy-ui 组件文档（VitePress，风格对齐 Element Plus）
 */
export default defineConfig({
  title: 'cjx-zdy-ui',
  description: '基于 Element Plus 的 Vue3 组件库',
  base: '/vite-ts-component/',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/component/pro-table' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' }
          ]
        }
      ],
      '/component/': [
        {
          text: 'Data 数据展示',
          items: [{ text: 'ProTable 高级表格', link: '/component/pro-table' }]
        },
        {
          text: 'Feedback 反馈',
          items: [{ text: 'ProModal 弹窗表单', link: '/component/pro-modal' }]
        }
      ]
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/dongbian1/vite-ts-component'
      }
    ],
    outline: {
      label: '页面导航',
      level: [2, 3]
    },
    search: {
      provider: 'local'
    }
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: [
        {
          find: '@utils',
          replacement: resolve(componentsRoot, 't-utils')
        },
        {
          find: /^@\//,
          replacement: `${resolve(componentsRoot, 'src')}/`
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'import']
        }
      }
    },
    ssr: {
      noExternal: ['element-plus', 'cjx-zdy-ui']
    }
  }
})
