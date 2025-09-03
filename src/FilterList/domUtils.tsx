import { DatePicker, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import React, { CSSProperties } from 'react';
import { LocaleContextType } from '../BizProvider/types';
import InputNumberRange from '../InputNumberRange';
import MultipleSelect from '../MultipleSelect';
import { COMPONENT, ComponentType } from './constant';
import { ConditionArrayValue } from './type';

export const renderValueComponent = ({
  component,
  props,
  t,
}: {
  component: ComponentType | undefined;
  props: Record<string, unknown>;
  t: LocaleContextType['t'];
}) => {
  if (!component) {
    return null;
  }

  const { value, onChange, style = {}, ...restProps } = props;

  const styleProps: CSSProperties = {
    ...(style as CSSProperties),
    width: '100%',
  };
  const defaultInputPlaceholder = t('common.form.input');
  const defaultSelectPlaceholder = t('common.form.select');
  const defaultInputRangePlaceholder = [t('common.form.min'), t('common.form.max')];

  switch (component) {
    case COMPONENT.input.value:
      return (
        <Input
          style={styleProps}
          placeholder={defaultInputPlaceholder}
          allowClear
          {...(restProps as any)}
          value={Array.isArray(value) && value.length > 0 ? (value[0] as string) : ''}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange([e.target.value]);
            }
          }}
        />
      );
    case COMPONENT.textarea.value:
      return (
        <Input.TextArea
          style={styleProps}
          placeholder={defaultInputPlaceholder}
          allowClear
          {...(restProps as any)}
          value={Array.isArray(value) && value.length > 0 ? (value[0] as string) : ''}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange([e.target.value]);
            }
          }}
        />
      );
    case COMPONENT.inputNumber.value:
      return (
        <InputNumber
          style={styleProps}
          placeholder={defaultInputPlaceholder}
          {...restProps}
          value={Array.isArray(value) && value.length > 0 ? (value[0] as number) : undefined}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange([val]);
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
          placeholder={(placeholder as [string, string]) || defaultInputRangePlaceholder}
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
          placeholder={defaultSelectPlaceholder}
          style={styleProps}
          {...(restProps as any)}
          value={Array.isArray(value) && value.length > 0 ? (value[0] as string) : undefined}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange([val]);
            }
          }}
        />
      );
    case COMPONENT.multipleSelect.value:
      return (
        <MultipleSelect
          style={styleProps}
          placeholder={defaultSelectPlaceholder}
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
          placeholder={t('common.form.date')}
          {...(restProps as any)}
          value={
            Array.isArray(value) && value.length > 0 && value[0] ? moment(value[0] as string) : null
          }
          onChange={(date, dateString) => {
            if (typeof onChange === 'function') {
              onChange([dateString || undefined]);
            }
          }}
        />
      );
    case COMPONENT.dateRangePicker.value:
      return (
        <DatePicker.RangePicker
          style={styleProps}
          placeholder={[t('common.form.startDate'), t('common.form.endDate')]}
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
          placeholder={t('common.form.dateTime')}
          {...(restProps as any)}
          value={
            Array.isArray(value) && value.length > 0 && value[0] ? moment(value[0] as string) : null
          }
          onChange={(date, dateString) => {
            if (typeof onChange === 'function') {
              onChange([dateString || undefined]);
            }
          }}
        />
      );
    case COMPONENT.dateTimeRangePicker.value:
      return (
        <DatePicker.RangePicker
          showTime
          style={styleProps}
          placeholder={[t('common.form.startDateTime'), t('common.form.endDateTime')]}
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
