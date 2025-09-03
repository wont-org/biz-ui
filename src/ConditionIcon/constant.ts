export const VALUE_TYPE = {
  number: {
    labelKey: 'conditionIcon.valueType.number',
    value: 'number',
  },
  percent: {
    labelKey: 'conditionIcon.valueType.percent',
    value: 'percent',
  },
  percentPoint: {
    labelKey: 'conditionIcon.valueType.percentPoint',
    value: 'percentPoint',
  },
} as const;
export const OPERATOR = {
  greaterThanOrEqual: {
    value: 'greaterThanOrEqual',
    labelKey: 'conditionIcon.operator.greaterThanOrEqual',
  },
  greaterThan: {
    value: 'greaterThan',
    labelKey: 'conditionIcon.operator.greaterThan',
  },
};
