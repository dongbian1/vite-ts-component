import { defineClientConfig } from '@vuepress/client'
import HomeLayout from './components/HomeLayout.vue'
import Layout from './layouts/Layout.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Modal from './components/FlexibleModal/ModalService'

export default defineClientConfig({
  enhance({ app }) {
    app.use(ElementPlus).use(Modal)
  },
  layouts: {
    HomeLayout,
    Layout
  }
})
