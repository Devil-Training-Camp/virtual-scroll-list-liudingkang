<script setup lang="ts">
  defineOptions({
    name: 'ComposeList',
  });
  import { DynamicList } from '../dynamic-list';
</script>

<template>
  <DynamicList></DynamicList>
  <p>4343</p>
</template>

<style scoped lang="scss">
  ol {
    color: red;
  }
</style>
