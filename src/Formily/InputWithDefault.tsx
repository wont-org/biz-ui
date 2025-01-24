import { Input, InputProps } from 'antd';
import React, { FC } from 'react';

const InputWithDefault: FC<InputProps> = (props) => {
  return <Input showCount allowClear {...props} />;
};

export default InputWithDefault;
