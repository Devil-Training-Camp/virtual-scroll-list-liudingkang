import { withInstall } from '../../utils';
import _DynamicList from './dynamic-list.vue';

export const DynamicList = withInstall(_DynamicList);
export default DynamicList;

declare module 'vue' {
  export interface GlobalComponents {
    DynamicList: typeof DynamicList;
  }
}
