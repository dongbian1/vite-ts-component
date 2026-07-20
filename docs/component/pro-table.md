# ProTable 高级表格

配置化表格，内置搜索、分页、字典映射、多级表头与树形数据等能力。

## 基础用法

使用静态 `data` 渲染表格，适合简单展示场景。

<script setup>
import Basic from '../demos/pro-table/basic.vue'
import basicSrc from '../demos/pro-table/basic.vue?raw'
import Remote from '../demos/pro-table/remote.vue'
import remoteSrc from '../demos/pro-table/remote.vue?raw'
</script>

<DemoBlock :source="basicSrc" description="通过 <code>columns</code> 描述列，配合 <code>data</code> 静态数据即可渲染。">
  <Basic />
</DemoBlock>

## 远程数据与搜索

通过 `request-api` 拉取数据；列上配置 `search` 后自动生成搜索表单。

<DemoBlock :source="remoteSrc" description="支持表头操作区、操作列插槽，以及分页请求。">
  <Remote />
</DemoBlock>

## ProTable API

### Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| columns | 列配置项 | `ColumnProps[]` | — |
| data | 静态数据；存在时不会走 `requestApi` | `any[]` | — |
| request-api | 请求表格数据 | `(params: any) => Promise<any>` | — |
| request-auto | 是否自动发起请求 | `boolean` | `true` |
| request-error | 请求失败回调 | `(params: any) => void` | — |
| before-search-submit | 请求前参数格式化 | `(params: any) => object` | — |
| data-callback | 返回数据回调 | `(data: any) => any` | — |
| pagination | 是否显示分页 | `boolean` | `true` |
| init-param | 初始化请求参数 | `object` | `{}` |
| border | 是否带纵向边框 | `boolean` | `true` |
| tool-button | 是否显示工具按钮 | `boolean` | `true` |
| row-key | 行数据 Key | `string` | `id` |
| search-col | 搜索项栅格配置 | `number \| Record<BreakPoint, number>` | `{ xs:1, sm:2, md:2, lg:3, xl:4 }` |
| tabs | 表头 Tabs 配置 | `object` | — |
| children-prop | 树形数据配置 | `object` | — |
| span-method | 合并行/列方法 | `Function` | — |

### Slots

| Name | Description |
| --- | --- |
| tableHeader | 表格顶部操作区，参数含选中态 |
| toolButton | 自定义工具按钮区 |
| `[prop]` | 按列 `prop` 自定义单元格，如 `#action` |

### Exposes

| Name | Description | Type |
| --- | --- | --- |
| tableData | 当前表格数据 | `any[]` |
| searchParam | 搜索参数（不含分页） | `object` |
| pageable | 分页信息 | `object` |
| enumMap | 字典 Map | `Map` |
| isSelected | 是否有选中 | `boolean` |
| selectedList | 选中行 | `any[]` |
| selectedListIds | 选中 id 列表 | `any[]` |
| getTableList | 刷新数据 | `Function` |
| reset | 重置搜索并刷新 | `Function` |
| clearSelection | 清空选中 | `Function` |

## ColumnProps

> 兼容 Element Plus `Table-Column` 常用字段（`prop` / `label` / `width` / `fixed` 等），下列为扩展字段。

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| type | 列类型 | `'index' \| 'selection' \| 'expand'` | — |
| is-tag | 是否以 Tag 展示 | `boolean` | — |
| hide-in-table | 是否在表格中隐藏 | `boolean` | `false` |
| search | 搜索项配置 | `SearchProps` | — |
| enum | 字典 / 异步字典 | `EnumProps[] \| Function` | — |
| is-filter-enum | 是否按 enum 格式化单元格 | `boolean` | `true` |
| field-names | 自定义 label/value/children 字段名 | `FieldNamesProps` | — |
| header-render | 自定义表头（tsx） | `Function` | — |
| render | 自定义单元格（tsx） | `Function` | — |
| \_children | 多级表头 | `ColumnProps[]` | — |

## SearchProps

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| el | 搜索控件类型 | `SearchType` | — |
| props | 透传到 Element Plus 控件 | `object` | — |
| key | 搜索字段名（默认用列 prop） | `string` | — |
| order | 排序（大到小） | `number` | — |
| span | 占用列数 | `number` | `1` |
| offset | 左侧偏移列数 | `number` | — |
| default-value | 默认值 | `any` | — |
| render | 自定义搜索项（tsx） | `Function` | — |
