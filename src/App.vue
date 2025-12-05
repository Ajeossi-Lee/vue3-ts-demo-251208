<template>
  <div>
    <div class="text-3xl text-red-500 font-bold underline">Hello world!</div>
    <el-button type="primary">Click me</el-button>
    <div>{{ configStore.dark }}</div>
  </div>
</template>

<script setup lang="ts">
import useConfigStore from '@/store/modules/config'

const configStore = useConfigStore()

console.log(configStore.dark)
</script>

<style scoped></style>
