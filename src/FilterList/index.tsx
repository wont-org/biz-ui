import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Select,
  SelectProps,
  Tooltip,
} from 'antd';
import { FormItemProps } from 'antd/es/form';
import zhCN from 'antd/lib/locale/zh_CN';
import { DefaultOptionType } from 'antd/lib/select';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { CSSProperties, useCallback, useState } from 'react';
import MultipleSelect from '../Formily/MultipleSelect';
import InputNumberRange from '../InputNumberRange';
import { INPUT_NUMBER_PROPS } from '../utils/antd';
import {
  COMPONENT,
  ComponentType,
  FieldType,
  FilterFieldMapItem,
  FilterFieldMapType,
  FILTER_FIELD_MAP,
  OPERATORS,
  OperatorType,
  RELATION,
} from './constant';
import Relation, { RelationProps } from './Relation';
import { StyledFilterItem } from './styled';

moment.locale('zh-cn');

// 条件值类型
export type ConditionValue =
  | string
  | number
  | boolean
  | [number | undefined | null, number | undefined | null]
  | null
  | undefined;

export type ConditionType = {
  field: DefaultOptionType['value'];
  fieldType: FieldType;
  operator: OperatorType;
  value: ConditionValue;
  [key: string]: unknown;
};

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
  /**
   * 字段类型映射配置
   */
  filterFieldMap?: FilterFieldMapType;
}

// 验证条件值是否有效
const isValueValid = (condition: ConditionType): boolean => {
  const { operator, value: conditionValue } = condition;

  // hasValue、noValue、isTrue、isFalse 不需要额外的值
  if (
    operator === OPERATORS.hasValue.value ||
    operator === OPERATORS.noValue.value ||
    operator === OPERATORS.isTrue.value ||
    operator === OPERATORS.isFalse.value
  ) {
    return true;
  }

  // 区间操作符需要两个值都有效
  if (operator === OPERATORS.range.value) {
    if (Array.isArray(conditionValue)) {
      const rangeValue = conditionValue as [number | undefined | null, number | undefined | null];
      return (
        rangeValue[0] !== undefined &&
        rangeValue[0] !== null &&
        rangeValue[1] !== undefined &&
        rangeValue[1] !== null
      );
    }
    return false;
  }

  // 其他操作符需要值
  return conditionValue !== undefined && conditionValue !== null && conditionValue !== '';
};

/**
 * 验证过滤条件是否有效
 * @param value 过滤条件值
 * @returns 是否有效
 */
export const validator = (value?: FilterValue): boolean => {
  if (!value || !value.filterList || value.filterList.length === 0) {
    return false;
  }

  // 检查每个条件是否有效
  return value.filterList.every((condition: ConditionType) => {
    // 检查是否存在必填字段
    if (!condition.field || !condition.fieldType || !condition.operator) {
      return false;
    }
    return isValueValid(condition);
  });
};

// 根据组件类型和属性渲染不同的值组件
const renderValueComponent = (
  component: ComponentType | undefined,
  props: Record<string, unknown>,
) => {
  if (!component) {
    return null;
  }

  const { value, onChange, style = {}, ...restProps } = props;

  const styleProps: CSSProperties = {
    ...(style as CSSProperties),
    width: '100%',
  };

  switch (component) {
    case COMPONENT.input.value:
      return (
        <Input
          style={styleProps}
          placeholder="请输入"
          allowClear
          {...(restProps as any)}
          value={value as string}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(e.target.value);
            }
          }}
        />
      );
    case COMPONENT.textarea.value:
      return (
        <Input.TextArea
          style={styleProps}
          placeholder="请输入"
          allowClear
          {...(restProps as any)}
          value={value as string}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(e.target.value);
            }
          }}
        />
      );
    case COMPONENT.inputNumber.value:
      return (
        <InputNumber
          style={styleProps}
          {...restProps}
          value={value as number}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    case COMPONENT.inputNumberRange.value: {
      const placeholders = (restProps.placeholder as [string, string]) || ['最小值', '最大值'];
      const { ...restInputNumberRangeProps } = restProps;
      return (
        <InputNumberRange
          style={{
            ...styleProps,
            width: 390,
          }}
          placeholder={placeholders}
          inputNumberProps={{
            ...restInputNumberRangeProps,
          }}
          value={value as [number | undefined | null, number | undefined | null]}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    }
    case COMPONENT.select.value:
      return (
        <Select
          placeholder="请选择"
          style={styleProps}
          {...(restProps as any)}
          value={value as string}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    case COMPONENT.multipleSelect.value:
      return (
        <MultipleSelect
          style={styleProps}
          {...restProps}
          value={value}
          onChange={(val) => {
            if (typeof onChange === 'function') {
              onChange(val);
            }
          }}
        />
      );
    case COMPONENT.datePicker.value:
      return (
        <DatePicker
          style={styleProps}
          placeholder="请选择日期"
          {...(restProps as any)}
          value={value ? moment(value as string) : null}
          onChange={(date, dateString) => {
            if (typeof onChange === 'function') {
              onChange(dateString || undefined);
            }
          }}
        />
      );
    case COMPONENT.dateRangePicker.value:
      return (
        <DatePicker.RangePicker
          style={styleProps}
          placeholder={['开始日期', '结束日期']}
          {...(restProps as any)}
          value={
            Array.isArray(value) && value.length === 2
              ? [value[0] ? moment(value[0]) : null, value[1] ? moment(value[1]) : null]
              : [null, null]
          }
          onChange={(dates, formatString) => {
            if (typeof onChange === 'function') {
              onChange(formatString.some((item) => !item) ? [] : formatString);
            }
          }}
        />
      );
    case COMPONENT.dateTimePicker.value:
      return (
        <DatePicker
          showTime
          style={styleProps}
          placeholder="请选择日期时间"
          {...(restProps as any)}
          value={value ? moment(value as string) : null}
          onChange={(date, dateString) => {
            if (typeof onChange === 'function') {
              onChange(dateString || undefined);
            }
          }}
        />
      );
    case COMPONENT.dateTimeRangePicker.value:
      return (
        <DatePicker.RangePicker
          showTime
          style={styleProps}
          placeholder={['开始日期时间', '结束日期时间']}
          {...(restProps as any)}
          value={
            Array.isArray(value) && value.length === 2
              ? [value[0] ? moment(value[0]) : null, value[1] ? moment(value[1]) : null]
              : [null, null]
          }
          onChange={(dates, formatString) => {
            if (typeof onChange === 'function') {
              onChange(formatString.some((item) => !item) ? [] : formatString);
            }
          }}
        />
      );
    default:
      return null;
  }
};

export default function FilterList(props: FilterProps) {
  const {
    value = { relation: RELATION.and.value, filterList: [] },
    onChange,
    conditionSelectProps = {},
    operatorSelectProps = {},
    conditionNumberValueProps = {},
    canAddCondition = true,
    canRemoveCondition = true,
    validateOnInit = false,
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
      if (defaultOperator === OPERATORS.isTrue.value) {
        _value = true;
      } else if (defaultOperator === OPERATORS.isFalse.value) {
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
    [onChange, value, filterList, conditionOptions, filterFieldMap],
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

      if (operator === OPERATORS.range.value) {
        if (condition.fieldType === 'number') {
          defaultValue = [undefined, undefined] as [number | undefined, number | undefined];
        }
      } else if (operator === OPERATORS.isTrue.value) {
        defaultValue = true;
      } else if (operator === OPERATORS.isFalse.value) {
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
    [onChange, value, filterList, filterFieldMap],
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
    const defaultOperator = operators.length > 0 ? operators[0].value : OPERATORS.equal.value;

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
  }, [conditionOptions, onChange, value, filterList, filterFieldMap]);

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
        operator === OPERATORS.hasValue.value ||
        operator === OPERATORS.noValue.value ||
        operator === OPERATORS.isTrue.value ||
        operator === OPERATORS.isFalse.value
      ) {
        return null;
      }

      const needValidation = showValidation && !isValueValid(condition);

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
          }}
        >
          <Form.Item {...formItemProps}>
            {renderValueComponent(operatorConfig.component, componentProps)}
          </Form.Item>
        </div>
      );
    },
    [
      showValidation,
      filterFieldMap,
      handleValueChange,
      // min,
      // max,
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
