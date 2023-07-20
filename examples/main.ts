import { createApp } from 'vue'
import App from './app.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import CjxUI from 'cjx-zdy-ui'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn }).use(CjxUI).mount('#app')
