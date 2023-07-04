---
title: React 图片查看器
author: 陈佳鑫
date: '2023-5-04'
---

### 图片查看器

本组件使用`forwardRef`、`useImperativeHandle`编写，可在父组件通过 ref 直接操作，减少了父子组件通信事件，使组件更加便利
<br/>
本组件支持通过点击切换图片，通过左右键盘按键操作

### 组建代码

```tsx
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import styled from 'styled-components'

const TableImg = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-bottom: 5px;
  img {
    width: 60px;
    height: 60px;
    margin: 5px;
    cursor: pointer;
  }
  ::-webkit-scrollbar {
    width: 1px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fc9611;
  }
`
const LeftDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 55%;
  background: #000;
  opacity: 0.3;
  width: 50px;
  height: 50px;
  line-height: 55px;
  text-align: center;
  border-radius: 50px;
`

const RightDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 55%;
  right: 25px;
  background: #000;
  opacity: 0.3;
  width: 50px;
  height: 50px;
  line-height: 55px;
  text-align: center;
  border-radius: 50px;
`

const ImgCheck = forwardRef(
  (
    props: { title?: string },
    ref: React.ForwardedRef<{ show: (arr: string[], select: number) => void }>
  ) => {
    useImperativeHandle(ref, () => ({
      show: (arr, select) => {
        setImgArr(arr)
        setSelect(select)
        setVisible(true)
      }
    }))
    const [visible, setVisible] = useState<boolean>(false)
    const [select, setSelect] = useState<number>(0)
    const [imgArr, setImgArr] = useState<string[]>([])

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.code === 'ArrowLeft') {
          setSelect((prevState) => {
            return prevState === 0 ? prevState : prevState - 1
          })
        } else if (event.code === 'ArrowRight') {
          setSelect((prevState) => {
            return prevState === imgArr.length - 1 ? prevState : prevState + 1
          })
        }
      },
      [imgArr]
    )

    useEffect(() => {
      if (imgArr.length > 1) {
        if (visible) {
          window.addEventListener('keydown', onKeyDown, false)
        } else {
          window.removeEventListener('keydown', onKeyDown, false)
        }
      }
    }, [visible])

    return (
      <Modal
        visible={visible}
        title={`${props.title || '图片'}（${imgArr.length}/${select + 1}）`}
        footer={null}
        zIndex={9999}
        onCancel={() => {
          setVisible(false)
          setSelect(0)
        }}
      >
        <TableImg>
          {imgArr.map((item: string, index: number) => {
            return (
              <img
                src={`${item}!80`}
                key={index}
                style={{
                  pointerEvents: 'none',
                  border: select === index ? '2px solid #fc9611' : 'none'
                }}
                onClick={() => {
                  setSelect(index)
                }}
              />
            )
          })}
        </TableImg>
        <img alt="example" style={{ width: '100%' }} src={imgArr[select]} />
        {select > 0 && (
          <LeftDiv onClick={() => setSelect(select - 1)}>
            <LeftOutlined
              style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}
            />
          </LeftDiv>
        )}
        {select < imgArr.length - 1 && (
          <RightDiv onClick={() => setSelect(select + 1)}>
            <RightOutlined
              style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}
            />
          </RightDiv>
        )}
      </Modal>
    )
  }
)
export default ImgCheck
```

### 组件调用

```ts
const imgRef = createRef<{ show: (arr: string[], select: number) => void }>()

<ImgCheck title={props.title} ref={imgRef} />
```
