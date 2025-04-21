import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { InputNumberRange } from '@wont/biz-ui';
import { Button, Form, InputNumber, InputNumberProps, Select, SelectProps, Tooltip } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { INPUT_NUMBER_PROPS } from '../utils/antd';
import { ValueOfConstWithType } from '../utils/types';
import { OPERATORS, RELATION } from './constant';
import Relation, { RelationProps } from './Relation';
import { StyledFilterItem } from './styled';

export type OperatorType = ValueOfConstWithType<typeof OPERATORS, 'value'>;
export type ConditionType = {
  field: DefaultOptionType['value'];
  operator: OperatorType;
  value: number | [number | undefined, number | undefined] | null | undefined;
} & Record<string, any>;

export interface FilterValue {
  relation: RelationProps['value'];
  filterList: ConditionType[];
}

export interface FilterProps {
  /**
   * 筛选器值，包含关系和条件列表
   */
  value?: FilterValue;
  /**
   * 筛选器变更回调
   */
  onChange?: (value: FilterValue) => void;
  /**
   * 条件选择框属性
   */
  conditionSelectProps?: SelectProps;
  /**
   * 操作符选择框属性
   */
  operatorSelectProps?: SelectProps;
  /**
   * 条件数值输入框属性
   */
  conditionNumberValueProps?: InputNumberProps;
  /**
   * 是否可以添加条件
   */
  canAddCondition?: boolean;
  /**
   * 是否可以删除条件
   */
  canRemoveCondition?: boolean;
  /**
   * 初始化时是否校验
   */
  validateOnInit?: boolean;
}

// 验证条件值是否有效
const isValueValid = (condition: ConditionType) => {
  const { operator, value: conditionValue } = condition;

  // hasValue 和 noValue 不需要额外的值
  if (operator === OPERATORS.hasValue.value || operator === OPERATORS.noValue.value) {
    return true;
  }

  // 区间操作符需要两个值都有效
  if (condition.operator === OPERATORS.range.value) {
    const rangeValue = conditionValue as [number | undefined, number | undefined] | undefined;
    if (!rangeValue || !Array.isArray(rangeValue)) {
      return false;
    }
    // 两个值都需要有效
    return rangeValue[0] !== undefined && rangeValue[1] !== undefined;
  }

  // 其他操作符需要值
  return conditionValue !== undefined && conditionValue !== null;
};
export const validator = (value?: FilterValue) => {
  if (value && value.filterList && value.filterList.length > 0) {
    // 检查每个条件是否有效
    const isValid = value.filterList.every((condition: ConditionType) => {
      return isValueValid(condition);
    });

    return isValid;
  }
  return false;
};

export default function Filter(props: FilterProps) {
  const {
    value = { relation: RELATION.and.value, filterList: [] },
    onChange,
    conditionSelectProps = {},
    operatorSelectProps = {},
    conditionNumberValueProps = INPUT_NUMBER_PROPS,
    canAddCondition = true,
    canRemoveCondition = true,
    validateOnInit = false,
  } = props;

  const { options: conditionOptions = [], ...restConditionSelectProps } = conditionSelectProps;
  const { options: operatorOptions = [], ...restOperatorSelectProps } = operatorSelectProps;
  const { min, max, ...restConditionNumberValueProps } = conditionNumberValueProps;
  const { relation, filterList } = value;
  console.log(
    'restConditionNumberValueProps :>> ',
    conditionNumberValueProps,
    restConditionNumberValueProps,
  );

  // 用于控制是否显示校验信息
  const [showValidation, setShowValidation] = useState(validateOnInit);

  // 如果没有提供操作符选项，则使用默认的 OPERATORS
  const defaultOperatorOptions = useMemo(() => {
    if (operatorOptions.length > 0) {
      return operatorOptions;
    }
    return Object.values(OPERATORS).map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }, [operatorOptions]);

  const handleRelationChange = useCallback(
    (newRelation: RelationProps['value']) => {
      onChange?.({ ...value, relation: newRelation });
    },
    [onChange, value],
  );

  const handleConditionChange = useCallback(
    (index: number, field: DefaultOptionType['value']) => {
      const newFilterList = [...filterList];
      newFilterList[index] = {
        ...newFilterList[index],
        field,
      };
      onChange?.({ ...value, filterList: newFilterList });
      setShowValidation(true);
    },
    [onChange, value, filterList],
  );

  const handleOperatorChange = useCallback(
    (index: number, operator: OperatorType) => {
      const newFilterList = [...filterList];
      // 根据不同操作符设置不同的默认值
      let defaultValue: ConditionType['value'] = null;

      if (operator === OPERATORS.range.value) {
        defaultValue = [undefined, undefined];
      } else if (operator !== OPERATORS.hasValue.value && operator !== OPERATORS.noValue.value) {
        defaultValue = undefined;
      }

      newFilterList[index] = {
        ...newFilterList[index],
        operator,
        value: defaultValue,
      };
      onChange?.({ ...value, filterList: newFilterList });
      setShowValidation(true);
    },
    [onChange, value, filterList],
  );

  const handleValueChange = useCallback(
    (index: number, newValue: ConditionType['value']) => {
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

    const newCondition: ConditionType = {
      field: conditionOptions[0].value,
      operator: OPERATORS.equal.value,
      value: undefined,
    };

    onChange?.({ ...value, filterList: [...filterList, newCondition] });
    setShowValidation(true);
  }, [conditionOptions, onChange, value, filterList]);

  const handleRemoveCondition = useCallback(
    (index: number) => {
      const newFilterList = [...filterList];
      newFilterList.splice(index, 1);
      onChange?.({ ...value, filterList: newFilterList });
      setShowValidation(true);
    },
    [onChange, value, filterList],
  );

  const renderValueField = useCallback(
    (condition: ConditionType, index: number) => {
      const { operator, value: conditionValue } = condition;
      const needValidation = showValidation && !isValueValid(condition);

      if (operator === OPERATORS.hasValue.value || operator === OPERATORS.noValue.value) {
        return null;
      }

      if (operator === OPERATORS.range.value) {
        return (
          <Form.Item
            validateStatus={needValidation ? 'error' : ''}
            help={needValidation ? '请输入有效的区间值' : ''}
            style={{ marginBottom: 0 }}
          >
            <InputNumberRange
              value={conditionValue as [number | undefined, number | undefined]}
              onChange={(newValue) => handleValueChange(index, newValue)}
              inputNumberProps={conditionNumberValueProps}
            />
          </Form.Item>
        );
      }

      return (
        <Form.Item
          validateStatus={needValidation ? 'error' : ''}
          help={needValidation ? '请输入有效的值' : ''}
          style={{ marginBottom: 0 }}
        >
          <InputNumber
            {...INPUT_NUMBER_PROPS}
            {...restConditionNumberValueProps}
            className="value-field"
            value={conditionValue as number}
            placeholder="请输入"
            onChange={(newValue) => handleValueChange(index, newValue as number)}
            min={min}
            max={max}
          />
        </Form.Item>
      );
    },
    [
      showValidation,
      restConditionNumberValueProps,
      min,
      max,
      conditionNumberValueProps,
      handleValueChange,
    ],
  );

  // 如果没有条件，初始化一个默认条件
  useEffect(() => {
    if (filterList.length === 0 && conditionOptions.length > 0) {
      const defaultCondition: ConditionType = {
        field: conditionOptions[0].value,
        operator: OPERATORS.equal.value,
        value: undefined,
      };
      onChange?.({ ...value, filterList: [defaultCondition] });
    }
  }, [conditionOptions, onChange, filterList.length, value]);

  return (
    <>
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
              style={{ marginBottom: 0 }}
            >
              <Select
                placeholder="请选择"
                {...restConditionSelectProps}
                allowClear
                className="condition-field"
                value={condition.field}
                onChange={(field) => handleConditionChange(index, field)}
                options={conditionOptions}
              />
            </Form.Item>

            <Form.Item
              validateStatus={showValidation && !condition.operator ? 'error' : ''}
              help={showValidation && !condition.operator ? '请选择' : ''}
              style={{ marginBottom: 0 }}
            >
              <Select
                allowClear
                placeholder="请选择"
                className="operator-field"
                value={condition.operator}
                onChange={(operator) => handleOperatorChange(index, operator as OperatorType)}
                options={defaultOperatorOptions}
                {...restOperatorSelectProps}
              />
            </Form.Item>

            {renderValueField(condition, index)}

            {canRemoveCondition && filterList.length > 1 && (
              <Tooltip title="删除">
                <DeleteOutlined
                  className="remove-condition"
                  onClick={() => handleRemoveCondition(index)}
                />
              </Tooltip>
            )}
          </StyledFilterItem>
        ))}
      </Relation>
    </>
  );
}
