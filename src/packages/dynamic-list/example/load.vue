<script setup lang="ts">
  import { ref } from 'vue';

  import { DynamicList } from '..';
  defineOptions({
    name: 'DynamicListLoadDemo',
  });

  const mockData = (num = 20) => {
    let data = [];
    for (let index = 0; index < num; index++) {
      data.push(70 + Math.ceil((Math.random() - 0.5) * 70));
    }
    return data;
  };
  const data = ref(mockData(10));
  const loading = ref(false);
  const loadData = () => {
    if (!loading.value) {
      loading.value = true;
      setTimeout(() => {
        let newData = mockData();
        data.value.push.apply(data.value, newData);
        loading.value = false;
      }, 1000);
    }
  };
  const clickHander = (index: number) => {
    data.value[index] = 100 + Math.ceil((Math.random() - 0.5) * 50);
  };
</script>

<template>
  <DynamicList
    :item-size="70"
    item-class="item"
    :height="300"
    :data="data"
    @load="loadData"
  >
    <template #default="{ item, index }">
      <div
        :class="['list-item', index % 2 ? 'list-item-odd' : 'list-item-even']"
        :style="{
          height: item + 'px',
          boxSizing: 'border-box',
        }"
        @click="clickHander(index)"
      >
        {{ index }}
      </div>
    </template>
  </DynamicList>
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
