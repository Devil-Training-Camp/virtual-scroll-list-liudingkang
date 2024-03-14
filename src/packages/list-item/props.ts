import type { ExtractPropTypes, PropType } from 'vue';

import type { AnyObject } from '@/utils/base';

export type ListItemData = AnyObject | number | string;

export const listItemProps = {
  itemClass: String,
  itemData: Object as PropType<ListItemData>,
  itemIndex: Number,
};

export type ListItemProps = ExtractPropTypes<typeof listItemProps>;
