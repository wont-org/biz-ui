import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { INPUT_NUMBER_PROPS } from '../utils/antd';

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export interface InputNumberRangeProps {
  value?: [number | undefined, number | undefined];
  onChange?: (value: [number | undefined, number | undefined]) => void;
  disabled?: boolean;
  inputNumberProps?: InputNumberProps;
}

type ValueType = string | number;

const InputNumberRange: React.FC<InputNumberRangeProps> = ({
  value = [undefined, undefined],
  onChange,
  inputNumberProps = INPUT_NUMBER_PROPS,
  disabled = false,
}) => {
  const {
    min,
    max,
    style = {
      width: 100,
    },
    ...restInputNumberProps
  } = inputNumberProps;
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
    <RangeContainer>
      <InputNumber
        placeholder="请输入"
        {...INPUT_NUMBER_PROPS}
        {...restInputNumberProps}
        style={style}
        min={min}
        max={end !== undefined ? end : max}
        value={start}
        onChange={handleStartChange}
        disabled={disabled}
      />
      <span style={{ margin: '0 8px' }}>至</span>
      <InputNumber
        placeholder="请输入"
        {...restInputNumberProps}
        style={style}
        value={end}
        onChange={handleEndChange}
        min={start !== undefined ? start : min}
        max={max}
        disabled={disabled}
      />
    </RangeContainer>
  );
};

export { InputNumberRange };
export default InputNumberRange;
