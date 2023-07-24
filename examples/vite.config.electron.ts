import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import electron from "vite-plugin-electron";
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    electron({
      entry: "electron-main/index.ts", // 主进程文件
    }),
    renderer(),
  ],
})
