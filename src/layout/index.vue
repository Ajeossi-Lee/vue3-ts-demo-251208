<template>
  <!-- 主容器 -->
  <div class="common-layout">
    <el-container>
      <el-header>
        <lee-header></lee-header>
      </el-header>
      <el-main
        v-loading="pageLoading"
        class="lee-layout-content overflow-x-hidden"
      >
        <!-- MARK: 渲染子组件  插槽 -->
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <!-- 使用keep-alive在多个组件间动态切换时缓存被移除的组件实例，max来限制可被缓存的最大组件实例数 -->
            <!-- 动态组件 -->
            <!-- <keep-alive :max="10"> -->
            <component :is="Component"></component>
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </el-main>
      <el-footer>
        <lee-footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="lee-layout">
// import { ref, watch } from 'vue'
import leeHeader from './components/leeHeader.vue'
import LeeFooter from './components/leeFooter.vue'
import useConfigStore from '@/store/modules/config'
import { storeToRefs } from 'pinia'
// import { useAppInject } from '@/hooks/web/useAppInject'

defineOptions({
  name: 'LeeLayout'
})

// const { getIsMobile } = useAppInject()
// const drawer = ref(false)

// watch(getIsMobile, (value) => {
//   drawer.value = value ? true : false
// })

const { pageLoading } = storeToRefs(useConfigStore())
</script>

<style>
.el-aside {
  transition: all 0.2s;
}
/* 路由切换 过渡动画 */
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
/* 延迟进入动画的时间 */
.fade-enter-active {
  transition-delay: 0.3s;
}

.el-header {
  height: 220px !important;
  padding: 0 !important;
}

.el-main {
  padding: 0px !important;
}

.el-footer {
  padding: 0px !important;
}
</style>
