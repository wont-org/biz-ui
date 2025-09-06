import { Button, Divider, Select, Space } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { useMemo, useState } from 'react';
import { useTranslation } from '../BizProvider';

const MultipleSelect = ({
  placeholder,
  fieldNames,
  options = [],
  value,
  onChange,
  ...props
}: SelectProps) => {
  const { t } = useTranslation();
  const labelField = fieldNames?.label || 'label';
  const valueField = fieldNames?.value || 'value';

  const [searchValue, setSearchValue] = useState('');

  const searchOption = useMemo(() => {
    const filterOption = options?.filter(
      (e) =>
        !!e && String(e?.[labelField]).toLowerCase().indexOf(searchValue.trim().toLowerCase()) >= 0,
    );
    return filterOption;
  }, [labelField, options, searchValue]);

  return (
    <Select
      value={value}
      options={options}
      showSearch
      allowClear
      placeholder={placeholder || t('multipleSelect.ui.placeholder')}
      mode="multiple"
      maxTagCount={1}
      filterOption={(input, option) =>
        String(option?.[labelField]).toLowerCase().includes(input.toLowerCase())
      }
      fieldNames={fieldNames}
      // 英文全选、反选最小宽度，必须
      dropdownMatchSelectWidth={260}
      // 兜底宽度，不可删除
      style={{
        minWidth: 260,
      }}
      autoClearSearchValue={false}
      {...props}
      onChange={onChange}
      onSearch={setSearchValue}
      onBlur={() => setSearchValue('')}
      onClear={() => setSearchValue('')}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space
            style={{ padding: '0 8px 4px' }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Button
              type="primary"
              size="small"
              onClick={() => {
                if (typeof onChange !== 'function' || !searchOption) {
                  return;
                }
                const values: Parameters<typeof onChange>['0'] = [];
                const valueOptions: Parameters<typeof onChange>['1'] = [];
                searchOption.forEach((e) => {
                  if (!e.disabled) {
                    values.push(e[valueField]);
                    valueOptions.push(e);
                  }
                });
                onChange?.(values, valueOptions);
              }}
            >
              {t('multipleSelect.ui.selectAll')}
            </Button>
            <Button
              size="small"
              onClick={() => {
                if (typeof onChange !== 'function' || !searchOption) {
                  return;
                }
                const values: Parameters<typeof onChange>['0'] = [];
                const valueOptions: Parameters<typeof onChange>['1'] = [];
                searchOption.forEach((e) => {
                  if (!value?.includes(e[valueField]) && !e.disabled) {
                    values.push(e.value);
                    valueOptions.push(e);
                  }
                });
                onChange(values, valueOptions);
              }}
            >
              {t('multipleSelect.ui.selectInverse')}
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => {
                onChange?.([], []);
              }}
            >
              {t('multipleSelect.ui.clear')}
            </Button>
          </Space>
        </>
      )}
    />
  );
};

export default MultipleSelect;
