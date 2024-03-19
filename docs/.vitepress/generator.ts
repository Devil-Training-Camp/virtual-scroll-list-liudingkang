import { glob } from 'glob';
import { DefaultTheme, LocaleConfig } from 'vitepress';
import path from 'path';

type LocaleModuleType = typeof import('../.vitepress/locales/zh-CN');

export async function generateLocals() {
  const entries = await glob('docs/.vitepress/locales/*');
  const locales: LocaleConfig<DefaultTheme.Config> = {};
  for (const entry of entries) {
    const fileName = path.basename(entry);
    const { locale, name } = (await import(`./locales/${fileName}`)) as LocaleModuleType;
    locales[name] = locale;
  }
  return locales;
}

export async function generateBasicItems(localeName: string) {
  const componentEntries = await glob(`src/packages/*/`);
  const basicItems = componentEntries
    .reduce((prev: DefaultTheme.SidebarItem[], entry) => {
      const componentName = path.basename(entry);
      prev.push({ text: `${componentName}`, link: `/${localeName}/${componentName}` });
      return prev;
    }, [])
    .reverse();
  return basicItems;
}
export async function generateDevelopItems(localeName: string) {
  const developEntries = await glob(`docs/${localeName}/*`);
  const developItems = developEntries
    .reduce((prev: DefaultTheme.SidebarItem[], entry) => {
      const mdName = path.basename(entry, '.md');
      if (mdName == 'index') {
        return prev;
      }
      prev.push({
        text: `${mdName}`,
        link: `/${localeName}/${mdName}`,
      });
      return prev;
    }, [])
    .reverse();
  return developItems;
}
