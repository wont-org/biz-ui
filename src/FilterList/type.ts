import { InputNumberProps } from 'antd';
import { DefaultOptionType, SelectProps } from 'antd/lib/select';
import { FieldType, FilterFieldMapType, OperatorType } from './constant';
import { RelationProps } from './Relation';

export type ConditionArrayValue = [number | undefined | null, number | undefined | null];
// 条件值类型
export type ConditionValue = string | number | boolean | ConditionArrayValue | null | undefined;

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
  deleteIcon?: React.ReactNode;
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
