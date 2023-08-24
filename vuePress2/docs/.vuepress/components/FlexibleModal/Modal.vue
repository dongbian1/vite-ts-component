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
