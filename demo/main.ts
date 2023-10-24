import { createApp } from 'vue';
import App from './App.vue';
import VirtualScrollList from '../src';
const app = createApp(App);
app.use(VirtualScrollList);
app.mount('#app');
