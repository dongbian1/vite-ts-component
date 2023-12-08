<h1 style="text-align: center">批量下载图片</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2023-03-31</div>
</div>
<br />

使用`jszip`压缩图片打包成 ZIP，通过`file-saver`进行浏览器下载

```npm
npm install jszip
npm install file-saver
```

根据不同时间段，不同人员，进行文件夹分类，最后整体打包 zip 通过浏览器下载

### 代码块

```ts
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

interface Img {
  imgUrl: string
  name: string
  dayTime: string
  time: string
  customerName: string
  employeeName: string
}

//转换图片为base64格式
const getImageBase64 = (image: HTMLImageElement) => {
  // 创建一个画布
  const canvas = document.createElement('canvas')
  // 让画布的宽高等于图片的宽高
  canvas.width = image.width
  canvas.height = image.height
  // 然后在画布上进行画画
  const ctx = canvas.getContext('2d')
  // 开始画图片，1.绘制的对象2.绘制的位置，3绘制的宽高
  ctx?.drawImage(image, 0, 0, image.width, image.height)
  return canvas.toDataURL()
}

/**
 * 批量下载图片
 * @param sourceList 需要下载图片对象
 * @param zipName 压缩包名称
 */
export const downloadZip = async (sourceList: Array<Img>, zipName: string) => {
  return new Promise((resolve, reject) => {
    //创建一个压缩对象
    const zip = new JSZip()
    // 创建 zipName 文件夹
    const fileFolder = zip.folder(zipName)
    const fileList: Array<{ name: string; img: string }> = []
    Promise.all(
      sourceList.map((item) => {
        let timeFolder = fileFolder?.folder(item.dayTime)
        let employeeFolder = timeFolder?.folder(item.employeeName)
        //压缩后的每张图片对应名
        const name = item.name
        //创建图片对象 设置图片基本信息
        const image = new Image()
        // 设置 crossOrigin 属性，解决图片跨域报错
        image.setAttribute('crossOrigin', 'Anonymous')
        //设置图片地址----稍后进行base64转换
        image.src = item.imgUrl
        return new Promise((resolve, reject) => {
          image.onload = async () => {
            //路径base64转换
            const url = await getImageBase64(image)
            //图片名称
            const fileName = `${item.customerName}-${name}-${item.time}`
            //去掉base64文件标识，img是文件形式
            const fileImg = url.substring(22)
            employeeFolder?.file(`${fileName}.png`, fileImg, {
              base64: true,
              // STORE：默认不压缩 DEFLATE：需要压缩
              compression: 'DEFLATE',
              // 压缩等级1~9    1压缩速度最快，9最优压缩方式
              compressionOptions: {
                level: 9
              }
            })
            resolve('')
          }
        })
      })
    ).then((res) => {
      //确保数据不为空
      // 压缩的结果为blob类型（二进制流）,可用作文件上传
      zip.generateAsync({ type: 'blob' }).then((content) => {
        // 直接在浏览器打成zipName.zip包并下载，saveAs依赖的js是FileSaver.js
        saveAs(content, `${zipName}.zip`)
        resolve('打包完成')
      })
    })
  })
}
```
