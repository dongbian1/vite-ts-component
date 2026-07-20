<template>
  <el-button type="primary" @click="onOpen">打开弹窗</el-button>
  <ProModal
    ref="modalRef"
    v-model="form"
    :column="columns"
    :modal="modalProps"
    validate
    @submit="onSubmit"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ProModal } from 'cjx-zdy-ui'
import type { EnterFormProps, ProModalInstance } from 'cjx-zdy-ui'
import type { DialogProps } from 'element-plus'

const modalRef = ref<ProModalInstance>()
const form = reactive<Record<string, any>>({})

const modalProps = reactive<Partial<DialogProps>>({
  title: '新建奖品',
  width: '520px'
})

const columns: EnterFormProps[] = [
  {
    label: '奖品名',
    prop: 'awardName',
    el: 'input',
    rules: [{ required: true, message: '请输入奖品名', trigger: 'blur' }]
  },
  {
    label: '类型',
    prop: 'type',
    el: 'select',
    enum: [
      { label: '实物', value: '1' },
      { label: '虚拟', value: '2' }
    ],
    enterProps: { clearable: true },
    rules: [{ required: true, message: '请选择类型', trigger: 'change' }]
  }
]

function onOpen() {
  modalRef.value?.show({
    title: '新建奖品',
    formData: { awardName: '', type: '' }
  })
}

function onSubmit(data: Record<string, any>) {
  ElMessage.success(`提交成功：${JSON.stringify(data)}`)
  modalRef.value?.hide()
}
</script>
