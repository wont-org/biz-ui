import { Form, FormItemProps, InputNumber, Select } from 'antd';
import { omit } from 'lodash';
import React from 'react';
import ColorPicker from '../ColorPicker';
import { isInvalidValue } from '../utils/commom';
import { ValueOfConstWithType } from '../utils/types';
import { VALUE_TYPE } from './constant';
import { StyledConditionColorItem } from './styled';

interface ValueItem {
  value: number;
  color?: string;
  valueType: ValueOfConstWithType<typeof VALUE_TYPE, 'value'>;
}
export interface ConditionColorProps {
  valueTypeMap?: typeof VALUE_TYPE;
  useColor?: boolean;
  value?: ValueItem[];
  onChange?: (value: ValueItem[]) => void;
  labelFormItemProps?: FormItemProps;
}

export const validator = (value: ValueItem[], options: ConditionColorProps = {}) => {
  const { valueTypeMap = VALUE_TYPE, useColor = true } = options;
  if (!value || value.length === 0) {
    return false;
  }

  for (const item of value) {
    if (!item.valueType) {
      return false;
    }

    if (useColor && !item.color) {
      return false;
    }

    if (
      !([valueTypeMap.min.value, valueTypeMap.max.value] as ValueItem['valueType'][]).includes(
        item.valueType,
      ) &&
      isInvalidValue(item.value)
    ) {
      return false;
    }
    return true;
  }

  return true;
};

const ConditionColor = (props: ConditionColorProps) => {
  const {
    // TODO 由外部form控制，所以无需传入
    // value, onChange,
    valueTypeMap = VALUE_TYPE,
    useColor = true,
    labelFormItemProps,
  } = props;
  const isValueDisabled = (valueType: string) => {
    return valueType === valueTypeMap.min.value || valueType === valueTypeMap.max.value;
  };

  const getItemLabel = (index: number, length: number) => {
    return index === 0 ? '最小值' : index === length - 1 ? '最大值' : '中间值';
  };

  const getPlaceholder = (item: ValueItem) => {
    if (isValueDisabled(item.valueType)) {
      // 如果是最小值或最大值，返回对应的标签
      return undefined;
    }
    return '请输入0-100的数值';
  };

  return (
    <Form.List name="conditions">
      {(fields) => {
        return fields.map((field, index) => {
          const valueTypeFieldName = [field.name, 'valueType'];
          const valueFieldName = [field.name, 'value'];
          const colorFieldName = [field.name, 'color'];
          const getValueTypeOpt = (idx: number) => {
            if (idx === 0) {
              return Object.values(omit(valueTypeMap, [valueTypeMap.max.value]));
            }
            if (idx === fields.length - 1) {
              return Object.values(omit(valueTypeMap, [valueTypeMap.min.value]));
            }
            return Object.values(valueTypeMap);
          };

          return (
            <StyledConditionColorItem
              {...labelFormItemProps}
              key={field.key}
              label={getItemLabel(index, fields.length)}
            >
              <div className="condition-color-item">
                <Form.Item
                  name={valueTypeFieldName}
                  rules={[{ required: true, message: '请选择' }]}
                >
                  <Select allowClear placeholder="请选择" options={getValueTypeOpt(index)} />
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, curValues) => {
                    const prevValueType = prevValues?.conditions?.[index]?.valueType;
                    const curValueType = curValues?.conditions?.[index]?.valueType;
                    return prevValueType !== curValueType;
                  }}
                >
                  {({ getFieldValue }) => {
                    const item = getFieldValue(['conditions', index]);
                    const required = !isValueDisabled(item.valueType);

                    return (
                      <Form.Item
                        name={valueFieldName}
                        dependencies={[['conditions', index, 'valueType']]}
                        rules={[{ required, message: getPlaceholder(item) }]}
                      >
                        <InputNumber
                          disabled={isValueDisabled(item.valueType)}
                          // min={isValueDisabled(item.valueType) ? undefined : 0}
                          // max={isValueDisabled(item.valueType) ? undefined : 100}
                          style={{ width: '100%' }}
                          placeholder={getPlaceholder(item)}
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>

                {useColor && (
                  <Form.Item
                    name={colorFieldName}
                    rules={[{ required: true, message: '请选择颜色' }]}
                  >
                    <ColorPicker trigger="icon" />
                  </Form.Item>
                )}
              </div>
            </StyledConditionColorItem>
          );
        });
      }}
    </Form.List>
  );
};
export default ConditionColor;
