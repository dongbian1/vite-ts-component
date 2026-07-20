import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
import DemoBlock from './components/DemoBlock.vue'
import './style.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout),
  enhanceApp({ app }) {
    app.provide(ID_INJECTION_KEY, {
      prefix: 1024,
      current: 0
    })
    app.use(ElementPlus)
    app.component('DemoBlock', DemoBlock)
  }
} satisfies Theme
