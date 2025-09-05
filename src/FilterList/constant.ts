import { ValueOfConstWithType } from '../utils/types';

/**
 * 字段类型常量
 */
export const FIELD_TYPES = {
  string: { value: 'string', label: '字符串', labelKey: 'filterList.fieldType.string' },
  number: { value: 'number', label: '数字', labelKey: 'filterList.fieldType.number' },
  boolean: { value: 'boolean', label: '布尔值', labelKey: 'filterList.fieldType.boolean' },
  date: { value: 'date', label: '日期', labelKey: 'filterList.fieldType.date' },
  dateTime: { value: 'dateTime', label: '日期时间', labelKey: 'filterList.fieldType.dateTime' },
} as const;
export type FieldType = ValueOfConstWithType<typeof FIELD_TYPES, 'value'>;

/**
 * 操作符常量
 */
export const OPERATORS = {
  equal: { value: 'equal', label: '等于', labelKey: 'filterList.operator.equal' },
  notEqual: { value: 'notEqual', label: '不等于', labelKey: 'filterList.operator.notEqual' },
  greaterThan: { value: 'greaterThan', label: '大于', labelKey: 'filterList.operator.greaterThan' },
  greaterThanOrEqual: {
    value: 'greaterThanOrEqual',
    label: '大于等于',
    labelKey: 'filterList.operator.greaterThanOrEqual',
  },
  lessThan: { value: 'lessThan', label: '小于', labelKey: 'filterList.operator.lessThan' },
  lessThanOrEqual: {
    value: 'lessThanOrEqual',
    label: '小于等于',
    labelKey: 'filterList.operator.lessThanOrEqual',
  },
  range: { value: 'range', label: '范围', labelKey: 'filterList.operator.range' },
  hasValue: { value: 'hasValue', label: '有值', labelKey: 'filterList.operator.hasValue' },
  noValue: { value: 'noValue', label: '无值', labelKey: 'filterList.operator.noValue' },
  contains: { value: 'contains', label: '包含', labelKey: 'filterList.operator.contains' },
  notContains: {
    value: 'notContains',
    label: '不包含',
    labelKey: 'filterList.operator.notContains',
  },
  startsWith: { value: 'startsWith', label: '开始于', labelKey: 'filterList.operator.startsWith' },
  endsWith: { value: 'endsWith', label: '结束于', labelKey: 'filterList.operator.endsWith' },
  regexLike: { value: 'regexLike', label: '正则匹配', labelKey: 'filterList.operator.regexLike' },
  regexNotLike: {
    value: 'regexNotLike',
    label: '正则不匹配',
    labelKey: 'filterList.operator.regexNotLike',
  },
  before: { value: 'before', label: '之前', labelKey: 'filterList.operator.before' },
  after: { value: 'after', label: '之后', labelKey: 'filterList.operator.after' },
  in: { value: 'in', label: '在列表中', labelKey: 'filterList.operator.in' },
  notIn: { value: 'notIn', label: '不在列表中', labelKey: 'filterList.operator.notIn' },
  isTrue: { value: 'isTrue', label: '为真', labelKey: 'filterList.operator.isTrue' },
  isFalse: { value: 'isFalse', label: '为假', labelKey: 'filterList.operator.isFalse' },
} as const;
export type OperatorType = ValueOfConstWithType<typeof OPERATORS, 'value'>;

export const COMPONENT = {
  input: {
    value: 'input',
    label: '输入框',
    labelKey: 'filterList.component.input',
  },
  textarea: {
    value: 'textarea',
    label: '文本域',
    labelKey: 'filterList.component.textarea',
  },
  inputNumber: {
    value: 'inputNumber',
    label: '数字输入框',
    labelKey: 'filterList.component.inputNumber',
  },
  inputNumberRange: {
    value: 'inputNumberRange',
    label: '数字范围输入框',
    labelKey: 'filterList.component.inputNumberRange',
  },
  select: {
    value: 'select',
    label: '选择器',
    labelKey: 'filterList.component.select',
  },
  multipleSelect: {
    value: 'multipleSelect',
    label: '多选器',
    labelKey: 'filterList.component.multipleSelect',
  },
  datePicker: {
    value: 'datePicker',
    label: '日期选择器',
    labelKey: 'filterList.component.datePicker',
  },
  dateRangePicker: {
    value: 'dateRangePicker',
    label: '日期范围选择器',
    labelKey: 'filterList.component.dateRangePicker',
  },
  dateTimePicker: {
    value: 'dateTimePicker',
    label: '日期时间选择器',
    labelKey: 'filterList.component.dateTimePicker',
  },
  dateTimeRangePicker: {
    value: 'dateTimeRangePicker',
    label: '日期时间范围选择器',
    labelKey: 'filterList.component.dateTimeRangePicker',
  },
} as const;
export type ComponentType = ValueOfConstWithType<typeof COMPONENT, 'value'>;

export interface FilterFieldMapItem {
  value: ValueOfConstWithType<typeof OPERATORS, 'value'>;
  label: string;
  labelKey?: string;
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
  and: { value: 'and', label: '且', labelKey: 'filterList.relation.and' },
  or: { value: 'or', label: '或', labelKey: 'filterList.relation.or' },
} as const;
