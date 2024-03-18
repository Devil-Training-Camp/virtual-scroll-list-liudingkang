import { DefaultTheme, LocaleSpecificConfig } from 'vitepress';
export type Locales = LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string };
