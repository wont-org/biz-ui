export const FORMULA = {
  text: {
    value: 'text',
    valueType: 'text',
    labelKey: 'formulaInput.formula.object',
  },
  number: {
    value: 'number',
    valueType: 'number',
    labelKey: 'formulaInput.formula.constant',
  },
} as const;

export const DECIMAL_PLACES = {
  integer: {
    labelKey: 'formulaInput.decimalPlaces.integer',
    value: 0,
  },
  four: {
    labelKey: 'formulaInput.decimalPlaces.four',
    value: 4,
  },
  percent: {
    labelKey: 'formulaInput.decimalPlaces.percent',
    value: 2,
  },
} as const;

export const OP_LIST = ['+', '-', '*', '/'];
export const BRACKETS = ['(', ')'];
