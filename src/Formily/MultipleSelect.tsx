import { Button, Divider, Select, Space } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';

const MultipleSelect = ({
  placeholder = '请选择',
  fieldNames,
  options = [],
  value,
  onChange,
  ...props
}: SelectProps) => {
  const labelField = fieldNames?.label || 'label';
  const valueField = fieldNames?.value || 'value';

  const [searchValue, setSearchValue] = useState('');
  const [searchOption, setSearchOption] = useState<SelectProps['options']>([]);

  useEffect(() => {
    const filterOption = options?.filter(
      (e) =>
        !!e && String(e?.[labelField]).toLowerCase().indexOf(searchValue.trim().toLowerCase()) >= 0,
    );
    setSearchOption(filterOption);
  }, [labelField, options, searchValue]);

  return (
    <Select
      value={value}
      options={options}
      showSearch
      allowClear
      placeholder={placeholder}
      mode="multiple"
      maxTagCount={1}
      filterOption={(input, option) =>
        String(option?.label).toLowerCase().includes(input.toLowerCase())
      }
      autoClearSearchValue={false}
      onChange={onChange}
      onSearch={setSearchValue}
      onBlur={() => setSearchValue('')}
      onClear={() => setSearchValue('')}
      {...props}
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
              全选
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
              反选
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => {
                onChange?.([], {});
              }}
            >
              清空
            </Button>
          </Space>
        </>
      )}
    />
  );
};

export default MultipleSelect;
