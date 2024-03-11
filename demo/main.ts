import { createApp } from 'vue';

import { ComposeList } from '../es/packages/compose-list';

import App from './App.vue';

import '../es/packages/compose-list/style';
const app = createApp(App);
app.use(ComposeList);
app.mount('#app');
