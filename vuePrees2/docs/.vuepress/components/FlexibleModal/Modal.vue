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
