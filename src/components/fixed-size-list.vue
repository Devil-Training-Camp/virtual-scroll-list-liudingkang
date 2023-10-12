<script setup lang="ts">
  defineOptions({
    name: 'FixedSizeList',
  });
  const height: number = 400;
  const p = new Promise(() => {});
  console.log(1235545, p);
  const test = (s: name) => {
    console.log('test: ', s);
  };
  test();
</script>

<template>
  <div
    class="container"
    :style="{
      color: 'red',
    }"
  >
    <h2>{{ height }}</h2>
  </div>
</template>

<style scoped lang="scss">
  .container {
    background-color: bisque;

    h2 {
      width: 100%;
      font-size: 15px;
      color: #13123321;
      background-color: linen;
    }
  }
</style>
