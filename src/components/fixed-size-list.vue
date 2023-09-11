<script setup lang="ts">
  defineOptions({
    name: 'FixedSizeList',
  });
  const height: number = 400;
  const p = new Promise(() => {});
  console.log(p);
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
      color: #13123321;
      user-select: auto;
    }
  }
</style>
