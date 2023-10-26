import { withInstall } from '../../utils';
import _ComposeList from './compose-list.vue';

export const ComposeList = withInstall(_ComposeList);
export default ComposeList;

declare module 'vue' {
  export interface GlobalComponents {
    ComposeList: typeof ComposeList;
  }
}
