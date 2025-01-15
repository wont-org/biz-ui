import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { isEqual } from 'lodash';
import React, { FC, useEffect } from 'react';
import { StyleContainer, StyleInputNumber } from './style';

type Ranges = { min: number; max: number }[];
export interface NumberRangeProps {
  value?: Ranges;
  max?: number;
  min?: number;
  rangeNum?: number;
  step?: number;
  showAddButton?: boolean;
  showDelButton?: boolean;
  onChange?: (value: Ranges) => void;
}
export const validate = ({
  ranges,
  min,
  max,
}: {
  ranges: Ranges;
  min: number;
  max: number;
}): { message?: string; isValid: boolean } => {
  for (let i = 0; i < ranges.length; i++) {
    const { min: start, max: end } = ranges[i];
    if (i === 0 && start < min) {
      return {
        message: '第一个区间的起始值不能小于最小值',
        isValid: false,
      };
    }
    if (i === ranges.length - 1 && end > max) {
      return {
        message: '最后一个区间的结束值不能大于最大值',
        isValid: false,
      };
    }
    if (end <= start) {
      return {
        message: '起始值不能大于结束值',
        isValid: false,
      };
    }
    if (i > 0 && start !== ranges[i - 1].max) {
      return {
        message: '区间不连续',
        isValid: false,
      };
    }
  }
  return {
    isValid: true,
  };
};
export const getDefaultRangesByRangeNum = (
  params: Required<Pick<NumberRangeProps, 'max' | 'min' | 'rangeNum'>>,
): Ranges => {
  const { max: _max, min: _min, rangeNum: _rangeNum } = params;
  const step = Math.floor((_max - _min) / _rangeNum);
  const defaultRanges: Ranges = Array.from({ length: _rangeNum }, (_, i) => ({
    min: _min + i * step,
    max: _min + (i + 1) * step,
  }));
  return defaultRanges;
};
export const getDefaultRangesByStep = (
  params: Required<Pick<NumberRangeProps, 'max' | 'min' | 'step'>>,
): Ranges => {
  const { max: _max, min: _min, step } = params;
  const defaultRanges: Ranges = [];
  for (let currentMin = _min; currentMin < _max; currentMin += step) {
    defaultRanges.push({ min: currentMin, max: Math.min(currentMin + step, _max) });
  }
  return defaultRanges;
};

const NumberRange: FC<NumberRangeProps> = (props) => {
  const { value = [], max, min, rangeNum, step, showAddButton, showDelButton, onChange } = props;

  useEffect(() => {
    if (typeof max === 'number' && typeof min === 'number' && max > min) {
      if (typeof rangeNum === 'number' && rangeNum > 0) {
        const defaultRanges = getDefaultRangesByRangeNum({ max, min, rangeNum });
        if (isEqual(value, defaultRanges)) {
          return;
        }
        onChange?.(defaultRanges);
        return;
      }
      if (typeof step === 'number' && step > 0) {
        const defaultRanges = getDefaultRangesByStep({ max, min, step });
        if (isEqual(value, defaultRanges)) {
          return;
        }
        onChange?.(defaultRanges);
        return;
      }
    }
  }, [value, max, min, rangeNum, step, onChange]);

  const handleInputChange = (index: number, type: 'min' | 'max', newValue: number) => {
    const updatedRanges = [...value];
    updatedRanges[index][type] = newValue;
    onChange?.(updatedRanges);
  };

  const addRange = () => {
    onChange?.([...value, { min: 0, max: 0 }]);
  };

  const deleteRange = (index: number) => {
    const updatedRanges = value.filter((_, i) => i !== index);
    onChange?.(updatedRanges);
  };

  return (
    <StyleContainer>
      {value.map(({ min: _min, max: _max }, index) => (
        <div className="number-range-item-wrap" key={index}>
          <StyleInputNumber
            value={_min}
            onChange={(val) => handleInputChange(index, 'min', val || 0)}
          />
          <span className="split">-</span>
          <StyleInputNumber
            value={_max}
            onChange={(val) => handleInputChange(index, 'max', val || 0)}
          />

          {showDelButton && (
            <Button type="link" danger onClick={() => deleteRange(index)}>
              删除
            </Button>
          )}
        </div>
      ))}
      {showAddButton && (
        <Button block icon={<PlusOutlined />} onClick={addRange}>
          添加区间
        </Button>
      )}
    </StyleContainer>
  );
};

export default NumberRange;
