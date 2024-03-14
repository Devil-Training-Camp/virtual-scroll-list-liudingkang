<script setup lang="ts">
  import { ref } from 'vue';

  import { listItemProps } from './props';

  import { useResizeObserve } from '@/hooks/useResizeObserver';

  const { itemClass, itemData, itemIndex } = defineProps(listItemProps);

  const itemRef = ref<HTMLDivElement | null>(null);
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
