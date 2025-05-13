import chroma from 'chroma-js';

export const generateColorScale = (
  min: string,
  mid: string,
  max: string,
  midPosition = 0.2,
  steps = 10,
) => {
  return chroma
    .scale([min, mid, max])
    .domain([0, midPosition, 1]) // 定义颜色位置比例
    .mode('lab')
    .colors(steps);
};

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
