import type { ExtractPropTypes, PropType } from 'vue';

import type { AnyObject } from '../../utils';

export type ListItemData = AnyObject | number | string;

export const listItemProps = {
  itemClass: String,
  itemData: [Object, Number, String] as PropType<ListItemData>,
  itemIndex: Number,
};

export type ListItemProps = ExtractPropTypes<typeof listItemProps>;
