<h1 style="text-align: center">Emoji 瀑布雨</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2022-12-22</div>
</div>
<br />

使用`createElement`生成一个 div，给 div 设置一个随机横向坐标，坐标为窗口宽度，往 div 中放入一个随机 emoji，使用 css 动画往下掉落，emoji 随机触发爆炸表情，在 emoji 到达指定位置后，开启爆炸 css 动画，爆炸动画完成后删除div

<EmojiWaterfall />
::: details 点击查看代码
```ts

/\*\*

- 生成随机 Emoji 并且掉落
  \*/
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
let ms = sinkTime _ 1000
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
}, sinkTime _ 1000)
} else {
snow.style.setProperty('--dm-scroll-height', `${height}px`)
snow.style.setProperty('--dm-scroll-ms', `${sinkTime}s`)
}

document.getElementById("master")?.appendChild(snow);

setTimeout(() => {
snow.parentNode?.removeChild(snow)
}, ms)
}

```

```
