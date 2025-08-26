import { ValueOfConstWithType } from '../utils/types';

/**
 * 字段类型常量
 */
export const FIELD_TYPES = {
  string: { value: 'string', labelKey: 'filterList.fieldType.string' },
  number: { value: 'number', labelKey: 'filterList.fieldType.number' },
  boolean: { value: 'boolean', labelKey: 'filterList.fieldType.boolean' },
  date: { value: 'date', labelKey: 'filterList.fieldType.date' },
  dateTime: { value: 'dateTime', labelKey: 'filterList.fieldType.dateTime' },
} as const;
export type FieldType = ValueOfConstWithType<typeof FIELD_TYPES, 'value'>;

/**
 * 操作符常量
 */
export const OPERATORS = {
  equal: { value: 'equal', labelKey: 'filterList.operator.equal' },
  notEqual: { value: 'notEqual', labelKey: 'filterList.operator.notEqual' },
  greaterThan: { value: 'greaterThan', labelKey: 'filterList.operator.greaterThan' },
  greaterThanOrEqual: {
    value: 'greaterThanOrEqual',
    labelKey: 'filterList.operator.greaterThanOrEqual',
  },
  lessThan: { value: 'lessThan', labelKey: 'filterList.operator.lessThan' },
  lessThanOrEqual: { value: 'lessThanOrEqual', labelKey: 'filterList.operator.lessThanOrEqual' },
  range: { value: 'range', labelKey: 'filterList.operator.range' },
  hasValue: { value: 'hasValue', labelKey: 'filterList.operator.hasValue' },
  noValue: { value: 'noValue', labelKey: 'filterList.operator.noValue' },
  contains: { value: 'contains', labelKey: 'filterList.operator.contains' },
  notContains: { value: 'notContains', labelKey: 'filterList.operator.notContains' },
  startsWith: { value: 'startsWith', labelKey: 'filterList.operator.startsWith' },
  endsWith: { value: 'endsWith', labelKey: 'filterList.operator.endsWith' },
  regexLike: { value: 'regexLike', labelKey: 'filterList.operator.regexLike' },
  regexNotLike: { value: 'regexNotLike', labelKey: 'filterList.operator.regexNotLike' },
  before: { value: 'before', labelKey: 'filterList.operator.before' },
  after: { value: 'after', labelKey: 'filterList.operator.after' },
  in: { value: 'in', labelKey: 'filterList.operator.in' },
  notIn: { value: 'notIn', labelKey: 'filterList.operator.notIn' },
  isTrue: { value: 'isTrue', labelKey: 'filterList.operator.isTrue' },
  isFalse: { value: 'isFalse', labelKey: 'filterList.operator.isFalse' },
} as const;
export type OperatorType = ValueOfConstWithType<typeof OPERATORS, 'value'>;

export const COMPONENT = {
  input: {
    value: 'input',
    labelKey: 'filterList.component.input',
  },
  textarea: {
    value: 'textarea',
    labelKey: 'filterList.component.textarea',
  },
  inputNumber: {
    value: 'inputNumber',
    labelKey: 'filterList.component.inputNumber',
  },
  inputNumberRange: {
    value: 'inputNumberRange',
    labelKey: 'filterList.component.inputNumberRange',
  },
  select: {
    value: 'select',
    labelKey: 'filterList.component.select',
  },
  multipleSelect: {
    value: 'multipleSelect',
    labelKey: 'filterList.component.multipleSelect',
  },
  datePicker: {
    value: 'datePicker',
    labelKey: 'filterList.component.datePicker',
  },
  dateRangePicker: {
    value: 'dateRangePicker',
    labelKey: 'filterList.component.dateRangePicker',
  },
  dateTimePicker: {
    value: 'dateTimePicker',
    labelKey: 'filterList.component.dateTimePicker',
  },
  dateTimeRangePicker: {
    value: 'dateTimeRangePicker',
    labelKey: 'filterList.component.dateTimeRangePicker',
  },
} as const;
export type ComponentType = ValueOfConstWithType<typeof COMPONENT, 'value'>;

export interface FilterFieldMapItem {
  value: ValueOfConstWithType<typeof OPERATORS, 'value'>;
  labelKey: string;
  component?: ValueOfConstWithType<typeof COMPONENT, 'value'>;
  componentProps?: Record<string, unknown>;
}

export type FilterFieldMapType = Partial<Record<FieldType, FilterFieldMapItem[]>>;

export const FILTER_FIELD_MAP: FilterFieldMapType = {
  [FIELD_TYPES.string.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.notEqual,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.contains,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.notContains,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.startsWith,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.endsWith,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.regexLike,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.regexNotLike,
      component: COMPONENT.input.value,
    },
    {
      ...OPERATORS.hasValue,
    },
    {
      ...OPERATORS.noValue,
    },
  ],
  [FIELD_TYPES.boolean.value]: [
    {
      ...OPERATORS.isTrue,
    },
    {
      ...OPERATORS.isFalse,
    },
    {
      ...OPERATORS.hasValue,
    },
    {
      ...OPERATORS.noValue,
    },
  ],
  [FIELD_TYPES.number.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.notEqual,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.greaterThan,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.greaterThanOrEqual,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.lessThan,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.lessThanOrEqual,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.range,
      component: COMPONENT.inputNumberRange.value,
    },
    {
      ...OPERATORS.hasValue,
    },
    {
      ...OPERATORS.noValue,
    },
  ],
  [FIELD_TYPES.date.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.datePicker.value,
    },
    {
      ...OPERATORS.notEqual,
      component: COMPONENT.datePicker.value,
    },
    {
      ...OPERATORS.before,
      component: COMPONENT.datePicker.value,
    },
    {
      ...OPERATORS.after,
      component: COMPONENT.datePicker.value,
    },
    {
      ...OPERATORS.range,
      component: COMPONENT.dateRangePicker.value,
    },
    {
      ...OPERATORS.hasValue,
    },
    {
      ...OPERATORS.noValue,
    },
  ],
  [FIELD_TYPES.dateTime.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.notEqual,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.before,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.after,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.range,
      component: COMPONENT.dateTimeRangePicker.value,
    },
    {
      ...OPERATORS.hasValue,
    },
    {
      ...OPERATORS.noValue,
    },
  ],
} as const;
/**
 * 关系常量
 */
export const RELATION = {
  and: { value: 'and', labelKey: 'filterList.relation.and' },
  or: { value: 'or', labelKey: 'filterList.relation.or' },
} as const;
