import type { App, Component } from 'vue';
export type WithInstall<T> = T & {
    install(app: App): void;
};
export declare function withInstall<T extends Component>(options: T): T;
