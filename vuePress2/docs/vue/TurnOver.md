---
title: 卡牌抽奖小游戏
author: 陈佳鑫
date: '2022-10-28'
---

使用 VUE CSS 动画编写卡牌抽奖小游戏
<TurnOver />

### 设计思路

编写 2 个 div 盒子，一个在上，一个在下，分别为正反 2 面，显示反面时正面通过 css 属性`opacity`设置为透明，点击后通过点击卡牌隐藏当前卡牌 div，
设置 css 动画`animation: appears 3s 0s ease-in forwards;`显示单张卡牌 div，3 秒内缓慢出现停留在最后一帧画面，为卡牌 div 设置 CSS 动画
`animation: just 10s 0s ease-in-out forwards;`旋转 2700° 并且由小变大，最后正面 div 设置`opacity:1`显示，反面 div 设置`opacity:0`隐藏

### 计算 div 宽度

使用 `$refs` 得到外围 div 宽度，每行放置 4 张卡牌，每张卡牌间距为 10，计算每张卡牌宽度，获得宽度后因卡牌为长方形，高度为宽度 1.5 倍

```js
mounted() {
  const width = this.$refs?.container.scrollWidth
  this.countSize(width)
  window.onresize = () => {
    return (() => {
      this.countSize(this.$refs?.container.scrollWidth)
    })();
  }
}
countSize(width) {
  // 计算div出去左右边距剩余大小
  const surplus = width - 80
  // 每行显示4个卡片，计算多余不好被整除数字
  const remainder = surplus % 4
  // 计算每个卡片宽度
  const cardWidth = (surplus - remainder) / 4
  // 计算每个卡片高度, 因为卡片为长方形所有高度是宽度的1.5倍
  const cardHeight = cardWidth * 1.5
  this.width = cardWidth
  this.height = cardHeight
  // 计算外围div总体高度，如果卡牌数量为4只能显示一行翻转之后外围div高度应为2行卡牌高度
  this.totalHeight = (this.prizeList.length / 4) > 1 ? cardHeight * Math.ceil(this.prizeList.length / 4) : cardHeight * 2
}
```

### 整体代码

```vue
<template>
  <div class="info">
    <div v-if="!click" class="container" ref="container">
      <div
        class="card"
        v-for="item in prizeList"
        :key="item.index"
        :style="{ width: `${width}px`, height: `${height}px`, margin: '10px' }"
        @click="handleCard(item)"
      >
        <div class="content">{{ item.name }}</div>
        <div class="background">
          <i class="light"></i>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mask appear"
      ref="container"
      :style="{
        height: `${totalHeight}px`,
        '--cardHeight': `${(totalHeight / 2) * 1.5}px`,
        '--cardWidth': `${(totalHeight - 20) * 0.5}px`
      }"
    >
      <div
        class="card"
        :style="{ width: `${width}px`, height: `${height}px`, margin: 'auto' }"
      ></div>
      <div
        class="pic"
        :style="{
          height: `${(totalHeight / 2) * 1.5}px`,
          width: `${(totalHeight - 20) * 0.5}px`
        }"
      >
        <img
          :style="{
            height: `${(totalHeight / 2) * 1.5}px`,
            width: `${(totalHeight - 20) * 0.5}px`
          }"
          src="http://rw8irwnr8.hn-bkt.clouddn.com/%E7%8C%AB.jpg"
        />
        <i
          :style="{
            height: `${(totalHeight / 2) * 1.5}px`,
            width: `${(totalHeight - 20) * 0.5}px`
          }"
          class="light"
        ></i>
        <div class="prizeNme">{{ prize.name }}</div>
      </div>
    </div>
    <div v-if="click" style="text-align: center;overflow: hidden;">
      <button class="but" @click="handleReceive">领 取</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
      totalHeight: 0,
      prize: {},
      click: false,
      maskVis: false,
      prizeList: [
        { index: 1, name: '一等奖', color: 'red' },
        { index: 2, name: '二等奖', color: 'red' },
        { index: 3, name: '三等奖', color: 'red' },
        { index: 4, name: '四等奖', color: 'red' },
        { index: 5, name: '五等奖', color: 'red' },
        { index: 6, name: '六等奖', color: 'red' },
        { index: 7, name: '谢谢惠顾', color: 'red' },
        { index: 8, name: '再来一次', color: 'red' }
      ]
    }
  },
  created() {
    // 打乱数组顺序
    this.prizeList = this.prizeList.sort((a, b) => {
      return Math.random() > 0.5 ? -1 : 1
    })
  },
  mounted() {
    const width = this.$refs?.container.scrollWidth
    this.countSize(width)
    window.onresize = () => {
      return (() => {
        this.countSize(this.$refs?.container.scrollWidth)
      })()
    }
  },
  methods: {
    countSize(width) {
      // 计算div出去左右边距剩余大小
      const surplus = width - 80
      // 每行显示4个卡片，计算多余不好被整除数字
      const remainder = surplus % 4
      // 计算每个卡片宽度
      const cardWidth = (surplus - remainder) / 4
      // 计算每个卡片高度, 因为卡片为长方形所有高度是宽度的1.5倍
      const cardHeight = cardWidth * 1.5
      this.width = cardWidth
      this.height = cardHeight
      // 计算外围div总体高度
      this.totalHeight =
        this.prizeList.length / 4 > 1
          ? cardHeight * Math.ceil(this.prizeList.length / 4)
          : cardHeight * 2
    },
    // 点击卡片
    handleCard(item) {
      this.click = true
      this.prize = item
      setTimeout(() => {
        this.maskVis = true
      }, 1000)
    },
    handleReceive() {
      this.click = false
      this.prize = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  position: relative;
  .but {
    cursor: pointer;
    width: 200px;
    height: 50px;
    border-style: none;
    background: #409eff;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    position: relative;
    top: -200px;
    animation: butUp 3s 9s ease-in forwards;
  }
  .appear {
    animation: appears 3s 0s ease-in forwards;
  }
  @keyframes appears {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes butUp {
    100% {
      top: 0px;
    }
  }
}
.container {
  display: flex;
  flex-wrap: wrap;
  .card {
    position: relative;
    .content {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s ease;
      background-image: linear-gradient(pink, rgb(248, 14, 229));
      opacity: 0;
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-right: 10px;
      background-color: rgb(83, 82, 82);
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s;
      .light {
        cursor: pointer;
        position: absolute;
        left: -114%;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: -webkit-linear-gradient(
          0deg,
          hsla(0, 92%, 49%, 0),
          rgba(255, 255, 255, 0.5),
          hsla(0, 0%, 100%, 0)
        );
        transform: skewx(-16deg);
      }
    }
    .background:hover .light {
      transition: all 0.5s ease;
      left: 114%;
    }
    .background:hover {
      cursor: pointer;
      transform: translateY(-6px);
      box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.5);
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .card {
    border-radius: 10px;
    background-color: rgb(83, 82, 82);
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.5);
    animation: back 10s 0s ease-in-out forwards;
  }
  .pic {
    transform: translateY(-6px);
    position: absolute;
    left: 32.5%;
    top: 12.5%;
    right: 0;
    bottom: 0;
    opacity: 0;
    overflow: hidden;
    animation: just 10s 0s ease-in-out forwards;
    img {
      border-radius: 10px;
    }
    .light {
      cursor: pointer;
      position: absolute;
      left: -100%;
      top: 0;
      background-image: -webkit-linear-gradient(
        0deg,
        hsla(0deg, 92%, 49%, 0),
        rgba(255, 132, 0, 0.5),
        hsla(0deg, 0%, 100%, 0)
      );
      transform: skewx(-16deg);
      animation: light 2s 9.9s linear forwards;
    }
    .prizeNme {
      position: absolute;
      top: 50%;
      width: 100%;
      color: red;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
  }
  @keyframes back {
    0% {
      transform: rotateY(0);
    }
    50% {
      width: var(--cardWidth);
      height: var(--cardHeight);
    }
    90% {
      opacity: 1;
    }
    100% {
      width: var(--cardWidth);
      height: var(--cardHeight);
      transform: rotateY(2700deg);
      opacity: 0;
    }
  }
  @keyframes just {
    90% {
      opacity: 0;
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
      opacity: 1;
    }
  }
  @keyframes light {
    to {
      transition: all 2s ease;
      left: 114%;
    }
  }
}
</style>
```
