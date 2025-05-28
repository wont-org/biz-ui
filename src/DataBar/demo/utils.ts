import { CSSProperties } from 'react';

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
