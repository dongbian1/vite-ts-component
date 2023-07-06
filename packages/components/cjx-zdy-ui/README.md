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
<script lang="ts" setup>
import { ProTable } from 'cjx-zdy-ui'

</script>
```

## 图片展示
![图片](http://rw8irwnr8.hn-bkt.clouddn.com/ProTable.png)

## 在线文档
[cjx-zdy-ui文档](https://geeksdidi.gitee.io/kittyui/)

## 组件项目仓库
[cjx-zdy-ui项目仓库](https://github.com/dongbian1/vite-ts-component)

## 安装依赖
```
pnpm i
```

## 打包组件utils
```
npm run utils:build
```

## 打包UI组件
```
npm run ui:build
```

## 启动项目
```
npm run ui:dev
```

## 启动vuePress
```
npm run docs:dev
```

## 使用本地项目组件库
如要使用本地项目组件库，需要将对应组件版本号改为`workspace:^`
<br/>
package.json
```
...
"dependencies": {
  "cjx-zdy-ui": "workspace:^" 
}
```