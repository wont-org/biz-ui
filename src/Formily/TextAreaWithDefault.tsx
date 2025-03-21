import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React, { FC } from 'react';

const TextAreaWithDefault: FC<TextAreaProps> = (props) => {
  return (
    <Input.TextArea
      autoSize={{
        minRows: 4,
      }}
      maxLength={200}
      placeholder="请输入"
      showCount
      allowClear
      {...props}
    />
  );
};
export default TextAreaWithDefault;
