# 动态高度虚拟列表

在前端开发领域，列表一直都是一个高频出现的组件，尤其是在中后台和数据分析场景。通过虚拟化表格组件，超大数据渲染将不再是一个头疼的问题。

## 基础用法

<demo src="../src/packages/dynamic-list/example/index.vue"></demo>

## 动态高度

点击改变每一项的高度。

<demo src="../src/packages/dynamic-list/example/click.vue"></demo>

## 触底加载

滚动到底部时自动加载新列表。

<demo src="../src/packages/dynamic-list/example/load.vue"></demo>

## 属性

| 参数        | 说明                 | 类型             | 默认值 | 说明                       |
| ----------- | -------------------- | ---------------- | ------ | -------------------------- |
| `itemSize`  | 每一项的高度         | _number_         | `70`   | 单位为`px`                 |
| `itemClass` | 每一项的自定义 class | _string_         |        |                            |
| `itemKey`   | 每一项的 key         | _string\/number_ | `id`   |                            |
| `data`      | 数据                 | _any_            | `[]`   |                            |
| `width`     | 可视区域宽度         | _number\/string_ | `100%` |                            |
| `height`    | 可视区域高度         | _number\/string_ | `300`  | 当是 _number_ 时单位为`px` |
| `cache`     | 上下缓冲数量         | _number_         | `2`    | 单位为`px`                 |
| `distance`  | 触底加载阈值         | _number_         | `0`    | 单位为`px`                 |

## 事件

| 事件名 | 描述                     | 类型       |
| ------ | ------------------------ | ---------- |
| `load` | 达到加载阈值时触发的事件 | _Function_ |
