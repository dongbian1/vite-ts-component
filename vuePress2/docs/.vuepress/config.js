// import { defaultTheme } from '@vuepress/theme-default'
import localTheme from './theme'
import navbar from './config/navbar'
import sidebar from './config/sidebar'
import registerComponentsPlugin from '@vuepress/plugin-register-components'
import anchor from 'markdown-it-anchor'
import { path } from '@vuepress/utils'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'

module.exports = {
  title: '码上升天',
  description: '一个不甘平凡又非常平凡的人',
  base: '/vite-ts-component',
  themeConfig: {
    subSidebar: 'light',
    navbar: navbar
  },
  alias: {
    '@style': path.resolve(__dirname, './styles')
  },
  markdown: {
    anchor: {
      level: [1, 2, 3, 4, 5, 6],
      permalink: anchor.permalink.ariaHidden({
        class: 'header-anchor',
        placement: 'before', //可设置为after
        symbol: '#' //显示文字，可自行修改
      })
    },
    code: {
      highlightLines: true, //是否启用高亮功能
      lineNumbers: true, //是否启用行号功能
      preWrapper: true, //是否启用外包装层，上面两个选项的依赖项，启用上面两项必须启用这一项
      vPre: {
        block: true, //代码块启用v-pre标签
        inline: true //行内代码启用v-pre标签
      }
    }
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  theme: localTheme({
    // 在这里进行配置
    navbar,
    sidebar,
    colorMode: 'light', // dark
    colorModeSwitch: true
  }),
  plugins: [
    copyCodePlugin({
      locales: {
        '/': {
          copy: '复制'
        }
      }
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ],
}
