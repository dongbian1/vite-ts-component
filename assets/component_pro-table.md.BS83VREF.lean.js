import{a as b}from"./chunks/index.ZaXdYfd5.js";import{G as h,L as u,O as f,u as c,r as y,aj as g,W as n,a0 as s,_ as a,M as T,P as e,aS as x}from"./chunks/framework.DdxGngjQ.js";import{E as _}from"./chunks/theme.Bw8xWCoO.js";const k=h({__name:"basic",setup(p){const t=[{type:"index",label:"#",width:60},{prop:"name",label:"姓名"},{prop:"role",label:"角色"},{prop:"status",label:"状态",isTag:!0,enum:[{label:"启用",value:1,tagType:"success"},{label:"禁用",value:0,tagType:"danger"}]}],r=y([{id:1,name:"张三",role:"管理员",status:1},{id:2,name:"李四",role:"运营",status:0},{id:3,name:"王五",role:"开发",status:1}]);return(m,d)=>(u(),f(c(b),{columns:t,data:r.value,pagination:!1,"tool-button":!1,"row-key":"id"},null,8,["data"]))}}),S=`<template>
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
`,j=JSON.parse('{"title":"ProTable 高级表格","description":"","frontmatter":{},"headers":[],"relativePath":"component/pro-table.md","filePath":"component/pro-table.md","lastUpdated":null}'),E={name:"component/pro-table.md"},F=Object.assign(E,{setup(p){return(i,t)=>{const r=g("DemoBlock");return u(),T("div",null,[t[0]||(t[0]=e("h1",{id:"protable-高级表格",tabindex:"-1"},[a("ProTable 高级表格 "),e("a",{class:"header-anchor",href:"#protable-高级表格","aria-label":'Permalink to "ProTable 高级表格"'},"​")],-1)),t[1]||(t[1]=e("p",null,"配置化表格，内置搜索、分页、字典映射、多级表头与树形数据等能力。",-1)),t[2]||(t[2]=e("h2",{id:"基础用法",tabindex:"-1"},[a("基础用法 "),e("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1)),t[3]||(t[3]=e("p",null,[a("使用静态 "),e("code",null,"data"),a(" 渲染表格，适合简单展示场景。")],-1)),s(r,{source:c(S),description:"通过 <code>columns</code> 描述列，配合 <code>data</code> 静态数据即可渲染。"},{default:n(()=>[s(k)]),_:1},8,["source"]),t[4]||(t[4]=e("h2",{id:"远程数据与搜索",tabindex:"-1"},[a("远程数据与搜索 "),e("a",{class:"header-anchor",href:"#远程数据与搜索","aria-label":'Permalink to "远程数据与搜索"'},"​")],-1)),t[5]||(t[5]=e("p",null,[a("通过 "),e("code",null,"request-api"),a(" 拉取数据；列上配置 "),e("code",null,"search"),a(" 后自动生成搜索表单。")],-1)),s(r,{source:c(v),description:"支持表头操作区、操作列插槽，以及分页请求。"},{default:n(()=>[s(q)]),_:1},8,["source"]),t[6]||(t[6]=x("",12))])}}});export{j as __pageData,F as default};
