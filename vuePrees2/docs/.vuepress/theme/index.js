import { defaultTheme } from '@vuepress/theme-default'
import { path } from '@vuepress/utils'
import { containerPlugin } from '@vuepress/plugin-container'

module.exports = (options) => {
  return {
    name: 'vuepress-theme-local',
    locale: {
      colorMode: 'light',
      colorModeSwitch: true
    },
    extends: defaultTheme(options),
    clientConfigFile: path.resolve(__dirname, '../client.js'),
    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      Welcome: path.resolve(__dirname, 'layouts/Welcome.vue')
    },
    plugins: [
      containerPlugin({
        type: 'timeline',
        before: (info) => `<ClientOnly><el-timeline>\n`,
        after: () => '</el-timeline></ClientOnly>\n'
      })
    ]
  }
}
