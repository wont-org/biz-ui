export const getFixedData = ({ min = -20, max = 20 }: { min?: number; max?: number }) => {
  const data = [];
  for (let index = min; index <= max; index++) {
    if (index === 0) {
      continue;
    }
    data.push({
      index: -index,
      mixedValue: index,
      positiveValue: index > 0 ? index : undefined,
      negativeValue: index < 0 ? index : undefined,
    });
  }
  return {
    mixedData: data,
    positiveData: data.filter((item) => item.positiveValue),
    negativeData: data.filter((item) => item.negativeValue),
  };
};
