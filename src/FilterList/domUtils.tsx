import { DatePicker, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import React, { CSSProperties } from 'react';
import InputNumberRange from '../InputNumberRange';
import MultipleSelect from '../MultipleSelect';
import { COMPONENT, ComponentType } from './constant';
import { ConditionArrayValue } from './type';

export const renderValueComponent = (
  component: ComponentType | undefined,
  props: Record<string, unknown>,
) => {
  if (!component) {
    return null;
  }

  const { value, onChange, style = {}, ...restProps } = props;

  const styleProps: CSSProperties = {
    ...(style as CSSProperties),
    width: '100%',
  };

  switch (component) {
    case COMPONENT.input.value:
      return (
        <Input
          style={styleProps}
          placeholder="请输入"
          allowClear
          {...(restProps as any)}
          value={value as string}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(e.target.value);
            }
          }}
        />
      );
    case COMPONENT.textarea.value:
      return (
        <Input.TextArea
          style={styleProps}
          placeholder="请输入"
          allowClear
          {...(restProps as any)}
          value={value as string}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(e.target.value);
            }
          }}
        />
      );
    case COMPONENT.inputNumber.value:
      return (
        <InputNumber
          style={styleProps}
          {...restProps}
          value={value as number}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    case COMPONENT.inputNumberRange.value: {
      const { placeholder, ...restInputNumberRangeProps } = restProps;
      return (
        <InputNumberRange
          style={{
            ...styleProps,
            width: 360,
          }}
          placeholder={placeholder as [string, string]}
          inputNumberProps={{
            ...restInputNumberRangeProps,
          }}
          value={value as ConditionArrayValue}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    }
    case COMPONENT.select.value:
      return (
        <Select
          placeholder="请选择"
          style={styleProps}
          {...(restProps as any)}
          value={value as string}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    case COMPONENT.multipleSelect.value:
      return (
        <MultipleSelect
          style={styleProps}
          {...restProps}
          value={value}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    case COMPONENT.datePicker.value:
      return (
        <DatePicker
          style={styleProps}
          placeholder="请选择日期"
          {...(restProps as any)}
          value={value ? moment(value as string) : null}
          onChange={(date, dateString) => {
            if (typeof onChange === 'function') {
              onChange(dateString || undefined);
            }
          }}
        />
      );
    case COMPONENT.dateRangePicker.value:
      return (
        <DatePicker.RangePicker
          style={styleProps}
          placeholder={['开始日期', '结束日期']}
          {...(restProps as any)}
          value={
            Array.isArray(value) && value.length === 2
              ? [value[0] ? moment(value[0]) : null, value[1] ? moment(value[1]) : null]
              : [null, null]
          }
          onChange={(dates, formatString) => {
            if (typeof onChange === 'function') {
              onChange(formatString.some((item) => !item) ? [] : formatString);
            }
          }}
        />
      );
    case COMPONENT.dateTimePicker.value:
      return (
        <DatePicker
          showTime
          style={styleProps}
          placeholder="请选择日期时间"
          {...(restProps as any)}
          value={value ? moment(value as string) : null}
          onChange={(date, dateString) => {
            if (typeof onChange === 'function') {
              onChange(dateString || undefined);
            }
          }}
        />
      );
    case COMPONENT.dateTimeRangePicker.value:
      return (
        <DatePicker.RangePicker
          showTime
          style={styleProps}
          placeholder={['开始日期时间', '结束日期时间']}
          {...(restProps as any)}
          value={
            Array.isArray(value) && value.length === 2
              ? [value[0] ? moment(value[0]) : null, value[1] ? moment(value[1]) : null]
              : [null, null]
          }
          onChange={(dates, formatString) => {
            if (typeof onChange === 'function') {
              onChange(formatString.some((item) => !item) ? [] : formatString);
            }
          }}
        />
      );
    default:
      return null;
  }
};
