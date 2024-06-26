import { applyPlugins } from '@ruabick/md-demo-plugins';
// import applyPlugins from 'markdown-it-vitepress-demo';
import { defineConfig } from 'vitepress';

import { generateLocals } from './generator';
import { wrapTablePlugin } from './md-table-plugin';

const locales = await generateLocals();
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Virtual-Scroll-List',
  description: 'Is a component library developed based on Vue3',
  cleanUrls: true,
  srcDir: '../',
  rewrites: {
    'src/packages/:pkg/docs/:lang(.+).md': ':lang/:pkg.md',
    'docs/:lang*': ':lang*',
  },
  vite: {},
  locales,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Devil-Training-Camp/virtual-scroll-list-liudingkang',
      },
    ],
  },
  markdown: {
    config: md => {
      applyPlugins(md);
      wrapTablePlugin(md);
    },
  },
});
