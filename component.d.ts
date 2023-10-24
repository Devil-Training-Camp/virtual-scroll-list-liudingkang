// 第1种 使用联合类型
// declare module '*.vue' {
//   import type { App, DefineComponent } from 'vue';
//   const component: DefineComponent<{}, {}, any> & {
//     install(app: App): void;
//   };
//   export default component;
// }
// 第2种 使用函数返回值类型
// defineComponent函数的返回值类型本身是包含install属性的，这种做法更直观且更贴合组件本身的类型
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: ReturnType<typeof DefineComponent>;
  export default component;
}
