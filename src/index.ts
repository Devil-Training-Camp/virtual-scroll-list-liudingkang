import type { Component, App } from 'vue';

import { DynamicList } from './packages/dynamic-list';
import { FixedSizeList } from './packages/fixed-size-list';
import type { WithInstall } from './utils';

const components: Component[] = [FixedSizeList, DynamicList];

export const install = (app: unknown) => {
  components.forEach((component: Component) => {
    (component as WithInstall<Component>).install(app as App);
  });
};

export * from './packages/fixed-size-list';
export * from './packages/dynamic-list';
export default {
  install,
};
