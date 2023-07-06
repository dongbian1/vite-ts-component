---
title: 自定义ModalForm
author: 陈佳鑫
date: '2022-10-13'
---

简单化普通表单模块新增及修改，减少编写 modal 的代码特此组件化
<br/>
<img class="avatar" src="http://rw8irwnr8.hn-bkt.clouddn.com/material.jpg">

## From 组件类型创建

新建文件`modalFormItem.ts`

```tsx
import { Rule } from 'antd/lib/form'

export default interface ModalFormItem {
  title: string
  type:
    | 'input'
    | 'password'
    | 'inputNumber'
    | 'textArea'
    | 'select'
    | 'switch'
    | 'radio'
    | 'upload'
    | 'datePicker'
    | 'treeSelect'
    | 'render'
  name: string
  selectArr?: any[]
  disabled?: boolean
  uploadNumber?: number
  render?: () => React.ReactNode | React.ReactNode[]
  onChange?: (e: string | number) => void
}
```

| 属性         | 类型                                                                                                              | 说明                                                       |
| :----------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| title        | string                                                                                                            | 表单标题                                                   |
| type         | `input` `password` `inputNumber` `textArea` `select` `switch` `radio` `upload` `datePicker` `treeSelect` `render` | 渲染组件类型                                               |
| name         | string                                                                                                            | Form 表单 name 属性                                        |
| rules        | `Array<Rule>`                                                                                                     | Form 表单验证规则                                          |
| selectArr    | `Array<any>`                                                                                                      | select cascader switch radio treeSelect 等组件 Option 数据 |
| disabled     | disabled                                                                                                          | 禁用当前组件                                               |
| uploadNumber | number                                                                                                            | upload 组件上传最大值                                      |
| render       | `React.ReactNode` `React.ReactNode[]`                                                                             | render 函数可重写当前组件                                  |
| onChange     | `(e: string  number) => void`                                                                                     | 改变函数                                                   |

## Modal 组件

创建组件文件`OperateModal.tsx`

### 创建 OperateModal 实例

```tsx
import { ModalProps } from 'antd/lib/modal'
import { FormInstance } from 'antd/lib/form'

interface IOperateModal extends ModalProps {
  data?: any | null
  type?: 'add' | 'update'
  form?: [FormInstance]
  typeSetting?: 'one' | 'two'
  onSubmit: Function
  formItem: Array<ModalFormItem>
  modalFooter?: (ok: () => void, cancel: () => void) => ReactNode
  modalOkCall?: () => void
  modalCancelCall?: () => void
}
```

| 属性            | 类型                                                | 说明                                               |
| :-------------- | :-------------------------------------------------- | :------------------------------------------------- |
| data            | `any` `null` `Form`                                 | 数据                                               |
| type            | `add` `update`                                      | add: 新增 update: 修改                             |
| form            | `FormInstance`                                      | Form 对象                                          |
| typeSetting     | `one` `two`                                         | 每行显示组件个数                                   |
| onSubmit        | `Function`                                          | Form 提交函数                                      |
| formItem        | `Array<ModalFormItem>`                              | Form 渲染对象                                      |
| modalFooter     | `(ok: () => void, cancel: () => void) => ReactNode` | 自定义底部按钮                                     |
| modalOkCall     | `() => void`                                        | 自定义按钮 ok 事件，如果未传入将调用 onSubmit 方法 |
| modalCancelCall | `() => void`                                        | 自定义按钮取消事件，如果为传入将调用 onCancel 事件 |

### 创建 OperateModal 组件

```tsx
export const OperateModal: React.FC<IOperateModal> = ({
  data,
  type,
  form,
  typeSetting,
  formItem,
  onSubmit,
  modalFooter,
  modalOkCall,
  modalCancelCall,
  modalFooter,
  modalOkCall,
  modalCancelCall,
  ...modalProps
}) => { })
```

### Form 组件渲染函数

通过 formItem 遍历生成相对应组件，特殊组件加入相应业务需求

```tsx
/**
 * 表单渲染
 * @param item 渲染条件
 */
const moduleRendering = (item: ModalFormItem) => {
  switch (item.type) {
    case 'input':
      return (
        <Input placeholder={`请输入${item.title}`} disabled={item.disabled} />
      )
    case 'password':
      return (
        <Input.Password
          placeholder={`请输入${item.title}`}
          disabled={item.disabled}
        />
      )
    case 'inputNumber':
      return (
        <InputNumber
          placeholder={`请输入${item.title}`}
          style={{ width: '100%' }}
          min={0}
          disabled={item.disabled}
        />
      )
    case 'textArea':
      return <Input.TextArea rows={2} disabled={item.disabled} />
    case 'select':
      return (
        <Select
          id={item.name}
          showSearch
          allowClear={!item.rules}
          optionFilterProp="children"
          placeholder={`请选择${item.title}`}
          disabled={item.disabled}
          onChange={item.onChange}
          filterOption={(input, option) =>
            option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {item.selectArr?.map((selectItem) => {
            return (
              <Select.Option
                key={selectItem.dictKey}
                value={selectItem.dictKey}
              >
                {selectItem.dictValue}
              </Select.Option>
            )
          })}
        </Select>
      )
    case 'treeSelect':
      return (
        <TreeSelect
          placeholder={`请选择${item.title}`}
          treeData={item.selectArr}
          disabled={item.disabled}
          showCheckedStrategy={TreeSelect.SHOW_ALL}
          treeCheckable
          treeCheckStrictly={true}
        />
      )
    case 'switch':
      return (
        <Switch
          checkedChildren={item.selectArr ? item.selectArr[0].checked : ''}
          unCheckedChildren={item.selectArr ? item.selectArr[0].unchecked : ''}
          disabled={item.disabled}
        />
      )
    case 'radio':
      return (
        <Radio.Group>
          {item.selectArr?.map((selectItem) => {
            return (
              <Radio key={selectItem.dictKey} value={selectItem.dictKey}>
                {selectItem.dictValue}
              </Radio>
            )
          })}
        </Radio.Group>
      )
    case 'upload':
      return (
        <Upload
          withCredentials
          disabled={item.disabled}
          action={`${baseUrl}/rest/file/upload`}
          listType="picture-card"
          accept=".jpg,.png,.jpeg,.bmp"
          beforeUpload={(file) => {
            if (file.size / 1024 / 1024 > 2) {
              message.error('请选择大小在2M以内图片！')
              return false
            }
          }}
          onPreview={handlePreview}
          onChange={(file) => handleChange(file, item.name)}
          data={{
            rdSession: user.rdSession,
            now: Date.now(),
            sign: createRdSession({ rdSession: user.rdSession }, user.loginCode)
          }}
        >
          {uploadBottom
            ? uploadBottom[item.name]
              ? uploadBut
              : null
            : uploadBut}
        </Upload>
      )
    case 'datePicker':
      return (
        <DatePicker
          format="YYYY-MM-DD"
          disabled={item.disabled}
          style={{ width: '100%' }}
        />
      )
    case 'render':
      return item.render!()
  }
}
```

### return 函数

```tsx
return (
  <Modal
    {...modalProps}
    afterClose={() => {
      usForm.resetFields()
    }}
    destroyOnClose
    footer={
      modalFooter
        ? modalFooter(
            modalOkCall ?? onFormSubmit,
            modalCancelCall ?? modalProps.onCancel
          )
        : modalFooter
    }
    onOk={onFormSubmit}
  >
    <Form
      {...Layout()}
      ref={formRef}
      form={usForm}
      initialValues={data}
      name="register"
      scrollToFirstError
    >
      <Row>
        {formItem.map((item, index) => {
          return (
            <Col
              key={index}
              style={
                item.type === 'upload' ? { position: 'relative' } : undefined
              }
              span={typeSetting === 'one' ? 24 : 12}
            >
              <Form.Item
                name={item.name}
                label={item.title}
                rules={item.rules}
                valuePropName={propName(item)}
                getValueFromEvent={
                  item.type === 'upload'
                    ? (args) => normFile(args, item.name)
                    : undefined
                }
              >
                {moduleRendering(item)}
              </Form.Item>
              {item.type === 'upload' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 110,
                    width: '100%',
                    paddingLeft: 110
                  }}
                >
                  只允许上传图片后缀为.jpg、.png、jpeg、.bmp的图片文件，文件大小不能超过2M
                </div>
              )}
            </Col>
          )
        })}
      </Row>
    </Form>
    <Modal
      visible={previewVisible}
      title={previewTitle}
      footer={null}
      onCancel={handleCancel}
    >
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </Modal>
)
```

## 整体 OperateModal 代码

```tsx
import { baseUrl } from '@/config/config'
import ModalFormItem from '@/utils/modalFormItem'
import createRdSession from '@/utils/rdSession'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
  TreeSelect,
  message
} from 'antd'
import { FormInstance } from 'antd/lib/form'
import { useForm } from 'antd/lib/form/Form'
import { ModalProps } from 'antd/lib/modal'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

interface IOperateModal extends ModalProps {
  idKey?: string
  data?: any | null
  form?: [FormInstance]
  typeSetting?: 'one' | 'two'
  onSubmit: Function
  formItem: Array<ModalFormItem>
  modalFooter?: (ok: () => void, cancel: () => void) => ReactNode
  modalOkCall?: () => void
  modalCancelCall?: () => void
}

const formItemMinLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

const formItemMaxLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

export const OperateModal: React.FC<IOperateModal> = ({
  idKey,
  data,
  form,
  typeSetting,
  formItem,
  onSubmit,
  modalFooter,
  modalOkCall,
  modalCancelCall,
  ...modalProps
}) => {
  const [previewVisible, setpreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  )
  const [previewTitle, setpreviewTitle] = useState<string | undefined>(
    undefined
  )
  const [uploadBottom, setUploadBottom] = useState<{ [key: string]: boolean }>(
    {}
  )

  const [usForm] = form ?? useForm()

  const formRef = useRef<FormInstance<any>>(null)

  const jsonData = JSON.parse(sessionStorage.getItem('initial_state') ?? '{}')
  const user = jsonData.users || {}

  useEffect(
    () => {
      const bottom: { [key: string]: boolean } = {}
      formItem
        ?.filter((item) => item.type === 'upload')
        .map((item) => {
          bottom[item.name] = true
          if (item.uploadNumber) {
            if (usForm.getFieldValue(item.name)) {
              bottom[item.name] =
                usForm.getFieldValue(item.name).length < item.uploadNumber
            }
          }
        })
      setUploadBottom(bottom)
    },
    formItem
      .filter((item) => item.type === 'upload')
      .map((item) => {
        return usForm.getFieldValue(item.name)
      })
  )

  /**
   * form表单提交
   */
  const onFormSubmit = () => {
    usForm.validateFields().then((values) => {
      let params: { [key: string]: any } = { ...values }
      if (idKey) {
        params[idKey] = data[idKey]
      } else {
        params = {
          ...data,
          ...params
        }
      }
      onSubmit(params)
    })
  }

  // 图片上传按钮
  const uploadBut = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  )

  // 上传图片
  const handleChange = (
    file: UploadChangeParam<UploadFile<any>>,
    name: string
  ) => {
    const fileList = file.fileList?.map((fileItem: any, index: number) => {
      if (fileItem.response && fileItem.response.code === 200) {
        return {
          uid: index,
          name: fileItem.name,
          status: fileItem.status,
          url: fileItem.response.data
        }
      }
    })
    if (fileList.length && !fileList.includes(undefined)) {
      usForm.setFieldsValue({ ...usForm.getFieldsValue(), [name]: fileList })
    }
  }

  //

  // 查看图片
  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl || file.url)
    setpreviewTitle(file.name)
    setpreviewVisible(true)
  }

  // 关闭图片查看
  const handleCancel = () => {
    setpreviewVisible(false)
  }

  // 设置如何将 event 的值转换成字段值
  const normFile = (e: any, name: string) => {
    if (Array.isArray(e)) {
      return e
    }
    if (e.file) {
      const item = formItem.find((item) => item.name === name)
      let butVis = true
      if (item?.uploadNumber) {
        if (e.fileList) {
          butVis = e.fileList.length < item.uploadNumber
        }
        setUploadBottom({ ...uploadBottom, [name]: butVis })
      }
      return e.fileList
    }
    return e
  }

  /**
   * 表单渲染
   * @param item 渲染条件
   */
  const moduleRendering = (item: ModalFormItem) => {
    switch (item.type) {
      case 'input':
        return (
          <Input placeholder={`请输入${item.title}`} disabled={item.disabled} />
        )
      case 'password':
        return (
          <Input.Password
            placeholder={`请输入${item.title}`}
            disabled={item.disabled}
          />
        )
      case 'inputNumber':
        return (
          <InputNumber
            placeholder={`请输入${item.title}`}
            style={{ width: '100%' }}
            min={0}
            disabled={item.disabled}
          />
        )
      case 'textArea':
        return <Input.TextArea rows={2} disabled={item.disabled} />
      case 'select':
        return (
          <Select
            id={item.name}
            showSearch
            allowClear={!item.rules}
            optionFilterProp="children"
            placeholder={`请选择${item.title}`}
            disabled={item.disabled}
            onChange={item.onChange}
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {item.selectArr?.map((selectItem) => {
              return (
                <Select.Option
                  key={selectItem.dictKey}
                  value={selectItem.dictKey}
                >
                  {selectItem.dictValue}
                </Select.Option>
              )
            })}
          </Select>
        )
      case 'treeSelect':
        return (
          <TreeSelect
            placeholder={`请选择${item.title}`}
            treeData={item.selectArr}
            disabled={item.disabled}
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            treeCheckable
            treeCheckStrictly={true}
          />
        )
      case 'switch':
        return (
          <Switch
            checkedChildren={item.selectArr ? item.selectArr[0].checked : ''}
            unCheckedChildren={
              item.selectArr ? item.selectArr[0].unchecked : ''
            }
            disabled={item.disabled}
          />
        )
      case 'radio':
        return (
          <Radio.Group>
            {item.selectArr?.map((selectItem) => {
              return (
                <Radio key={selectItem.dictKey} value={selectItem.dictKey}>
                  {selectItem.dictValue}
                </Radio>
              )
            })}
          </Radio.Group>
        )
      case 'upload':
        return (
          <Upload
            withCredentials
            disabled={item.disabled}
            action={`${baseUrl}/rest/file/upload`}
            listType="picture-card"
            accept=".jpg,.png,.jpeg,.bmp"
            beforeUpload={(file) => {
              if (file.size / 1024 / 1024 > 2) {
                message.error('请选择大小在2M以内图片！')
                return false
              }
            }}
            onPreview={handlePreview}
            onChange={(file) => handleChange(file, item.name)}
            data={{
              rdSession: user.rdSession,
              now: Date.now(),
              sign: createRdSession(
                { rdSession: user.rdSession },
                user.loginCode
              )
            }}
          >
            {uploadBottom
              ? uploadBottom[item.name]
                ? uploadBut
                : null
              : uploadBut}
          </Upload>
        )
      case 'datePicker':
        return (
          <DatePicker
            format="YYYY-MM-DD"
            disabled={item.disabled}
            style={{ width: '100%' }}
          />
        )
      case 'render':
        return item.render!()
    }
  }

  /**
   * FormItem valuePropName 值
   * @param item 渲染条件
   */
  const propName = (item: ModalFormItem) => {
    switch (item.type) {
      case 'switch':
        return 'checked'
      case 'upload':
        return 'fileList'
      default:
        return undefined
    }
  }

  /**
   * 排版Layout
   */
  const Layout = () => {
    // @ts-ignore
    return modalProps.width > 500 ? formItemMaxLayout : formItemMinLayout
  }

  return (
    <Modal
      {...modalProps}
      afterClose={() => {
        usForm.resetFields()
      }}
      destroyOnClose
      footer={
        modalFooter
          ? modalFooter(
              modalOkCall ?? onFormSubmit,
              modalCancelCall ?? modalProps.onCancel
            )
          : modalFooter
      }
      onOk={onFormSubmit}
    >
      <Form
        {...Layout()}
        ref={formRef}
        form={usForm}
        initialValues={data}
        name="register"
        scrollToFirstError
      >
        <Row>
          {formItem.map((item, index) => {
            return (
              <Col
                key={index}
                style={
                  item.type === 'upload' ? { position: 'relative' } : undefined
                }
                span={typeSetting === 'one' ? 24 : 12}
              >
                <Form.Item
                  name={item.name}
                  label={item.title}
                  rules={item.rules}
                  valuePropName={propName(item)}
                  getValueFromEvent={
                    item.type === 'upload'
                      ? (args) => normFile(args, item.name)
                      : undefined
                  }
                >
                  {moduleRendering(item)}
                </Form.Item>
                {item.type === 'upload' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 110,
                      width: '100%',
                      paddingLeft: 110
                    }}
                  >
                    只允许上传图片后缀为.jpg、.png、jpeg、.bmp的图片文件，文件大小不能超过2M
                  </div>
                )}
              </Col>
            )
          })}
        </Row>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Modal>
  )
}

OperateModal.defaultProps = {
  typeSetting: 'one'
}
```

### 组件使用

```tsx
<OperateModal
  title={{ add: '新增客户', update: '修改客户' }[operateModal.type!]}
  data={operateModal.data}
  type={operateModal.type!}
  visible={operateModal.visible}
  width={1000}
  formItem={formItem}
  onSubmit={(value: any) => onSubmit(value)}
  onCancel={operateModalController.hideModal}
  afterClose={operateModalController.cleanModalData}
/>
```

### formItem 数据

```tsx
const formItem: Array<ModalFormItem> = [
  {
    title: '商户名称',
    type: 'input',
    name: 'businessName',
    rules: [{ required: true, message: '商户名称不能为空' }]
  },
  { title: '商户简称', type: 'input', name: 'nickName' },
  { title: '客户编码', type: 'input', name: 'code' },
  { title: '联系人', type: 'input', name: 'contactName' },
  {
    title: '手机号码',
    type: 'input',
    name: 'telephone',
    rules: [{ required: true, message: '手机号码不能为空' }]
  },
  // { title: '区域', type: 'cascader', name: 'area' },
  { title: '位置', type: 'input', name: 'address', disabled: true },
  {
    title: '行业类型',
    type: 'select',
    name: 'industryType',
    selectArr: industryType
  },
  {
    title: '通路类型',
    type: 'select',
    name: 'pathType',
    selectArr: pathType
  },
  { title: '客户等级', type: 'select', name: 'grade', selectArr: gradeType },
  { title: '陈列面积', type: 'inputNumber', name: 'displayArea' },
  { title: '公司电话', type: 'input', name: 'companyPhone' },
  {
    title: '客户来源',
    type: 'select',
    name: 'customerSource',
    selectArr: customerSource
  },
  {
    title: '跟进进度',
    type: 'select',
    name: 'progress',
    selectArr: progressType
  },
  {
    title: '纬度',
    type: 'inputNumber',
    name: 'latitude',
    rules: [{ required: true, message: '纬度不能为空' }],
    disabled: true
  },
  {
    title: '经度',
    type: 'inputNumber',
    name: 'longitude',
    rules: [{ required: true, message: '经度不能为空' }],
    disabled: true
  },
  {
    title: '客户状态',
    type: 'switch',
    name: 'customerStatus',
    selectArr: [{ checked: '启用', unChecked: '禁用' }]
  },
  {
    title: '跟进人',
    type: 'select',
    name: 'employeeId',
    rules: [{ required: true, message: '跟进人不能为空' }]
  },
  { title: '陈列费', type: 'inputNumber', name: 'displayFee' },
  {
    title: '门头照',
    type: 'upload',
    name: 'doorPhoto',
    uploadNumber: 8,
    rules: [{ required: true, message: '门头照不能为空' }]
  }
]
```
