import { InputNumberProps } from 'antd';
import { InputProps } from 'antd/es/input';
import { SelectProps } from 'antd/es/select';
import { ValueOfConst } from '../utils/types';
import { FORMULA } from './constant';
import { validator } from './utils';

export interface ValueItem extends Record<string, any> {
  value?: string | number | null;
  valueType: ValueOfConst<typeof FORMULA, 'valueType'>;
  type?: string | number | null;
}
export interface FormulaInputProps {
  value?: {
    formula: (ValueItem | string)[];
    name?: string;
    precision: number;
  };
  onChange?: (val: FormulaInputProps['value']) => void;
  nameInputProps?: InputProps & {
    useName?: boolean;
    validator?: (val?: string) => ReturnType<typeof validator>;
  };
  typeSelectProps?: SelectProps;
  precisionSelectProps?: SelectProps;
  valueSelectProps?:
    | SelectProps
    | ((type?: string | number | null) => SelectProps | Promise<SelectProps>);
  inputNumberProps?: InputNumberProps;
  maxItem?: number;
  minItem?: number;
  useValue?: boolean;
}
