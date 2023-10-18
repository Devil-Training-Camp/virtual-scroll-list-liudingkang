import type { App, Component } from 'vue';
import type { WithInstall } from './utils';

import FixedSizeList from './packages/fixed-size-list';
import DynamicList from './packages/dynamic-list';

const components: Component[] = [FixedSizeList, DynamicList];

const install = (app: App) => {
  components.forEach((component: Component) => {
    (component as WithInstall<Component>).install(app);
  });
};

export { FixedSizeList, DynamicList };
export default {
  install,
  FixedSizeList,
  DynamicList,
};
