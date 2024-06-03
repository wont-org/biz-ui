import type { CSSProperties, ReactNode } from 'react';
import type { TooltipPlacement } from 'antd/lib/tooltip';

export interface IBlockHeaderProps {
  title: ReactNode;
  style?: CSSProperties;
  type?: 'ribbon' | 'minimum';
  className?: string;
  tooltip?: ReactNode;
  placement?: TooltipPlacement;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  required?: boolean;
}
