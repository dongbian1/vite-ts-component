<style>
  .page .theme-default-content {
    max-width: none;
  }
</style>
<h1 style="text-align: center">ProTable API</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2023-07-06</div>
</div>
<br />

## [cjx-zdy-ui项目仓库](https://github.com/dongbian1/vite-ts-component)



### 图片展示
![ProTable](http://rw8irwnr8.hn-bkt.clouddn.com/ProTable.png)

### 代码展示
::: warning 注意
在VuePress2中使用存在样式问题，建议clone仓库下来运行查看
:::

<ProTable/>
::: details 点击查看代码
```vue
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

```
:::

### 安装
```
npm i cjx-zdy-ui

yarn install cjx-zdy-ui
```

### 引用
```vue
<template>
  <ProTable />
</template>

<script lang="ts" setup>
import { ProTable } from 'cjx-zdy-ui'

</script>
```
::: danger 注意
暂时不支持全局引用
:::

### ProTable 属性

| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| columns | 列配置项 | <a href="#columnprops-属性">`ColumnProps[]`</a> | true | <a href="#ColumnProps">`ColumnProps`</a> | - |
| data | 静态 table data 数据，若存在则不会使用 requestApi 返回的 data  | `any[]` | false | - | - |
| requestApi | 请求表格数据的 api | `Promise<any>` | false | - | - |
| requestAuto | 是否自动执行请求 api | `boolean` | false| `boolean` | `false` |
| requestError | 表格 api 请求错误监听 | `(params: any) => void` | false | - | - |
| beforeSearchSubmit | api 请求参数格式化 | `beforeSearchSubmit?: (params: any) => {}` | false | - | - |
| dataCallback | 返回数据的回调函数，可以对数据进行处理 | `(data: any) => any` | false | - | - |
| pagination | 是否需要分页组件 | `boolean` | false | `boolean` | `true` |
| initParam | 初始化请求参数 | `{}` | false| - | `{}` |
| border | 是否带有纵向边框 | `boolean`| false | `boolean` | `true` |
| toolButton | 是否显示表格功能按钮 | `boolean` | false | `boolean` | `true`|
| rowKey | 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id | `string` | false | - | `id` |
| searchCol | 表格搜索项 每列占比配置 | `number` `Record<BreakPoint, number>` | false | - | `{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }`|
| tabs | 表格头部tabs切换配置 | <a href="#tabsprops-属性">`TabsProps`</a> | false | - | - |
| childrenProp | 树形数据配置 | <a href="#childrenprop-属性">`TabsProps`</a> | false | - | - |
| spanMethod | 合并行或列的计算方法 | `({ row, column, rowIndex, columnIndex }) => number[] { rowspan: number colspan: number } undefined` | false | - | - |

### ColumnProps 属性

::: warning 注意
ColumnProps 继承了TableColumnCtx 此处只写明额外属性，请结合element-plus Table API 文档一起看
:::

| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| isTag | 是否是标签展示 | `boolean` | false | `boolean` | - |
| hideInTable | 是在表格当中隐藏 | `boolean` | false | `boolean` | `false` |
| search | 搜索项配置, 如果未传将不在搜索条件中显示 | <a href="#searchprops-属性">`SearchProps`</a> | false | - | - |
| enum | 枚举类型（字典）| <a href="#enumprops-属性">`EnumProps[]`</a> `((params?: any) => Promise<any>)`| false | - | - |
| isFilterEnum | 当前单元格值是否根据 enum 格式化 | `boolean`| false | - | `true`|
| fieldNames | 指定 `label` `value` `children` 的 key 值 | <a href="#fieldnamesprops-属性">`FieldNamesProps`</a> | false | - | - |
| headerRender | 自定义表头内容渲染（tsx语法）| `(scope: HeaderRenderScope<T>) => VNode` | false | - | - |
| render | 自定义单元格内容渲染（tsx语法）| `(scope: RenderScope<T>) => VNode  string` | false | - | - |
| _children | 多级表头 | `ColumnProps[]` | false | - | - |

### TabsProps 属性
| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| data | tabs渲染数据 | `Array<{ label: string; name: string  number }>` `() => Promise<any>` | true | - | - |
| tabsKey | 查询主键，如未传入该字段，字段为status | `string` | false | - | `status` |
| option | 字典类型keyName，未传入取值 label name | `{ labelKey: string; nameKey: string }` | false | - | `{ labelKey: label; nameKey: name }` |

### childrenProp 属性
| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| lazy | 是否懒加载子节点数据 | `boolean` | false | - | `false` |
| load | 加载子节点数据的函数，lazy 为 true 时生效 | `(row: any, treeNode: unknown, resolve: (data: any[]) => void) => void` | false |-|-|
| treeProps | 渲染嵌套数据的配置选项 | `{  children: string, hasChildren: string }` | false | - | `{ hasChildren: 'hasChildren', children: 'children' }` |

### SearchProps 属性
| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| el | 当前项搜索框的类型 |`input` `input-number` `select` `select-v2` `tree-select` `cascader` `date-picker` `time-picker` `time-select` `switch` `slider`| - | - |
| props | 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件 | any | false | - | - |
| key | 当搜索项 key 不为 prop 属性时，可通过 key 指定 | `string` | false | - | - |
| order | 搜索项排序（从大到小） | `number` | false | - | - |
| span | 搜索项所占用的列数，默认为1列 | `number` | false | - | 1 |
| offset | 搜索字段左侧偏移列数 | `number` | false | - | - |
| defaultValue | 搜索项默认值 | `string` `number` `boolean` `any[]`| false | - | - |

### EnumProps 属性
| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| label | 选项框显示的文字 | `string` | true | - | - |
| value | 选项框值 | `string` | true | - | - |
| disabled | 是否禁用此选项 | `boolean` | false | - | - |
| tagType | 当 tag 为 true 时，此选择会指定 tag 显示类型 | `success` `info` `warning` `danger` | false | - | - |
| children | 为树形选择时，可以通过 children 属性指定子选项 | `EnumProps[]` | false | - | - |

### FieldNamesProps 属性
| 属性名     |说明          | 类型 | 必传 | 可选值 | 默认值 |
| :-------- | :----------- | :------------- | :------------- | :------------- |:------------- |
| label | 选项框显示的文字 | `string` | true | - | - |
| value | 选项框值 | `string` | true | - | - |
| children | 选项框子选项 | `string` | false | - | - |