import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Select, Tooltip } from 'antd';
import { FormItemProps } from 'antd/es/form';
import zhCN from 'antd/lib/locale/zh_CN';
import { DefaultOptionType } from 'antd/lib/select';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { useCallback, useState } from 'react';
import { INPUT_NUMBER_PROPS } from '../constant/antd';
import {
  COMPONENT,
  FieldType,
  FilterFieldMapItem,
  FILTER_FIELD_MAP,
  OPERATORS,
  OperatorType,
  RELATION,
} from './constant';
import { renderValueComponent } from './domUtils';
import Relation, { RelationProps } from './Relation';
import { StyledFilterItem } from './styled';
import { ConditionType, ConditionValue, FilterProps } from './type';
import { isValueValid, updateOperatorsByFilterMap } from './utils';

moment.locale('zh-cn');

export default function FilterList(props: FilterProps) {
  const {
    value = { relation: RELATION.and.value, filterList: [] },
    onChange,
    conditionSelectProps = {},
    operatorSelectProps = {},
    conditionNumberValueProps = {},
    canAddCondition = true,
    canRemoveCondition = true,
    validateOnInit = true,
    filterFieldMap = FILTER_FIELD_MAP,
  } = props;

  const { options: conditionOptions = [], ...restConditionSelectProps } = conditionSelectProps;
  const { ...restOperatorSelectProps } = operatorSelectProps;
  const {
    // min, max,
    ...restConditionNumberValueProps
  } = conditionNumberValueProps;
  const { relation, filterList } = value;

  // 用于控制是否显示校验信息
  const [showValidation, setShowValidation] = useState(validateOnInit);
  const newOperators = updateOperatorsByFilterMap(OPERATORS, filterFieldMap);

  const handleRelationChange = useCallback(
    (newRelation: RelationProps['value']) => {
      onChange?.({ ...value, relation: newRelation });
    },
    [onChange, value],
  );

  const handleConditionChange = useCallback(
    (index: number, field: DefaultOptionType['value']) => {
      // 获取选中条件的完整配置
      const selectedOption = conditionOptions.find((opt) => opt.value === field);
      if (!selectedOption) {
        return;
      }

      // 从选项中获取字段类型
      const fieldType = (selectedOption as DefaultOptionType & { fieldType: FieldType }).fieldType;
      if (!fieldType) {
        return;
      }

      // 获取该字段类型可用的操作符列表
      const operators = filterFieldMap[fieldType] || [];
      // 默认选择第一个可用的操作符
      const defaultOperator = operators.length > 0 ? operators[0].value : undefined;

      const newFilterList = [...filterList];
      // 保留选项中的其他属性
      const otherProps: Record<string, unknown> = {};
      Object.keys(selectedOption).forEach((key) => {
        if (key !== 'value' && key !== 'label' && key !== 'fieldType') {
          otherProps[key] = (selectedOption as Record<string, unknown>)[key];
        }
      });
      let _value = undefined;
      if (defaultOperator === newOperators.isTrue.value) {
        _value = true;
      } else if (defaultOperator === newOperators.isFalse.value) {
        _value = false;
      }

      newFilterList[index] = {
        ...newFilterList[index],
        ...otherProps,
        field,
        fieldType,
        operator: defaultOperator as OperatorType,
        value: _value,
      };

      onChange?.({ ...value, filterList: newFilterList });
      setShowValidation(true);
    },
    [
      conditionOptions,
      filterFieldMap,
      filterList,
      newOperators.isTrue.value,
      newOperators.isFalse.value,
      onChange,
      value,
    ],
  );

  const handleOperatorChange = useCallback(
    (index: number, operator: OperatorType) => {
      const condition = filterList[index];
      if (!condition || !condition.fieldType) {
        return;
      }

      // 查找当前操作符的配置
      const operatorConfig = filterFieldMap[condition.fieldType]?.find(
        (item) => item.value === operator,
      );

      if (!operatorConfig) {
        return;
      }

      const newFilterList = [...filterList];
      // 根据不同操作符设置不同的默认值
      let defaultValue: ConditionValue = undefined;

      if (operator === newOperators.range.value) {
        if (condition.fieldType === 'number') {
          defaultValue = [undefined, undefined] as [number | undefined, number | undefined];
        }
      } else if (operator === newOperators.isTrue.value) {
        defaultValue = true;
      } else if (operator === newOperators.isFalse.value) {
        defaultValue = false;
      }

      newFilterList[index] = {
        ...newFilterList[index],
        operator,
        value: defaultValue,
      };
      const _value = { ...value, filterList: newFilterList };
      onChange?.(_value);
      setShowValidation(true);
    },
    [
      filterList,
      filterFieldMap,
      newOperators.range.value,
      newOperators.isTrue.value,
      newOperators.isFalse.value,
      value,
      onChange,
    ],
  );

  const handleValueChange = useCallback(
    (index: number, newValue: ConditionValue) => {
      const newFilterList = [...filterList];
      newFilterList[index] = {
        ...newFilterList[index],
        value: newValue,
      };
      onChange?.({ ...value, filterList: newFilterList });
      setShowValidation(true);
    },
    [onChange, value, filterList],
  );

  const handleAddCondition = useCallback(() => {
    if (!conditionOptions.length) {
      return;
    }

    // 获取第一个选项的字段类型
    const firstOption = conditionOptions[0] as DefaultOptionType & { fieldType: FieldType };
    if (!firstOption.fieldType) {
      return;
    }

    // 获取该字段类型可用的操作符列表
    const operators = filterFieldMap[firstOption.fieldType] || [];
    // 默认选择第一个可用的操作符
    const defaultOperator = operators.length > 0 ? operators[0].value : newOperators.equal.value;

    // 保留选项中的其他属性
    const otherProps: Record<string, unknown> = {};
    Object.keys(firstOption).forEach((key) => {
      if (key !== 'value' && key !== 'label' && key !== 'fieldType') {
        otherProps[key] = (firstOption as Record<string, unknown>)[key];
      }
    });

    const newCondition: ConditionType = {
      ...otherProps,
      field: firstOption.value,
      fieldType: firstOption.fieldType,
      operator: defaultOperator as OperatorType,
      value: undefined,
    };

    onChange?.({ ...value, filterList: [...filterList, newCondition] });
    setShowValidation(true);
  }, [conditionOptions, filterFieldMap, newOperators.equal.value, onChange, value, filterList]);

  const handleRemoveCondition = useCallback(
    (index: number) => {
      const newFilterList = [...filterList];
      newFilterList.splice(index, 1);
      onChange?.({ ...value, filterList: newFilterList });
      setShowValidation(true);
    },
    [onChange, value, filterList],
  );

  // 获取条件类型对应的可用操作符
  const getOperatorsByFieldType = useCallback(
    (fieldType: FieldType): FilterFieldMapItem[] => {
      return filterFieldMap[fieldType] || [];
    },
    [filterFieldMap],
  );

  const renderValueField = useCallback(
    (condition: ConditionType, index: number) => {
      const { fieldType, operator, value: conditionValue } = condition;
      if (!fieldType || !operator) {
        return null;
      }

      // 特定操作符不需要值组件
      if (
        operator === newOperators.hasValue.value ||
        operator === newOperators.noValue.value ||
        operator === newOperators.isTrue.value ||
        operator === newOperators.isFalse.value
      ) {
        return null;
      }

      const needValidation = showValidation && !isValueValid(condition, newOperators);

      // 查找操作符对应的组件配置
      const operatorConfig = filterFieldMap[fieldType]?.find((item) => item.value === operator);
      if (!operatorConfig || !operatorConfig.component) {
        return null;
      }

      // 准备组件属性
      let componentProps: Record<string, unknown> = {
        ...(operatorConfig.componentProps || {}),
        value: conditionValue,
        onChange: (newValue: ConditionValue) => {
          handleValueChange(index, newValue);
        },
      };

      // 针对数值输入框添加额外属性
      if (operatorConfig.component === COMPONENT.inputNumber.value) {
        componentProps.placeholder = '请输入';
        componentProps.className = 'value-field';
        Object.assign(componentProps, INPUT_NUMBER_PROPS, restConditionNumberValueProps);
      } else if (operatorConfig.component === COMPONENT.inputNumberRange.value) {
        componentProps = {
          ...componentProps,
          ...INPUT_NUMBER_PROPS,
          ...conditionNumberValueProps,
        };
      }
      const formItemProps: FormItemProps = {
        validateStatus: needValidation ? 'error' : '',
        help: needValidation ? '请补全必填项' : '',
        // noStyle: true,
        style: { marginBottom: 6 },
      };

      return (
        <div
          style={{
            minWidth: 261,
            maxWidth: 360,
          }}
        >
          <Form.Item {...formItemProps}>
            {renderValueComponent(operatorConfig.component, componentProps)}
          </Form.Item>
        </div>
      );
    },
    [
      newOperators,
      showValidation,
      filterFieldMap,
      handleValueChange,
      restConditionNumberValueProps,
      conditionNumberValueProps,
    ],
  );
  return (
    <ConfigProvider locale={zhCN}>
      {canAddCondition && (
        <Button type="link" icon={<PlusOutlined />} onClick={handleAddCondition}>
          添加
        </Button>
      )}
      <Relation
        value={relation}
        onChange={handleRelationChange}
        showRelation={filterList.length > 1}
      >
        {filterList.map((condition, index) => (
          <StyledFilterItem key={index}>
            <Form.Item
              validateStatus={showValidation && !condition.field ? 'error' : ''}
              help={showValidation && !condition.field ? '请选择' : ''}
              className="form-item-reset"
              style={{ marginBottom: 0 }}
            >
              {/* 条件选择框 */}
              <Select
                placeholder="请选择"
                showSearch
                {...restConditionSelectProps}
                allowClear={false}
                className="condition-field"
                value={condition.field}
                onChange={(field) => handleConditionChange(index, field)}
                options={conditionOptions}
              />
            </Form.Item>
            <Form.Item
              validateStatus={showValidation && !condition.operator ? 'error' : ''}
              help={showValidation && !condition.operator ? '请选择' : ''}
              className="form-item-reset"
            >
              {/* 操作符选择框 */}
              <Select
                placeholder="请选择"
                showSearch
                {...restOperatorSelectProps}
                allowClear={false}
                className="operator-field"
                value={condition.operator}
                onChange={(operator) => handleOperatorChange(index, operator as OperatorType)}
                options={
                  condition.fieldType
                    ? getOperatorsByFieldType(condition.fieldType).map((item) => ({
                        label: item.label,
                        value: item.value,
                      }))
                    : []
                }
              />
            </Form.Item>
            {/* 条件值组件 */}
            {renderValueField(condition, index)}
            {canRemoveCondition && (
              <Tooltip title="删除">
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveCondition(index)}
                />
              </Tooltip>
            )}
          </StyledFilterItem>
        ))}
      </Relation>
    </ConfigProvider>
  );
}
