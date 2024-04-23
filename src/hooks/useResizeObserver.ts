import { type Ref, inject, onBeforeUnmount, onMounted, provide } from 'vue';

export const useResizeObserver = (name = 'resizeOb', cb: ResizeObserverCallback) => {
  const resizeOb = new ResizeObserver(cb);
  provide(name, resizeOb);
};
export const useResizeObserve = (name = 'resizeOb', targetRef: Ref<HTMLDivElement | null>) => {
  const resizeOb = inject<ResizeObserver | null>(name, null);
  if (resizeOb) {
    onMounted(() => {
      if (targetRef.value) {
        resizeOb.observe(targetRef.value);
      }
    });
    onBeforeUnmount(() => {
      if (targetRef.value) {
        resizeOb.unobserve(targetRef.value);
      }
    });
  }
};
