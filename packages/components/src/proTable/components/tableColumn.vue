<template>
  <component :is="RenderTableColumn(column, enumMap, slots)" />
</template>

<script setup lang="ts" name="tableColumn">
import { inject, ref, useSlots } from 'vue'
import type { SetupContext } from 'vue'
import { ColumnProps } from '../types'
import RenderTableColumn from './table'

defineOptions({
  name: 'TableColumn'
})

defineProps<{ column: ColumnProps }>()
const slots: SetupContext['slots'] = useSlots()

const enumMap = inject('enumMap', ref(new Map()))
</script>
