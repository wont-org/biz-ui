export const VALUE_TYPE = {
  number: {
    label: '数字',
    value: 'number',
  },
  percent: {
    label: '百分比',
    value: 'percent',
  },
  percentPoint: {
    label: '百分点值',
    value: 'percentPoint',
  },
} as const;
export const OPERATOR = {
  greaterThanOrEqual: { value: 'greaterThanOrEqual', label: '≥' },
  greaterThan: { value: 'greaterThan', label: '>' },
};
