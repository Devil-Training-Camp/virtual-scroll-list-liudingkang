<script setup lang="ts">
  const genText = (base = 15) => {
    const times = base + Math.ceil((Math.random() - 0.5) * base);
    return Array(times)
      .fill(1)
      .map(() => 'every')
      .join(' ');
  };
  const mockData = (num = 20) => {
    let data = [];
    for (let index = 0; index < num; index++) {
      const times = 30 + Math.ceil((Math.random() - 0.5) * 30);
      data.push(genText(times));
    }
    return data;
  };
  const data = mockData(5000);
</script>

<template>
  <LdkDynamicList
    :item-size="70"
    item-class="item"
    :width="300"
    :height="300"
    :data="data"
  >
    <template #default="{ item, index }">
      <div :class="['list-item', index % 2 ? 'list-item-odd' : 'list-item-even']">
        {{ item }}
      </div>
    </template>
  </LdkDynamicList>
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
