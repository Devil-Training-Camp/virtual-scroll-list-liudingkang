import path from 'path';

import type { DefaultTheme } from 'vitepress';

import type { Locale } from '../types';
import { generateBasicItems, generateDevelopItems } from '../generator';

export const name = path.basename(__filename, '.ts');

const developItems = await generateDevelopItems(name);
const basicItems = await generateBasicItems(name);

const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Development',
    items: developItems,
  },
  {
    text: 'Basic',
    items: basicItems,
  },
];

const themeConfig: DefaultTheme.Config = {
  nav: [
    { text: 'Home', link: `/${name}/` },
    { text: 'Component', link: `/${name}/overview` },
  ],
  sidebar,
  outline: {
    label: 'CONTENTS',
  },
  darkModeSwitchLabel: 'Theme',
  lightModeSwitchTitle: 'Switch to light',
  darkModeSwitchTitle: 'Switch to dark',
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Back to top',
  docFooter: {
    prev: 'prev',
    next: 'next',
  },
};

export const locale: Locale = {
  label: 'English',
  lang: name, // 可选，将作为 `lang` 属性添加到 `html` 标签中
  link: `/${name}/`, // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
  themeConfig,
};
