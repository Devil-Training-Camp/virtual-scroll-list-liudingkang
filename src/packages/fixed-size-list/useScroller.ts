import { ref } from 'vue';

import { RAFThrottle, type RestFunc } from '../../utils';
import type { FixedSizeListEmits, FixedSizeListProps } from '../fixed-size-list/props';

export const useScroller = (props: FixedSizeListProps, emits: FixedSizeListEmits) => {
  const scrollTop = ref(0);
  // 动画帧节流
  const scrollHandler = RAFThrottle((({ target }: Event) => {
    const { scrollTop: newScrollTop, scrollHeight } = target as Element;
    (target as Element).classList.add('virtual-list-scrolling');
    if (newScrollTop + props.height + props.distance >= scrollHeight) {
      emits('load');
    }
    scrollTop.value = newScrollTop;
  }) as RestFunc);
  const scrollEndHandler = ({ target }: Event) => {
    (target as Element).classList.remove('virtual-list-scrolling');
  };
  return {
    scrollTop,
    scrollHandler,
    scrollEndHandler,
  };
};
