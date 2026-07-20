<template>
  <ProTable
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :tool-button="false"
    row-key="id"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ProTable } from 'cjx-zdy-ui'
import type { ColumnProps } from 'cjx-zdy-ui'

const statusEnum = [
  { label: '启用', value: 1, tagType: 'success' },
  { label: '禁用', value: 0, tagType: 'danger' }
]

const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 60 },
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色' },
  { prop: 'status', label: '状态', isTag: true, enum: statusEnum }
]

const tableData = ref([
  { id: 1, name: '张三', role: '管理员', status: 1 },
  { id: 2, name: '李四', role: '运营', status: 0 },
  { id: 3, name: '王五', role: '开发', status: 1 }
])
</script>
