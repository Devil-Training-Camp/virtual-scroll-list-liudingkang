<script lang="ts">
  export default {
    name: 'DynamicList',
    setup() {
      const height: number = 400;
      return {
        height,
      };
    },
  };
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
      width: 100%;
      font-size: 15px;
      color: #13123321;
      background-color: linen;
    }
  }
</style>
