import{a as b}from"./chunks/index.CgNfvt7y.js";import{G as h,L as u,O as f,u as c,r as y,aj as g,W as n,a0 as s,_ as a,M as T,P as e,aS as x}from"./chunks/framework.DdxGngjQ.js";import{E as _}from"./chunks/theme.BnKYIqyU.js";const k=h({__name:"basic",setup(p){const t=[{type:"index",label:"#",width:60},{prop:"name",label:"姓名"},{prop:"role",label:"角色"},{prop:"status",label:"状态",isTag:!0,enum:[{label:"启用",value:1,tagType:"success"},{label:"禁用",value:0,tagType:"danger"}]}],r=y([{id:1,name:"张三",role:"管理员",status:1},{id:2,name:"李四",role:"运营",status:0},{id:3,name:"王五",role:"开发",status:1}]);return(m,d)=>(u(),f(c(b),{columns:t,data:r.value,pagination:!1,"tool-button":!1,"row-key":"id"},null,8,["data"]))}}),S=`<template>
  <ProTable
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :tool-button="false"
    row-key="id"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ProTable } from 'cjx-zdy-ui'
import type { ColumnProps } from 'cjx-zdy-ui'

const statusEnum = [
  { label: '启用', value: 1, tagType: 'success' },
  { label: '禁用', value: 0, tagType: 'danger' }
]

const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 60 },
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色' },
  { prop: 'status', label: '状态', isTag: true, enum: statusEnum }
]

const tableData = ref([
  { id: 1, name: '张三', role: '管理员', status: 1 },
  { id: 2, name: '李四', role: '运营', status: 0 },
  { id: 3, name: '王五', role: '开发', status: 1 }
])
<\/script>
`,q=h({__name:"remote",setup(p){const i=y(),t=[{type:"selection",width:50},{prop:"name",label:"姓名",search:{el:"input"}},{prop:"status",label:"状态",isTag:!0,enum:[{label:"启用",value:1,tagType:"success"},{label:"禁用",value:0,tagType:"danger"}],search:{el:"select"}},{prop:"action",label:"操作",width:100,fixed:"right"}];function r(d){const o=[{id:1,name:"张三",status:1},{id:2,name:"李四",status:0},{id:3,name:"王五",status:1},{id:4,name:"赵六",status:1},{id:5,name:"钱七",status:0}].filter(l=>!(d.name&&!String(l.name).includes(d.name)||d.status!=null&&d.status!==""&&l.status!==d.status));return Promise.resolve({data:o,total:o.length,pageNum:d.pageNum??1,pageSize:d.pageSize??10})}function m(d){_.success(`编辑：${d.name}`)}return(d,o)=>{const l=g("el-button");return u(),f(c(b),{ref_key:"tableRef",ref:i,columns:t,"request-api":r,"row-key":"id"},{tableHeader:n(()=>[s(l,{type:"primary"},{default:n(()=>[...o[0]||(o[0]=[a("新建",-1)])]),_:1})]),action:n(({row:P})=>[s(l,{link:"",type:"primary",onClick:w=>m(P)},{default:n(()=>[...o[1]||(o[1]=[a("编辑",-1)])]),_:1},8,["onClick"])]),_:1},512)}}}),v=`<template>
  <ProTable
    ref="tableRef"
    :columns="columns"
    :request-api="getList"
    row-key="id"
  >
    <template #tableHeader>
      <el-button type="primary">新建</el-button>
    </template>
    <template #action="{ row }">
      <el-button link type="primary" @click="onEdit(row)">编辑</el-button>
    </template>
  </ProTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ProTable } from 'cjx-zdy-ui'
import type { ColumnProps, ProTableInstance } from 'cjx-zdy-ui'

const tableRef = ref<ProTableInstance>()

const columns: ColumnProps[] = [
  { type: 'selection', width: 50 },
  { prop: 'name', label: '姓名', search: { el: 'input' } },
  {
    prop: 'status',
    label: '状态',
    isTag: true,
    enum: [
      { label: '启用', value: 1, tagType: 'success' },
      { label: '禁用', value: 0, tagType: 'danger' }
    ],
    search: { el: 'select' }
  },
  { prop: 'action', label: '操作', width: 100, fixed: 'right' }
]

/**
 * 模拟远程分页请求
 */
function getList(params: Record<string, any>) {
  const list = [
    { id: 1, name: '张三', status: 1 },
    { id: 2, name: '李四', status: 0 },
    { id: 3, name: '王五', status: 1 },
    { id: 4, name: '赵六', status: 1 },
    { id: 5, name: '钱七', status: 0 }
  ].filter((item) => {
    if (params.name && !String(item.name).includes(params.name)) return false
    if (params.status != null && params.status !== '' && item.status !== params.status)
      return false
    return true
  })
  return Promise.resolve({
    data: list,
    total: list.length,
    pageNum: params.pageNum ?? 1,
    pageSize: params.pageSize ?? 10
  })
}

function onEdit(row: Record<string, any>) {
  ElMessage.success(\`编辑：\${row.name}\`)
}
<\/script>
`,j=JSON.parse('{"title":"ProTable 高级表格","description":"","frontmatter":{},"headers":[],"relativePath":"component/pro-table.md","filePath":"component/pro-table.md","lastUpdated":null}'),E={name:"component/pro-table.md"},F=Object.assign(E,{setup(p){return(i,t)=>{const r=g("DemoBlock");return u(),T("div",null,[t[0]||(t[0]=e("h1",{id:"protable-高级表格",tabindex:"-1"},[a("ProTable 高级表格 "),e("a",{class:"header-anchor",href:"#protable-高级表格","aria-label":'Permalink to "ProTable 高级表格"'},"​")],-1)),t[1]||(t[1]=e("p",null,"配置化表格，内置搜索、分页、字典映射、多级表头与树形数据等能力。",-1)),t[2]||(t[2]=e("h2",{id:"基础用法",tabindex:"-1"},[a("基础用法 "),e("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1)),t[3]||(t[3]=e("p",null,[a("使用静态 "),e("code",null,"data"),a(" 渲染表格，适合简单展示场景。")],-1)),s(r,{source:c(S),description:"通过 <code>columns</code> 描述列，配合 <code>data</code> 静态数据即可渲染。"},{default:n(()=>[s(k)]),_:1},8,["source"]),t[4]||(t[4]=e("h2",{id:"远程数据与搜索",tabindex:"-1"},[a("远程数据与搜索 "),e("a",{class:"header-anchor",href:"#远程数据与搜索","aria-label":'Permalink to "远程数据与搜索"'},"​")],-1)),t[5]||(t[5]=e("p",null,[a("通过 "),e("code",null,"request-api"),a(" 拉取数据；列上配置 "),e("code",null,"search"),a(" 后自动生成搜索表单。")],-1)),s(r,{source:c(v),description:"支持表头操作区、操作列插槽，以及分页请求。"},{default:n(()=>[s(q)]),_:1},8,["source"]),t[6]||(t[6]=x('<h2 id="protable-api" tabindex="-1">ProTable API <a class="header-anchor" href="#protable-api" aria-label="Permalink to &quot;ProTable API&quot;">​</a></h2><h3 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>columns</td><td>列配置项</td><td><code>ColumnProps[]</code></td><td>—</td></tr><tr><td>data</td><td>静态数据；存在时不会走 <code>requestApi</code></td><td><code>any[]</code></td><td>—</td></tr><tr><td>request-api</td><td>请求表格数据</td><td><code>(params: any) =&gt; Promise&lt;any&gt;</code></td><td>—</td></tr><tr><td>request-auto</td><td>是否自动发起请求</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>request-error</td><td>请求失败回调</td><td><code>(params: any) =&gt; void</code></td><td>—</td></tr><tr><td>before-search-submit</td><td>请求前参数格式化</td><td><code>(params: any) =&gt; object</code></td><td>—</td></tr><tr><td>data-callback</td><td>返回数据回调</td><td><code>(data: any) =&gt; any</code></td><td>—</td></tr><tr><td>pagination</td><td>是否显示分页</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>init-param</td><td>初始化请求参数</td><td><code>object</code></td><td><code>{}</code></td></tr><tr><td>border</td><td>是否带纵向边框</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>tool-button</td><td>是否显示工具按钮</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>row-key</td><td>行数据 Key</td><td><code>string</code></td><td><code>id</code></td></tr><tr><td>search-col</td><td>搜索项栅格配置</td><td><code>number | Record&lt;BreakPoint, number&gt;</code></td><td><code>{ xs:1, sm:2, md:2, lg:3, xl:4 }</code></td></tr><tr><td>tabs</td><td>表头 Tabs 配置</td><td><code>object</code></td><td>—</td></tr><tr><td>children-prop</td><td>树形数据配置</td><td><code>object</code></td><td>—</td></tr><tr><td>span-method</td><td>合并行/列方法</td><td><code>Function</code></td><td>—</td></tr></tbody></table><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>tableHeader</td><td>表格顶部操作区，参数含选中态</td></tr><tr><td>toolButton</td><td>自定义工具按钮区</td></tr><tr><td><code>[prop]</code></td><td>按列 <code>prop</code> 自定义单元格，如 <code>#action</code></td></tr></tbody></table><h3 id="exposes" tabindex="-1">Exposes <a class="header-anchor" href="#exposes" aria-label="Permalink to &quot;Exposes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td>tableData</td><td>当前表格数据</td><td><code>any[]</code></td></tr><tr><td>searchParam</td><td>搜索参数（不含分页）</td><td><code>object</code></td></tr><tr><td>pageable</td><td>分页信息</td><td><code>object</code></td></tr><tr><td>enumMap</td><td>字典 Map</td><td><code>Map</code></td></tr><tr><td>isSelected</td><td>是否有选中</td><td><code>boolean</code></td></tr><tr><td>selectedList</td><td>选中行</td><td><code>any[]</code></td></tr><tr><td>selectedListIds</td><td>选中 id 列表</td><td><code>any[]</code></td></tr><tr><td>getTableList</td><td>刷新数据</td><td><code>Function</code></td></tr><tr><td>reset</td><td>重置搜索并刷新</td><td><code>Function</code></td></tr><tr><td>clearSelection</td><td>清空选中</td><td><code>Function</code></td></tr></tbody></table><h2 id="columnprops" tabindex="-1">ColumnProps <a class="header-anchor" href="#columnprops" aria-label="Permalink to &quot;ColumnProps&quot;">​</a></h2><blockquote><p>兼容 Element Plus <code>Table-Column</code> 常用字段（<code>prop</code> / <code>label</code> / <code>width</code> / <code>fixed</code> 等），下列为扩展字段。</p></blockquote><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>type</td><td>列类型</td><td><code>&#39;index&#39; | &#39;selection&#39; | &#39;expand&#39;</code></td><td>—</td></tr><tr><td>is-tag</td><td>是否以 Tag 展示</td><td><code>boolean</code></td><td>—</td></tr><tr><td>hide-in-table</td><td>是否在表格中隐藏</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>search</td><td>搜索项配置</td><td><code>SearchProps</code></td><td>—</td></tr><tr><td>enum</td><td>字典 / 异步字典</td><td><code>EnumProps[] | Function</code></td><td>—</td></tr><tr><td>is-filter-enum</td><td>是否按 enum 格式化单元格</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>field-names</td><td>自定义 label/value/children 字段名</td><td><code>FieldNamesProps</code></td><td>—</td></tr><tr><td>header-render</td><td>自定义表头（tsx）</td><td><code>Function</code></td><td>—</td></tr><tr><td>render</td><td>自定义单元格（tsx）</td><td><code>Function</code></td><td>—</td></tr><tr><td>_children</td><td>多级表头</td><td><code>ColumnProps[]</code></td><td>—</td></tr></tbody></table><h2 id="searchprops" tabindex="-1">SearchProps <a class="header-anchor" href="#searchprops" aria-label="Permalink to &quot;SearchProps&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>el</td><td>搜索控件类型</td><td><code>SearchType</code></td><td>—</td></tr><tr><td>props</td><td>透传到 Element Plus 控件</td><td><code>object</code></td><td>—</td></tr><tr><td>key</td><td>搜索字段名（默认用列 prop）</td><td><code>string</code></td><td>—</td></tr><tr><td>order</td><td>排序（大到小）</td><td><code>number</code></td><td>—</td></tr><tr><td>span</td><td>占用列数</td><td><code>number</code></td><td><code>1</code></td></tr><tr><td>offset</td><td>左侧偏移列数</td><td><code>number</code></td><td>—</td></tr><tr><td>default-value</td><td>默认值</td><td><code>any</code></td><td>—</td></tr><tr><td>render</td><td>自定义搜索项（tsx）</td><td><code>Function</code></td><td>—</td></tr></tbody></table>',12))])}}});export{j as __pageData,F as default};
