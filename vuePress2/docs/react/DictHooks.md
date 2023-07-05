---
title: 自定义DictHooks
author: 陈佳鑫
date: '2023-2-22'
---

使用 hooks 将大量不频繁更新的字典数据存储在本地，减少服务器压力，在字典产生增、删、改，等操作时，对本地指定字典进行删除，在下次调用
查询接口时将最新数据存在本地，此方法存在弊端，因无法监听其他用户改变行为所以不能实现及时更新，只能通过用户刷新界面从新获取字典数据，
优点在于字典类型不存在频繁改动，可以考虑使用

### 设计思路

1.我们在 dictHooks 之外定义一个对象用于存储字典类型
<br/> 2.创建 dictHooks 方法入参为
<br/> 3.创建 useState 用于存储本次数据
<br/> 4.使用 useCallback 创建 setDict 查询字典数据方法，使用 useCallback 创建方法是为了防止多次创建影响性能
<br/> 5.使用 useEffect 调用方法，调用之前先到外部对象中查询是否存在，如果存在直接取值，如果没有调用 setDict
<br/>

### 具体方法

```ts
import { BaseResult } from '@ahooksjs/use-request/lib/types'
import { useCallback, useEffect, useState } from 'react'

interface useDictProps {
  key: string
  path?: BaseResult<any, any>
  dictValue?: string
  dictKey?: string
}

interface dictDTO {
  dictKey: string
  dictValue: string
}

// 字典存储
const dict: { [k: string]: Array<dictDTO> } = {}

export function useDict({
  key,
  path,
  dictValue = 'dictValue',
  dictKey = 'dictKey'
}: useDictProps): [
  Array<dictDTO>,
  {
    _setDict: () => void
    _deleteDict: () => void
    _emptyDict: () => void
  }
] {
  const [useDict, setUseDict] = useState<Array<dictDTO>>([])

  // 查询字典数据
  const _setDict = useCallback(async () => {
    const res = await path?.run()
    const dictArr = res?.map((item: any) => {
      return { dictKey: item[dictKey], dictValue: item[dictValue] }
    })
    dict[key] = dictArr?.concat([]) ?? []
    setUseDict(dictArr?.concat([]) ?? [])
  }, [])

  // 删除指定字典
  const _deleteDict = useCallback(() => {
    delete dict[key]
  }, [])

  // 清空字典存储
  const _emptyDict = useCallback(() => {
    Object.keys(dict).map((keyName: string) => {
      delete dict[keyName]
    })
  }, [])

  useEffect(() => {
    if (!path) return
    if (!dict[key] || dict[key].length === 0) {
      _setDict()
    } else {
      setUseDict(dict[key].concat([]))
    }
  }, [])

  return [useDict, { _setDict, _deleteDict, _emptyDict }]
}
```

### dictHooks 方法入参

| 属性      | 类型                   | 说明                                                                       |
| :-------- | :--------------------- | :------------------------------------------------------------------------- |
| key       | string                 | 用于存储的字典名称                                                         |
| path      | `BaseResult<any, any>` | useRequest(Request, { manual: true })方法返回结果, 防止在 hooks 中使用钩子 |
| dictKey   | string                 | data 中返回的字典主键                                                      |
| dictValue | string                 | data 中返回的字典值                                                        |

### 调用方式

```ts
import { useDict } from '@/utils/dictHooks'

// 用户岗位
const [userPosition] = useDict({
  key: 'userPosition',
  path: useRequest(() => apis.userPosition(), { manual: true }),
  dictKey: 'postId',
  dictValue: 'name'
})
```
