import { withInstall } from '../../utils';

import _FixedSizeList from './fixed-size-list.vue';

export const FixedSizeList = withInstall(_FixedSizeList);
export default FixedSizeList;

declare module 'vue' {
  export interface GlobalComponents {
    FixedSizeList: typeof FixedSizeList;
  }
}
