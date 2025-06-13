import { createFromIconfontCN } from '@ant-design/icons';
import { ValueOfWithType } from '../utils/types';
import scriptUrl from '../_assets/iconfont';

export const ICON_TYPE = {
  refresh: 'icon-refresh',
} as const;

export const IconFont = createFromIconfontCN<ValueOfWithType<typeof ICON_TYPE>>({
  scriptUrl,
});
