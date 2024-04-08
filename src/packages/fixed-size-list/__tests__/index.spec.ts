import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import FixedSizeList from '../fixed-size-list.vue';

describe('test fixed-size-list component props', () => {
  const data = new Array(10000).fill(0);
  test('test fixed-size-list itemSize', () => {
    const wrapper = mount(FixedSizeList, {
      props: {
        itemSize: 50,
        data,
      },
    });
    expect((wrapper.find('.virtual-list-item').element as HTMLElement).style.height).toBe('50px');
    wrapper.unmount();
  });
  test('test fixed-size-list itemClass', () => {
    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        itemClass: 'custom-item',
      },
    });
    expect(wrapper.find('.virtual-list-item').classes()).toContain('custom-item');
  });
  test('test fixed-size-list itemClass', () => {
    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        width: 300,
        height: 600,
      },
    });
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    expect(elm.style.width).toBe('300px');
    expect(elm.style.height).toBe('600px');
  });
});
