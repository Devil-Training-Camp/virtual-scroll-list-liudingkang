
import { RAFThrottle } from '@/utils/common.js';
import { ref } from 'vue';
export const useScroller = (props, emits) => {
  const scrollTop = ref(0);
  // 滚动事件
  const scrollHandler = RAFThrottle(({ target: { scrollTop: newScrollTop, scrollHeight } }) => { // 动画帧节流
    if (newScrollTop + props.height + props.distance >= scrollHeight) {
      emits('load');
    }
    scrollTop.value = newScrollTop;
  })
  return {
    scrollTop,
    scrollHandler
  }
}