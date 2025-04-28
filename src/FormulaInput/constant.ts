export const FORMULA = {
  text: {
    value: 'text',
    valueType: 'text',
    label: '对象',
  },
  number: {
    value: 'number',
    valueType: 'number',
    label: '常数',
  },
} as const;

export const DECIMAL_PLACES = {
  integer: {
    label: '整数',
    value: 0,
  },
  four: {
    label: '四位小数',
    value: 4,
  },
  percent: {
    label: '百分数',
    value: 2,
  },
} as const;

export const OP_LIST = ['+', '-', '*', '/'];
export const BRACKETS = ['(', ')'];
