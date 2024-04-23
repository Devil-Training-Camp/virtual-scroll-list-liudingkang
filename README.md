# virtual-scroll-list

`DynamicList` and `FixedSizeList`

### Attributes

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
