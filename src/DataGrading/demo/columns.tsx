import { VALUE_TYPE } from '@wont/biz-ui/ConditionColor/constant';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { styled } from 'styled-components';
import { DataSource, FormValues } from './type';
import { getColorByValue } from './utils';

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

const StyleCell = styled.div<{ $backgroundColor?: string }>`
  text-align: right;
  padding: 4px 8px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;
export function getColumns({
  // max,
  // min,
  dataSource,
  formValues,
  valueTypeMap,
}: {
  formValues: FormValues;
  max?: number;
  min?: number;
  dataSource: DataSource[];
  valueTypeMap: typeof VALUE_TYPE;
}): ColumnsType<Record<string, any>> {
  return [
    {
      title: '下标连续渐变',
      dataIndex: 'index',
      render(value) {
        const curVal = calculateValues(dataSource, 'index');
        const color = getColorByValue({
          value,
          min: curVal.min,
          max: curVal.max,
          steps: dataSource.length,
          formValues,
          valueTypeMap,
        });
        return <StyleCell $backgroundColor={color}>{value}</StyleCell>;
      },
    },
    {
      title: '随机渐变',
      dataIndex: 'mixedValue',
      render(value) {
        const curVal = calculateValues(dataSource, 'mixedValue');
        const color = getColorByValue({
          value,
          min: curVal.min,
          max: curVal.max,
          steps: dataSource.length,
          formValues,
          valueTypeMap,
        });
        return <StyleCell $backgroundColor={color}>{value}</StyleCell>;
      },
    },
  ];
}
