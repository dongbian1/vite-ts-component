import{E as v}from"./chunks/theme.Bb6MUXAa.js";import{P as x}from"./chunks/index.VNumeaUc.js";import{G as _,aj as m,L as p,M as u,F as D,a0 as n,W as h,_ as o,u as s,m as E,r as N,p as c,P as e,aS as q}from"./chunks/framework.DdxGngjQ.js";const k=_({__name:"basic",setup(b){const r=N();let t=c({});const l=c({title:"新建奖品",width:"520px"}),f=[{label:"奖品名",prop:"awardName",el:"input",rules:[{required:!0,message:"请输入奖品名",trigger:"blur"}]},{label:"类型",prop:"type",el:"select",enum:[{label:"实物",value:"1"},{label:"虚拟",value:"2"}],enterProps:{clearable:!0},rules:[{required:!0,message:"请选择类型",trigger:"change"}]}];function g(){var a;(a=r.value)==null||a.show({title:"新建奖品",formData:{awardName:"",type:""}})}function P(a){var d;v.success(`提交成功：${JSON.stringify(a)}`),(d=r.value)==null||d.hide()}return(a,d)=>{const y=m("el-button");return p(),u(D,null,[n(y,{type:"primary",onClick:g},{default:h(()=>[...d[1]||(d[1]=[o("打开弹窗",-1)])]),_:1}),n(s(x),{ref_key:"modalRef",ref:r,modelValue:s(t),"onUpdate:modelValue":d[0]||(d[0]=i=>E(t)?t.value=i:t=i),column:f,modal:l,validate:"",onSubmit:P},null,8,["modelValue","modal"])],64)}}}),F=`<template>
  <el-button type="primary" @click="onOpen">打开弹窗</el-button>
  <ProModal
    ref="modalRef"
    v-model="form"
    :column="columns"
    :modal="modalProps"
    validate
    @submit="onSubmit"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ProModal } from 'cjx-zdy-ui'
import type { EnterFormProps, ProModalInstance } from 'cjx-zdy-ui'
import type { DialogProps } from 'element-plus'

const modalRef = ref<ProModalInstance>()
const form = reactive<Record<string, any>>({})

const modalProps = reactive<Partial<DialogProps>>({
  title: '新建奖品',
  width: '520px'
})

const columns: EnterFormProps[] = [
  {
    label: '奖品名',
    prop: 'awardName',
    el: 'input',
    rules: [{ required: true, message: '请输入奖品名', trigger: 'blur' }]
  },
  {
    label: '类型',
    prop: 'type',
    el: 'select',
    enum: [
      { label: '实物', value: '1' },
      { label: '虚拟', value: '2' }
    ],
    enterProps: { clearable: true },
    rules: [{ required: true, message: '请选择类型', trigger: 'change' }]
  }
]

function onOpen() {
  modalRef.value?.show({
    title: '新建奖品',
    formData: { awardName: '', type: '' }
  })
}

function onSubmit(data: Record<string, any>) {
  ElMessage.success(\`提交成功：\${JSON.stringify(data)}\`)
  modalRef.value?.hide()
}
<\/script>
`,w=JSON.parse('{"title":"ProModal 弹窗表单","description":"","frontmatter":{},"headers":[],"relativePath":"component/pro-modal.md","filePath":"component/pro-modal.md","lastUpdated":null}'),M={name:"component/pro-modal.md"},O=Object.assign(M,{setup(b){return(r,t)=>{const l=m("DemoBlock");return p(),u("div",null,[t[0]||(t[0]=e("h1",{id:"promodal-弹窗表单",tabindex:"-1"},[o("ProModal 弹窗表单 "),e("a",{class:"header-anchor",href:"#promodal-弹窗表单","aria-label":'Permalink to "ProModal 弹窗表单"'},"​")],-1)),t[1]||(t[1]=e("p",null,"Dialog + Form 的配置化封装，适合中后台新增/编辑场景。",-1)),t[2]||(t[2]=e("h2",{id:"基础用法",tabindex:"-1"},[o("基础用法 "),e("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1)),t[3]||(t[3]=e("p",null,[o("点击按钮调用 "),e("code",null,"show"),o(" 打开弹窗，"),e("code",null,"submit"),o(" 事件拿到表单数据。")],-1)),n(l,{source:s(F),description:"通过 <code>column</code> 描述表单项，配合 <code>v-model</code> 绑定表单对象。"},{default:h(()=>[n(k)]),_:1},8,["source"]),t[4]||(t[4]=q("",13))])}}});export{w as __pageData,O as default};
