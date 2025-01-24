import { Checkbox, Col, Row } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';

const CheckboxGroup = Checkbox.Group;

export interface Option<T> {
  label: string;
  value: T;
  disabled?: boolean;
}
export interface CheckBoxItemProps<T> {
  options?: Option<T>[];
  checkAllLabel?: string;
  value?: T[];
  onChange?: (val: T[]) => void;
}
const CheckBoxWithAll = <T extends unknown>(props: CheckBoxItemProps<T>) => {
  const { options = [], checkAllLabel, value = [], onChange } = props;
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (value.length === options.length) {
      setCheckAll(true);
    }
  }, [value, options]);

  const onCheckboxGroupChange = (list: T[]) => {
    onChange?.(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    onChange?.(e.target.checked ? options.map((item) => item.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Row>
      <Col span={24}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          {checkAllLabel}
        </Checkbox>
      </Col>
      <Col span={24}>
        <CheckboxGroup options={options} value={value} onChange={onCheckboxGroupChange} />
      </Col>
    </Row>
  );
};
export default CheckBoxWithAll;
