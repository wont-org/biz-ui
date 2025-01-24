import { Select } from '@formily/antd';
import { SelectProps } from 'antd';
import React, { FC } from 'react';

interface OptionType {
  value: string | number;
  label: string | number;
}

const SelectWithDefault: FC<SelectProps<OptionType>> = (props) => {
  return (
    <Select
      showSearch
      allowClear
      filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
      {...props}
    />
  );
};

export default SelectWithDefault;
