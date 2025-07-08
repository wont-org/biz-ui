import { form } from './common/form';
import { operation } from './common/operation';
import { conditionColor } from './conditionColor';
import { filterList } from './filterList';
import { formulaInput } from './formulaInput';
import { selectTemplate } from './selectTemplate';

export const LOCALE_DATA = {
  common: {
    operation,
    form,
  },
  conditionColor,
  filterList,
  formulaInput,
  selectTemplate,
};

export type LocaleDataType = typeof LOCALE_DATA;
