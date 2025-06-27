import { ReactNode } from 'react';
import { ConditionColorProps } from '../ConditionColor';
import { VALUE_TYPE as COLOR_VALUE_TYPE } from '../ConditionColor/constant';
import { OPERATOR, VALUE_TYPE } from '../ConditionIcon/constant';
import { ICON_TEMPLATE_OPTIONS } from './constant';
import { SelectTemplateProps, TemplateOption } from './types';

export const getInitialGradingConditions = ({
  styleTemplate,
  valueTypeMap,
}: {
  styleTemplate: TemplateOption['value'];
  valueTypeMap: typeof COLOR_VALUE_TYPE;
}): ConditionColorProps['value'] => {
  if (!Array.isArray(styleTemplate)) {
    return [];
  }
  const length = styleTemplate.length;
  const result: ConditionColorProps['value'] = styleTemplate.map((color, index) => {
    const isFirst = index === 0;
    const isLast = index === length - 1;
    if (length <= 2) {
      return {
        value: undefined,
        valueType: isFirst ? valueTypeMap.min.value : valueTypeMap.max.value,
        color: color,
      };
    }
    if (isFirst) {
      return {
        value: undefined,
        valueType: valueTypeMap.min.value,
        color,
      };
    }
    if (isLast) {
      return {
        value: undefined,
        valueType: valueTypeMap.max.value,
        color,
      };
    }
    return {
      value: 50,
      valueType: valueTypeMap.percent.value,
      color,
    };
  });
  if (result.length === 2) {
    result.splice(1, 0, {
      value: undefined,
      valueType: valueTypeMap.none.value,
      color: '#fff',
    });
  }
  return result;
};

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

export const getInitialIconConditions = ({
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
