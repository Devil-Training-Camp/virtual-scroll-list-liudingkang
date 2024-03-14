import { createApp } from 'vue';

import { FixedSizeList } from '../es/packages/fixed-size-list';

import App from './App.vue';

import '../es/packages/fixed-size-list/style';
const app = createApp(App);
console.log(FixedSizeList);
app.use(FixedSizeList);
app.mount('#app');
