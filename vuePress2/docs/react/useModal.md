---
title: 自定义React Hooks useModal
author: 陈佳鑫
date: '2023-2-7'
---

使用 React Hooks 自定义 use 开发，适用于 modal 弹出框状态管理，减少使用 modal 多参数定义

### 类型声明

```ts
interface IModalProps<T = any> {
  visible: boolean
  type?: 'add' | 'update'
  data: T | undefined
}
```

| 参数    | 类型           | 说明                     |
| :------ | :------------- | :----------------------- |
| visible | `boolean`      | 是否展示 modal 框        |
| type    | `add` `update` | add：新增， update：修改 |
| data    | T              | 存储数据                 |

### useModalProps 类型

```ts
function useModalProps<T = any>(
  props?: IModalProps<T>
): [
  IModalProps<T>,
  {
    showModal: (data: T, type?: 'add' | 'update') => void
    hideModal: () => void
    setModalData: (data: T) => void
    cleanModalData: () => void
    closeEmptyModalData: () => void
  }
]
```

| 参数                | 类型                         | 说明                                               |
| :------------------ | :--------------------------- | :------------------------------------------------- |
| showModal           | `Function(data, type): void` | 打开 modal 框 data: 需要存储的数据，type: 打开类型 |
| hideModal           | `Function(): void`           | 隐藏 modal 框                                      |
| setModalData        | `Function(data): void`       | 更新 data 数据                                     |
| cleanModalData      | `Function(): void`           | 清除 data 数据                                     |
| closeEmptyModalData | `Function(): void`           | modal 框关闭后清除 data 数据                       |

### 整体代码

```ts
export function useModalProps<T = any>(
  props?: IModalProps<T>
): [
  IModalProps<T>,
  {
    showModal: (data: T, type?: 'add' | 'update') => void
    hideModal: () => void
    setModalData: (data: T) => void
    cleanModalData: () => void
    closeEmptyModalData: () => void
  }
] {
  const [_modalData, _setModalData] = useState(
    props ?? { visible: false, data: undefined }
  )

  const showModal = (data: T, type?: 'add' | 'update') => {
    _setModalData({
      visible: true,
      type: type,
      data
    })
  }

  const hideModal = () => {
    _setModalData({
      visible: false,
      data: _modalData.data!
    })
  }

  const setModalData = (data: T) => {
    _setModalData({
      visible: _modalData.visible,
      type: _modalData.type,
      data
    })
  }

  const cleanModalData = () => {
    _setModalData({
      visible: _modalData.visible,
      data: undefined
    })
  }

  const closeEmptyModalData = () => {
    _setModalData({
      visible: false,
      data: undefined
    })
  }

  return [
    _modalData,
    { showModal, hideModal, cleanModalData, setModalData, closeEmptyModalData }
  ]
}
```

### 使用 useModal

```ts
const [useModal, useModalController] = useModalProps()
```
