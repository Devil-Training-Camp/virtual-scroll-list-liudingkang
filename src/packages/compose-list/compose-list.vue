<script setup lang="ts">
  defineOptions({
    name: 'ComposeList',
  });
  import '../dynamic-list';
</script>

<template>
  <DynamicList></DynamicList>
</template>

<style scoped lang="scss">
  ol {
    color: red;
  }
</style>
