import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';
export type Locale = LocaleSpecificConfig<DefaultTheme.Config> & {
  label: string;
  link?: string;
};
export interface LocaleModuleType {
  locale: Locale;
  name: string;
}
