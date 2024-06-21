<template>
  <component
    :style="{ width: '100%' }"
    :is="column.render ?? `el-${column.el}`"
    v-bind="{ ...handleEnterProps, ...placeholder, enterParam }"
    v-model.trim="enterParam[column.prop]"
    :data="column.el === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(column.el!) ? columnEnum : []"
  >
    <template #default="{ data }" v-if="column.el === 'cascader'">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column?.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      />
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { EnterFormProps } from '../types'

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

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject('enumMap', ref(new Map()))
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop)
  if (!enumData) return []
  if (props.column?.el === 'select-v2' && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return {
        ...item,
        label: item[fieldNames.value.label],
        value: item[fieldNames.value.value]
      }
    })
  }
  return enumData
})

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value',
    children: props.column.fieldNames?.children ?? 'children'
  }
})

// 处理透传的 Props (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleEnterProps = computed(() => {
  const label = fieldNames.value.label
  const value = fieldNames.value.value
  const children = fieldNames.value.children
  const enterEl = props.column.el
  let enterProps = props.column.enterProps ?? {}
  if (enterEl === 'tree-select') {
    enterProps = {
      ...enterProps,
      props: { ...enterProps, label, children },
      nodeKey: value
    }
  }
  if (enterEl === 'cascader') {
    enterProps = {
      ...enterProps,
      props: { ...enterProps.props, label, value, children }
    }
  }
  return enterProps
})

// 处理默认 placeholder
const placeholder = computed(() => {
  const enter = props.column.enterProps
  if (
    ['datetimerange', 'daterange', 'monthrange'].includes(enter?.type) ||
    enter?.isRange
  ) {
    return {
      rangeSeparator: '至',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
  const placeholder =
    enter?.placeholder ??
    (props?.column.el?.includes('input') ? '请输入' : '请选择') +
      props.column.label
  return { placeholder }
})
</script>
