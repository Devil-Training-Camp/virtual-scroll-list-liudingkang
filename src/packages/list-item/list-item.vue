<script setup>
  import { ref } from 'vue';

  import { props } from './props';

  import { useResizeObserve } from '@/hooks/common/useResizeObserver';

  defineProps(props);

  const itemRef = ref();
  useResizeObserve('resizeOb', itemRef);
</script>

<template>
  <div
    ref="itemRef"
    :class="['virtual-list-item', itemClass]"
    :data-index="itemIndex"
  >
    <slot
      :item="itemData"
      :index="itemIndex"
    ></slot>
  </div>
</template>

<style scoped>
  .virtual-list-item {
    position: absolute;
    right: 0;
    left: 0;
    color: #213547;
  }
</style>
