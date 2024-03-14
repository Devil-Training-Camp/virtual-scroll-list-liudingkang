<script setup lang="ts">
  import { computed, watchEffect } from 'vue';

  import { ListItem } from '../list-item';

  import { useRenderer } from './useRenderer';
  import { useScroller } from './useScroller';
  import { type FixedSizeListEmits, fixedSizeListProps } from './props';

  const props = defineProps(fixedSizeListProps);
  const emits = defineEmits<FixedSizeListEmits>();

  // item 总数
  const itemsCount = computed(() => props.data.length);
  // 渲染相关
  const {
    cacheStart, // 上缓冲边界
    start, // 可见元素起始位置
    end, // 可见元素结束位置
    cacheEnd, // 下缓冲边界
    containerStyle, // 占位元素样式
    listStyle, // 可视区域样式
    renderData, // 视图渲染数据
  } = useRenderer(props);
  // 滚动相关
  const { scrollTop, scrollHandler } = useScroller(props, emits);
  const updateRenderRange = () => {
    // 当前可视区域内可以显示的 item 数量
    const viewPortItemCount = computed(() => Math.ceil(props.height / props.itemSize));
    // 可见元素起始位置
    start.value = Math.floor(scrollTop.value / props.itemSize);
    // 处理上缓冲边界
    cacheStart.value = Math.max(0, start.value - props.cache);
    // 可见元素结束位置 = 可视区域内可以显示的 item 数量 + 可见元素起始位置
    end.value = Math.min(itemsCount.value - 1, start.value + viewPortItemCount.value - 1);
    // 处理下缓冲边界
    cacheEnd.value = Math.min(end.value + props.cache, itemsCount.value - 1);
  };
  // 当滚动时
  watchEffect(updateRenderRange);
</script>

<template>
  <div
    class="virtual-list-container"
    :style="containerStyle"
    @scroll="scrollHandler"
  >
    <div
      class="virtual-list"
      :style="listStyle"
    >
      <ListItem
        v-for="{ itemData, top, height, index } in renderData"
        :key="(itemData[itemKey] as string) || index"
        :item-class="itemClass"
        :item-data="itemData"
        :item-index="index"
        :style="{
          top: top + 'px',
          height: height + 'px',
        }"
      >
        <template #default="itemProps">
          <slot v-bind="itemProps"></slot>
        </template>
      </ListItem>
    </div>
  </div>
</template>

<style scoped>
  .virtual-list-container {
    overflow-y: auto;
  }

  .virtual-list {
    position: relative;
  }

  .virtual-list .list-item {
    position: absolute;
  }
</style>
