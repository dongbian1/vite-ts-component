<template>
  <div id="master">
    <h1>今天你EMO了吗</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isStop = ref<boolean>(false)

/**
 * 生成随机Emoji 并且掉落
 */
const runSnow = () => {
  let width = window.innerWidth
  let height = window.innerHeight

  let snow = document.createElement("div");

  // 大小
  snow.style.fontSize = getRandomInitInclusive(15, 30) + 'px'
  snow.innerHTML = `<div class="emojiOne">&#1285${getRandomInitInclusive(12, 90)};</div>`;
  snow.style.position = "fixed";
  // 随机生成横向出现位置
  const snowLeft = getRandomInitInclusive(10, width - 10)
  snow.style.left = snowLeft + 'px';
  // 纵向位置固定从最顶上开始
  snow.style.top = "-50px";
  // 随机下落时间
  const sinkTime = getRandomInitInclusive(5, 7)
  let ms = sinkTime * 1000
  // 随机抓取一个表情放大爆炸
  if (!isStop.value && getRandomInitInclusive(0, 5) === 5 && snowLeft > 50) {
    isStop.value = true
    // 随机获取表情爆炸位置
    const scrollHeight = getRandomInitInclusive(50, height - 80)
    // 设置动画下落位置
    snow.style.setProperty('--dm-scroll-height', `${scrollHeight}px`)
    // 设置动画时间
    snow.style.setProperty('--dm-scroll-ms', `${sinkTime}s`)
    // 设置元素清除时间为所有动画结束后=下落时间+爆炸时间
    ms += 4000
    // console.log(sinkTime, emojiSinkTime, ms)
    // 上一个动画结束后元素已到达规定位置，及从新设置元素开启爆炸动画
    setTimeout(() => {
      snow.style.top = scrollHeight + 'px'
      snow.className = 'emoji'
      isStop.value = false
    }, sinkTime * 1000)
  } else {
    snow.style.setProperty('--dm-scroll-height', `${height}px`)
    snow.style.setProperty('--dm-scroll-ms', `${sinkTime}s`)
  }

  document.getElementById("master")?.appendChild(snow);

  setTimeout(() => {
    snow.parentNode?.removeChild(snow)
  }, ms)
}

/**
 * 随机生成数值
 * @param min 最小值
 * @param max 最大值
 */
const getRandomInitInclusive = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(() => {
  setInterval(() => {
    runSnow()
  }, 80)
})
</script>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}

:deep(.emojiOne) {
  animation: emojiOneInner var(--dm-scroll-ms) linear;
}

@keyframes emojiOneInner {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(var(--dm-scroll-height));
  }
}

:deep(.emoji) {
  animation: emojiInner 4s;
  /* animation-direction: alternate; */
  /* animation-iteration-count: infinite; */
}

@keyframes emojiInner {

  0%,
  10%,
  20%,
  30%,
  40%,
  50% {
    transform: rotate(-10deg);
  }

  5%,
  15%,
  25%,
  35%,
  45% {
    transform: rotate(10deg);
    opacity: 1;
  }

  50%,
  60%,
  70% {
    transform: scale(1.1);
  }

  55%,
  65%,
  75% {
    transform: scale(1.3);
    opacity: 1;
  }

  90%,
  92%,
  94% {
    transform: scale(10) rotate(0);
  }

  91%,
  93%,
  95% {
    transform: scale(10.2);
  }

  95% {
    opacity: 1;
    transform: scale(10);
  }

  100% {
    transform: scale(15);
    opacity: 0;
  }
}
</style>
