import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

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
  test('test fixed-size-list width and height', () => {
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
  test('test fixed-size-list cache', () => {
    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        height: 600,
        itemSize: 155,
        cache: 2,
      },
    });
    expect(wrapper.findAll('.virtual-list-item')).toHaveLength(6);
  });
});
describe('test fixed-size-list scroll', () => {
  test('test fixed-size-list distance', async () => {
    const data = new Array(5).fill(0);
    let loading = false;
    const loadData = () => {
      console.log(34343);
      loading = true;
    };

    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        height: 600,
        itemSize: 150,
        distance: 50,
        cache: 2,
        onLoad: loadData,
      },
    });
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    // elm.scrollTo({
    //   top: 110,
    // });
    await nextTick();
    // console.log((wrapper.find('.virtual-list-container').element as HTMLElement).scrollTop);
    const scrollEvent = new Event('scroll', {
      bubbles: true,
      cancelable: true,
    });
    elm.dispatchEvent(scrollEvent);
    await nextTick();
    console.log('out');
    expect(loading).toBe(true);
  });
});
