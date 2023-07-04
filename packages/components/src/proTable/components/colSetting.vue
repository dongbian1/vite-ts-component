<template>
  <!-- 列设置 -->
  <el-drawer title="列设置" v-model="drawerVisible" size="450px">
    <div class="table-main">
      <el-table
        :data="colSetting"
        :border="true"
        row-key="prop"
        default-expand-all
        :tree-props="{ children: '_children' }"
      >
        <el-table-column prop="label" align="center" label="列名" />
        <el-table-column
          prop="hideInTable"
          align="center"
          label="隐藏"
          v-slot="scope"
        >
          <el-switch v-model="scope.row.hideInTable" />
        </el-table-column>
        <template #empty>
          <div class="table-empty">
            <!-- <img src="@/assets/images/notData.png" alt="notData" /> -->
            <div>暂无可配置列</div>
          </div>
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '../types'

defineOptions({
  name: 'ColSetting'
})

defineProps<{ colSetting: ColumnProps[] }>()

const drawerVisible = ref<boolean>(false)

const openColSetting = () => {
  drawerVisible.value = true
}

defineExpose({
  openColSetting
})
</script>
