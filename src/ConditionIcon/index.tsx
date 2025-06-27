import { Form, FormItemProps, InputNumber, Select } from 'antd';
import React, { ReactNode } from 'react';
import { EMPTY_PLACEHOLDER } from '../constant/common';
import { isInvalidValue } from '../utils/commom';
import { ValueOfConstWithType } from '../utils/types';
import { OPERATOR, VALUE_TYPE } from './constant';
import { StyledConditionItem, StyleIcon, StyleOperatorText, StyleTextSecondary } from './styled';

export interface ConditionIconValueItem {
  value?: number;
  valueType: ValueOfConstWithType<typeof VALUE_TYPE, 'value'>;
  operator: ValueOfConstWithType<typeof OPERATOR, 'value'>;
  icon?: ReactNode;
}
export interface ConditionIconProps {
  valueTypeMap?: typeof VALUE_TYPE;
  value?: ConditionIconValueItem[];
  onChange?: (value: ConditionIconValueItem[]) => void;
  labelFormItemProps?: FormItemProps;
  valuePropName?: string;
}

const ConditionIcon = (props: ConditionIconProps) => {
  const {
    // 由外部form控制，所以无需传入
    value,
    // onChange,
    valueTypeMap = VALUE_TYPE,
    labelFormItemProps,
    valuePropName = 'conditions',
  } = props;
  const hasLimit = (valueType: ConditionIconValueItem['valueType']) => {
    return (
      [
        valueTypeMap.percent.value,
        valueTypeMap.percentPoint.value,
      ] as ConditionIconValueItem['valueType'][]
    ).includes(valueType);
  };

  const getPlaceholder = (item: ConditionIconValueItem) => {
    if (hasLimit(item.valueType)) {
      return '请输入0-100的数值';
    }
    return '请输入数字';
  };

  return (
    <Form.List name={valuePropName}>
      {(fields) => {
        return fields.map((field, index) => {
          const Icon = value?.[index]?.icon;

          const operatorFieldName = [field.name, 'operator'];
          const valueTypeFieldName = [field.name, 'valueType'];
          const valueFieldName = [field.name, 'value'];

          const renderCondition = () => {
            if (index !== fields.length - 1) {
              const opLabel =
                value?.[index - 1]?.operator === OPERATOR.greaterThan.value ? '≤' : '<';
              return (
                <>
                  <Form.Item className="operator">
                    {index !== 0 && (
                      <StyleOperatorText>{`当值 ${opLabel} ${
                        value?.[index - 1]?.value ?? ''
                      } 且`}</StyleOperatorText>
                    )}
                    <Form.Item name={operatorFieldName}>
                      <Select placeholder="请选择" options={Object.values(OPERATOR)} />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item noStyle dependencies={[valueTypeFieldName, operatorFieldName]}>
                    {({ getFieldValue, setFieldValue, validateFields }) => {
                      const item = getFieldValue([valuePropName, index]);
                      const allConditions = getFieldValue([valuePropName]) || [];
                      const allConditionsLength = allConditions.length;

                      return (
                        <div className="ant-form-item value">
                          {index !== 0 && (
                            <StyleOperatorText>{EMPTY_PLACEHOLDER.blank}</StyleOperatorText>
                          )}

                          <Form.Item
                            name={valueFieldName}
                            rules={[
                              {
                                validator: (_, inputValue) => {
                                  if (isInvalidValue(inputValue)) {
                                    return Promise.reject('请输入数字');
                                  }
                                  if (
                                    (
                                      [
                                        valueTypeMap.percent.value,
                                        valueTypeMap.percentPoint.value,
                                      ] as ConditionIconValueItem['valueType'][]
                                    ).includes(item.valueType)
                                  ) {
                                    if (inputValue < 0 || inputValue > 100) {
                                      return Promise.reject('请输入0-100的数值');
                                    }
                                  }

                                  const prevItem = allConditions[index - 1];
                                  const currentItem = allConditions[index];
                                  const nextItem = allConditions[index + 1];

                                  if (!allConditions || allConditions.length <= 1) {
                                    return Promise.resolve();
                                  }
                                  if (
                                    allConditions.length > 2 &&
                                    index === allConditionsLength - 1 &&
                                    allConditions[index].value === allConditions[index - 1].value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  // 检查当前项与前一项
                                  if (index > 0) {
                                    // 如果单位类型相同
                                    if (prevItem.valueType === currentItem.valueType) {
                                      const valid =
                                        typeof prevItem.value === 'number' &&
                                        typeof inputValue === 'number';

                                      // 如果是最后两个条件项，且当前是倒数第二个，值会同步到最后一个，不需要校验
                                      if (
                                        index === allConditionsLength - 2 &&
                                        nextItem &&
                                        nextItem.value === inputValue
                                      ) {
                                        return Promise.resolve();
                                      }

                                      if (
                                        valid &&
                                        item.operator === OPERATOR.greaterThanOrEqual.value &&
                                        prevItem.value <= inputValue
                                      ) {
                                        return Promise.reject('数值区域有重叠，请重新设置');
                                      }
                                      if (
                                        valid &&
                                        item.operator === OPERATOR.greaterThan.value &&
                                        prevItem.value < inputValue
                                      ) {
                                        return Promise.reject('数值区域有重叠，请重新设置');
                                      }
                                    }
                                  }

                                  // 检查当前项与后一项
                                  if (index < allConditions.length - 1) {
                                    // 如果单位类型相同
                                    if (nextItem.valueType === currentItem.valueType) {
                                      const valid =
                                        typeof nextItem.value === 'number' &&
                                        typeof inputValue === 'number';

                                      // 如果是最后两个条件项，且当前是倒数第二个，值会同步到最后一个，不需要校验
                                      if (
                                        index === allConditionsLength - 2 &&
                                        nextItem.value === inputValue
                                      ) {
                                        return Promise.resolve();
                                      }

                                      if (
                                        valid &&
                                        item.operator === OPERATOR.greaterThanOrEqual.value &&
                                        nextItem.value >= inputValue
                                      ) {
                                        return Promise.reject('数值区域有重叠，请重新设置');
                                      }
                                      if (
                                        valid &&
                                        item.operator === OPERATOR.greaterThan.value &&
                                        nextItem.value > inputValue
                                      ) {
                                        return Promise.reject('数值区域有重叠，请重新设置');
                                      }
                                    }
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                          >
                            <InputNumber
                              min={hasLimit(item.valueType) ? 0 : undefined}
                              max={hasLimit(item.valueType) ? 100 : undefined}
                              style={{ width: '100%' }}
                              placeholder={getPlaceholder(item)}
                              onChange={(_value) => {
                                if (allConditionsLength - 2 === index) {
                                  setFieldValue([valuePropName, index + 1, 'value'], _value);
                                }
                                validateFields();
                              }}
                            />
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.Item>
                  <div className="ant-form-item valueType">
                    {index !== 0 && (
                      <StyleOperatorText>{EMPTY_PLACEHOLDER.blank}</StyleOperatorText>
                    )}
                    <Form.Item name={valueTypeFieldName}>
                      <Select
                        // style={{
                        //   width: 100,
                        // }}
                        placeholder="请选择"
                        options={Object.values(valueTypeMap)}
                      />
                    </Form.Item>
                  </div>
                </>
              );
            }
            return <StyleOperatorText>{`当值 < ${value?.[index]?.value ?? ''}`}</StyleOperatorText>;
          };

          return (
            <div key={field.key}>
              {index === 0 && (
                <StyledConditionItem
                  {...labelFormItemProps}
                  label={<StyleTextSecondary>显示</StyleTextSecondary>}
                  colon={false}
                >
                  <div className="condition-color-item-wrap">
                    <Form.Item
                      className="operator"
                      wrapperCol={{ span: 24 }}
                      colon={false}
                      labelAlign="right"
                    >
                      <StyleTextSecondary $align="right">规则</StyleTextSecondary>
                    </Form.Item>
                    <Form.Item
                      className="value"
                      wrapperCol={{ span: 24 }}
                      colon={false}
                      labelAlign="right"
                    >
                      <StyleTextSecondary $align="right">值</StyleTextSecondary>
                    </Form.Item>
                    <Form.Item
                      className="valueType"
                      wrapperCol={{ span: 24 }}
                      colon={false}
                      labelAlign="right"
                    >
                      <StyleTextSecondary $align="right">类型</StyleTextSecondary>
                    </Form.Item>
                  </div>
                </StyledConditionItem>
              )}
              <StyledConditionItem
                {...labelFormItemProps}
                label={<StyleIcon>{Icon}</StyleIcon>}
                colon={false}
              >
                <div className="condition-color-item-wrap">{renderCondition()}</div>
              </StyledConditionItem>
            </div>
          );
        });
      }}
    </Form.List>
  );
};
export default ConditionIcon;
