<template>
  <ProTable
    ref="proTableRef"
    :columns="columns"
    :initParam="{ winRate: 100 }"
    :tabs="{ data: getTabsList }"
    rowKey="lotteryActivityAwardId"
    :children-prop="{
      lazy: true,
      load: getChildren
    }"
    :span-method="mergeColum"
    :request-api="getList"
    :beforeSearchSubmit="formatParams"
    :dataCallback="formatData"
  >
    <template #tableHeader="{ selectedListIds, selectedList, isSelected }">
      <el-button type="primary">导出报表</el-button>
      <el-button type="primary" :disabled="!isSelected">批量删除</el-button>
    </template>
    <template #action="{ row }">
      <el-button link type="primary"
        >编辑{{ row.lotteryActivityAwardId }}</el-button
      >
    </template>
  </ProTable>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { ProTable } from 'cjx-zdy-ui'
import { ColumnProps } from 'cjx-zdy-ui/es/src/proTable/types'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

const getTabsList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { label: '测001', name: 1 },
          { label: '测002', name: 2 }
        ]
      })
    }, 5000)
  })
}

const formatParams = (params: any) => {
  console.log(params)
  return { ...params, 2: 1 }
}

const formatData = (data: any) => {
  console.log(data)
  return data
}

const getList = (params: any) => {
  console.log(params)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        pageNum: 1,
        pageSize: 10,
        total: 6,
        data: [
          {
            lotteryActivityAwardId: 1,
            awardName: { a: '测试1', b: '测试2' },
            winRate: 1000,
            totalNum: 100,
            num: 20,
            usedNum: 10,
            status: 1
            // hasChildren: true,
          },
          {
            lotteryActivityAwardId: 2,
            awardName: '奖品二',
            winRate: null,
            totalNum: 100,
            num: 20,
            usedNum: 20,
            status: 1
          },
          {
            lotteryActivityAwardId: 3,
            awardName: '奖品三',
            winRate: 1000,
            totalNum: 100,
            num: 20,
            usedNum: 30,
            status: 1
          },
          {
            lotteryActivityAwardId: 4,
            awardName: '奖品四',
            winRate: 1000,
            totalNum: 100,
            num: 20,
            usedNum: 40,
            status: 1
          },
          {
            lotteryActivityAwardId: 5,
            awardName: '奖品五',
            winRate: 1000,
            totalNum: 100,
            num: 20,
            usedNum: 50,
            status: 0
          },
          {
            lotteryActivityAwardId: 6,
            awardName: '奖品六',
            winRate: 1000,
            totalNum: 100,
            num: 20,
            usedNum: 60,
            status: 1
          }
        ]
      })
    }, 3000)
  })
}

const getChildren = (
  row: any,
  treeNode: unknown,
  resolve: (data: any[]) => void
) => {
  setTimeout(() => {
    resolve([
      {
        lotteryActivityAwardId: 11,
        awardName: { a: '测试3', b: '测试4    ' },
        winRate: 1000,
        totalNum: 100,
        num: 20,
        usedNum: 20
      }
    ])
  }, 5000)
}

const mergeColum = ({
  row,
  rowIndex,
  column,
  columnIndex
}: {
  row: any
  rowIndex: number
  column: TableColumnCtx<any>
  columnIndex: number
}) => {
  if (columnIndex === 1) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}

const proTableRef = ref(null)

const columns = computed((): ColumnProps[] => [
  { label: '', prop: 'lotteryActivityAwardId', type: 'selection' },
  { label: '序号', prop: 'lotteryActivityAwardId' },
  {
    label: '奖品名',
    prop: 'awardName',
    _children: [
      {
        label: '测试1',
        prop: 'awardName.a',
        search: { el: 'input' }
      },
      { label: '测试2', prop: 'awardName.b', search: { el: 'input' } }
    ]
  },
  {
    label: '概率（总和100%）',
    prop: 'winRate',
    formatter: (row: any) => {
      return row.winRate != null ? row.winRate / 100 + '%' : '未设置'
    }
  },
  {
    label: '总数量',
    prop: 'totalNum',
    search: { el: 'select', defaultValue: 1, props: { clearable: true } },
    enum: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: [
              { label: '测001', value: 1 },
              { label: '测002', value: 2 }
            ]
          })
        }, 5000)
      })
    },
    isFilterEnum: false
  },
  {
    label: '剩余数量',
    prop: 'num',
    search: {
      el: 'date-picker',
      props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        type: 'datetimerange',
        defaultTime: [
          new Date('2020-01-1 00:00:00'),
          new Date('2020-01-1 23:59:59')
        ]
      }
    }
  },
  { label: '抽取数量', prop: 'usedNum', sortable: 'custom' },
  {
    label: '状态',
    prop: 'status',
    isTag: true,
    enum: [
      {
        userLabel: '启用',
        userStatus: 1,
        tagType: 'success',
        label: '',
        value: ''
      },
      {
        userLabel: '禁用',
        userStatus: 0,
        tagType: 'danger',
        label: '',
        value: ''
      }
    ],
    fieldNames: { label: 'userLabel', value: 'userStatus' }
  },
  { label: '操作', prop: 'action' }
])
</script>
