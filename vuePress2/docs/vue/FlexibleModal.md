---
title: 动态modal弹出框
author: 陈佳鑫
date: '2022-11-11'
---

使用 document 创建`div`，使用 vue3 提供`h`函数创建 Modal VNode，modal 组件上下文指定在 app.context 上，最后通过`render`函数将组件渲染在创建的 DIV 上，实现动态 modal 创建渲染

<FlexibleModal />

### Modal 代码

```vue
<template>
  <el-dialog title="提示" v-model="visible" width="30%" @close="handleClose">
    <div>这是一段信息</div>
    <component v-for="(item, index) in components" :is="item" :key="index" />
    <template #footer>
      <el-button @click="close" :loading="loading">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="Modal">
import { ref, VNode } from 'vue'

const props = defineProps({
  a: Number,
  confirmText: String,
  components: Array<VNode>
})

const emits = defineEmits(['oK', 'cancel'])

const visible = ref(true)
const loading = ref(false)

const handleClose = () => {
  emits('cancel')
}

const close = () => {
  emits('cancel')
}

const submit = () => {
  emits('oK', { data: '11111' })
}
</script>
```

### ModalService 代码

```ts
import { ComponentOptions, App, h, render, inject } from 'vue'

export const ModalSymbol = Symbol()

export class ModalResult {
  type: 'ok' | 'cancel' = 'ok'
  data?: any = undefined
}

export class ModalService {
  private _app: App | undefined = undefined

  constructor(app: App) {
    this._app = app
  }

  public open(modal: ComponentOptions<any>, props?: any): Promise<ModalResult> {
    return new Promise((resolve, reject) => {
      if (!this._app) {
        reject('app is undefined')
      }

      const container = document.createElement('div')
      document.body.appendChild(container)

      const vm = h(modal, {
        ...props,
        onOK: (data: any) => {
          document.body.removeChild(container)
          resolve(this.setResult('ok', data))
        },
        onCancel: () => {
          document.body.removeChild(container)
          resolve(this.setResult('cancel'))
        }
      })
      vm.appContext = this._app?._context || null
      render(vm, container)
    })
  }

  public setResult(type: 'ok' | 'cancel', data?: any): ModalResult {
    const result = new ModalResult()
    result.type = type
    result.data = data
    return result
  }
}

export const useModal = (): ModalService => {
  const dynamicModal = inject<ModalService>(ModalSymbol)
  if (!dynamicModal) {
    throw new Error('No dyModal provided!')
  }
  return dynamicModal
}

const plugin = {
  install: (app: App, options?: { [key: string]: any }) => {
    const dynamicModal = new ModalService(app)
    app.config.globalProperties.$dyModal = dynamicModal
    app.provide(ModalSymbol, dynamicModal)
  }
}

export default plugin
```

### 挂载 modal

```ts
  enhance({ app }) {
    app.use(ElementPlus).use(Modal)
  }
```

### Com 组件

```vue
<template>
  <span>这是自定义组件</span>
</template>
```

### 调用方法

```vue
<template>
  <el-button type="primary" @click="handleOpen">打开Modal</el-button>
</template>

<script setup lang="ts" name="FlexibleModal">
import { defineAsyncComponent, getCurrentInstance } from 'vue'
import { useModal } from './FlexibleModal/ModalService'
import com from './FlexibleModal/com.vue'
// import Modal from './FlexibleModal/Modal.vue'
const { proxy }: any = getCurrentInstance()

const modalAsync = defineAsyncComponent(
  () => import('./FlexibleModal/Modal.vue')
)
// const com = defineAsyncComponent(() => import('./FlexibleModal/com.vue'))
const modal = useModal()

const handleOpen = () => {
  proxy.$dyModal
    .open(modalAsync, {
      a: 1,
      confirmText: '测试001',
      components: [com]
    })
    .then((res) => {
      console.log(res)
    })
  // modal.open(modalAsync, {
  //   a: 1,
  //   confirmText: '测试001',
  //   components: [com]
  // }).then(res => {
  //   console.log(res)
  // })
}
</script>
```
