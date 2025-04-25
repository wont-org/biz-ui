import { InputNumberProps } from 'antd';

export const INPUT_NUMBER_PROPS: InputNumberProps = {
  // min: (-2) ** 31 + 1,
  // max: 2 ** 31 - 1,
  formatter: (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return '';
  },
  parser: (displayValue) => {
    if (displayValue) {
      return displayValue.replace(/(,*)/g, '');
    }
    return '';
  },
};
