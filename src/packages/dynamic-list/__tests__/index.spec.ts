import { describe, expect, test } from 'vitest';
import { type Component } from 'vue';

import { DynamicList } from '..';
import { prevMount } from '../../../utils';

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
