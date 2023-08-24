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
