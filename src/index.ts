import { version } from '../package.json';
import './assets/common.css';
import './assets/reset.css';
import './assets/base.scss';
import FixedSizeList from './components/fixed-size-list.vue';
import type { App } from 'vue';

export * from './components/fixed-size-list.vue';

const install = (app: App) => {
  app.component('FixedSizeList', FixedSizeList);
};
export { version, FixedSizeList };
export default install;
