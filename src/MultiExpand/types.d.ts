import { TooltipProps } from 'antd/lib/tooltip';
import { ReactNode } from 'react';
import { PopoverProps, TagProps } from 'antd';
import { MODE } from './constant';
import { CSSProperties } from 'styled-components';

export interface IMultiExpandDataItem {
  label: string;
  canClick?: boolean;
  icon?: string;
  tagType?: string;
  tagTypeLabel?: string;
  optionList?: IMultiExpandDataItem[];
}
export interface IMultiExpandProps {
  /**
   *@description 数据源
   *@default []
   */
  data: IMultiExpandDataItem[];
  title?: string;
  trigger: PopoverProps['trigger'];
  mode?: keyof typeof MODE;
  empty?: string;
  // func
  onClickItem: (item: IMultiExpandProps['data'][number], index: number) => void;
  tagProps?: TagProps;
  moreTagProps?: TagProps;
  moreRender?: ReactNode;
  showTitle?: boolean;
  style?: CSSProperties;
  maxSize?: number;
  outMaxLength?: number;
  tooltip: TooltipProps;
}
export type IMultiExpandContentProps = Pick<
  IMultiExpandProps,
  'data' | 'mode' | 'tagProps' | 'style' | 'tooltip'
> & {
  maxLength?: number;
  onClickItem?: [(item: IMultiExpandProps['data'][number], index: number) => void, () => void];
};

export type IMultiExpandContentWrapProps = Pick<IMultiExpandProps, 'data'>;
