import { type ExtractPropTypes, type PropType } from 'vue';

import type { AnyObject } from '@/utils/base';

export const fixedSizeListProps = {
  // 每一项的高度
  itemSize: {
    type: Number,
    default: 70,
  },
  // 每一项的自定义 class
  itemClass: String,
  // 每一项的 key
  itemKey: {
    type: [String, Number],
    required: true,
    default: 'id',
  },
  // 数据
  data: {
    type: Array as PropType<AnyObject[]>,
    default: () => [],
  },
  // 可视区域宽度
  width: {
    type: Number,
    default: 100,
  },
  // 可视区域高度
  height: {
    type: Number,
    default: 300,
  },
  // 上下缓冲数量
  cache: {
    type: Number,
    default: 2,
  },
  // 触底加载阈值
  distance: {
    type: Number,
    default: 0,
  },
};
export type FixedSizeListProps = ExtractPropTypes<typeof fixedSizeListProps>;
export interface FixedSizeListEmits {
  (e: 'load'): void;
}
// export interface FixedSizeListProps {
//   itemSize?: number; // 每一项的高度
//   itemClass?: string; // 每一项的自定义 class
//   itemKey: string | number; // 每一项的 key
//   data: AnyObject[]; // 数据
//   width?: number; // 可视区域宽度
//   height?: number; // 可视区域高度
//   cache?: number; // 上下缓冲数量
//   distance?: number; // 触底加载阈值
// }
// export const fixedSizeListProps = {
//   itemSize: 70,
//   itemClass: '',
//   data: () => [],
//   width: 100,
//   height: 300,
//   cache: 2,
//   distance: 0,
// };
