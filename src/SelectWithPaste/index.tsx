import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, SelectProps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from '../BizProvider';
import { StyledSelectWithPaste } from './styled';

const tokenSeparators = [
  ',',
  '\n',
  '\r',
  '\n\r',
  '\r\n',
  '\n,',
  '\r,',
  '\n\r,',
  '\r\n,',
  ',\n',
  ',\r',
  ',\n\r',
  ',\r\n',
];

const getPastedText = (params: { value?: string[]; pastedText?: string }) => {
  return `${params.value?.join(',') || ''}${params.pastedText || ''}`;
};
const getValidValue = (value: string[]) => {
  const result = value.reduce<string[]>((acc, cur) => {
    if (cur && !/^\s*$/.test(cur) && !acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
  return result;
};

export interface SelectWithPasteProps {
  value?: string[];
  onChange?: (value: SelectWithPasteProps['value']) => void;
  selectProps?: SelectProps;
  usePaste?: boolean;
}

const SelectWithPaste = (props: SelectWithPasteProps) => {
  const { t } = useTranslation();
  const { value, onChange, selectProps = {}, usePaste = true } = props;

  const [pastedText, setPastedText] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (selectedValue: string[]) => {
    const _selectedValue = getValidValue(selectedValue);
    onChange?.(_selectedValue);
  };

  const handleOk = () => {
    const _selectedValue = getValidValue(
      pastedText.split(new RegExp(`[${tokenSeparators.join('')}]`)),
    );
    setOpen(false);
    onChange?.(_selectedValue);
    setPastedText(_selectedValue.join(','));
  };

  return (
    <StyledSelectWithPaste>
      <Select
        allowClear
        style={{ width: 300 }}
        placeholder={t('selectWithPaste.ui.placeholder')}
        showSearch
        filterOption={false}
        {...selectProps}
        tokenSeparators={tokenSeparators}
        value={value}
        mode="tags"
        onChange={handleChange}
      />
      {usePaste && (
        <Button
          icon={<EditOutlined />}
          type="link"
          size="small"
          onClick={() => {
            setOpen(true);
            setPastedText(getPastedText({ value, pastedText: '' }));
          }}
        />
      )}
      <Modal
        title={t('selectWithPaste.ui.modalTitle')}
        okText={t('selectWithPaste.ui.modalOk')}
        cancelText={t('selectWithPaste.ui.modalCancel')}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <Input.TextArea
          placeholder={t('selectWithPaste.ui.modalPlaceholder')}
          autoSize={{ minRows: 10, maxRows: 10 }}
          value={pastedText}
          onChange={(e) => {
            setPastedText(e.target.value);
          }}
        />
      </Modal>
    </StyledSelectWithPaste>
  );
};
export default SelectWithPaste;
