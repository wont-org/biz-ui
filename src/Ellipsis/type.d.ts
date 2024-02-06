import { TooltipProps } from 'antd/lib/tooltip';
import { CSSProperties, ReactNode } from 'react';

export interface IEllipsisTooltipProps extends TooltipProps {
  title?: undefined;
  overlayStyle?: undefined;
}

export interface IEllipsisProps {
  tooltip?: boolean | IEllipsisTooltipProps;
  length?: number;
  lines?: number;
  style?: CSSProperties;
  className?: string;
  fullWidthRecognition?: boolean;
  children: ReactNode;
  title?: string;
}

export function getStrFullLength(str: string): number;
export function cutStrByFullLength(str: string, maxLength: number): number;

export default class Ellipsis extends React.Component<IEllipsisProps, any> {}
