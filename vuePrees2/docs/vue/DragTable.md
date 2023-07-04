---
title: 可拖拽排序列表
author: 陈佳鑫
date: '2022-10-17'
---

VUE Element UI Table 组件不支持拖拽排序，特编写完成开发需求，此组件已打包为 UI 组件上传至 NPM

<DragTableHome />

### template 代码块

```vue
<template>
  <div>
    <div class="title">
      <div
        v-for="item in columns"
        :key="item.prop"
        class="block"
        :style="{ width: `${100 / columns.length}%` }"
      >
        {{ item.title }}
      </div>
    </div>
    <transition-group name="drag" class="list" tag="div">
      <div
        v-for="(item, index) in data"
        :key="item[rowKey]"
        :draggable="draggable"
        class="list-item"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
      >
        <div
          v-for="columnsItem in columns"
          :key="columnsItem.prop"
          class="column"
          :style="{ width: `${100 / columns.length}%` }"
        >
          <component v-if="columnsItem.render" :is="columnsItem.render(item)" />
          <slot v-else :row="item" :name="columnsItem.prop" :index="index">
            {{
              columnsItem.formatter
                ? columnsItem.formatter(item)
                : item[columnsItem.prop]
            }}
          </slot>
        </div>
      </div>
    </transition-group>
  </div>
</template>
```

### DragTable 属性

| 属性      | 类型         | 说明           |
| :-------- | :----------- | :------------- |
| draggable | Boolean      | 是否可拖动排序 |
| data      | `Array<any>` | 列表数据       |
| rowKey    | String       | 每一行 key 值  |
| columns   | Array        | 列表渲染数据   |

### Columns 属性

```js
columns() {
  return [
    { title: '序号', prop: 'lotteryActivityAwardId' },
    { title: '奖品名', prop: 'awardName' },
    { title: '概率（总和100%）', prop: 'winRate', formatter: row => row.winRate != null ? row.winRate / 100 + '%' : '未设置' },
    { title: '总数量', prop: 'totalNum', formatter: row => row.addTotalNum ? row.totalNum + ' + ' + row.addTotalNum + '(增补)' : row.totalNum },
    { title: '剩余数量', prop: 'num', formatter: (row) => (row.totalNum || 0) - (row.usedNum || 0) },
    { title: '抽取数量', prop: 'usedNum' },
    { title: '操作', prop: 'action' }
  ]
}
```

| 属性      | 类型            | 说明                                        |
| :-------- | :-------------- | :------------------------------------------ |
| title     | string          | 列表标题                                    |
| prop      | string          | 当前列渲染数据 key                          |
| formatter | (row) => string | row: 当前行数据, 对渲染数据进行格式处理     |
| render    | (row) => VNode  | row: 当前行数据, 对当前列进行 render 自定义 |

### 完整代码

```vue
<template>
  <div>
    <div class="title">
      <div
        v-for="item in columns"
        :key="item.prop"
        class="block"
        :style="{ width: `${100 / columns.length}%` }"
      >
        {{ item.title }}
      </div>
    </div>
    <transition-group name="drag" class="list" tag="div">
      <div
        v-for="(item, index) in data"
        :key="item[rowKey]"
        :draggable="draggable"
        class="list-item"
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
      >
        <div
          v-for="columnsItem in columns"
          :key="columnsItem.prop"
          class="column"
          :style="{ width: `${100 / columns.length}%` }"
        >
          <component v-if="columnsItem.render" :is="columnsItem.render(item)" />
          <slot v-else :row="item" :name="columnsItem.prop" :index="index">
            {{
              columnsItem.formatter
                ? columnsItem.formatter(item)
                : item[columnsItem.prop]
            }}
          </slot>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts" name="DragTable">
import { ref } from 'vue'
import { Columns } from './'

const emit = defineEmits(['onDrag'])

const props = withDefaults(
  defineProps<{
    draggable: boolean
    data: Array<any>
    rowKey: string
    columns: Array<Columns>
  }>(),
  {
    draggable: true
  }
)

const dragIndex = ref(0)

const dragstart = (index: number) => {
  dragIndex.value = index
}

const dragenter = (e: DragEvent, index: number) => {
  e.preventDefault()
  if (dragIndex.value !== index) {
    const moving = props.data[dragIndex.value]
    const newData = props.data.concat([])
    newData.splice(dragIndex.value, 1)
    newData.splice(index, 0, moving)
    dragIndex.value = index
    emit('onDrag', newData)
  }
}

const dragover = (e: DragEvent, index: number) => {
  e.preventDefault()
}
</script>

<style lang="scss" src="./index.scss" scoped />
```

### 插槽操作

可通过插槽 slot 对列进行改变，name 为当前列 prop

### DragTable 组件

```vue
<DragTable
  v-if="awardsData.length > 0"
  :columns="columns"
  :data-key="'awardInfo'"
  :data="awardsData"
  @onDrag="onDrag"
>
  <template #action="{ row, index }">
    <el-button type="text" @click="handleOpenAward(row, index)">编辑</el-button>
    <el-button v-if="!isStarted" type="text" @click="handleRemoveAward(index)">删除</el-button>
  </template>
</DragTable>
```

| 属性   | 类型          | 说明                 |
| :----- | :------------ | :------------------- |
| onDrag | function(arr) | 拖拽完成后返回新数组 |

### 组件安装与引用

当前版本为 vue3 版本不支持 vue2 是用此组件库

```npm
npm i cjx-zdy-ui
```

### 引用

```ts
import { DragTable } from 'cjx-zdy-ui'
```

### 使用方式

```ts
<template>
  <DragTable :columns="columns" :rowKey="'lotteryActivityAwardId'" :data="awardsData" @onDrag="onDrag">
    <template #action="{ row }">
      <el-button type="primary" link>编辑{{ row.lotteryActivityAwardId }}</el-button>
      <el-button type="danger" link>删除</el-button>
    </template>
  </DragTable>
</template>
<script setup lang="ts" name="DragTableHome">
import { computed, ref } from 'vue'
import { DragTable } from 'cjx-zdy-ui'

const columns = computed(() => [
  { title: '序号', prop: 'lotteryActivityAwardId' },
  { title: '奖品名', prop: 'awardName' },
  { title: '概率（总和100%）', prop: 'winRate', formatter: row => row.winRate != null ? row.winRate / 100 + '%' : '未设置' },
  { title: '总数量', prop: 'totalNum', formatter: row => row.addTotalNum ? row.totalNum + ' + ' + row.addTotalNum + '(增补)' : row.totalNum },
  { title: '剩余数量', prop: 'num', formatter: (row) => (row.totalNum || 0) - (row.usedNum || 0) },
  { title: '抽取数量', prop: 'usedNum' },
  { title: '操作', prop: 'action' }
])

const awardsData = ref([
  { lotteryActivityAwardId: 1, awardName: '奖品一', winRate: 1000, totalNum: 100, num: 20, usedNum: 10 },
  { lotteryActivityAwardId: 2, awardName: '奖品二', winRate: null, totalNum: 100, num: 20, usedNum: 20 },
  { lotteryActivityAwardId: 3, awardName: '奖品三', winRate: 1000, totalNum: 100, num: 20, usedNum: 30 },
  { lotteryActivityAwardId: 4, awardName: '奖品四', winRate: 1000, totalNum: 100, num: 20, usedNum: 40 },
  { lotteryActivityAwardId: 5, awardName: '奖品五', winRate: 1000, totalNum: 100, num: 20, usedNum: 50 },
  { lotteryActivityAwardId: 6, awardName: '奖品六', winRate: 1000, totalNum: 100, num: 20, usedNum: 60 }
])

const onDrag = (arr: Array<any>) => {
  awardsData.value = arr.map((item, index) => {
    return { ...item, sortNum: index + 1 }
  })
}
</script>
```
