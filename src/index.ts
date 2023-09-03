import { version } from '../package.json';
import './assets/common.css';
import './assets/reset.css';
import FixedSizeList from './components/fixed-size-list.vue';
import type { App } from 'vue';

const install = (app: App) => {
  app.component('FixedSizeList', FixedSizeList);
};

const p = new Promise(() => {});
console.log(p);
export { version, FixedSizeList };
export default install;
