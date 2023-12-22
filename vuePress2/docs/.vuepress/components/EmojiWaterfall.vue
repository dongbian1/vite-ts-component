<template>
  <div id="master">
    <h1 style="text-align: center;">今天你EMO了吗</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isStop = ref<boolean>(false)

/**
 * 生成随机Emoji 并且掉落
 * @param speed 掉落速度 单位ms
 */
const runSnow = (speed: number = 30) => {
  let width = window.innerWidth
  let height = window.innerHeight

  let snow = document.createElement("div");

  // 大小
  snow.style.fontSize = getRandomInitInclusive(15, 30) + 'px'
  snow.innerHTML = `<div>&#1285${getRandomInitInclusive(12, 90)};</div>`
  snow.style.position = "fixed";

  // 随机生成横向出现位置
  snow.style.left = Math.random() * width + 'px';
  // 纵向位置固定从最顶上开始
  snow.style.top = "0px";
  document.getElementById("master")?.appendChild(snow);

  let time = setInterval(() => {
    if (!isStop.value && parseInt(snow.style.top) / 30 > 10 && getRandomInitInclusive(0, 10) === 10) {
      clearInterval(time)
      isStop.value = true
      snow.className = 'emoji'
      setTimeout(() => {
        snow.parentNode?.removeChild(snow)
        isStop.value = false
      },4000)
      return
    }
    snow.style.top = parseInt(snow.style.top) + 10 + 'px';
    if (parseInt(snow.style.top) >= height) {
      clearInterval(time)
      snow.parentNode?.removeChild(snow)
    }
  }, speed)
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
  }, 100)
})

</script>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}

:deep(.emoji) {
  animation: emojiInner 4s;
  /* animation-direction: alternate; */
  /* animation-iteration-count: infinite; */
}

@keyframes emojiInner {
  0%,10%,20%,30%,40%,50% {
		transform: rotate(-10deg);
	}
	5%,15%,25%,35%,45% {
		transform: rotate(10deg);
		opacity: 1;
	}
	50%,60%,70% {
		transform: scale(1.1) ;
	}
	55%,65%,75% {
		transform: scale(1.3);
		opacity: 1;
	}
  90%,92%,94% {
    transform: scale(10) rotate(0);
  }
  91%,93%,95% {
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
