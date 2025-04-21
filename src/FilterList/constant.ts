export const RELATION = {
  and: {
    value: 'and',
    label: '且',
  },
  or: {
    value: 'or',
    label: '或',
  },
} as const;

export const OPERATORS = {
  equal: {
    value: 'equal',
    label: '等于',
  },
  notEqual: {
    value: 'notEqual',
    label: '不等于',
  },
  greater: {
    value: 'greater',
    label: '大于',
  },
  less: {
    value: 'less',
    label: '小于',
  },
  greaterEqual: {
    value: 'greaterEqual',
    label: '大于等于',
  },
  lessEqual: {
    value: 'lessEqual',
    label: '小于等于',
  },
  hasValue: {
    value: 'hasValue',
    label: '有值',
  },
  noValue: {
    value: 'noValue',
    label: '无值',
  },
  range: {
    value: 'range',
    label: '区间',
  },
} as const;
