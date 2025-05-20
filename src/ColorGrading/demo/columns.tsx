import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { styled } from 'styled-components';
import { getColorGrading } from './utils';

// 根据数值计算颜色
const getColorByValue = ({
  value,
  min,
  max,
  colorType,
  steps,
}: {
  value: number;
  min: number;
  max: number;
  colorType: 'greenWhiteRed' | 'greenWhite';
  steps: number;
}) => {
  // 将值标准化到0-1之间
  const normalizedValue = (value - min) / (max - min);

  // 根据类型选择不同的色阶
  const colors =
    colorType === 'greenWhiteRed'
      ? getColorGrading({
          scale: ['green', '#ffffff', 'red'],
          domain: [0, 0.5, 1],
          steps,
        })
      : getColorGrading({
          scale: ['green', '#ffffff'],
          domain: [0, 1],
          steps,
        });

  // 根据标准化的值选择对应的颜色
  const colorIndex = Math.min(Math.floor(normalizedValue * (steps - 1)), steps - 1);
  return colors[colorIndex];
};

interface GetColumnsParams {
  min?: number;
  max?: number;
  steps?: number;
}

const StyleCell = styled.div`
  padding: 8px 12px;
`;
export function getColumns({ min = 1, max = 100, steps = 100 }: GetColumnsParams = {}): ColumnsType<
  Record<string, any>
> {
  return [
    {
      title: '序号',
      dataIndex: 'index',
      render(value, record, index) {
        const backgroundColor = getColorByValue({
          value: index + 1,
          min,
          max,
          colorType: 'greenWhiteRed',
          steps,
        });
        return (
          <StyleCell
            style={{
              backgroundColor,
            }}
          >
            {index + 1}
          </StyleCell>
        );
      },
    },
    {
      title: '绿白红',
      dataIndex: 'greenWhiteRed',
      render(value) {
        // 获取背景色
        const backgroundColor = getColorByValue({
          value,
          min,
          max,
          colorType: 'greenWhiteRed',
          steps,
        });

        return (
          <StyleCell
            style={{
              backgroundColor,
              color: value > (min + max) / 2 ? '#fff' : '#000', // 深色背景用白色文字，浅色背景用黑色文字
            }}
          >
            {value}
          </StyleCell>
        );
      },
    },
    {
      title: '绿白',
      dataIndex: 'greenWhite',
      render(value) {
        // 获取背景色
        const backgroundColor = getColorByValue({
          value,
          min,
          max,
          colorType: 'greenWhite',
          steps,
        });

        return (
          <StyleCell
            style={{
              backgroundColor,
            }}
          >
            {value}
          </StyleCell>
        );
      },
    },
  ];
}
