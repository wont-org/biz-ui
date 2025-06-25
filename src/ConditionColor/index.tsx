import { Form, FormItemProps, InputNumber, Select } from 'antd';
import React from 'react';
import ColorPicker from '../ColorPicker';
import { isInvalidValue } from '../utils/commom';
import { ValueOfConstWithType } from '../utils/types';
import { VALUE_TYPE } from './constant';
import { StyledConditionColorItem } from './styled';

export interface ConditionColorValueItem {
  value?: number;
  color?: string;
  valueType: ValueOfConstWithType<typeof VALUE_TYPE, 'value'>;
}
export interface ConditionColorProps {
  valueTypeMap?: typeof VALUE_TYPE;
  useColor?: boolean;
  value?: ConditionColorValueItem[];
  onChange?: (value: ConditionColorValueItem[]) => void;
  labelFormItemProps?: FormItemProps;
  valuePropName?: string;
  conditionType?: 'dataBar' | 'dataGrading';
}

const isValueDisabled = (
  valueType: ConditionColorValueItem['valueType'],
  valueTypeMap: typeof VALUE_TYPE,
) => {
  return (
    [
      valueTypeMap.min.value,
      valueTypeMap.max.value,
      valueTypeMap.auto.value,
      valueTypeMap.none.value,
    ] as ConditionColorValueItem['valueType'][]
  ).includes(valueType);
};

const isPercent = (
  valueType: ConditionColorValueItem['valueType'],
  valueTypeMap: typeof VALUE_TYPE,
) => {
  return (
    [
      valueTypeMap.percent.value,
      valueTypeMap.percentPoint.value,
    ] as ConditionColorValueItem['valueType'][]
  ).includes(valueType);
};

export const validator = (value: ConditionColorValueItem[], options: ConditionColorProps = {}) => {
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

    if (!isValueDisabled(item.valueType, valueTypeMap) && isInvalidValue(item.value)) {
      return false;
    }
    return true;
  }

  return true;
};

const ConditionColor = (props: ConditionColorProps) => {
  const {
    // 由外部form控制，所以无需传入
    value,
    onChange,
    valueTypeMap = VALUE_TYPE,
    useColor = true,
    labelFormItemProps,
    valuePropName = 'conditions',
    conditionType = 'dataBar',
  } = props;

  const getItemLabel = (index: number, length: number) => {
    return index === 0 ? '最小值' : index === length - 1 ? '最大值' : '中间值';
  };

  const getPlaceholder = (item: ConditionColorValueItem) => {
    if (isValueDisabled(item.valueType, valueTypeMap)) {
      // 如果是最小值或最大值，返回对应的标签
      return undefined;
    }
    if (isPercent(item.valueType, valueTypeMap)) {
      return '请输入0-100';
    }
    return '请输入数字';
  };

  return (
    <Form.List name={valuePropName}>
      {(fields) => {
        return fields.map((field, index) => {
          const valueTypeFieldName = [field.name, 'valueType'];
          const valueFieldName = [field.name, 'value'];
          const colorFieldName = [field.name, 'color'];
          const valueType = value?.[index]?.valueType;
          const fieldLength = fields.length;

          const getValueTypeOpt = (idx: number) => {
            if (conditionType === 'dataBar') {
              if (idx === 0) {
                return [valueTypeMap.auto, valueTypeMap.min, valueTypeMap.number];
              }
              if (idx === fieldLength - 1) {
                return [valueTypeMap.auto, valueTypeMap.max, valueTypeMap.number];
              }
            }
            if (conditionType === 'dataGrading') {
              if (idx === 0) {
                return [
                  valueTypeMap.min,
                  valueTypeMap.number,
                  valueTypeMap.percent,
                  valueTypeMap.percentPoint,
                ];
              }
              if (idx === fieldLength - 1) {
                return [
                  valueTypeMap.max,
                  valueTypeMap.number,
                  valueTypeMap.percent,
                  valueTypeMap.percentPoint,
                ];
              }
              return [
                valueTypeMap.none,
                valueTypeMap.number,
                valueTypeMap.percent,
                valueTypeMap.percentPoint,
              ];
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
                <Form.Item noStyle shouldUpdate>
                  {({ getFieldValue, setFieldValue }) => {
                    return (
                      <Form.Item
                        name={valueTypeFieldName}
                        rules={[{ required: true, message: '请选择' }]}
                      >
                        <Select
                          placeholder="请选择"
                          options={getValueTypeOpt(index)}
                          onChange={(val) => {
                            const required = !isValueDisabled(val, valueTypeMap);
                            const _value = getFieldValue([valuePropName, index, 'value']);
                            if (!required && typeof _value === 'number') {
                              setFieldValue([valuePropName, index, 'value'], undefined);
                              // Reason: setFieldValue trigger after onValuesChange
                              onChange?.(getFieldValue([valuePropName]));
                            }
                          }}
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>

                <Form.Item noStyle dependencies={[valueTypeFieldName]}>
                  {({ getFieldValue, setFieldValue }) => {
                    const item = getFieldValue([valuePropName, index]);
                    const required = !isValueDisabled(item.valueType, valueTypeMap);
                    const conditionItemValue = required ? item.value : undefined;
                    setFieldValue([valuePropName, index, 'value'], conditionItemValue);

                    return (
                      <Form.Item
                        name={valueFieldName}
                        dependencies={[valueTypeFieldName]}
                        rules={[{ required, message: getPlaceholder(item) }]}
                      >
                        <InputNumber
                          disabled={isValueDisabled(item.valueType, valueTypeMap)}
                          min={isPercent(item.valueType, valueTypeMap) ? 0 : undefined}
                          max={isPercent(item.valueType, valueTypeMap) ? 100 : undefined}
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
                    <ColorPicker trigger="icon" readOnly={valueType === valueTypeMap.none.value} />
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
