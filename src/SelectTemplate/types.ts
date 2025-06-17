import { ReactNode } from 'react';

export interface TemplateOption {
  value: readonly string[];
  label?: ReactNode | readonly ReactNode[];
  isGrading?: boolean;
  extraLabel?: ReactNode;
}

export interface SelectTemplateProps {
  /**
   * @description 是否只读
   * @default undefined
   */
  readOnly?: boolean;
  /**
   * @description 选中值的渲染，模板color[]或自定义渲染
   */
  selectedTemplate?: readonly string[] | ((option: TemplateOption) => ReactNode);
  /**
   * @description 是否显示选项标签，extraLabel字段设置，比如绿-白-红
   * @default true
   */
  showOptionLabel?: boolean;
  /**
   * @description 是否显示选中选项的标签，extraLabel字段设置，比如绿-白-红
   * @default true
   */
  showSelectedOptionLabel?: boolean;
  /**
   * @description 超出几个换行
   * @default 3
   */
  rowWrapCount?: number;
  /**
   * @description 占位符
   * @default 请选择
   */
  placeholder?: string;
  /**
   * @description 下拉选项
   * @default []
   */
  options?: readonly {
    label: string;
    options: readonly TemplateOption[];
  }[];
  /**
   * @description 大小
   * @default middle
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * @description 选中值
   */
  value?: TemplateOption;
  /**
   * @description 选中值变更
   */
  onChange?: (option: TemplateOption) => void;
  /**
   * @description 比较key
   * @default ['value']
   */
  compareKeys?: (keyof TemplateOption)[];
}
