import type { Component } from 'vue';
import type { WithInstall } from './utils';
import './style/base.scss';

import { FixedSizeList } from './packages/fixed-size-list';
import { DynamicList } from './packages/dynamic-list';

const components: Component[] = [FixedSizeList, DynamicList];

const install = app => {
  components.forEach((component: Component) => {
    (component as WithInstall<Component>).install(app);
  });
};

export * from './packages/fixed-size-list';
export * from './packages/dynamic-list';
export default {
  install,
};
