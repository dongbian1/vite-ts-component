<template>
  <FormControl
    :el="column.search?.el"
    :render="column.search?.render"
    :label="column.label"
    :field-names="column.fieldNames"
    :component-props="column.search?.props"
    :enum-key="column.prop"
    :model-value="model"
    :trim="true"
    :extra-bind="{ searchParam, clearable }"
    :child-option-map="{ select: 'option' }"
    @update:model-value="onUpdate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { handleProp } from '@utils/index'
import { ColumnProps } from '@/proTable/types'
import FormControl from '@/shared/formControl/FormControl.vue'

defineOptions({
  name: 'SearchFormItem'
})

interface SearchFormItem {
  column: ColumnProps
  searchParam: { [key: string]: any }
}

const props = defineProps<SearchFormItem>()

const modelKey = computed(
  () => props.column.search?.key ?? handleProp(props.column.prop!)
)

const model = computed(() => props.searchParam[modelKey.value])

/**
 * 写入搜索参数
 */
function onUpdate(value: any) {
  props.searchParam[modelKey.value] = value
}

// 有默认值时默认不展示清除按钮
const clearable = computed(() => {
  const search = props.column.search
  return (
    search?.props?.clearable ??
    (search?.defaultValue == null || search?.defaultValue == undefined)
  )
})
</script>
