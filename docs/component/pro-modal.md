# ProModal 弹窗表单

Dialog + Form 的配置化封装，适合中后台新增/编辑场景。

## 基础用法

点击按钮调用 `show` 打开弹窗，`submit` 事件拿到表单数据。

<script setup>
import Basic from '../demos/pro-modal/basic.vue'
import basicSrc from '../demos/pro-modal/basic.vue?raw'
</script>

<DemoBlock :source="basicSrc" description="通过 <code>column</code> 描述表单项，配合 <code>v-model</code> 绑定表单对象。">
  <Basic />
</DemoBlock>

## ProModal API

### Attributes

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | 表单数据对象 | `Record<string, any>` | — |
| column | 表单项配置 | `EnterFormProps[]` | — |
| validate | 是否由组件内部校验；使用 footer 插槽时需自行校验 | `boolean` | `true` |
| modal | 透传 Element Plus Dialog 属性 | `Partial<DialogProps>` | — |
| form | 透传 Element Plus Form 属性 | `Partial<FormProps>` | — |

### Events

| Name | Description | Type |
| --- | --- | --- |
| submit | 点击确定且校验通过后触发；使用 footer 插槽时不触发 | `(data: object) => void` |
| update:model-value | 表单数据更新 | `(data: object) => void` |

### Slots

| Name | Description |
| --- | --- |
| header | 自定义标题区（保留关闭按钮） |
| title | 同 header（建议使用 header） |
| footer | 自定义底部操作区 |

### Exposes

| Name | Description | Type |
| --- | --- | --- |
| formRef | 内部 Form 实例 | `FormInstance` |
| show | 打开弹窗 | `(options?: OpenDialog) => void` |
| hide | 关闭弹窗 | `() => void` |

## EnterFormProps

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| el | 控件类型 | `EnterType` | — |
| label | 标题 | `string` | — |
| prop | 字段名 | `string` | — |
| rules | 校验规则 | `object` | — |
| enum | 字典 / 异步字典 | `EnumProps[] \| Function` | — |
| field-names | 自定义 label/value/children | `FieldNamesProps` | — |
| enter-props | 透传到具体控件 | `object` | — |
| render | 自定义控件（tsx） | `Function` | — |

## OpenDialog

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| title | 弹窗标题 | `string` | — |
| form-data | 打开时写入的表单数据 | `Record<string, any>` | — |
| type | 业务标识（如 add / update） | `string` | — |
