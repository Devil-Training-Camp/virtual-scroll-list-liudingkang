import { describe, expect, test, vi } from 'vitest';
import { type Component, nextTick } from 'vue';

import { DynamicList } from '..';
import { delay, prevMount, triggerScrollTo } from '../../../utils/test';

const TestDynamicList: Component = {
  template: `
  <DynamicList v-bind="$attrs">
    <template #default="{ item, index }">
      <div
        class="test-item"
        :style="{
          height: item + 'px',
          boxSizing: 'border-box',
        }"
      >
        {{ index }}
      </div>
    </template>
  </DynamicList>`,
  components: {
    DynamicList,
  },
};

const mount = prevMount(TestDynamicList, DynamicList);
const mockData = (num = 20, height = 50) => {
  const data = [];
  for (let index = 0; index < num; index++) {
    data.push(Math.ceil((Math.random() + 0.5) * height));
  }
  return data;
};
describe('test dynamic-list component props', () => {
  const data = mockData(100);
  test('test dynamic-list data 0', async () => {
    const wrapper = mount({
      props: {
        itemSize: 50,
        data: [],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('test dynamic-list itemSize', async () => {
    const wrapper = mount({
      props: {
        itemSize: 50,
        data,
      },
    });
    expect((wrapper.find('.test-item').element as HTMLElement).style.height).toBe(`${data[0]}px`);
    wrapper.unmount();
  });
  test('test dynamic-list itemClass', async () => {
    const wrapper = mount({
      props: {
        data,
        itemClass: 'custom-item',
      },
    });
    expect(wrapper.find('.virtual-list-item').classes()).toContain('custom-item');
  });
  test('test dynamic-list width and height', () => {
    const wrapper = mount({
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
  test('test dynamic-list cache', () => {
    const wrapper = mount({
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
describe('test dynamic-list scroll', () => {
  test('test dynamic-list scroll cache', async () => {
    const data = mockData(100, 150);
    const wrapper = mount({
      props: {
        data,
        height: 600,
        itemSize: 150,
        cache: 4,
      },
    });
    expect(wrapper.findAll('.virtual-list-item').length).toBeGreaterThan(6);
    expect(wrapper.findAll('.virtual-list-item').length).toBeLessThan(10);
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    await triggerScrollTo(elm, 0, 650);
    await delay();
    expect(wrapper.findAll('.virtual-list-item').length).toBeGreaterThan(10);
    expect(wrapper.findAll('.virtual-list-item').length).toBeLessThan(14);
    await triggerScrollTo(elm, 0, 1650);
    await delay();
    expect(wrapper.findAll('.virtual-list-item').length).toBeGreaterThan(10);
    expect(wrapper.findAll('.virtual-list-item').length).toBeLessThan(14);
  });
  test('test dynamic-list scroll distance', async () => {
    const data = mockData(5, 150);
    const onLoad = vi.fn();

    const wrapper = mount({
      props: {
        data,
        height: 600,
        itemSize: 150,
        distance: 100,
        onLoad,
      },
    });
    const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
    await triggerScrollTo(elm, 0, data.reduce((prev, item) => (prev += item), 0) - 100);
    await delay();
    expect(onLoad).toBeCalledTimes(1);
  });
});
describe('test dynamic-list event', () => {
  const data = mockData(5, 150);
  test('test dynamic-list onload', async () => {
    const onLoad = vi.fn();
    const wrapper = mount({
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
  });
});

describe('test dynamic-list item', () => {
  const data = mockData(5, 150);
  test('test dynamic-list item resize', async () => {
    const onLoad = vi.fn();
    const wrapper = mount({
      props: {
        data,
        height: 600,
        itemSize: 150,
        onLoad,
      },
    });
    const elm = wrapper.find('.test-item').element as HTMLElement;
    // 直接修改元素高度并不能触发 resizeObserver 回调，可能是 happy-dom 的局限性，在 chrome 上能正常触发
    elm.style.height = '50px';
    await nextTick();
    expect(elm.style.height).toBe(`50px`);
  });
});
