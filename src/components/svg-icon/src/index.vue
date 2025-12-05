<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconHref" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon'
})

const props = defineProps({
  // icon名称
  iconName: {
    type: String,
    required: true
  },
  //组件额外类名
  iconClass: {
    type: String,
    default: ''
  }
})

const iconHref = computed(() => `#icon-${props.iconName}`)
const svgClass = computed(() => `svg-icon ${props.iconClass}`)
</script>

<style lang="scss">
.svg-icon {
  fill: currentColor;
  overflow: hidden;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
