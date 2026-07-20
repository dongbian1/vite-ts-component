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
`,w=JSON.parse('{"title":"ProModal 弹窗表单","description":"","frontmatter":{},"headers":[],"relativePath":"component/pro-modal.md","filePath":"component/pro-modal.md","lastUpdated":null}'),M={name:"component/pro-modal.md"},O=Object.assign(M,{setup(b){return(r,t)=>{const l=m("DemoBlock");return p(),u("div",null,[t[0]||(t[0]=e("h1",{id:"promodal-弹窗表单",tabindex:"-1"},[o("ProModal 弹窗表单 "),e("a",{class:"header-anchor",href:"#promodal-弹窗表单","aria-label":'Permalink to "ProModal 弹窗表单"'},"​")],-1)),t[1]||(t[1]=e("p",null,"Dialog + Form 的配置化封装，适合中后台新增/编辑场景。",-1)),t[2]||(t[2]=e("h2",{id:"基础用法",tabindex:"-1"},[o("基础用法 "),e("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1)),t[3]||(t[3]=e("p",null,[o("点击按钮调用 "),e("code",null,"show"),o(" 打开弹窗，"),e("code",null,"submit"),o(" 事件拿到表单数据。")],-1)),n(l,{source:s(F),description:"通过 <code>column</code> 描述表单项，配合 <code>v-model</code> 绑定表单对象。"},{default:h(()=>[n(k)]),_:1},8,["source"]),t[4]||(t[4]=q('<h2 id="promodal-api" tabindex="-1">ProModal API <a class="header-anchor" href="#promodal-api" aria-label="Permalink to &quot;ProModal API&quot;">​</a></h2><h3 id="attributes" tabindex="-1">Attributes <a class="header-anchor" href="#attributes" aria-label="Permalink to &quot;Attributes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>model-value / v-model</td><td>表单数据对象</td><td><code>Record&lt;string, any&gt;</code></td><td>—</td></tr><tr><td>column</td><td>表单项配置</td><td><code>EnterFormProps[]</code></td><td>—</td></tr><tr><td>validate</td><td>是否由组件内部校验；使用 footer 插槽时需自行校验</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>modal</td><td>透传 Element Plus Dialog 属性</td><td><code>Partial&lt;DialogProps&gt;</code></td><td>—</td></tr><tr><td>form</td><td>透传 Element Plus Form 属性</td><td><code>Partial&lt;FormProps&gt;</code></td><td>—</td></tr></tbody></table><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td>submit</td><td>点击确定且校验通过后触发；使用 footer 插槽时不触发</td><td><code>(data: object) =&gt; void</code></td></tr><tr><td>update:model-value</td><td>表单数据更新</td><td><code>(data: object) =&gt; void</code></td></tr></tbody></table><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td>header</td><td>自定义标题区（保留关闭按钮）</td></tr><tr><td>title</td><td>同 header（建议使用 header）</td></tr><tr><td>footer</td><td>自定义底部操作区</td></tr></tbody></table><h3 id="exposes" tabindex="-1">Exposes <a class="header-anchor" href="#exposes" aria-label="Permalink to &quot;Exposes&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th></tr></thead><tbody><tr><td>formRef</td><td>内部 Form 实例</td><td><code>FormInstance</code></td></tr><tr><td>show</td><td>打开弹窗</td><td><code>(options?: OpenDialog) =&gt; void</code></td></tr><tr><td>hide</td><td>关闭弹窗</td><td><code>() =&gt; void</code></td></tr></tbody></table><h2 id="enterformprops" tabindex="-1">EnterFormProps <a class="header-anchor" href="#enterformprops" aria-label="Permalink to &quot;EnterFormProps&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>el</td><td>控件类型</td><td><code>EnterType</code></td><td>—</td></tr><tr><td>label</td><td>标题</td><td><code>string</code></td><td>—</td></tr><tr><td>prop</td><td>字段名</td><td><code>string</code></td><td>—</td></tr><tr><td>rules</td><td>校验规则</td><td><code>object</code></td><td>—</td></tr><tr><td>enum</td><td>字典 / 异步字典</td><td><code>EnumProps[] | Function</code></td><td>—</td></tr><tr><td>field-names</td><td>自定义 label/value/children</td><td><code>FieldNamesProps</code></td><td>—</td></tr><tr><td>enter-props</td><td>透传到具体控件</td><td><code>object</code></td><td>—</td></tr><tr><td>render</td><td>自定义控件（tsx）</td><td><code>Function</code></td><td>—</td></tr></tbody></table><h2 id="opendialog" tabindex="-1">OpenDialog <a class="header-anchor" href="#opendialog" aria-label="Permalink to &quot;OpenDialog&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>title</td><td>弹窗标题</td><td><code>string</code></td><td>—</td></tr><tr><td>form-data</td><td>打开时写入的表单数据</td><td><code>Record&lt;string, any&gt;</code></td><td>—</td></tr><tr><td>type</td><td>业务标识（如 add / update）</td><td><code>string</code></td><td>—</td></tr></tbody></table>',13))])}}});export{w as __pageData,O as default};
