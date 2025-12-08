<template>
  <el-config-provider :locale="locale">
    <!-- <AppProvider> -->
    <router-view />
    <!-- </AppProvider> -->
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import useConfigStore from '@/store/modules/config'
import { storeToRefs } from 'pinia'
// import { AppProvider } from '@/components/application'

const { language } = storeToRefs(useConfigStore())

const lang = {
  zhCn,
  en
}

const locale = computed(() => lang[language.value])
</script>

<style lang="scss" scoped></style>
