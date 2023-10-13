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
// const ss = 43;
// const test = (s: name) => {
//   console.log('test: ', s);
// };
// test();
const d = Reflect.deleteProperty;

console.log(d);
export { version, FixedSizeList };
export default install;
