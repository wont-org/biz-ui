import { Input, InputProps } from 'antd';
import React, { FC } from 'react';

const InputWithDefault: FC<InputProps> = (props) => {
  return <Input placeholder="请输入" maxLength={50} showCount allowClear {...props} />;
};

export default InputWithDefault;
