import { type Ref, inject, onBeforeUnmount, onMounted, provide } from 'vue';

export const useResizeObserver = (name = 'resizeOb', cb: () => void) => {
  const resizeOb = new ResizeObserver(cb);
  provide(name, resizeOb);
};
export const useResizeObserve = (name = 'resizeOb', targetRef: Ref) => {
  const resizeOb = inject<ResizeObserver>(name);
  if (resizeOb) {
    onMounted(() => {
      resizeOb.observe(targetRef.value);
    });
    onBeforeUnmount(() => {
      resizeOb.unobserve(targetRef.value);
    });
  }
};
