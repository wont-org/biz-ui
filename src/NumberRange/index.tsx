import { PlusOutlined } from '@ant-design/icons';
import { useVirtualList } from 'ahooks';
import { Button, InputNumberProps } from 'antd';
import { produce } from 'immer';
import { isEmpty, isEqual } from 'lodash';
import React, { CSSProperties, FC, useEffect, useMemo, useRef } from 'react';
import { StyleContainer, StyleInputNumber } from './style';

type Ranges = { min: number; max: number }[];
export interface NumberRangeProps {
  /**
   * @description 区间值
   * @default []
   */
  value?: Ranges;
  max?: number;
  min?: number;
  /**
   * @description 长度>5默认开启虚拟滚动，每条元素高度
   * @default 40
   */
  itemHeight?: number;
  rangeNum?: number;
  /**
   * @description 最大区间数量
   * @default 1000
   */
  rangeLimit?: number;
  step?: number;
  showAddButton?: boolean;
  showDelButton?: boolean;
  onChange?: (value: Ranges) => void;
  /**
   * @description 容器样式，配合虚拟滚动设置高度
   * @default {}
   */
  style?: CSSProperties;
  /**
   * @description inputNumberProps
   * @default {}
   */
  inputNumberProps?: InputNumberProps<number>;
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
        message: `第一个区间的起始值不能小于${min}`,
        isValid: false,
      };
    }
    if (i === ranges.length - 1 && end > max) {
      return {
        message: `最后一个区间的结束值不能大于${max}`,
        isValid: false,
      };
    }
    if (end < start) {
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
  params: Required<Pick<NumberRangeProps, 'max' | 'min' | 'rangeNum' | 'rangeLimit'>>,
): Ranges => {
  const { max, min, rangeNum: _rangeNum, rangeLimit } = params;
  if (max === min) {
    return [{ max, min }];
  }
  if (max < min) {
    return [];
  }
  const rangeSize = max - min;
  const _rangLimit = Math.min(rangeLimit, _rangeNum);
  const adjustedRangeNum = Math.min(_rangLimit, rangeSize);
  const step = adjustedRangeNum > 0 ? Math.floor(rangeSize / adjustedRangeNum) : 0;
  const defaultRanges: Ranges = Array.from({ length: adjustedRangeNum }, (_, i) => ({
    min: min + i * step,
    max: min + (i + 1) * step,
  }));
  return defaultRanges;
};
export const getDefaultRangesByStep = (
  params: Required<Pick<NumberRangeProps, 'max' | 'min' | 'step' | 'rangeLimit'>>,
): Ranges => {
  const { max, min, step, rangeLimit } = params;
  if (max === min) {
    return [{ max, min }];
  }
  if (max < min) {
    return [];
  }
  const defaultRanges: Ranges = [];
  let rangeNum = 1;
  for (let currentMin = min; currentMin < max; currentMin += step) {
    if (rangeNum > rangeLimit) {
      break;
    }
    rangeNum += 1;
    defaultRanges.push({
      min: currentMin,
      max: Math.min(currentMin + step, max),
    });
  }
  return defaultRanges;
};

const NumberRange: FC<NumberRangeProps> = (props) => {
  const {
    value = [],
    max,
    min,
    rangeNum,
    rangeLimit = 1000,
    itemHeight = 40,
    step,
    showAddButton,
    showDelButton,
    onChange,
    style = {},
    inputNumberProps = {
      precision: 0,
      formatter: (val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (val) => parseFloat(val?.replace(/(,*)/g, '') || '0'),
    },
  } = props;

  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const _value = useMemo(
    () =>
      value.map((item, index) => ({
        ...item,
        index,
      })),
    [value],
  );
  const [list, scrollTo] = useVirtualList(_value, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight,
    overscan: 6,
  });

  const preConfigRef = useRef({ rangeNum, step });
  useEffect(() => {
    // console.log('props :>> ', props);
    const rangeNumChanged = preConfigRef.current.rangeNum !== rangeNum;
    const stepChanged = preConfigRef.current.step !== step;
    // console.log(
    //   'rangeNumChanged stepChanged:>> ',
    //   rangeNumChanged,
    //   stepChanged,
    // );
    if (rangeNumChanged || stepChanged) {
      preConfigRef.current = {
        step,
        rangeNum,
      };
    }
    if (typeof max === 'number' && typeof min === 'number') {
      if (typeof rangeNum === 'number' && rangeNum > 0) {
        const defaultRanges = getDefaultRangesByRangeNum({
          max,
          min,
          rangeNum,
          rangeLimit,
        });
        if (isEqual(value, defaultRanges)) {
          return;
        }
        if (!rangeNumChanged && !isEmpty(value)) {
          return;
        }
        onChange?.(defaultRanges);
        scrollTo(1);
        return;
      }
      if (typeof step === 'number' && step > 0) {
        const defaultRanges = getDefaultRangesByStep({
          max,
          min,
          step,
          rangeLimit,
        });
        if (isEqual(value, defaultRanges)) {
          return;
        }
        if (!stepChanged && !isEmpty(value)) {
          return;
        }
        onChange?.(defaultRanges);
        scrollTo(1);
        return;
      }
    }
  }, [value, max, min, rangeNum, step, onChange, scrollTo, rangeLimit]);

  const handleInputChange = (index: number, type: 'min' | 'max', newValue: number) => {
    const updatedRanges = produce([...value], (draft) => {
      draft[index][type] = newValue;
    });
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
    <>
      <StyleContainer
        ref={containerRef}
        style={{
          height: value.length > 5 ? 200 : undefined,
          ...style,
        }}
      >
        <div
          style={{
            minHeight: itemHeight,
          }}
          ref={wrapperRef}
        >
          {list.map(({ data: { min: _min, max: _max, index } }) => (
            <div className="number-range-item-wrap" key={index}>
              <StyleInputNumber
                {...inputNumberProps}
                value={_min}
                onChange={(val) => handleInputChange(index, 'min', val || 0)}
              />
              <span className="split">-</span>
              <StyleInputNumber
                {...inputNumberProps}
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
        </div>
      </StyleContainer>
      {showAddButton && (
        <Button block icon={<PlusOutlined />} onClick={addRange}>
          添加区间
        </Button>
      )}
    </>
  );
};

export default NumberRange;
