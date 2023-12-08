<h1 style="text-align: center">可拖拽编辑页面</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2023-2-13</div>
</div>
<br />

<DragVue />

### 可拖拽编辑界面组件

本章节开发使用[npm vuedraggable](https://www.npmjs.com/package/vuedraggable)
<br>
开发思路：将主界面分 3 个模块进行,left 模块使用[dragstart](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event)、
[dragend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event)
进行组件拖拽控制

```vue
<section class="l">
  <ul @dragstart="dragStart" @dragend="dragEnd">
    <li v-for="(val, key, index) in typeList" draggable :data-type="key" :key="index + 1">
      <span :class="val.icon"></span>
      <p>{{ val.name }}</p>
    </li>
  </ul>
</section>
```

当组件 div 被拖拽至 content 组件（中间内容显示组件）时，因在 content 组件中使用了[dragover](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event)
事件会每隔几百秒毫秒触发

```vue
<section class="c">
  <div class="top-nav" @click="selectType(0)">
    <img :src="http://rw8irwnr8.hn-bkt.clouddn.com/topNavBlack.png" />
    <span class="tit">{{ info.title }}</span>
  </div>
  <div class="view-content" @drop="drog" @dragover="dragOver" :style="{ backgroundColor: info.backgroundColor }">
    <Draggable v-model="view" draggable=".item">
      <template v-for="(item, index) in view">
        <div v-if="index > 0" :data-index="index" :key="index" class="item" @click="selectType(index)">
          <!-- waiting -->
          <template v-if="item.status && item.status == 2">
            <div class="wait"> {{ item.type }} </div>
          </template>
          <template v-else>
            <component :is="typeList[item.type]['com']" :data="item" :className="className[item.tabType]">
            </component>
          </template>
          <i @click="deleteItem($event, index)" class="el-icon-error"></i>
        </div>
      </template>
    </Draggable>
  </div>
</section>
```

此时我们可以根据当前 div 移动位置进行判断，dragover event 中可以获取到当前 div 在 content 组件中位置`event.target.className`。
我们为主 div 创建了一个 className 为`view-content`, Draggable 组件中 className 为`item`，此时我们可以通过 name 判断当前 div 位置，移动位置为`view-content`时，我们
可以在`view`数组中插入一条 status 为 2 的占位数据（因为此 div 当前所在位置为组件最底部），当移动位置为`item`说明我们在`view`已经插入过一条数据，此时我们需要判断单曲 div 相对于`item`的高度，
如果高度小于`item`的一半我们将占位数据插入至`item`之前，如果高度大于一半将数据插入至`item`之后,当拖拽结束时触发`dragEnd`事件，删除掉`view`中 `status`这样就会根据当前组件
渲染，到此整个拖拽思路完成。

### dragOver 移动中监控事件

```js
// 移动中
dragOver(e) {
  if (!this.type) { // 内容拖拽
    return
  }
  e.preventDefault()
  e.stopPropagation()
  let className = e.target.className
  let name = className !== 'view-content' ? 'item' : 'view-content'

  const defaultData = {
    type: this.type,    // 组件类型
    status: 2,          // 默认状态
    data: [],           // 数据
    options: {},        // 选项操作
    tabType: 1
  }
  if (name == 'view-content') {
    if (!this.isPush) {
      this.index = this.view.length
      this.isPush = true
      this.view.push(defaultData)
    }
  } else if (name == 'item') {

    let target = e.target
    let [y, h, curIndex] = [e.offsetY, target.offsetHeight, target.dataset.index]

    let direction = y < (h / 2)
    if (!this.isPush) {
      // Push to Top or Bottom
      if (direction) {
        if (curIndex == 0) {
          this.view.unshift(defaultData)
        } else {
          this.view.splice(curIndex, 0, defaultData)
        }
      } else {
        curIndex = +curIndex + 1
        this.view.splice(curIndex, 0, defaultData)
      }
    } else {
      // Moving
      if (direction) {
        var i = curIndex == 0 ? 0 : curIndex - 1
        var result = this.view[i]['status'] == 2
      } else {
        var i = +curIndex + 1
        var result = this.view.length > i && this.view[i]['status'] == 2
      }
      if (result) return
      const temp = this.view.splice(this.index, 1)
      this.view.splice(curIndex, 0, temp[0])
    }
    this.index = curIndex
    this.isPush = true
  }
}
```
