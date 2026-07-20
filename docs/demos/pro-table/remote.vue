<template>
  <ProTable
    ref="tableRef"
    :columns="columns"
    :request-api="getList"
    row-key="id"
  >
    <template #tableHeader>
      <el-button type="primary">新建</el-button>
    </template>
    <template #action="{ row }">
      <el-button link type="primary" @click="onEdit(row)">编辑</el-button>
    </template>
  </ProTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ProTable } from 'cjx-zdy-ui'
import type { ColumnProps, ProTableInstance } from 'cjx-zdy-ui'

const tableRef = ref<ProTableInstance>()

const columns: ColumnProps[] = [
  { type: 'selection', width: 50 },
  { prop: 'name', label: '姓名', search: { el: 'input' } },
  {
    prop: 'status',
    label: '状态',
    isTag: true,
    enum: [
      { label: '启用', value: 1, tagType: 'success' },
      { label: '禁用', value: 0, tagType: 'danger' }
    ],
    search: { el: 'select' }
  },
  { prop: 'action', label: '操作', width: 100, fixed: 'right' }
]

/**
 * 模拟远程分页请求
 */
function getList(params: Record<string, any>) {
  const list = [
    { id: 1, name: '张三', status: 1 },
    { id: 2, name: '李四', status: 0 },
    { id: 3, name: '王五', status: 1 },
    { id: 4, name: '赵六', status: 1 },
    { id: 5, name: '钱七', status: 0 }
  ].filter((item) => {
    if (params.name && !String(item.name).includes(params.name)) return false
    if (params.status != null && params.status !== '' && item.status !== params.status)
      return false
    return true
  })
  return Promise.resolve({
    data: list,
    total: list.length,
    pageNum: params.pageNum ?? 1,
    pageSize: params.pageSize ?? 10
  })
}

function onEdit(row: Record<string, any>) {
  ElMessage.success(`编辑：${row.name}`)
}
</script>
