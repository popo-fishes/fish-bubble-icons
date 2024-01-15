<!--
 * @Date: 2024-01-13 17:07:00
 * @Description: Modify here please
 * <slot />应该为你的svg节点
-->
<template>
  <span :style="iconStyle" class="fb-icon" role="img">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./type";
const props = defineProps<IconProps>();

const iconStyle = computed(() => {
  const _style = {
    display: "inline-flex",
    alignItems: "center",
    fontStyle: "normal"
  };

  if (props.size) {
    _style[`fontSize`] = typeof props.size == "string" ? props.size : `${props.size}px`;
  }
  if (props.color) {
    _style[`color`] = props.color;
  }
  return _style;
});
</script>
