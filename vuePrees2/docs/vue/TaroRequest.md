---
title: Taro开发小程序无感知登录
author: 陈佳鑫
date: '2022-10-24'
---

使用 taro 开发微信小程序实现登录过期，无感知自动登录

```js
let isRefreshing = true
let subscribers = []
const onAccessTokenFetched = () => {
  subscribers.forEach((callback) => {
    callback()
  })
  subscribers = []
}

const addSubscriber = (callback) => {
  subscribers.push(callback)
}

export class Http {
  constructor() {}
  request({ url, data = {}, method, header, callback = '' } = {}) {
    let _this = this
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        header: { Authorization: 'Bearer ' + storge.get(LOGIN_TOKEN) },
        callback,
        fail(res) {
          reject(res)
        },
        complete: (res) => {
          if (callback) return callback(res.data)
          let statusCode = res.statusCode
          if (statusCode == 404) {
            console.log('接口不存在')
          } else if (statusCode == 401) {
            // 将须要从新执行的接口缓存到一个队列中
            addSubscriber(() => {
              _this.request({ url, data, method, header, callback: resolve })
            })
            if (isRefreshing) {
              getNewToken(url, data).then(() => {
                // 顺次去执行缓存的接口
                onAccessTokenFetched()
                isRefreshing = true
              })
            }
            isRefreshing = false
          } else if (statusCode == 200) {
            resolve(res.data)
          } else if (statusCode.startsWith('5')) {
            wx.showModal({ content: '服务器报错，请重试！', showCancel: false })
          }
        }
      })
    })
  }
}
// 获取token
const getNewToken = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        wx.request({
          url: '获取最新token接口地址',
          method: 'POST',
          success(res) {
            let r = res.data
            // 将所有存储到观察者数组中的申请从新执行。
            if (r.code == 0) {
              const token = r['data']['token']
              wx.setStorageSyn('LOGIN_TOKEN', token)
              resolve(res)
            }
          }
        })
      },
      fail(err) {
        reject()
        console.error('wx login fail', err)
      }
    })
  })
}
```
