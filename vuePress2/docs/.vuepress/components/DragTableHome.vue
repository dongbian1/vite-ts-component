<template>
  <DragTable
    :columns="columns"
    :rowKey="'lotteryActivityAwardId'"
    :data="awardsData"
    @onDrag="onDrag"
  >
    <template #action="{ row }">
      <el-button type="primary" link
        >编辑{{ row.lotteryActivityAwardId }}</el-button
      >
      <el-button type="danger" link>删除</el-button>
    </template>
  </DragTable>
</template>
<script setup lang="ts" name="DragTableHome">
import { computed, ref } from 'vue'
import { DragTable } from 'cjx-zdy-ui'
import { Columns } from 'cjx-zdy-ui/lib/src/dragTable/columns'

const columns = computed((): Columns[] => [
  { title: '序号', prop: 'lotteryActivityAwardId' },
  { title: '奖品名', prop: 'awardName' },
  {
    title: '概率（总和100%）',
    prop: 'winRate',
    formatter: (row) =>
      row.winRate != null ? row.winRate / 100 + '%' : '未设置'
  },
  {
    title: '总数量',
    prop: 'totalNum',
    formatter: (row) =>
      row.addTotalNum
        ? row.totalNum + ' + ' + row.addTotalNum + '(增补)'
        : row.totalNum
  },
  {
    title: '剩余数量',
    prop: 'num',
    formatter: (row) => (row.totalNum || 0) - (row.usedNum || 0)
  },
  { title: '抽取数量', prop: 'usedNum' },
  { title: '操作', prop: 'action' }
])

const awardsData = ref([
  {
    lotteryActivityAwardId: 1,
    awardName: '奖品一',
    winRate: 1000,
    totalNum: 100,
    num: 20,
    usedNum: 10
  },
  {
    lotteryActivityAwardId: 2,
    awardName: '奖品二',
    winRate: null,
    totalNum: 100,
    num: 20,
    usedNum: 20
  },
  {
    lotteryActivityAwardId: 3,
    awardName: '奖品三',
    winRate: 1000,
    totalNum: 100,
    num: 20,
    usedNum: 30
  },
  {
    lotteryActivityAwardId: 4,
    awardName: '奖品四',
    winRate: 1000,
    totalNum: 100,
    num: 20,
    usedNum: 40
  },
  {
    lotteryActivityAwardId: 5,
    awardName: '奖品五',
    winRate: 1000,
    totalNum: 100,
    num: 20,
    usedNum: 50
  },
  {
    lotteryActivityAwardId: 6,
    awardName: '奖品六',
    winRate: 1000,
    totalNum: 100,
    num: 20,
    usedNum: 60
  }
])

const onDrag = (arr: Array<any>) => {
  awardsData.value = arr.map((item, index) => {
    return { ...item, sortNum: index + 1 }
  })
}
</script>
