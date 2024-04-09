// import { describe, expect, test, vi } from 'vitest';
// import { mount } from '@vue/test-utils';
// import type { Component } from 'vue';

// import { DynamicList } from '..';

// const TestDynamicList: Component = {
//   template: `<template>
//   <DynamicList
//     :item-size="70"
//     item-class="item"
//     :height="300"
//     :data="data"
//   >
//     <template #default="{ item, index }">
//       <div
//         :class="['list-item', index % 2 ? 'list-item-odd' : 'list-item-even']"
//         :style="{
//           height: item + 'px',
//           boxSizing: 'border-box',
//         }"
//       >
//         {{ index }}
//       </div>
//     </template>
//   </DynamicList>
// </template>`,
//   components: {
//     DynamicList,
//   },
// };
// const testSlot = ``;

// describe('test fixed-size-list component props', () => {
//   const mockData = (num = 20, height = 50) => {
//     const data = [];
//     for (let index = 0; index < num; index++) {
//       data.push(Math.ceil((Math.random() + 0.5) * height));
//     }
//     return data;
//   };
//   const data = mockData(10000);
//   test('test fixed-size-list itemSize', () => {
//     const wrapper = mount(DynamicList, {
//       props: {
//         itemSize: 50,
//         data,
//       },
//       slots: {
//         default(_) {},
//       },
//     });
//     expect((wrapper.find('.virtual-list-item').element as HTMLElement).style.height).toBe('50px');
//     wrapper.unmount();
//   });
//   test('test fixed-size-list itemClass', () => {
//     const wrapper = mount(DynamicList, {
//       props: {
//         data,
//         itemClass: 'custom-item',
//       },
//     });
//     expect(wrapper.find('.virtual-list-item').classes()).toContain('custom-item');
//   });
//   test('test fixed-size-list width and height', () => {
//     const wrapper = mount(DynamicList, {
//       props: {
//         data,
//         width: 300,
//         height: 600,
//       },
//     });
//     const elm = wrapper.find('.virtual-list-container').element as HTMLElement;
//     expect(elm.style.width).toBe('300px');
//     expect(elm.style.height).toBe('600px');
//   });
//   test('test fixed-size-list cache', () => {
//     const wrapper = mount(DynamicList, {
//       props: {
//         data,
//         height: 600,
//         itemSize: 155,
//         cache: 2,
//       },
//     });
//     expect(wrapper.findAll('.virtual-list-item')).toHaveLength(6);
//   });
// });
