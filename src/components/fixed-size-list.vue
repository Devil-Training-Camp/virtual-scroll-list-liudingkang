<script setup lang="ts">
  defineOptions({
    name: 'FixedSizeList',
  });
  const height: number = 400;
</script>

<template>
  <div class="container">
    <h2>{{ height }}</h2>
  </div>
</template>

<style scoped lang="scss">
  .container {
    background-color: bisque;
    h2 {
      color: #666;
    }
  }
</style>
