<template>
  <el-button type="primary" @click="onAdd">打开Modal框</el-button>
  <ProModal :column="modalColumn" v-model="value" :modal="modalProps" :form="{}" ref="proModalRef" validate
    @submit="onSubmit">
    <!-- <template #footer>
      <div class="dialog-footer" style="text-align: end;">
        <el-button>Cancel</el-button>
        <el-button type="primary">
          Confirm
        </el-button>
      </div>
    </template> -->
  </ProModal>
</template>
<script setup lang="ts">
import { ProModal } from 'cjx-zdy-ui'
import { reactive, ref } from 'vue';
import { EnterFormProps, ProModalInstance } from 'cjx-zdy-ui/lib/src/proModal/types';
import { DialogProps } from 'element-plus/es/components/dialog';

const proModalRef = ref<ProModalInstance>()

const modalColumn: EnterFormProps[] = [
  { label: '奖品名', prop: 'awardName', el: 'input', rules: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }] },
  // {
  //   label: '奖品名1', prop: 'awardName1', render: (scope) => {
  //     return <el-input modelValue={value.awardName1} placeholder="请输入奖品名1" />
  //   },
  // },
  {
    label: '奖品名', prop: 'awardName2', el: 'select',
    enum: [
      { label: '测试奖品', value: '1' }
    ],
    enterProps: {
      clearable: true
    },
    rules: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
  },
]

const modalProps = reactive<Partial<DialogProps>>({
  title: '测试Modal'
})

const value = reactive<{ [k: string]: any }>({
  awardName: 11111
})

const onAdd = () => {
  proModalRef.value?.show({ formData: { awardName: '22222' }, title: '测试0002' })
}

const onSubmit = (val: boolean) => {
  console.log(val)
}
</script>