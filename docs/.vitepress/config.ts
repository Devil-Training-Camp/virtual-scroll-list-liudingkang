import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Virtual-Scroll-List',
  description: 'A Components Docs Site',
  cleanUrls: true,
  srcDir: '../',
  rewrites: {
    'src/packages/:pkg/docs/:lang(.+).md': ':lang/:pkg.md',
    'docs/:lang*': ':lang*',
  },
  locales: {
    'en-US': {
      label: 'English',
      lang: 'en-US',
      link: '/en-US/',
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/zh-CN/', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/overview' },
    ],
    sidebar: [
      {
        text: 'Overview 组件总览',
        items: [{ text: 'overview 组件总览', link: '/zh-CN/overview' }],
      },
      {
        text: 'Basic 基础组件',
        items: [{ text: 'FixedSizeList 固定高度', link: '/zh-CN/fixed-size-list' }],
      },
    ],
    outlineTitle: '本页目录',
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
