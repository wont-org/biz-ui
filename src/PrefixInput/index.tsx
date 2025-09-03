import { Input, InputProps, Select } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from '../BizProvider';
import { ValueOfConst } from '../utils/types';
import { PREFIX } from './constant';

type Prefix = ValueOfConst<typeof PREFIX, 'value'>;

export interface PrefixInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: {
    type?: Prefix;
    value?: string;
  };
  onChange?: (val: PrefixInputProps['value']) => void;
}
const PrefixInput: FC<PrefixInputProps> = (props) => {
  const { t } = useTranslation();
  const { value, onChange } = props;

  // 生成国际化的选项数据
  const options = Object.values(PREFIX).map((item) => ({
    ...item,
    label: t(item.labelKey),
  }));

  const renderBefore = () => {
    return (
      <Select
        style={{
          width: 100,
        }}
        showSearch
        options={options}
        value={value?.type}
        onChange={(val) => {
          onChange?.({
            ...value,
            type: val,
          });
        }}
      />
    );
  };
  return (
    <Input
      placeholder={t('prefixInput.ui.placeholder')}
      allowClear
      {...props}
      addonBefore={renderBefore()}
      value={value?.value}
      onChange={(e) => {
        onChange?.({
          ...value,
          value: e.target.value,
        });
      }}
    />
  );
};

export default PrefixInput;
