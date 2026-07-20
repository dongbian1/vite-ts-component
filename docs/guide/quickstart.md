# 快速开始

## 完整引入

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import CjxUI from 'cjx-zdy-ui'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(CjxUI)
app.mount('#app')
```

## 按需引入

```vue
<script setup lang="ts">
import { ProTable, ProModal } from 'cjx-zdy-ui'
import type { ColumnProps, EnterFormProps } from 'cjx-zdy-ui'
</script>
```

## 浏览器支持

与 Vue 3 / Element Plus 保持一致，建议现代浏览器（Chrome / Edge / Firefox 最新两个大版本）。
