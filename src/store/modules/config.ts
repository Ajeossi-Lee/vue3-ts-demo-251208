import { defineStore } from 'pinia'
import { ref } from 'vue'

const useConfigStore = defineStore('config', () => {
  const dark = ref('dark')

  return {
    dark
  }
})

export default useConfigStore
