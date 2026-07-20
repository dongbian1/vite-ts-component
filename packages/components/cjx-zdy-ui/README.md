<h1 align="center">
    Cjx-Zdy-UI
</h1>

- 💪 Vue 3 Composition API
- 🔥 Written in TypeScript

<p align="center"> Cjx-Zdy-UI - A Vue.js 3 UI library</p>

## Install

```
npm i cjx-zdy-ui
```

## 组件引入 main.ts

```npm
import CjxUI from 'cjx-zdy-ui'

app.use(CjxUI)
```

## 快速开始

```vue
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
```

## 图片展示

![图片](http://rw8irwnr8.hn-bkt.clouddn.com/ProTable.png)

## 在线文档

[cjx-zdy-ui 文档](https://dongbian1.github.io/vite-ts-component/vue/ProTable.html)

## 组件项目仓库

[cjx-zdy-ui 项目仓库](https://github.com/dongbian1/vite-ts-component)
