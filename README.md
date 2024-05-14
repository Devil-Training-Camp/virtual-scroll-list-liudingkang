# virtual-scroll-list

Is a virtual-scroll-list developed based on Vue3.

- 💪 90%+ Unit test coverage
- 💪 Written in TypeScript
- 🍭 Support `DynamicList` and `FixedSizeList`
- 🍭 Support Tree Shaking
- 🍭 Support import on demand
- 🍭 Support auto-import and provide a solver

## Useage

### Init

```JavaScript
pnpm add virtual-scroll-list-liudingkang
```

```JavaScript
import { createApp } from 'vue'
import App from './App.vue'
import Comps from 'virtual-scroll-list-liudingkang'
import 'virtual-scroll-list-liudingkang/es/style.css'

createApp(App).use(Comps).mount('#app')

```

### Demo

```vue
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
```

## Attributes

| Name        | Description          | Type             | Default | Other                      |
| ----------- | -------------------- | ---------------- | ------- | -------------------------- |
| `itemSize`  | 每一项的高度         | _number_         | `70`    | 单位为`px`                 |
| `itemClass` | 每一项的自定义 class | _string_         |         |                            |
| `itemKey`   | 每一项的 key         | _string\/number_ | `id`    |                            |
| `data`      | 数据                 | _any_            | `[]`    |                            |
| `width`     | 可视区域宽度         | _number\/string_ | `100%`  |                            |
| `height`    | 可视区域高度         | _number\/string_ | `300`   | 当是 _number_ 时单位为`px` |
| `cache`     | 上下缓冲数量         | _number_         | `2`     | 单位为`px`                 |
| `distance`  | 触底加载阈值         | _number_         | `0`     | 单位为`px`                 |

## Events

| Name   | Description              | Type       |
| ------ | ------------------------ | ---------- |
| `load` | 达到加载阈值时触发的事件 | _Function_ |
