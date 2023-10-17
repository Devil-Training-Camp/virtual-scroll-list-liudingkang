import type { App, Component } from 'vue';
import type { WithInstall } from './utils';

import FixedSizeList from './components/fixed-size-list';

const components: Component[] = [FixedSizeList];

const install = (app: App) => {
  components.forEach((component: Component) => {
    (component as WithInstall<Component>).install(app);
  });
};

export { FixedSizeList };
export default {
  install,
  FixedSizeList,
};
