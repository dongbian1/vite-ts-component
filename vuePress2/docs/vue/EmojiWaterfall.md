<h1 style="text-align: center">Emoji 瀑布雨</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2022-12-22</div>
</div>
<br />

使用`createElement`生成一个div，给div设置一个随机横向坐标，坐标为窗口宽度，往div中放入一个随机emoji，使用`setInterval`每30ms往下掉落10px，掉落超过1/3有几率触发暂停放大css动画

<EmojiWaterfall />
::: details 点击查看代码
```ts
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
```