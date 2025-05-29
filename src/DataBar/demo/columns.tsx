import type { ColumnsType } from 'antd/es/table';
import React, { CSSProperties } from 'react';
import { styled } from 'styled-components';
import { DataSource } from './type';
import { getLinearGradientStyle } from './utils';

// 计算数据中的最大正值和最小负值
const calculateMaxValues = (data: DataSource[], key: keyof DataSource = 'value') => {
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
}: {
  value: number;
  max: number;
  min: number;
  isGradient?: boolean;
  positiveGradient?: string[];
  negativeGradient?: string[];
}): CSSProperties => {
  // 计算当前数值占比
  const ratio = Math.min(Math.abs(value) / Math.max(Math.abs(max), Math.abs(min)), 1);
  // 计算width，确保不超过100%
  const width = ratio * 100 + '%';
  // 只有正数情况
  if (min > 0) {
    const { background, border } = getLinearGradientStyle({
      colors: positiveGradient,
      direction: 'to right',
    });
    return {
      left: 0,
      width,
      background: isGradient ? background : 'red',
      border: isGradient ? border : 'none',
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
      background: isGradient ? background : 'green',
      border: isGradient ? border : 'none',
    };
  }
  // 正负混合情况
  if (value > 0) {
    const { background, border } = getLinearGradientStyle({
      colors: positiveGradient,
      direction: 'to right',
    });
    // 计算0点在整个范围中的位置百分比
    const zeroPosition = (Math.abs(min) / (Math.abs(min) + Math.abs(max))) * 100;
    // 正值宽度百分比 = 值在正值范围的占比 * 正值范围在总范围的占比 * 100%
    const valueWidth = (value / max) * (max / (Math.abs(min) + Math.abs(max))) * 100;
    return {
      left: zeroPosition + '%',
      width: valueWidth + '%',
      background: isGradient ? background : 'red',
      border: isGradient ? border : 'none',
    };
  }
  if (value < 0) {
    const { background, border } = getLinearGradientStyle({
      colors: negativeGradient,
      direction: 'to left',
    });
    // 计算0点在整个范围中的位置百分比
    const zeroPosition = (Math.abs(min) / (Math.abs(min) + Math.abs(max))) * 100;
    // 负值宽度百分比 = 值在负值范围的占比 * 负值范围在总范围的占比 * 100%
    const valueWidth =
      (Math.abs(value) / Math.abs(min)) * (Math.abs(min) / (Math.abs(min) + Math.abs(max))) * 100;
    return {
      right: 100 - zeroPosition + '%',
      width: valueWidth + '%',
      background: isGradient ? background : 'green',
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
  // max,
  // min,
  dataSource,
}: {
  max: number;
  min: number;
  dataSource: DataSource[];
}): ColumnsType<Record<string, any>> {
  return [
    {
      title: '序号',
      dataIndex: 'index',
      width: 100,
    },
    {
      title: '纯色数值',
      dataIndex: 'value',
      render(value) {
        const { max, min } = calculateMaxValues(dataSource);
        const style = getStyleByValue({ value, max, min, isGradient: false });
        return (
          <StyleCell>
            <StyleBar style={style} />
            <StyleNumber>{value}</StyleNumber>
          </StyleCell>
        );
      },
    },
    {
      title: '渐变色数值',
      dataIndex: 'value',
      render(value) {
        const { max, min } = calculateMaxValues(dataSource);
        const style = getStyleByValue({ value, max, min, isGradient: true });
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
