import { OPERATOR, VALUE_TYPE } from '@wont/biz-ui/ConditionIcon/constant';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { styled } from 'styled-components';
import { FormValues } from './type';

export const percentToValue = ({
  percent,
  min,
  max,
}: {
  percent: number;
  min: number;
  max: number;
}) => {
  return min + (percent / 100) * (max - min);
};
export const percentagePointToValue = ({
  percentagePoint,
  min,
  max,
}: {
  percentagePoint: number;
  min: number;
  max: number;
}) => {
  return min + (percentagePoint / 100) * (max - min);
};
const getIconByValue = ({
  value,
  formValues,
  min,
  max,
}: {
  value: number;
  formValues: FormValues;
  min: number;
  max: number;
}) => {
  const { conditions = [] } = formValues;

  // 过滤有效条件并计算阈值
  const validConditions = conditions
    .filter((condition) => {
      const { value: conditionConfigValue } = condition;
      return (
        conditionConfigValue !== undefined &&
        conditionConfigValue !== null &&
        typeof conditionConfigValue === 'number'
      );
    })
    .map((condition) => {
      const { valueType, value: conditionConfigValue } = condition;
      let thresholdValue = 0;

      // 根据值类型计算阈值
      if (valueType === VALUE_TYPE.percent.value) {
        thresholdValue = percentToValue({
          percent: conditionConfigValue as number,
          min,
          max,
        });
      } else if (valueType === VALUE_TYPE.percentPoint.value) {
        thresholdValue = percentagePointToValue({
          percentagePoint: conditionConfigValue as number,
          min,
          max,
        });
      } else if (valueType === VALUE_TYPE.number.value) {
        thresholdValue = conditionConfigValue as number;
      }

      return {
        ...condition,
        thresholdValue,
      };
    });

  // 按阈值从高到低排序
  validConditions.sort((a, b) => b.thresholdValue - a.thresholdValue);

  // 找到第一个满足条件的图标
  for (const condition of validConditions) {
    const { operator, thresholdValue } = condition;

    let isConditionMet = false;
    if (operator === OPERATOR.greaterThan.value) {
      isConditionMet = value > thresholdValue;
    } else if (operator === OPERATOR.greaterThanOrEqual.value) {
      isConditionMet = value >= thresholdValue;
    }

    if (isConditionMet) {
      return condition.icon;
    }
  }

  // 如果没有匹配到任何条件，返回最后一个（阈值最低的）图标
  // 这样实现了完整的条件覆盖：当值小于所有阈值时显示最后一个图标
  if (validConditions.length > 0) {
    const lastCondition = validConditions[validConditions.length - 1];
    return lastCondition.icon;
  }

  return null;
};
const StyleCell = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    justify-self: flex-start;
  }
  .right {
    justify-self: flex-end;
  }
`;
export function getColumns({
  max,
  min,
  formValues,
}: {
  formValues: FormValues;
  max: number;
  min: number;
}): ColumnsType<Record<string, any>> {
  return [
    {
      title: '随机1-100',
      dataIndex: 'mixedValue',
      width: 160,
      render(value) {
        const icon = getIconByValue({
          value,
          formValues,
          min,
          max,
        });
        return (
          <StyleCell>
            <div className="left">{icon}</div>
            <div className="right">{value}</div>
          </StyleCell>
        );
      },
    },
    {
      title: '序号',
      dataIndex: 'index',
      render(value) {
        const icon = getIconByValue({
          value,
          formValues,
          min,
          max,
        });
        return (
          <StyleCell>
            <div className="left">{icon}</div>
            <div className="right">{value}</div>
          </StyleCell>
        );
      },
    },
  ];
}
