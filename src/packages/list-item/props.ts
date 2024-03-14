import type { ExtractPropTypes, PropType } from 'vue';

import type { AnyObject } from '@/utils/base';

export const listItemProps = {
  itemClass: String,
  itemData: Object as PropType<AnyObject>,
  itemIndex: Number,
};

export type ListItemProps = ExtractPropTypes<typeof listItemProps>;
