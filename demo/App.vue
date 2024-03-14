<script setup>
  import { ref } from 'vue';

  import { FixedSizeList } from '../es/packages/fixed-size-list';

  const data = ref(new Array(20).fill(0));
  const loading = ref(false);
  const loadData = () => {
    if (!loading.value) {
      loading.value = true;
      setTimeout(() => {
        let newData = new Array(20).fill(0);
        data.value.push.apply(data.value, newData);
        loading.value = false;
      }, 1000);
    }
  };
</script>

<template>
  <FixedSizeList
    :item-size="70"
    item-class="item"
    :width="300"
    :height="300"
    :data="data"
    @load="loadData"
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
