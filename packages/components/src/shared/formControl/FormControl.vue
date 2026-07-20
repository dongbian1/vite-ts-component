<template>
  <component
    :style="{ width: '100%' }"
    :is="render ?? `el-${el}`"
    v-bind="boundProps"
    v-model="innerValue"
    :data="el === 'tree-select' ? columnEnum : []"
    :options="isOptionsEl ? columnEnum : []"
  >
    <template #default="{ data }" v-if="el === 'cascader'">
      <span>{{ data[fieldNamesResolved.label] }}</span>
    </template>
    <template v-if="el && childOptionMap[el]">
      <component
        :is="`el-${childOptionMap[el]}`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNamesResolved.label]"
        :value="col[fieldNamesResolved.value]"
      >
        {{ col[fieldNamesResolved.label] }}
      </component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, inject, ref, type VNode } from 'vue'

defineOptions({
  name: 'FormControl'
})

type FieldNames = {
  label?: string
  value?: string
  children?: string
}

interface FormControlProps {
  /** element-plus 控件类型，如 input / select */
  el?: string
  /** 自定义渲染（tsx / 组件） */
  render?: ((scope: any) => VNode | string) | object
  label?: string
  fieldNames?: FieldNames
  /** 透传到具体控件的 props */
  componentProps?: Record<string, any>
  /** enumMap 取值 key */
  enumKey?: string
  modelValue?: any
  /** 是否对字符串做 trim（搜索场景） */
  trim?: boolean
  /** 额外 v-bind（如 searchParam / enterParam / clearable） */
  extraBind?: Record<string, any>
  /** 需要渲染子选项的 el → 子组件名，如 select → option */
  childOptionMap?: Record<string, string>
}

const props = withDefaults(defineProps<FormControlProps>(), {
  componentProps: () => ({}),
  extraBind: () => ({}),
  childOptionMap: () => ({ select: 'option' }),
  trim: false
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const fieldNamesResolved = computed(() => ({
  label: props.fieldNames?.label ?? 'label',
  value: props.fieldNames?.value ?? 'value',
  children: props.fieldNames?.children ?? 'children'
}))

const enumMap = inject('enumMap', ref(new Map()))
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.enumKey)
  if (!enumData) return []
  if (props.el === 'select-v2' && props.fieldNames) {
    enumData = enumData.map((item: Record<string, any>) => ({
      ...item,
      label: item[fieldNamesResolved.value.label],
      value: item[fieldNamesResolved.value.value]
    }))
  }
  return enumData
})

/**
 * tree-select / cascader 补齐 fieldNames 相关默认 props
 */
const handleComponentProps = computed(() => {
  const label = fieldNamesResolved.value.label
  const value = fieldNamesResolved.value.value
  const children = fieldNamesResolved.value.children
  let next = { ...props.componentProps }
  if (props.el === 'tree-select') {
    next = {
      ...next,
      props: { ...next.props, label, children },
      nodeKey: value
    }
  }
  if (props.el === 'cascader') {
    next = {
      ...next,
      props: { ...next.props, label, value, children }
    }
  }
  return next
})

const placeholder = computed(() => {
  const enter = props.componentProps
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
  const text =
    enter?.placeholder ??
    (props.el?.includes('input') ? '请输入' : '请选择') + (props.label ?? '')
  return { placeholder: text }
})

const boundProps = computed(() => ({
  ...handleComponentProps.value,
  ...placeholder.value,
  ...props.extraBind
}))

const isOptionsEl = computed(() =>
  ['cascader', 'select-v2'].includes(props.el ?? '')
)

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    const next =
      props.trim && typeof val === 'string' ? val.trim() : val
    emit('update:modelValue', next)
  }
})
</script>
