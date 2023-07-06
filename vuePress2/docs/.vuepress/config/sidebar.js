module.exports = [
  {
    text: '博客简介',
    link: '/',
    collapsable: false // 是否折叠
  },
  {
    text: 'React',
    link: '/react/ModalFormItem',
    collapsable: true,
    children: [
      { text: '自定义ModalForm', link: '/react/ModalFormItem' },
      { text: '自定义useModal', link: '/react/useModal' },
      { text: '自定义DictHook', link: '/react/DictHooks' },
      { text: '图片查看器', link: '/react/ImgCheck' }
    ]
  },
  {
    text: 'VUE',
    link: '/vue/DragTable',
    collapsable: true,
    children: [
      { text: '可拖拽排序Table表格', link: '/vue/DragTable' },
      { text: 'Taro开发微信小程序无感知登录', link: '/vue/TaroRequest' },
      { text: '转盘抽奖小游戏', link: '/vue/Turntable' },
      { text: '卡牌抽奖小游戏', link: '/vue/TurnOver' },
      { text: '动态Modal弹出框', link: '/vue/FlexibleModal' },
      { text: 'Vue 拖拽编辑界面', link: '/vue/DragVue' },
      { text: '批量下载浏览器图片', link: '/vue/DownloadZip' },
      { text: 'ProTable API', link: '/vue/ProTable' }
    ]
  }
]
