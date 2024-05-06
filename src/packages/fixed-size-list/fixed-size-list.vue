<script setup lang="ts">
  import { computed, watchEffect } from 'vue';

  import { ListItem } from '../list-item';

  import { useRenderer } from './useRenderer';
  import { useScroller } from './useScroller';
  import { type FixedSizeListEmits, fixedSizeListProps } from './props';

  defineOptions({
    name: 'LdkFixedSizeList',
  });
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
    containerStyle, // 可视区域样式
    listStyle, // 占位元素样式
    renderData, // 视图渲染数据
  } = useRenderer(props);
  // 滚动相关
  const { scrollTop, scrollHandler, scrollEndHandler } = useScroller(props, emits);
  const updateRenderRange = () => {
    if (itemsCount.value === 0) {
      start.value = cacheStart.value = end.value = cacheEnd.value = 0;
      return;
    }
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
    class="ldk-virtual-list-container ldk-fixed-size-list"
    :style="containerStyle"
    @scroll="scrollHandler"
    @scrollend="scrollEndHandler"
  >
    <div
      class="ldk-virtual-list"
      :style="listStyle"
    >
      <ListItem
        v-for="{ itemData, top, height, index } in renderData"
        :key="itemData instanceof Object ? (itemData[itemKey] as string) : index"
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
  .ldk-virtual-list-container {
    overflow-y: auto;
  }
</style>
<style scoped lang="scss">
  .ldk-virtual-list {
    position: relative;
  }
</style>
