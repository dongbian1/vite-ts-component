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
