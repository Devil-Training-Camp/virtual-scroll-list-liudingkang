import { withInstall } from '../../utils';
import _ComposeList from './compose-list.vue';
import '../../styles/base.scss';
import '../../styles/animate.css';

export const ComposeList = withInstall(_ComposeList);
export default ComposeList;

declare module 'vue' {
  export interface GlobalComponents {
    ComposeList: typeof ComposeList;
  }
}
