import { AnyObject } from '@/utils/base';

export interface DynamicListProps {
  itemSize?: number; // 每一项的高度
  itemClass?: string; // 每一项的自定义 class
  itemKey: string | number; // 每一项的 key
  data: AnyObject[]; // 数据
  width?: number; // 可视区域宽度
  height?: number; // 可视区域高度
  cache?: number; // 上下缓冲数量
  distance?: number; // 触底加载阈值
}
export interface DynamicListEmits {
  (e: 'load'): void;
}
