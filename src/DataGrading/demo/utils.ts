import { VALUE_TYPE } from '@wont/biz-ui/ConditionColor/constant';
import chroma from 'chroma-js';
import { CSSProperties } from 'react';
import { FormValues } from './type';

export const getColorGrading = ({
  scale,
  domain = [0, 0.5, 1],
  steps = 10,
}: {
  scale: string[];
  domain?: number[];
  steps?: number;
}) => {
  return chroma.scale(scale).domain(domain).mode('lab').colors(steps);
};
export const getColorByValue = (params: {
  value: number;
  min: number;
  max: number;
  formValues: FormValues;
  steps: number;
  valueTypeMap: typeof VALUE_TYPE;
}) => {
  const { value, min, max, steps, formValues, valueTypeMap } = params;
  const { conditions = [] } = formValues;
  // 将任意值，标准化到0-1之间
  const normalizedValue = (value - min) / (max - min);
  const { value: curValue = 0, valueType } = conditions[1];
  const midPoint =
    valueType === valueTypeMap.number.value ? (curValue - min) / (max - min) : curValue / 100;
  const colorList =
    conditions?.reduce<string[]>((acc, cur) => {
      if (cur.valueType === valueTypeMap.none.value) {
        return acc;
      }
      if (cur.color) {
        acc.push(cur.color);
      }
      return acc;
    }, []) || [];

  // 根据类型选择不同的色阶
  const colors = getColorGrading({
    scale: colorList,
    domain: colorList.length === 2 ? [0, 1] : [0, midPoint, 1],
    steps,
  });
  /**
   * normalizedValue * (steps - 1) 将[0, 1]映射到[0, steps - 1]
   * Math.floor 确保整数索引
   * Math.min 确保索引在有效范围内
   */
  const colorIndex = Math.min(Math.floor(normalizedValue * (steps - 1)), steps - 1);
  console.log('colorList :>> ', colorList, midPoint, colors, colorIndex, params);
  return colors[colorIndex];
};

/**
 * 生成CSS线性渐变字符串
 * @param options 配置项
 * @returns CSS线性渐变字符串
 */
export const getLinearGradientStyle = ({
  colors,
  direction = 'to right',
  positions = [0, 1],
}: {
  colors: string[];
  direction?: 'to right' | 'to left';
  positions?: number[];
}): CSSProperties => {
  if (!colors || colors.length < 2) {
    throw new Error('至少需要两种颜色才能创建渐变');
  }

  const colorStops = positions
    ? colors.map((color, index) => `${color} ${positions[index] * 100}%`)
    : colors;

  return {
    background: `linear-gradient(${direction}, ${colorStops.join(', ')})`,
    border: `1px solid ${colors[0]}`,
  };
};
