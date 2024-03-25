import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DemoBlock from '@ruabick/vitepress-demo-block';
import '@ruabick/vitepress-demo-block/dist/style.css';
import './custom.scss';

import Components from '../../../src';

export default {
  extends: DefaultTheme,
  enhanceApp({ router, app }) {
    app.component('Demo', DemoBlock);
    app.use(Components);
    router.onBeforeRouteChange = to => {
      console.log('onBeforeRouteChange', to, router.route);
      if (to === '/') {
        router.go('/zh-CN/');
        return false;
      }
    };
  },
} satisfies Theme;
