import { InputNumber, InputNumberProps } from 'antd';
import React, { CSSProperties } from 'react';
import { styled } from 'styled-components';
import { useLocale } from '../BizProvider';
import { INPUT_NUMBER_PROPS } from '../constant/antd';

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export interface InputNumberRangeProps {
  value?: [number | undefined | null, number | undefined | null];
  onChange?: (value: InputNumberRangeProps['value']) => void;
  disabled?: boolean;
  style?: CSSProperties;
  placeholder?: [string, string];
  inputNumberProps?: InputNumberProps;
}

type ValueType = string | number;

const InputNumberRange: React.FC<InputNumberRangeProps> = ({
  value = [undefined, undefined],
  onChange,
  style = {},
  placeholder,
  inputNumberProps = INPUT_NUMBER_PROPS,
  disabled = false,
}) => {
  const { t } = useLocale();
  const { min, max, ...restInputNumberProps } = inputNumberProps;
  const [start, end] = value;

  // 使用国际化文本作为默认 placeholder
  const defaultPlaceholder: [string, string] = [
    t('common.form.minValue'),
    t('common.form.maxValue'),
  ];
  const finalPlaceholder = placeholder || defaultPlaceholder;

  const handleStartChange = (newStart: ValueType | null) => {
    if (newStart === null) {
      return;
    }
    const numValue = typeof newStart === 'string' ? parseFloat(newStart) : newStart;
    onChange?.([numValue, end]);
  };

  const handleEndChange = (newEnd: ValueType | null) => {
    if (newEnd === null) {
      return;
    }
    const numValue = typeof newEnd === 'string' ? parseFloat(newEnd) : newEnd;
    onChange?.([start, numValue]);
  };

  return (
    <RangeContainer style={style}>
      <InputNumber
        placeholder={finalPlaceholder[0] || t('common.form.input')}
        {...INPUT_NUMBER_PROPS}
        {...restInputNumberProps}
        style={{
          width: '100%',
        }}
        min={min}
        max={end !== undefined && end !== null ? end : max}
        value={start}
        onChange={handleStartChange}
        disabled={disabled}
      />
      <span style={{ margin: '0 8px' }}>{' ~ '}</span>
      <InputNumber
        placeholder={finalPlaceholder[1] || t('common.form.input')}
        {...INPUT_NUMBER_PROPS}
        {...restInputNumberProps}
        style={{
          width: '100%',
        }}
        value={end}
        onChange={handleEndChange}
        min={start !== undefined && start !== null ? start : min}
        max={max}
        disabled={disabled}
      />
    </RangeContainer>
  );
};

export default InputNumberRange;
