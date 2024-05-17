<template>
  <SearchForm
    :search="search"
    :reset="reset"
    :columns="searchColumns"
    :search-param="searchParam"
    :search-col="searchCol"
    v-show="isShowSearch"
    :loading="loading"
  />

  <!-- 表格内容 card -->
  <div class="card table-main">
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selectedListIds="selectedListIds"
          :selectedList="selectedList"
          :isSelected="isSelected"
        />
      </div>
      <div class="header-button-ri" v-if="toolButton">
        <slot name="toolButton">
          <el-tooltip class="box-item" content="刷新列表" placement="bottom">
            <el-button :icon="Refresh" circle @click="getTableList" />
          </el-tooltip>
          <el-tooltip class="box-item" content="列表配置" placement="bottom">
            <el-button
              :icon="Operation"
              circle
              v-if="columns.length"
              @click="openColSetting"
            />
          </el-tooltip>
          <el-tooltip
            class="box-item"
            :content="`${isShowSearch ? '隐藏' : '显示'}查询条件`"
            placement="bottom"
          >
            <el-button
              :icon="Search"
              circle
              v-if="searchColumns.length"
              @click="isShowSearch = !isShowSearch"
            />
          </el-tooltip>
        </slot>
      </div>
    </div>
    <div v-if="isTableTabs" class="table-tabs">
      <el-tabs
        v-model="tabsVal"
        type="card"
        class="demo-tabs"
        @tab-click="getTableList"
      >
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane
          v-for="tab in enumMap.get('tabsData')"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        />
      </el-tabs>
    </div>
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-loading="loading"
      element-loading-text="加载中..."
      v-bind="$attrs"
      :data="data ?? tableData"
      :border="border"
      :row-key="rowKey"
      :lazy="childrenProp?.lazy"
      :load="childrenProp?.load"
      :treeProps="childrenProp?.treeProps"
      :span-method="spanMethod"
      @selection-change="selectionChange"
      @sort-change="handleSortChange"
    >
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
          v-if="
            item.type &&
            ['selection', 'index', 'expand'].includes(item.type) &&
            !item.hideInTable
          "
          :label="item.label"
          :prop="item.prop"
        >
          <template #default="scope" v-if="item.type == 'expand'">
            <component :is="item.render" v-bind="scope" v-if="item.render" />
            <slot :name="item.type" v-bind="scope" v-else></slot>
          </template>
        </el-table-column>
        <!-- other -->
        <TableColumn v-if="!item.type && item.prop" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </TableColumn>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
    <!-- 列设置 -->
    <ColSetting
      v-if="toolButton"
      ref="colRef"
      v-model:col-setting="colSetting"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref } from 'vue'
import { ColumnProps, ProTableProps } from './types'
import { useTable } from './hooks'
import SearchForm from '@/searchForm'
import { useSelection } from './hooks'
import { Refresh, Operation, Search } from '@element-plus/icons-vue'
import { handleProp } from '@utils/index'
import { ElTable, TableInstance } from 'element-plus'
import ColSetting from './components/colSetting.vue'
import Pagination from './components/pagination.vue'
import TableColumn from './components/tableColumn.vue'

import './style/index.less'

defineOptions({
  name: 'ProTable'
})

const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
})

// 是否显示搜索模块
const isShowSearch = ref(true)

const isTableTabs = computed(() => {
  return typeof props.tabs !== 'undefined'
})
onMounted(() => {
  setTabsData()
  // 初始化请求
  props.requestAuto && getTableList()
})

const setTabsData = async () => {
  if (!props.tabs) return
  let data: { [key: string]: any }[] = []
  if (typeof props.tabs.data === 'function') {
    const res = await props.tabs.data()
    data = res.data.map((item: any) => {
      return {
        label: item[props.tabs?.option?.labelKey ?? 'label'],
        name: item[props.tabs?.option?.nameKey ?? 'name']
      }
    })
  } else if (Array.isArray(props.tabs.data)) {
    data = props.tabs.data
  }
  enumMap.value.set('tabsData', data)
}

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } =
  useSelection(props.rowKey)

const tabsKey = () => {
  return props.tabs ? props.tabs?.tabsKey ?? 'status' : undefined
}

// 表格操作 Hooks
const {
  loading,
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  tabsVal,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  handleSortChange
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  tabsKey(),
  props.dataCallback,
  props.beforeSearchSubmit,
  props.requestError
)

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

// 表格 DOM 元素
const tableRef = ref<TableInstance>()

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection()

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide('enumMap', enumMap)
const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== 'function')
    return enumMap.value.set(col.prop!, col.enum!)
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}

// 扁平化 columns
const flatColumnsFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = []
) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.hideInTable = col.hideInTable ?? false
    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    setEnumMap(col)
  })
  return flatArr.filter((item) => !item._children?.length)
}

// flatColumns
const flatColumns = ref<ColumnProps[]>()
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(
  (item) => item.search?.el || item.search?.render
)

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
  column.search!.order = column.search!.order ?? index + 2
  if (
    column.search?.defaultValue !== undefined &&
    column.search?.defaultValue !== null
  ) {
    searchInitParam.value[column.search.key ?? handleProp(column.prop!)] =
      column.search?.defaultValue
    searchParam.value[column.search.key ?? handleProp(column.prop!)] =
      column.search?.defaultValue
  }
})

// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!)

// 列设置 ==> 过滤掉不需要设置的列
const colRef = ref()
const openColSetting = () => colRef.value.openColSetting()
const colSetting = tableColumns.value!.filter(
  (item) =>
    !['selection', 'index', 'expand'].includes(item.type!) &&
    item.prop !== 'action' &&
    !item.hideInTable
)

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
  // 当前页面所展示的数据
  tableData,
  // 所有的搜索参数，不包含分页
  searchParam,
  // 当前表格的分页数据
  pageable,
  // 获取、刷新表格数据的方法
  getTableList,
  // 重置表格查询参数，相当于点击重置按钮
  reset,
  // 清空选中数据列表
  clearSelection,
  // 当前表格使用的所有字典数据（Map 数据结构）
  enumMap,
  // 表格是否选中数据
  isSelected,
  // 表格选中的数据列表
  selectedList,
  // 表格选中的数据列表的 id
  selectedListIds
  // tableElement: tableRef
})
</script>
