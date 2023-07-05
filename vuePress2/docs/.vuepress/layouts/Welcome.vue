<script setup>
import { ElCard } from 'element-plus'

if (!__VUEPRESS_SSR__) {
  import('element-plus/es/components/card/style/css')
}
</script>

<template>
  <el-card>
    <Content></Content>
  </el-card>
</template>
