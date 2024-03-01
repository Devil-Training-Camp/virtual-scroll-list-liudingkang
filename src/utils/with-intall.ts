import type { App, Component } from 'vue';
import { camelize } from './format';

export type WithInstall<T> = T & {
  install(app: App): void;
};
// 组件 install 方法
export function withInstall<T extends Component>(options: T): WithInstall<T> {
  (options as WithInstall<T>).install = (app: App) => {
    const { name } = options;
    if (!name) return;
    app.component(name, options);
    app.component(camelize(name), options);
  };
  return options as WithInstall<T>;
}
