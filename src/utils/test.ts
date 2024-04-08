import { nextTick } from 'vue';

export const delay = (time?: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
export const trigger = async (target: HTMLElement, type: string) => {
  const scrollEvent = new Event(type, {
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(scrollEvent);
  await nextTick();
};
export const triggerScrollTo = async (target: HTMLElement, x: number = 0, y: number = 0) => {
  target.scrollTo({
    left: x,
    top: y,
  });
  await trigger(target, 'scroll');
};
