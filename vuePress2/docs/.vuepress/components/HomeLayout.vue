<template>
  <div class="index">
    <div class="top">
      <div class="title">个人简介</div>
      <div class="avatar_div">
        <img class="avatar" :src="withBase('/avatar.jpeg')" />
        <div class="test">海賊王になりたい男です</div>
      </div>
    </div>
    <div class="bottom">
      <div class="list" v-for="item in state.pageList" :key="item.key">
        <router-link class="title" :to="{ path: item.path }">{{
          item.title
        }}</router-link>
        <div class="explain">{{ item.explain }}</div>
        <div class="info">
          <div class="author">{{ item.author }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="HomeLayout">
import { reactive } from 'vue'
import { withBase } from '@vuepress/client'

const state = reactive({
  pageList: [
    {
      key: 1,
      title: 'React 自定义ModalForm组件',
      path: '/react/ModalFormItem.html',
      date: '2022-10-13',
      author: '陈佳鑫',
      explain: '避免频繁使用modal框新建简单表单'
    },
    {
      key: 2,
      title: 'VUE 可拖拽排序列表组件',
      path: '/vue/DragTable.html',
      date: '2022-10-17',
      author: '陈佳鑫',
      explain: '因业务需求要对列表进行拖拽排序'
    },
    {
      key: 3,
      title: 'Taro微信小程序无感知登录',
      path: '/vue/TaroRequest.html',
      date: '2022-10-24',
      author: '陈佳鑫',
      explain: '针对于微信小程序登录过期后，实现无感知登录，减少用户重新登录'
    },
    {
      key: 4,
      title: 'VUE 转盘抽奖小游戏',
      path: '/vue/Turntable.html',
      date: '2022-10-25',
      author: '陈佳鑫',
      explain: '使用CSS动画完成转盘抽奖小游戏'
    },
    {
      key: 5,
      title: 'VUE 卡牌抽奖小游戏',
      path: '/vue/TurnOver.html',
      date: '2022-10-31',
      author: '陈佳鑫',
      explain: '使用CSS动画完成卡牌抽奖小游戏'
    },
    {
      key: 6,
      title: 'VUE 动态Modal弹出框',
      path: '/vue/FlexibleModal.html',
      date: '2022-11-11',
      author: '陈佳鑫',
      explain: '使用Vue.extend注册modal挂载在body上实现任意弹框'
    },
    {
      key: 7,
      title: 'React 自定义useModal',
      path: '/react/useModal.html',
      date: '2023-2-7',
      author: '陈佳鑫',
      explain: '避免使用modal动态弹出框维护多个变量'
    },
    {
      key: 8,
      title: 'Vue 拖拽编辑界面',
      path: '/vue/DragVue.html',
      date: '2023-2-13',
      author: '陈佳鑫',
      explain: '使用npm vuedraggable 编写一个可自定义拖拽编辑界面dome'
    },
    {
      key: 9,
      title: 'React 自定义DictHooks',
      path: '/react/DictHooks.html',
      date: '2023-2-22',
      author: '陈佳鑫',
      explain:
        '使字典类型存储在本地避免频繁调用字典接口，只有字典产生更新或者，用户重新登陆'
    },
    {
      key: 10,
      title: 'React 图片查看器',
      path: '/react/ImgCheck.html',
      date: '2023-5-04',
      author: '陈佳鑫',
      explain:
        '本组件使用forwardRef编写，可在父组件通过ref直接操作，减少了父子组件通信事件，使组件更加便利'
    },
    {
      key: 11,
      title: '批量下载浏览器图片',
      path: '/vue/DownloadZip',
      author: '陈佳鑫',
      explain: '使用`jszip`压缩图片打包成ZIP，通过`file-saver`进行浏览器下载'
    }
  ]
})
</script>
<style lang="scss" scoped src="@style/home.scss" />
