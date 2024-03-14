<script setup lang="ts">
  import { watchEffect } from 'vue';

  import { ListItem } from '../list-item';
  import type { FixedSizeListEmits } from '../fixed-size-list/props';
  import { fixedSizeListProps } from '../fixed-size-list/props';
  import { useRenderer } from '../fixed-size-list/useRenderer';
  import { useScroller } from '../fixed-size-list/useScroller';

  import { useRO } from './useRO';

  import { BSStartIndex } from '@/utils/optimize';

  const props = defineProps(fixedSizeListProps);
  const emits = defineEmits<FixedSizeListEmits>();

  // 渲染相关
  const {
    cacheStart, // 上缓冲边界
    start, // 可见元素起始位置
    end, // 可见元素结束位置
    cacheEnd, // 下缓冲边界
    positions, // 已经加载项缓存
    containerStyle, // 占位元素样式
    listStyle, // 可视区域样式
    renderData, // 视图渲染数据
  } = useRenderer(props);
  // 滚动相关
  const { scrollTop, scrollHandler } = useScroller(props, emits);

  const getEndIndex = () => {
    const len = props.data.length;
    let endIndex = start.value;
    let pos = positions[endIndex];
    while (endIndex < len - 1 && pos.top + pos.height < scrollTop.value + props.height) {
      pos = positions[++endIndex];
    }
    return Math.min(len - 1, endIndex);
  };
  const updateRenderRange = () => {
    const len = props.data.length;
    // 可见元素起始位置
    start.value = BSStartIndex(
      positions.map(pos => pos.top),
      scrollTop.value,
    );
    // 处理上缓冲边界
    cacheStart.value = Math.max(0, start.value - props.cache);
    // 可见元素结束位置 = 可视区域内可以显示的 item 数量 + 可见元素起始位置
    end.value = getEndIndex();
    // 处理下缓冲边界
    cacheEnd.value = Math.min(end.value + props.cache, len - 1);
  };
  // 当滚动时
  watchEffect(updateRenderRange);
  // 监听元素变化
  useRO(positions);
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
        v-for="{ itemData, top, index } in renderData"
        :key="(itemData[itemKey] as string) || index"
        :item-class="itemClass"
        :item-data="itemData"
        :item-index="index"
        :style="{
          top: top + 'px',
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
@/packages/fixed-size-list/useScroller
