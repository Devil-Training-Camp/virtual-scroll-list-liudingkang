import { withInstall } from '../../utils';

import _ListItem from './list-item.vue';

export const ListItem = withInstall(_ListItem);
export default ListItem;

declare module 'vue' {
  export interface GlobalComponents {
    ListItem: typeof ListItem;
  }
}
