import { ConditionColorValueItem } from '@wont/biz-ui/ConditionColor';
import type { ColumnsType } from 'antd/es/table';
import React, { CSSProperties } from 'react';
import { styled } from 'styled-components';
import { FILL_TYPE_OPTIONS } from './constant';
import { DataSource, FormValues } from './type';
import { getLinearGradientStyle } from './utils';

// 计算数据中的最大正值和最小负值
const calculateValues = (data: DataSource[], key: keyof DataSource = 'mixedValue') => {
  let max = 0;
  let min = 0;

  data.forEach((item) => {
    if (item[key] > 0 && item[key] > max) {
      max = item[key];
    } else if (item[key] < 0 && item[key] < min) {
      min = item[key];
    }
  });

  return { max, min };
};
const getStyleByValue = ({
  value,
  max,
  min,
  isGradient = false,
  // 正数渐变色
  positiveGradient = ['red', '#fff'],
  // 负数渐变色
  negativeGradient = ['green', '#fff'],
  minValueType,
}: // maxValueType,
{
  value: number;
  max: number;
  min: number;
  isGradient?: boolean;
  positiveGradient?: string[];
  negativeGradient?: string[];
  minValueType?: ConditionColorValueItem['valueType'];
  maxValueType?: ConditionColorValueItem['valueType'];
}): CSSProperties => {
  if (typeof value !== 'number' || isNaN(value)) {
    return {};
  }
  if (value < min || value > max) {
    return {};
  }
  const absValue = Math.abs(value);
  const absMin = Math.abs(min);
  const absMax = Math.abs(max);
  const diffMin = minValueType === 'auto' ? 0 : Math.min(absMin, absMax);
  const _max = Math.max(absMax, absMin);
  // 计算当前数值占比，确保不超过100%，都是正数或负数情况有效
  const ratio = Math.min((absValue - diffMin) / (_max - diffMin), 1);
  const width = ratio * 100 + '%';
  const positivePureColor = positiveGradient[0];
  const negativePureColor = negativeGradient[0];
  // 只有正数情况
  if (min > 0) {
    const { background, border } = getLinearGradientStyle({
      colors: positiveGradient,
      direction: 'to right',
    });
    return {
      left: 0,
      width,
      background: isGradient ? background : positivePureColor,
      border: isGradient && ratio > 0 ? border : 'none',
    };
  }
  // 只有负数情况
  if (max < 0) {
    const { background, border } = getLinearGradientStyle({
      colors: negativeGradient,
      direction: 'to left',
    });
    return {
      right: 0,
      width,
      background: isGradient ? background : negativePureColor,
      border: isGradient && ratio > 0 ? border : 'none',
    };
  }
  // 正负混合情况
  // 计算0点在整个范围中的位置百分比
  const zeroPosition = (absMin / (absMin + absMax)) * 100;
  if (value > 0) {
    const { background, border } = getLinearGradientStyle({
      colors: positiveGradient,
      direction: 'to right',
    });
    // 正值宽度百分比 = 值在正值范围的占比 * 正值范围在总范围的占比 * 100%
    const valueWidth = (value / max) * (max / (absMin + absMax)) * 100;
    return {
      left: zeroPosition + '%',
      width: valueWidth + '%',
      background: isGradient ? background : positivePureColor,
      border: isGradient ? border : 'none',
    };
  }
  if (value < 0) {
    const { background, border } = getLinearGradientStyle({
      colors: negativeGradient,
      direction: 'to left',
    });
    // 负值宽度百分比 = 值在负值范围的占比 * 负值范围在总范围的占比 * 100%
    const valueWidth = (absValue / absMin) * (absMin / (absMin + absMax)) * 100;
    return {
      right: 100 - zeroPosition + '%',
      width: valueWidth + '%',
      background: isGradient ? background : negativePureColor,
      border: isGradient ? border : 'none',
    };
  }
  return {};
};
const StyleCell = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 6px;
  display: flex;
  align-items: center;
`;
const StyleBar = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const StyleNumber = styled.div`
  width: 100%;
  text-align: right;
  z-index: 2;
`;
export function getColumns({
  max,
  min,
  positiveGradient = ['red', '#fff'],
  negativeGradient = ['green', '#fff'],
  dataSource,
  formValues,
}: {
  formValues: FormValues;
  positiveGradient?: string[];
  negativeGradient?: string[];
  max?: number;
  min?: number;
  dataSource: DataSource[];
}): ColumnsType<Record<string, any>> {
  const styleByValueParams: Partial<Parameters<typeof getStyleByValue>[0]> = {
    positiveGradient,
    negativeGradient,
    minValueType: formValues.conditions?.[0]?.valueType,
    maxValueType: formValues.conditions?.[1]?.valueType,
  };
  return [
    {
      title: '-10~10写死',
      dataIndex: 'index',
      width: 100,
      render(value) {
        // const curVal = calculateValues(dataSource, 'index');
        const style = getStyleByValue({
          ...styleByValueParams,
          value,
          min: -10,
          max: 10,
          isGradient: formValues.fillType === FILL_TYPE_OPTIONS.gradient.value,
        });
        return (
          <StyleCell>
            <StyleBar style={style} />
            <StyleNumber>{value}</StyleNumber>
          </StyleCell>
        );
      },
    },
    {
      title: '正负混合-根据配置',
      dataIndex: 'mixedValue',
      render(value) {
        const curVal = calculateValues(dataSource, 'mixedValue');
        const style = getStyleByValue({
          ...styleByValueParams,
          value,
          max: max ?? curVal.max,
          min: min ?? curVal.min,
          isGradient: formValues.fillType === FILL_TYPE_OPTIONS.gradient.value,
        });
        return (
          <StyleCell>
            <StyleBar style={style} />
            <StyleNumber>{value}</StyleNumber>
          </StyleCell>
        );
      },
    },

    {
      title: '-1~-10-写死-纯色',
      dataIndex: 'negativeValue',
      render(value) {
        // const curVal = calculateValues(dataSource, 'negativeValue');
        const style = getStyleByValue({
          ...styleByValueParams,
          value,
          max: -1,
          min: -10,
          isGradient: false,
        });
        return (
          <StyleCell>
            <StyleBar style={style} />
            <StyleNumber>{value}</StyleNumber>
          </StyleCell>
        );
      },
    },
    {
      title: `${min}~${max}正数渐变（根据配置）`,
      dataIndex: 'positiveValue',
      render(value) {
        const curVal = calculateValues(dataSource, 'positiveValue');
        const style = getStyleByValue({
          ...styleByValueParams,
          value,
          max: max ?? curVal.max,
          min: min ?? curVal.min,
          isGradient: true,
        });
        return (
          <StyleCell>
            <StyleBar style={style} />
            <StyleNumber>{value}</StyleNumber>
          </StyleCell>
        );
      },
    },
  ];
}
