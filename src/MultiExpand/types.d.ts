import { ReactNode } from 'react';
import { PopoverProps, TagProps } from 'antd';
import { MODE } from './constant';
import { CSSProperties } from 'styled-components';

export interface IMultiExpandProps {
  /**
   *@description 数据源
   *@default []
   */
  data: {
    label: string;
  }[];
  title?: string;
  trigger: PopoverProps['trigger'];
  mode?: keyof typeof MODE;
  empty?: string;
  // func
  onClickItem: (item: IMultiExpandProps['data'][number], index: number) => void;
  tagProps: TagProps;
  moreTagProps: TagProps;
  moreRender?: ReactNode;
  showTitle?: boolean;
  style?: CSSProperties;
  maxSize?: number;
}
