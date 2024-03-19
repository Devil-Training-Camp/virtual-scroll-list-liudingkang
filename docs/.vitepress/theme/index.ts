// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DemoBlock from '@ruabick/vitepress-demo-block';
import '@ruabick/vitepress-demo-block';
import Components from '../../../src';
import CustomDemoContainer from './custom-demo.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ router, app }) {
    app.component('demo', DemoBlock);
    app.component('demo-container', CustomDemoContainer);
    app.use(Components as any);
    router.onBeforeRouteChange = to => {
      console.log('onBeforeRouteChange', to, router.route);
      if (to === '/') {
        router.go('/zh-CN/');
        return false;
      }
    };
  },
} satisfies Theme;
