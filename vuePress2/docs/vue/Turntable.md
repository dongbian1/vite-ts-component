---
title: 转盘小游戏
author: 陈佳鑫
date: '2022-10-25'
---

使用 VUE CSS 动画编写转盘小游戏
<Turntable />
<br>

通过 CSS `transform` 设置 div 旋转得到夹角，使用 css 动画`animation: rotate 10s 1 ease-in-out;` 进行整体 DIV 旋转 10 秒内总共旋转 10 圈旋转方式由慢到快，在由快到慢直至停下，
点击抽奖获取当前中奖位置，计算旋转停下后位置放入`--prizeAngle`scss 变量

### 计算每个奖品夹角

通过中奖数组个数计算当前每个奖品夹角大小

```js
calculationAngle(index, isSkewY) {
  // 获取当前奖品数组个数
  const number = this.prizeList.length;
  // 奖品个数是否能被360°圆型整除
  let surplus = 360 % number;
  // 默认圆形角度
  let angle = 360;
  // 如果数组个数不能整除360°圆形将多余部分留出
  if (surplus !== 0) {
    angle = angle - surplus;
  }
  // 计算得出每个奖品夹角度数
  let value = angle / number;
  // 计算奖品夹角开始度数
  let rotate = value * index - value / 2;
  // 计算skewY度数等大三角形div
  let skewY = 90 - value;
  // 渲染最后一个奖品时增加之前留出不能整除角度
  if (index === number - 1) {
    skewY -= surplus;
  }
  // isSkew判断是开始角度还是结束角度
  return isSkewY ? skewY : rotate;
}
```

### 计算本次中奖数据

通过随机数生成，计算本次抽奖奖品，获取到当前奖品顺序后，计算奖品在圆盘角度，最后计算圆盘停止角度为奖品角度中间值

```js
uckDraw() {
  // 通过随机数计算本次抽奖奖品
  const prize = Math.abs(
    Math.round(Math.random() * this.prizeList.length - 1)
  );
  // 计算每个奖品夹角，取整
  const includedAngle = parseInt(360 / this.prizeList.length);
  // 计算当前中奖角度 360 - (this.calculationAngle(prize) + includedAngle / 2)
  // 用停止角度加上中奖角度得到转盘停止位置
  this.prizeAngle = `rotate(${3600 + 360 - (this.calculationAngle(prize) + includedAngle / 2)}deg)`;
  // 本次抽中奖品名称
  this.prizeName = this.prizeList[prize].name
  // 开始抽奖
  this.isTake = true;
  // 10秒出现抽奖按钮
  setTimeout(() => {
    this.isTake = false;
  },10000)
}
```

### 整体代码###

```vue
<template>
  <div class="index" :style="{ '--prizeAngle': prizeAngle }">
    <div ref="container"></div>
    <div
      :style="{
        width: width + 2 + 'px',
        position: 'relative',
        margin: 'auto',
        overflow: 'hidden'
      }"
    >
      <div
        :class="isTake ? 'disc move' : 'disc'"
        :style="{
          width: width + 'px',
          height: `${width}px`,
          'border-radius': `${width}px`,
          transform: prizeAngle
        }"
      >
        <div
          v-for="(item, index) in prizeList"
          :key="item.index"
          class="part constellation-part"
          :style="{
            transform: `rotate(${calculationAngle(
              index
            )}deg) skewY(-${calculationAngle(index, true)}deg)`
          }"
        >
          <div
            class="text"
            :style="{
              width: `${(width / prizeList.length) * 2}px`,
              top: `${width * 0.25}px`,
              transform: `skewY(${calculationAngle(index, true)}deg)`
            }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="triangle-up"
        :style="{
          'border-bottom': `${width / 2}px solid red`,
          left: `${width / 2 - 4}px`
        }"
      />
      <div
        class="circular"
        :style="{
          width: `${width / 10}px`,
          height: `${width / 10}px`,
          top: `${width / 2 - width / 20}px`,
          left: `${width / 2 - width / 20}px`,
          'border-radius': `${width / 10}px`
        }"
      />
    </div>
    <button v-if="!isTake" class="but" @click="luckDraw">抽 奖</button>
    <div v-else class="prizeName">中奖：{{ prizeName }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: 0,
      isTake: false,
      prizeAngle: 0,
      prizeList: [
        { index: 1, name: '一等奖', color: 'red' },
        { index: 2, name: '二等奖', color: 'red' },
        { index: 3, name: '三等奖', color: 'red' },
        { index: 4, name: '四等奖', color: 'red' },
        { index: 5, name: '五等奖', color: 'red' },
        { index: 6, name: '六等奖', color: 'red' },
        { index: 7, name: '谢谢惠顾', color: 'red' },
        { index: 8, name: '再来一次', color: 'red' }
      ],
      prizeName: null,
      style: {}
    }
  },
  mounted() {
    const width = this.$refs?.container.scrollWidth
    this.width = width
    window.onresize = () => {
      return (() => {
        console.log(this.$refs?.container.scrollWidth)
        this.width = parseInt(this.$refs?.container.scrollWidth)
      })()
    }
  },
  methods: {
    calculationAngle(index, isSkewY) {
      // 获取当前奖品数组个数
      const number = this.prizeList.length
      // 奖品个数是否能被360°圆型整除
      let surplus = 360 % number
      // 默认圆形角度
      let angle = 360
      // 如果数组个数不能整除360°圆形将多余部分留出
      if (surplus !== 0) {
        angle = angle - surplus
      }
      // 计算得出每个奖品夹角度数
      let value = angle / number
      // 计算奖品夹角开始度数
      let rotate = value * index - value / 2
      // 计算skewY度数等大三角形div
      let skewY = 90 - value
      // 渲染最后一个奖品时增加之前留出不能整除角度
      if (index === number - 1) {
        skewY -= surplus
      }
      // isSkew判断是开始角度还是结束角度
      return isSkewY ? skewY : rotate
    },
    // 计算本次中奖
    luckDraw() {
      // 通过随机数计算本次中奖
      const prize = Math.abs(
        Math.round(Math.random() * this.prizeList.length - 1)
      )
      // 计算每个奖品夹角，取整
      const includedAngle = parseInt(360 / this.prizeList.length)
      // 计算当前中奖角度 360 - (this.calculationAngle(prize) + includedAngle / 2)
      // 用停止角度加上中奖角度得到转盘停止位置
      this.prizeAngle = `rotate(${
        3600 + 360 - (this.calculationAngle(prize) + includedAngle / 2)
      }deg)`
      // 本次抽中奖品名称
      this.prizeName = this.prizeList[prize].name
      // 开始抽奖
      this.isTake = true
      // 10秒出现抽奖按钮
      setTimeout(() => {
        this.isTake = false
      }, 10000)
    }
  }
}
</script>
<style lang="scss" scoped>
.index {
  text-align: center;
  .disc {
    margin: 0 auto;
    width: 500px;
    height: 500px;
    border-radius: 500px;
    position: relative;
    overflow: hidden;
    border: 1px solid;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: var(--prizeAngle);
    }
  }
  .move {
    animation: rotate 10s 1 ease-in-out;
    transform: var(--prizeAngle);
  }

  .constellation-part {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    transform-origin: 0 100%;
  }
  .part {
    border-left: 1px solid #333;
    .text {
      text-align: center;
      position: relative;
      top: 120px;
    }
  }
  .triangle-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 250px solid red;
    position: absolute;
    top: 0px;
    left: 246px;
  }
  .circular {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    position: absolute;
    top: 225px;
    left: 226px;
    background: red;
  }

  .but {
    cursor: pointer;
    margin-top: 50px;
    width: 200px;
    height: 50px;
    border-style: none;
    background: #409eff;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
  }

  .prizeName {
    margin-top: 50px;
    color: red;
    font-size: 18px;
  }
}
</style>
```
