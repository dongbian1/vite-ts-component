<template>
  <el-pagination
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    background
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageable.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'Pagination'
})

interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

defineProps<PaginationProps>()
</script>
