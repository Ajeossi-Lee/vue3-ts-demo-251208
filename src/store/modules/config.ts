import { defineStore } from 'pinia'
import { ref } from 'vue'
import { localCache } from '@/utils/cache'

const useConfigStore = defineStore('config', () => {
  const isGetUserInfo = ref(false)

  const dark = ref(false)
  const languageInit = localCache.getCache('localeLang') || 'zhCn'
  const asideWidth = ref(languageInit === 'zhCn' ? '200px' : '220px')

  // 中英文切换时，导航栏宽度大小适配
  const asideDynamicWidth = ref(languageInit === 'zhCn' ? '200px' : '220px')
  const handleAsideDynamicWidth = (val: string) => {
    asideDynamicWidth.value = val === 'zhCn' ? '200px' : '220px'
  }

  const language = ref(languageInit)
  const handleLanguage = (val: string) => {
    language.value = val
    localCache.setCache('localeLang', val)
  }

  // 页面切换时进行loading加载
  const pageLoading = ref(false)

  const handlePageLoading = (val: boolean) => {
    pageLoading.value = val
  }

  return {
    dark,
    asideWidth,
    isGetUserInfo,
    language,
    handleLanguage,
    asideDynamicWidth,
    handleAsideDynamicWidth,
    pageLoading,
    handlePageLoading
  }
})

export default useConfigStore
