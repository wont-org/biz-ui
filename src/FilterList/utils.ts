import { FilterFieldMapType, FILTER_FIELD_MAP, OPERATORS } from './constant';
import { ConditionType, FilterValue } from './type';

export type CustomOp = { value: string; label: string };

export function updateOperatorsByFilterMap<
  T extends Record<string, CustomOp>,
  M extends Record<string, Array<CustomOp & { component?: any }>>,
>(operators: T, filterMap: M): T {
  // 先浅复制一份，免得改到原对象
  const newOps = { ...operators };

  // 拿到所有字段里的操作符项
  const items = Object.values(filterMap).flat();

  // 去重，避免多次改同一个
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.label)) {
      continue;
    }
    seen.add(item.label);

    // 在原始 OPERATORS 里找到 label 一致的 key
    const opKey = (Object.keys(operators) as Array<keyof T>).find(
      (k) => operators[k].label === item.label,
    );

    if (opKey) {
      // 替换 value，label 保持不变
      newOps[opKey] = {
        ...newOps[opKey],
        value: item.value,
      };
    }
  }

  return newOps;
}

// 验证条件值是否有效
export const isValueValid = (
  condition: ConditionType,
  operators: Record<string, CustomOp>,
): boolean => {
  const { operator, value: conditionValue } = condition;

  // hasValue、noValue、isTrue、isFalse 不需要额外的值
  if (
    operator === operators.hasValue.value ||
    operator === operators.noValue.value ||
    operator === operators.isTrue.value ||
    operator === operators.isFalse.value
  ) {
    return true;
  }

  // 区间操作符需要两个值都有效
  if (operator === OPERATORS.range.value) {
    if (Array.isArray(conditionValue) && conditionValue.length >= 2) {
      return (
        conditionValue[0] !== undefined &&
        conditionValue[0] !== null &&
        conditionValue[1] !== undefined &&
        conditionValue[1] !== null
      );
    }
    return false;
  }

  // 其他操作符需要值
  return (
    Array.isArray(conditionValue) &&
    conditionValue.length > 0 &&
    conditionValue[0] !== undefined &&
    conditionValue[0] !== null &&
    conditionValue[0] !== ''
  );
};

/**
 * 验证过滤条件是否有效
 * @param value 过滤条件值
 * @returns 是否有效
 */
export const validator = (
  value?: FilterValue,
  filterFieldMap: FilterFieldMapType = FILTER_FIELD_MAP,
): boolean => {
  if (!value || !value.filterList || value.filterList.length === 0) {
    return false;
  }
  const newOperators = updateOperatorsByFilterMap(OPERATORS, filterFieldMap);

  // 检查每个条件是否有效
  return value.filterList.every((condition: ConditionType) => {
    // 检查是否存在必填字段
    if (!condition.field || !condition.fieldType || !condition.operator) {
      return false;
    }
    return isValueValid(condition, newOperators);
  });
};
