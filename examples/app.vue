<template>
  <ProTable ref="proTableRef" :columns="columns" :initParam="{ winRate: 100 }" :tabs="{ data: getTabsList }"
    rowKey="lotteryActivityAwardId" :children-prop="{
      lazy: true,
      load: getChildren
    }" :span-method="mergeColum" :request-api="getList" :beforeSearchSubmit="formatParams" :dataCallback="formatData">
    <template #tableHeader="{ selectedListIds, selectedList, isSelected }">
      <el-button type="primary" @click="onAdd">新增</el-button>
      <el-button type="primary">导出报表</el-button>
      <el-button type="primary" :disabled="!isSelected">批量删除</el-button>
    </template>
    <template #action="{ row }">
      <el-button link type="primary">编辑{{ row.lotteryActivityAwardId }}</el-button>
    </template>
  </ProTable>
  <ProModal :column="modalColumn" v-model="value" :modal="modalProps" :form="{}" ref="proModalRef" validate
    @submit="onSubmit">
    <!-- <template #footer>
      <div class="dialog-footer" style="text-align: end;">
        <el-button>Cancel</el-button>
        <el-button type="primary">
          Confirm
        </el-button>
      </div>
    </template> -->
  </ProModal>
</template>
<script lang="tsx" setup>
import { onMounted, computed, reactive, ref } from 'vue'
import { ColumnProps, ProTableInstance } from 'cjx-zdy-ui/es/src/proTable/types'
import { EnterFormProps, ProModalInstance } from 'cjx-zdy-ui/es/src/proModal/types';
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { DialogProps } from 'element-plus/es/components/dialog';
// import { ProModalInstance } from '@/proModal/types';
// import { ProTableInstance } from '@/proTable/types';

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
  return { ...params, 1: 1 }
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

const proTableRef = ref<ProTableInstance>()

const proModalRef = ref<ProModalInstance>()

const modalColumn: EnterFormProps[] = [
  { label: '奖品名', prop: 'awardName', el: 'input', rules: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }] },
  {
    label: '奖品名1', prop: 'awardName1', render: (_scope: any) => {
      return <el-input modelValue={value.awardName1} placeholder="请输入奖品名1" />
    },
  },
  {
    label: '奖品名', prop: 'awardName2', el: 'select',
    enum: [
      { label: '测试奖品', value: '1' }
    ],
    enterProps: {
      clearable: true
    },
    rules: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
  },
]

const modalProps = reactive<Partial<DialogProps>>({
  title: '测试Modal'
})

const value = reactive<{ [k: string]: any }>({
  awardName: 11111
})

const onAdd = () => {
  proModalRef.value?.show({ formData: { awardName: '22222' }, title: '测试0002' })
}

const onSubmit = (val: boolean) => {
  console.log(val)
}

const { ipcRender } = (window as any).electron ?? {}

// 页面上的提示信息
const text = ref<string>()
// 当前应用版本信息
const version = ref<string>()
// 当前下载进度
const progress = ref<number>(0)

onMounted(() => {
  if (ipcRender) {
    // 给主进程发通知，让主进程告诉我们当前应用的版本是多少
    ipcRender.send('checkAppVersion');
    // 接收主进程发来的通知，检测当前应用版本
    ipcRender.receive("version", (version: any) => {
      version.value = version;
    });

    // 给主进程发通知，检测当前应用是否需要更新
    ipcRender.send('checkForUpdate');
    // 接收主进程发来的通知，告诉用户当前应用是否需要更新
    ipcRender.receive('message', (data: any) => {
      text.value = data;
    });

    // 如果当前应用有新版本需要下载，则监听主进程发来的下载进度
    ipcRender.receive('downloadProgress', (data: any) => {
      progress.value = parseInt(data.percent, 10);
    });
  }
})

</script>