import type { Component, App } from 'vue';
import type { WithInstall } from './utils';

import FixedSizeList from './packages/fixed-size-list';
import DynamicList from './packages/dynamic-list';
import ComposeList from './packages/compose-list';

const components: Component[] = [FixedSizeList, DynamicList, ComposeList];

const install = (app: App) => {
  components.forEach((component: Component) => {
    (component as WithInstall<Component>).install(app);
  });
};

export * from './packages/fixed-size-list';
export * from './packages/dynamic-list';
export * from './packages/compose-list';
export default {
  install,
};
