<script setup lang="ts">
  defineOptions({
    name: 'FixedSizeList',
  });
  const props = defineProps<{
    test?: string;
  }>();

  console.log(props);
  const height: number = 400;
  interface Persion {
    name: string;
  }
  const person: Persion = {
    name: '32',
  };
  console.log(person, 34);
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
