<h1 style="text-align: center">Vite 适配低版本浏览器</h1>
<div style="display: flex;color: #999;justify-content: space-around;">
  <div>作者：陈佳鑫</div>
  <div>时间：2023-12-08</div>
</div>
<br />

使用Vite + Vue3 + Vant 开发H5应用，因手机安卓版本型号过低，所以Google浏览器版本过低，打包后不适应ES6语法，所以要使用babel打包为ES5版本

### 浏览器Console信息 ###
<br />
<img class="avatar" :src="$withBase('/ViteES5.png')">

### 解决globalThis 错误 ###
因为ES5兼容问题会报globalThis is not defined我们需要在index.html文件加入兼容
```html
<script>
  !(function (t) {
    function e() {
      var e = this || self;
      (e.globalThis = e), delete t.prototype._T_
    }
    'object' != typeof globalThis &&
      (this ?
        e() :
        (t.defineProperty(t.prototype, '_T_', {
          configurable: !0,
          get: e
        }),
          _T_))
  })(Object)
</script>
```

### 安装 rollup-plugin-esbuild ###
```npm
yarn add rollup-plugin-esbuild
```

### 配置 .babelrc ###
新建.babelrc文件
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

### vite.config.ts 配置
```ts
plugins: [
    vue(),
    esbuild({
      target: 'chrome64',
      loaders: {
        '.vue': 'js',
        '.ts': 'js'
      }
    })
  ],
  build: {
    minify: 'terser',
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'], // 适配低版本浏览器
  },
``` 