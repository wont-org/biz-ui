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

export const OP_LIST = ['+', '-', '*', '/'];
export const BRACKETS = ['(', ')'];
