import { Switch, SwitchProps } from 'antd';
import isNil from 'lodash/isNil';
import React, { FC } from 'react';

type SwitchValue = string | number | boolean;
const SwitchPro: FC<
  SwitchProps & {
    value?: SwitchValue;
    activeValue?: SwitchValue;
    inactiveValue?: SwitchValue;
    onChange?: (val: SwitchValue) => void;
  }
> = (props) => {
  const { activeValue, inactiveValue, onChange, value, ...restProps } = props;
  const _value = value === activeValue;
  // console.log('props, _value :>> ', props, _value);

  return (
    <Switch
      {...restProps}
      checked={_value}
      onChange={(val) => {
        if (!isNil(activeValue) && !isNil(inactiveValue)) {
          onChange?.(val ? activeValue : inactiveValue);
          return;
        }
        onChange?.(val);
      }}
    />
  );
};

export default SwitchPro;
