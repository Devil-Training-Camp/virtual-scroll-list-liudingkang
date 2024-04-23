<script setup lang="ts">
  import { ref } from 'vue';

  import { FixedSizeList } from '..';
  defineOptions({
    name: 'FixedSizeListDemo',
  });
  const data = ref(new Array(10000).fill(0));
</script>

<template>
  <FixedSizeList
    :item-size="70"
    item-class="item"
    :height="300"
    :data="data"
  >
    <template #default="{ item, index }">
      <div
        :class="['list-item', index % 2 ? 'list-item-odd' : 'list-item-even']"
        style="height: 100%"
      >
        {{ item }} - {{ index }}
      </div>
    </template>
  </FixedSizeList>
</template>

<style scoped>
  .list-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-item-odd {
    background-color: rgb(229 178 38);
  }

  .list-item-even {
    background-color: cadetblue;
  }
</style>
