import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { FixedSizeList } from '../';
import { delay, triggerScrollTo } from '../../../utils/test';

describe('test fixed-size-list component props', () => {
  const data = new Array(10000).fill(0);
  test('test dynamic-list data 0', async () => {
    const wrapper = mount({
      props: {
        itemSize: 50,
        data: [],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('test fixed-size-list itemSize', () => {
    const wrapper = mount(FixedSizeList, {
      props: {
        itemSize: 50,
        data,
      },
    });
    expect((wrapper.find('.virtual-list-item').element as HTMLElement).style.height).toBe('50px');
    expect(wrapper.html()).toMatchSnapshot();
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
    expect(wrapper.html()).toMatchSnapshot();
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
    expect(wrapper.html()).toMatchSnapshot();
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
    expect(wrapper.html()).toMatchSnapshot();
  });
});
describe('test fixed-size-list scroll', () => {
  test('test fixed-size-list scroll cache', async () => {
    const data = new Array(20).fill(0);

    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        height: 600,
        itemSize: 150,
        cache: 4,
      },
    });
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    expect(wrapper.findAll('.virtual-list-item')).toHaveLength(8);
    expect(wrapper.html()).toMatchSnapshot();
    await triggerScrollTo(elm, 0, 650);
    await delay();
    expect(wrapper.findAll('.virtual-list-item')).toHaveLength(12);
    expect(wrapper.html()).toMatchSnapshot();
    await triggerScrollTo(elm, 0, 850);
    await delay();
    expect(wrapper.findAll('.virtual-list-item')).toHaveLength(12);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('test fixed-size-list scroll distance', async () => {
    const data = new Array(5).fill(0);
    const onLoad = vi.fn();

    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        height: 600,
        itemSize: 150,
        distance: 100,
        onLoad,
      },
    });
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    await triggerScrollTo(elm, 0, 50);
    await delay();
    expect(onLoad).toBeCalledTimes(1);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
describe('test fixed-size-list event', () => {
  test('test fixed-size-list onload', async () => {
    const data = new Array(5).fill(0);
    const onLoad = vi.fn();

    const wrapper = mount(FixedSizeList, {
      props: {
        data,
        height: 600,
        itemSize: 150,
        onLoad,
      },
    });
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    await triggerScrollTo(elm, 0, 150);
    await delay();
    expect(onLoad).toBeCalledTimes(1);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
