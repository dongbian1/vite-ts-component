import { ComponentPublicInstance, VNode } from 'vue'
import ProModal from '.'
import { DialogProps } from 'element-plus/es/components/dialog'
import { FormProps } from 'element-plus/es/components/form'

export interface ModalProps {
  modelValue?: { [k: string]: any } // 双向数据绑定
  column: EnterFormProps[] // 输入项配置  ==> 必传
  validate?: boolean // 是否由组件validate验证 默认true, 如果传入插槽footer则需要自验证
  modal?: Partial<DialogProps> // Dialog 属性，根据 element plus 官方文档来传递
  form?: Partial<FormProps> // Form 属性，根据 element plus 官方文档来传递
}

export interface OpenDialog {
  title?: string // 标题
  formData?: { [k: string]: any } // 默认数据
  type?: string // 类型标识
}

export type FieldNamesProps = {
  label: string
  value: string
  children?: string
}

export interface EnumProps {
  label: string // 选项框显示的文字
  value: any // 选项框值
  disabled?: boolean // 是否禁用此选项
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export type EnterType =
  | 'input'
  | 'input-number'
  | 'autocomplete'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'
  | 'radio-group'
  | 'checkbox'
  | 'upload'
  | 'rate'

export type EnterRenderScope = {
  enterParam: { [key: string]: any }
  placeholder: string
  options: EnumProps[]
  data: EnumProps[]
}

export type EnterFormProps = {
  el?: EnterType // 当前项输入框的类型
  label: string // 当前项标题
  prop: string // 当前输入项key
  rules?: object // 当前项校验规则
  enum?: EnumProps[] | ((params?: any) => Promise<any>) // 枚举类型（字典）
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
  enterProps?: any // 输入项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  render?: (scope: EnterRenderScope) => VNode | string // 自定义输入项内容渲染（tsx语法）
}

export type ProModalInstance = Omit<
  InstanceType<typeof ProModal>,
  keyof ComponentPublicInstance | keyof ModalProps
>
