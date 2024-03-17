import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Virtual-Scroll-List',
  description: 'A Components Docs Site',
  cleanUrls: true,
  srcDir: '../',
  rewrites: {
    'src/packages/:pkg/docs/(.*)': ':pkg.md',
    'docs/:doc': ':doc',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'FixedSizeList 固定高度', link: '/fixed-size-list' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
