<template>
  <div class="demo-block">
    <div class="demo-block__source">
      <slot />
    </div>
    <div class="demo-block__meta" v-if="description">
      <div class="demo-block__description" v-html="description" />
    </div>
    <div class="demo-block__control" @click="expanded = !expanded">
      <span>{{ expanded ? '隐藏源代码' : '显示源代码' }}</span>
    </div>
    <div class="demo-block__code" v-show="expanded">
      <div class="demo-block__code-action">
        <button type="button" class="demo-block__copy" @click.stop="onCopy">
          {{ copied ? '已复制' : '复制代码' }}
        </button>
      </div>
      <pre class="demo-block__pre"><code>{{ source }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'DemoBlock' })

const props = defineProps<{
  source: string
  description?: string
}>()

const expanded = ref(false)
const copied = ref(false)

/**
 * 复制示例源码
 */
async function onCopy() {
  try {
    await navigator.clipboard.writeText(props.source)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    copied.value = false
  }
}
</script>
