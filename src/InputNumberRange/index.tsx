import { InputNumber, InputNumberProps } from 'antd';
import React, { CSSProperties } from 'react';
import { styled } from 'styled-components';
import { INPUT_NUMBER_PROPS } from '../utils/antd';

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
  placeholder = ['最小值', '最大值'],
  inputNumberProps = INPUT_NUMBER_PROPS,
  disabled = false,
}) => {
  const { min, max, ...restInputNumberProps } = inputNumberProps;
  const [start, end] = value;

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
        placeholder={placeholder[0] || '请输入'}
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
      <span style={{ margin: '0 8px' }}>至</span>
      <InputNumber
        placeholder={placeholder[1] || '请输入'}
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
