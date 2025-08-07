import { EditOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';
import { Button, Input, Modal, Select, SelectProps } from 'antd';
import React, { useState } from 'react';
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
  return `${params.value?.join(',')}${params.pastedText}`;
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

  useEventListener(
    'paste',
    (event: ClipboardEvent) => {
      const text = event.clipboardData?.getData('text') || '';
      setPastedText(getPastedText({ value: [pastedText], pastedText: text }));
    },
    {
      enable: usePaste,
    },
  );

  return (
    <StyledSelectWithPaste>
      <Select
        allowClear
        style={{ width: 300 }}
        placeholder="请输入或选择，批量录入用英文逗号或回车分割"
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
      <Modal title="批量录入" open={open} onOk={handleOk} onCancel={() => setOpen(false)}>
        <Input.TextArea
          placeholder="支持直接输入或粘贴excel文本，值之间请以半角逗号or回车符分隔"
          autoSize={{ minRows: 10, maxRows: 10 }}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
        />
      </Modal>
    </StyledSelectWithPaste>
  );
};
export default SelectWithPaste;
