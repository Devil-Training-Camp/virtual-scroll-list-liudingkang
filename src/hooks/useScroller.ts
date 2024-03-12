import { ref } from 'vue';

import { RAFThrottle, type RestFunc } from '@/utils/optimize';
import { DynamicListEmits, DynamicListProps } from '@/packages/fixed-size-list/props';

export const useScroller = (props: DynamicListProps, emits: DynamicListEmits) => {
  // const scrollTop = ref(0);
  // // 滚动事件
  // const scrollHandler = RAFThrottle((({ target }: Event) => {
  //   const { scrollTop: newScrollTop, scrollHeight } = target as Element;
  //   // 动画帧节流
  //   if (newScrollTop + props.height + props.distance >= scrollHeight) {
  //     emits('load');
  //   }
  //   scrollTop.value = newScrollTop;
  // }) as RestFunc);
  // return {
  //   scrollTop,
  //   scrollHandler,
  // };
};
