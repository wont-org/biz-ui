import { ValueOfConstWithType } from '../utils/types';

/**
 * 字段类型常量
 */
export const FIELD_TYPES = {
  string: { value: 'string', label: '文本' },
  number: { value: 'number', label: '数值' },
  boolean: { value: 'boolean', label: '布尔' },
  date: { value: 'date', label: '日期' },
  dateTime: { value: 'dateTime', label: '日期时间' },
} as const;
export type FieldType = ValueOfConstWithType<typeof FIELD_TYPES, 'value'>;

/**
 * 操作符常量
 */
export const OPERATORS = {
  equal: { value: 'equal', label: '等于' },
  notEqual: { value: 'notEqual', label: '不等于' },
  greaterThan: { value: 'greaterThan', label: '大于' },
  greaterThanOrEqual: { value: 'greaterThanOrEqual', label: '大于等于' },
  lessThan: { value: 'lessThan', label: '小于' },
  lessThanOrEqual: { value: 'lessThanOrEqual', label: '小于等于' },
  range: { value: 'range', label: '范围' },
  hasValue: { value: 'hasValue', label: '有值' },
  noValue: { value: 'noValue', label: '无值' },
  contains: { value: 'contains', label: '包含' },
  notContains: { value: 'notContains', label: '不包含' },
  startsWith: { value: 'startsWith', label: '开始于' },
  endsWith: { value: 'endsWith', label: '结束于' },
  regexLike: { value: 'regexLike', label: '正则匹配' },
  regexNotLike: { value: 'regexNotLike', label: '正则不匹配' },
  before: { value: 'before', label: '早于' },
  after: { value: 'after', label: '晚于' },
  in: { value: 'in', label: '在列表中' },
  notIn: { value: 'notIn', label: '不在列表中' },
  isTrue: { value: 'isTrue', label: '为真' },
  isFalse: { value: 'isFalse', label: '为假' },
} as const;
export type OperatorType = ValueOfConstWithType<typeof OPERATORS, 'value'>;

export const COMPONENT = {
  input: {
    value: 'input',
    label: '输入框',
  },
  textarea: {
    value: 'textarea',
    label: '多行文本',
  },
  inputNumber: {
    value: 'inputNumber',
    label: '数值输入框',
  },
  inputNumberRange: {
    value: 'inputNumberRange',
    label: '数值区间输入框',
  },
  select: {
    value: 'select',
    label: '选择器',
  },
  multipleSelect: {
    value: 'multipleSelect',
    label: '多选选择器',
  },
  datePicker: {
    value: 'datePicker',
    label: '日期选择器',
  },
  dateRangePicker: {
    value: 'dateRangePicker',
    label: '日期区间选择器',
  },
  dateTimePicker: {
    value: 'dateTimePicker',
    label: '日期时间选择器',
  },
  dateTimeRangePicker: {
    value: 'dateTimeRangePicker',
    label: '日期时间区间选择器',
  },
} as const;
export type ComponentType = ValueOfConstWithType<typeof COMPONENT, 'value'>;

export interface FilterFieldMapItem {
  value: ValueOfConstWithType<typeof OPERATORS, 'value'>;
  label: string;
  component?: ValueOfConstWithType<typeof COMPONENT, 'value'>;
  componentProps?: Record<string, unknown>;
}

export type FilterFieldMapType = Record<FieldType, FilterFieldMapItem[]>;

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
  and: { value: 'and', label: '且' },
  or: { value: 'or', label: '或' },
} as const;
