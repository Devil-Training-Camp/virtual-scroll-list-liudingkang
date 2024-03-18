import { DefaultTheme, LocaleSpecificConfig } from 'vitepress';
export type Locale = LocaleSpecificConfig<DefaultTheme.Config> & {
  label: string;
  link?: string;
};
