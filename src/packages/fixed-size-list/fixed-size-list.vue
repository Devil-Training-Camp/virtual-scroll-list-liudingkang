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
    class="container test"
    :style="{
      color: 'red',
    }"
  >
    <h2>{{ height }}</h2>
    <h2>{{ test }}</h2>
  </div>
</template>

<style scoped lang="scss">
  .container {
    background-color: bisque;
  }

  .test {
    color: pink;
  }
</style>
