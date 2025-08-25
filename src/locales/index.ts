import { colorPicker } from './colorPicker';
import { form } from './common/form';
import { operation } from './common/operation';
import { conditionColor } from './conditionColor';
import { conditionIcon } from './conditionIcon';
import { dataBar, dataGrading, dataIcon } from './dataBar';
import { filterList } from './filterList';
import { formulaInput } from './formulaInput';
import { selectTemplate } from './selectTemplate';

export const LOCALE_DATA = {
  common: {
    operation,
    form,
  },
  colorPicker,
  conditionColor,
  conditionIcon,
  dataBar,
  dataGrading,
  dataIcon,
  filterList,
  formulaInput,
  selectTemplate,
};

export type LocaleDataType = typeof LOCALE_DATA;
