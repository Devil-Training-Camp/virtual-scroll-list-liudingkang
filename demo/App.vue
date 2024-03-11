<script setup lang="ts">
  const test = (s: number) => {
    console.log('test: ', s);
  };
  test(52);
</script>

<template>
  <ComposeList></ComposeList>
</template>
<style>
  body {
    color: lightsalmon;
  }
</style>
