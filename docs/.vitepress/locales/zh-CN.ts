import { DefaultTheme } from 'vitepress';
import { Locale } from '../types';
import path from 'path';
import { generateBasicItems, generateDevelopItems } from '../generator';

export const name = path.basename(__filename, '.ts');

const developItems = await generateDevelopItems(name);
const basicItems = await generateBasicItems(name);

const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Development 开发指南',
    items: developItems,
  },
  {
    text: 'Basic 基础组件',
    items: basicItems,
  },
];

const themeConfig: DefaultTheme.Config = {
  nav: [
    { text: '首页', link: `/${name}/` },
    { text: '组件', link: `/${name}/overview` },
  ],
  sidebar,
  outline: {
    label: '本页目录',
  },
  darkModeSwitchLabel: '切换主题',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '回到顶部',
  docFooter: {
    prev: '上一页',
    next: '下一页',
  },
};

export const locale: Locale = {
  label: '简体中文',
  lang: 'zh-CN', // 可选，将作为 `lang` 属性添加到 `html` 标签中
  link: '/zh-CN/', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
  themeConfig,
};
