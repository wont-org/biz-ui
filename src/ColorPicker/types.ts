import { PopoverProps } from 'antd';
import { ReactNode } from 'react';
import { SketchPickerProps } from 'react-color';

export interface ColorItem {
  value: string;
  label?: string;
}

export interface ColorGroup {
  title?: string;
  colors: ColorItem[];
}

export interface ColorPickerProps {
  /**
   * 颜色值
   */
  value?: string;
  /**
   * 颜色变化回调
   */
  onChange?: (color: string) => void;
  /**
   * 自定义弹出层内容
   */
  children?: ReactNode;
  /**
   * 自定义颜色预设
   */
  presets?: ColorGroup[];
  /**
   * 弹出层属性
   */
  popoverProps?: PopoverProps;
  /**
   * 颜色块大小
   */
  itemSize?: number;
  /**
   * 每行展示的颜色块数量
   */
  rowWrapCount?: number;
  /**
   * 是否只读
   */
  readOnly?: boolean;
  colorPickerClass?: string;
  colors?: SketchPickerProps['presetColors'];
  trigger?: 'icon' | 'block' | ReactNode;
  /**
   * 弹出层打开状态变化回调
   */
  onOpenChange?: (open: boolean) => void;
}
