import { nextTick } from 'vue';
import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import type { ComponentProps } from 'vue-component-type-helpers';
import type { Component } from 'vue';

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
export const prevMount = <T extends Component>(wrapper: Component, component: T) => {
  return (option: ComponentMountingOptions<T, ComponentProps<typeof component>> | undefined) =>
    mount(wrapper, option);
};
