import { createApp } from 'vue';
import App from './App.vue';
import '../es/packages/fixed-size-list/style';
import FixedSizeList from '../es/packages/fixed-size-list';
const app = createApp(App);
app.use(FixedSizeList);
app.mount('#app');
