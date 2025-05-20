import chroma from 'chroma-js';

export const getColorGrading = ({
  scale,
  domain = [0, 0.5, 1],
  steps = 10,
}: {
  scale: string[];
  domain?: number[];
  steps?: number;
}) => {
  return chroma
    .scale(scale)
    .domain(domain) // 定义颜色位置比例
    .mode('lab')
    .colors(steps);
};
