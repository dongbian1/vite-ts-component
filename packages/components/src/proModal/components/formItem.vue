<template>
  <FormControl
    :el="column.el"
    :render="column.render"
    :label="column.label"
    :field-names="column.fieldNames"
    :component-props="column.enterProps"
    :enum-key="column.prop"
    :model-value="enterParam[column.prop]"
    :extra-bind="{ enterParam }"
    :child-option-map="{ select: 'option', 'radio-group': 'radio' }"
    @update:model-value="onUpdate"
  />
</template>

<script setup lang="ts">
import { EnterFormProps } from '../types'
import FormControl from '@/shared/formControl/FormControl.vue'

defineOptions({
  name: 'FormItem'
})

interface EnterFormItem {
  column: EnterFormProps
  enterParam?: { [key: string]: any | undefined }
}

const props = withDefaults(defineProps<EnterFormItem>(), {
  enterParam: () => ({})
})

/**
 * 写入表单参数（与父级共用同一 model 对象）
 */
function onUpdate(value: unknown) {
  // 父组件传入的是响应式 model 引用，需就地写入
  // eslint-disable-next-line vue/no-mutating-props
  props.enterParam[props.column.prop] = value
}
</script>
