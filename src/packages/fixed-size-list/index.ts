import { withInstall } from '../../utils';
import _FixedSizeList from './index.vue';

export const FixedSizeList = withInstall(_FixedSizeList);
export default FixedSizeList;

declare module 'vue' {
  export interface GlobalComponents {
    FixedSizeList: typeof FixedSizeList;
  }
}
