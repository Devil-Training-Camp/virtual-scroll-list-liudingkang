import { createApp } from 'vue';
import App from './App.vue';
import '../es/packages/compose-list/style';
import ComposeList from '../es/packages/compose-list';
const app = createApp(App);
app.use(ComposeList);
app.mount('#app');
