import { inject, onBeforeUnmount, onMounted, provide } from "vue";

export const useResizeObserver = (name = 'resizeOb', cb) => {
  const resizeOb = new ResizeObserver(cb);
  provide(name, resizeOb);
}
export const useResizeObserve = (name = 'resizeOb', targetRef) => {
  const resizeOb = inject(name, null);
  if (resizeOb) {
    onMounted(() => {
      resizeOb.observe(targetRef.value);
    })
    onBeforeUnmount(() => {
      resizeOb.unobserve(targetRef.value);
    })
  }
}