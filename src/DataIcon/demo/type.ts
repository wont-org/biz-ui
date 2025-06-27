import { ConditionIconProps } from '@wont/biz-ui/ConditionIcon';
import { SelectTemplateProps } from '@wont/biz-ui/SelectTemplate/types';

export interface DataSource {
  [key: string]: any;
  mixedValue?: number;
  positiveValue?: number;
  negativeValue?: number;
}

export interface FormValues {
  conditions: ConditionIconProps['value'];
  styleTemplate: SelectTemplateProps['value'];
  reverseIcon: boolean;
}
