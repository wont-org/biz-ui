import { ConditionColorProps } from '@wont/biz-ui/ConditionColor';
import { SelectTemplateProps } from '@wont/biz-ui/SelectTemplate/types';
import { ValueOfConstWithType } from '@wont/biz-ui/utils/types';
import { FILL_TYPE_OPTIONS } from './constant';

export interface DataSource {
  [key: string]: any;
  mixedValue?: number;
  positiveValue?: number;
  negativeValue?: number;
}

export interface FormValues {
  conditions: ConditionColorProps['value'];
  styleTemplate: SelectTemplateProps['value'];
  fillType: ValueOfConstWithType<typeof FILL_TYPE_OPTIONS, 'value'>;
  negativeColor: string;
  positiveColor: string;
}
