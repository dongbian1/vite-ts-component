<template>
  <el-dialog v-model="visible" v-bind="{ ...props.modal }">
    <slot name="header"></slot>
    <slot name="title"></slot>
    <el-form
      ref="formRef"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
      v-bind="{ ...props.form, model: props.modelValue }"
    >
      <el-form-item
        v-for="column in enterColumn"
        :key="column.prop"
        :label="column.label"
        :prop="column.prop"
        :rules="column.rules"
      >
        <FormItem :column="column" :enter-param="props.modelValue" />
      </el-form-item>
    </el-form>
    <slot v-if="isFooter" name="footer"></slot>
    <template v-if="!isFooter" #footer>
      <span class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="onSubmit"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { provide, ref, useSlots, reactive } from 'vue'
import { EnterFormProps, ModalProps, OpenDialog } from './types'
import { FormInstance } from 'element-plus/es/components/form'
import FormItem from './components/formItem.vue'

const visible = ref(false)

defineOptions({
  name: 'ProModal'
})

const emits = defineEmits(['submit', 'update:modalValue', 'update:modal'])

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: () => ({}),
  column: () => [],
  validate: true,
  form: () => ({ size: 'default' }),
  modal: () => ({})
})

// form表单默认Ref属性
const formRef = ref<FormInstance>()

const slots = useSlots()
// 是否从上级传递了footer 底部按钮，有就使用上级传递，无则使用组件中定义底部按钮，并且调用submit事件
const isFooter = Object.keys(slots).includes('footer')

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide('enumMap', enumMap)
const setEnumMap = async (col: EnterFormProps) => {
  if (!col.enum) return
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== 'function')
    return enumMap.value.set(col.prop!, col.enum!)
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}

// 设置enum字典,增加默认值
const enterColumn = props.column.map((col) => {
  if (col.enum) {
    setEnumMap(col)
  }
  if (!col.el) col.el = 'input'
  return col
})

let modalOptics = reactive<OpenDialog>({})

/**
 * 打开Dialog框
 * @param event
 */
const openDialog = (event?: OpenDialog) => {
  visible.value = true
  if (event) {
    modalOptics = event
    if (event.formData) {
      emits('update:modalValue', { ...props.modelValue, ...event.formData })
    }
    if (event.title) {
      emits('update:modal', { ...props.modal, title: event.title })
    }
  }
}

/**
 * 隐藏model框
 */
const hideDialog = () => {
  visible.value = false
  formRef.value?.resetFields()
}

/**
 * 组件验证form提交
 */
const onSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      emits('submit', {
        type: modalOptics.type,
        data: props.modelValue
      })
    }
  })
}

defineExpose({
  show: openDialog,
  hide: hideDialog,
  formRef: formRef
})
</script>
