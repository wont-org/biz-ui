import { ReactNode } from 'react';
import { OPERATOR, VALUE_TYPE } from '../ConditionIcon/constant';
import { ICON_TEMPLATE_OPTIONS } from './constant';
import { SelectTemplateProps, TemplateOption } from './types';

export const findIconByValue = (
  value: string,
  iconTemplateOpt = ICON_TEMPLATE_OPTIONS,
): ReactNode => {
  for (const category of iconTemplateOpt) {
    for (const option of category.options) {
      if (Array.isArray(option.value)) {
        const index = option.value.indexOf(value);
        if (index !== -1) {
          return Array.isArray(option.label) ? option.label[index] : option.label;
        }
      }
    }
  }
  return null;
};

export const getInitialConditions = ({
  styleTemplate,
  valueTypeMap,
  operatorMap,
}: {
  styleTemplate: TemplateOption['value'];
  valueTypeMap: typeof VALUE_TYPE;
  operatorMap: typeof OPERATOR;
}) => {
  if (!Array.isArray(styleTemplate)) {
    return [];
  }
  const length = styleTemplate.length;
  return styleTemplate.map((item, index) => {
    const percent = 100 / length;
    const icon = findIconByValue(item);
    return {
      icon,
      valueType: valueTypeMap.percent.value,
      operator: operatorMap.greaterThanOrEqual.value,
      value:
        index === length - 1
          ? Math.floor(percent * (length - index))
          : Math.floor(percent * (length - index - 1)),
    };
  });
};

export const reverseIconTemplateOptions = (
  options: NonNullable<SelectTemplateProps['options']>,
) => {
  if (!options) {
    return [];
  }
  return options.map((group) => ({
    ...group,
    options: group.options.map((option) => ({
      ...option,
      value: [...option.value].reverse(),
      label: Array.isArray(option.label) ? [...option.label].reverse() : option.label,
    })),
  }));
};
