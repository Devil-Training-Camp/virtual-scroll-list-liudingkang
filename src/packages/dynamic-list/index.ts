import { withInstall } from '../../utils';

import _DynamicList from './dynamic-list.vue';
import '../../styles/base.scss';
import '../../styles/animate.css';

export const DynamicList = withInstall(_DynamicList);
export default DynamicList;

declare module 'vue' {
  export interface GlobalComponents {
    DynamicList: typeof DynamicList;
  }
}
