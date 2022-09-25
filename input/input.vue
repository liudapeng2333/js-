<!-- 
  @description: 通用输入框
-->
<template>
  <input
    type="text"
    v-model="inputValue"
    @keyup.enter="submit"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
let inputValue = ref('')

defineProps({
  // 自定义样式
  customStyle: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

const submit = () => {
  emit('submit', inputValue.value)
}

const clearInput = () => {
  inputValue.value = ''
}

defineExpose({
  clearInput
})
</script>

<style scoped lang="less">
/* ...省略 */
</style>

