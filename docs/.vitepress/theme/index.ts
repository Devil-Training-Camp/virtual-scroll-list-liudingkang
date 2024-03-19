// .vitepress/theme/index.ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ router, app }) {
    console.log(router, app);
    router.onBeforeRouteChange = to => {
      console.log('onBeforeRouteChange', to);
      if (to === '/') {
        router.go('/zh-CN/');
        return false;
      }
    };
  },
} satisfies Theme;
