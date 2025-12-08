<template>
  <div
    class="exception-content flex flex-col md:flex-row gap-12 items-center justify-center"
  >
    <div class="w-[420px]">
      <div class="text-3xl font-bold font- mb-8 italic">
        {{ $t('exception.title') }}
      </div>
      <div>{{ $t('exception.reason') }}</div>
      <el-button
        type="primary"
        size="large"
        class="mt-8"
        @click="goWhere('/')"
        >{{ $t('exception.button') }}</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router'

defineOptions({
  name: 'LeeException'
})

const goWhere = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
$fullScreenHeight: 100vh;
$subtractHeight: 280px;

.exception-content {
  height: calc($fullScreenHeight - $subtractHeight);
}

.el-button--small {
  padding: 0;
}
</style>
