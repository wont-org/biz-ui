import { ConditionColorProps } from '@wont/biz-ui/ConditionColor';
import { SelectTemplateProps } from '@wont/biz-ui/SelectTemplate/types';

export interface DataSource {
  [key: string]: any;
  mixedValue?: number;
  positiveValue?: number;
  negativeValue?: number;
}

export interface FormValues {
  conditions: ConditionColorProps['value'];
  styleTemplate: SelectTemplateProps['value'];
  reverseIcon: boolean;
}
