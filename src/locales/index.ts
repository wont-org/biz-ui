import { colorPicker } from './colorPicker';
import { form } from './common/form';
import { message } from './common/message';
import { operation } from './common/operation';
import { conditionColor } from './conditionColor';
import { conditionIcon } from './conditionIcon';
import { dataBar, dataGrading, dataIcon } from './dataBar';
import { editableSelect } from './editableSelect';
import { filterList } from './filterList';
import { formulaInput } from './formulaInput';
import { selectTemplate } from './selectTemplate';

export const LOCALE_DATA = {
  common: {
    operation,
    form,
    message,
  },
  colorPicker,
  conditionColor,
  conditionIcon,
  dataBar,
  editableSelect,
  dataGrading,
  dataIcon,
  filterList,
  formulaInput,
  selectTemplate,
};

export type LocaleDataType = typeof LOCALE_DATA;
