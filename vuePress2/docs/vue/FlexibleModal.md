<h1 style="text-align: center">动态modal弹出框</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2022-11-11</div>
</div>
<br />

使用 document 创建`div`，使用 vue3 提供`h`函数创建 Modal VNode，modal 组件上下文指定在 app.context 上，最后通过`render`函数将组件渲染在创建的 DIV 上，实现动态 modal 创建渲染

<FlexibleModal />

### Modal 代码

```vue
<template>
  <el-dialog title="提示" v-model="visible" width="30%" @close="handleClose">
    <div>这是一段信息</div>
    <component v-for="(item, index) in components" :is="item" :key="index" />
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="Modal">
import { ref, VNode, watch } from 'vue'

type Props = {
  data: { [key: string]: string | number }
  components: Array<VNode>
}

const props = defineProps<Props>()

const emits = defineEmits(['ok', 'cancel', 'remove'])

const visible = ref(true)

const handleClose = () => {
  emits('remove')
}

const close = () => {
  visible.value = false
  emits('cancel', { value: '取消' })
}

const submit = () => {
  emits('ok', { value: '确认' })
}
</script>
```

### ModalService 代码

```ts
import { ComponentOptions, App, h, render, inject } from 'vue'

export const ModalSymbol = Symbol()

export class Props {
  data: { [key: string]: string | number }
  event: { [key: string]: (e: any) => void }
  components: Array<any>
}

export class ModalService {
  private _app: App | undefined = undefined

  constructor(app: App) {
    this._app = app
  }

  private container: HTMLDivElement

  public open(modal: ComponentOptions<any>, props?: Props) {
    if (!this._app) {
      throw Error('app is undefined')
    }
    this.container = document.createElement('div')

    document.body.appendChild(this.container)
    const vm = h(modal, {
      data: props?.data,
      components: props?.components,
      ...props?.event,
      onRemove: () => {
        this.close()
      }
    })
    vm.appContext = this._app?._context || null
    render(vm, this.container)
  }

  public close() {
    document.body.removeChild(this.container)
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
import { defineAsyncComponent, getCurrentInstance, ref } from 'vue'
import { useModal } from './FlexibleModal/ModalService'
import com from './FlexibleModal/com.vue'
import Modal from './FlexibleModal/Modal.vue'
const { proxy }: any = getCurrentInstance()

// const Modal = defineAsyncComponent(
//   () => import('./FlexibleModal/Modal.vue')
// )
// const com = defineAsyncComponent(() => import('./FlexibleModal/com.vue'))
const modal = useModal()

const handleOpen = () => {
  proxy.$dyModal
    .open(Modal, {
      data: {
        a: 1,
        confirmText: '测试001',
      },
      components: [com],
      event: {
        onOk: (_e) => {
          console.log(_e)
        },
        onCancel: (_e) => {
          console.log(_e)
        }
      }
    })
  // modal.open(Modal, {
  //   data: {
  //     a: 1,
  //     confirmText: '测试001',
  //   },
  //   components: [com],
  //   event: {
  //     onOk: (_e) => {
  //       console.log(_e)
  //     },
  //     onCancel: (_e) => {
  //       console.log(_e)
  //     }
  //   }
  // })
}
</script>
```
