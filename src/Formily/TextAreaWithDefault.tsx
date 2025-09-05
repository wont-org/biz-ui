import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React, { FC } from 'react';
import { useLocale } from '../BizProvider';

const TextAreaWithDefault: FC<TextAreaProps> = (props) => {
  const { t } = useLocale();

  return (
    <Input.TextArea
      autoSize={{
        minRows: 4,
      }}
      maxLength={200}
      placeholder={t('common.form.input')}
      showCount
      allowClear
      style={{
        marginBottom: 8,
      }}
      {...props}
    />
  );
};
export default TextAreaWithDefault;
