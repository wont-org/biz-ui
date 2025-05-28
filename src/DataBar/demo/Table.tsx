import { Checkbox, InputNumber, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getColumns } from './columns';
import { DataSource } from './type';

const StyledTable = styled(Table)`
  .ant-table-cell {
    padding: 4px;
    /* border: none; */
  }
`;

// 固定数据示例，符合图片中的数据
const fixedData = [
  { index: 1, value: 0 },
  { index: 2, value: 1 },
  { index: 3, value: 2 },
  { index: 4, value: 3 },
  { index: 5, value: 4 },
  { index: 6, value: 5 },
  { index: 7, value: 6 },
  { index: 8, value: 7 },
  { index: 9, value: 8 },
  { index: 10, value: 9 },
  { index: 11, value: -20 },
  { index: 12, value: -9 },
  { index: 13, value: -8 },
  { index: 14, value: -7 },
  { index: 15, value: -6 },
  { index: 16, value: -5 },
  { index: 17, value: -4 },
  { index: 18, value: -3 },
  { index: 19, value: -2 },
  { index: 20, value: -1 },
];

// 只有负数的数据示例
const negativeData = [
  { index: 1, value: -20 },
  { index: 2, value: -18 },
  { index: 3, value: -16 },
  { index: 4, value: -14 },
  { index: 5, value: -12 },
  { index: 6, value: -10 },
  { index: 7, value: -8 },
  { index: 8, value: -6 },
  { index: 9, value: -4 },
  { index: 10, value: -2 },
];

export default () => {
  // 获取N个随机数，范围从minValue到maxValue
  const getRandomData = (n: number, minValue: number, maxValue: number) => {
    return Array.from({ length: n }, (_, index) => {
      const value = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
      return { index: index + 1, value };
    });
  };

  const [useFixedData, setUseFixedData] = useState(true);
  const [onlyNegative, setOnlyNegative] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource[]>(fixedData);
  const [count, setCount] = useState(30);
  const [minValue, setMinValue] = useState(-20);
  const [maxValue, setMaxValue] = useState(10);

  useEffect(() => {
    if (onlyNegative) {
      // 使用只有负数的数据
      setDataSource(negativeData);
      setMinValue(-20);
      setMaxValue(0);
    } else if (!useFixedData) {
      // 使用随机数据
      setDataSource(getRandomData(count, minValue, maxValue));
    } else {
      // 使用固定数据
      setDataSource(fixedData);
      setMinValue(-20);
      setMaxValue(10);
    }
  }, [count, minValue, maxValue, useFixedData, onlyNegative]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Space>
        <div>
          <span style={{ marginRight: 8 }}>使用固定示例数据:</span>
          <Checkbox
            checked={useFixedData}
            onChange={(e) => {
              setUseFixedData(e.target.checked);
              if (e.target.checked) {
                setOnlyNegative(false);
              }
            }}
          />
        </div>
        <div>
          <span style={{ marginRight: 8 }}>只有负数:</span>
          <Checkbox
            checked={onlyNegative}
            onChange={(e) => {
              setOnlyNegative(e.target.checked);
              if (e.target.checked) {
                setUseFixedData(false);
              }
            }}
          />
        </div>
        {!useFixedData && !onlyNegative && (
          <>
            <div>
              <span style={{ marginRight: 8 }}>数量:</span>
              <InputNumber min={5} max={100} value={count} onChange={(value) => setCount(value!)} />
            </div>
            <div>
              <span style={{ marginRight: 8 }}>最小值:</span>
              <InputNumber value={minValue} onChange={(value) => setMinValue(value!)} />
            </div>
            <div>
              <span style={{ marginRight: 8 }}>最大值:</span>
              <InputNumber value={maxValue} onChange={(value) => setMaxValue(value!)} />
            </div>
          </>
        )}
        <div>
          <span style={{ marginRight: 8 }}>最大值: {maxValue}</span>
        </div>
        <div>
          <span style={{ marginRight: 8 }}>最小值: {minValue}</span>
        </div>
      </Space>
      <StyledTable
        scroll={{
          y: 800,
        }}
        bordered
        pagination={{
          pageSize: 100,
        }}
        columns={getColumns({
          // max: maxValue,
          // min: minValue,
          dataSource,
          max: -2,
          min: -20,
        })}
        dataSource={dataSource}
      />
    </div>
  );
};
