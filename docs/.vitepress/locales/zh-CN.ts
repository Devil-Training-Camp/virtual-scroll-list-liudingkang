import { DefaultTheme } from 'vitepress';
import { Locales } from '../utils/types';
import { glob } from 'glob';
import path from 'path';

const entries = await glob(`src/packages/**/*`, {
  nodir: true,
});
const sidebar = [];
const basicItems = entries.reduce((prev: DefaultTheme.SidebarItem[], entry) => {
  const componentDir = path.dirname(entry);
  prev.push({ text: `${entry}`, link: '/zh-CN/fixed-size-list' });
  return prev;
}, []);

const themeConfig: DefaultTheme.Config = {
  sidebar,
};

export const locales: Locales = {
  label: '简体中文',
  lang: 'zh-CN', // 可选，将作为 `lang` 属性添加到 `html` 标签中
  link: '/zh-CN/', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
};
