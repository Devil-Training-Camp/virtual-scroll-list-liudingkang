import type { Component, App } from 'vue';

import { DynamicList } from './packages/dynamic-list';
import { ComposeList } from './packages/compose-list';
import { FixedSizeList } from './packages/fixed-size-list';
import type { WithInstall } from './utils';

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
