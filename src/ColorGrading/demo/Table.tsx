import { InputNumber, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getColumns } from './columns';

const StyledTable = styled(Table)`
  .ant-table-cell {
    padding: 0;
    border: none;
  }
`;
export default () => {
  // 获取N个随机数，设置最大值，最小值
  const getRandomNumber = (n: number, min: number, max: number) => {
    const result = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min) + min));
    return result.map((item) => ({
      greenWhiteRed: item,
      greenWhite: item,
    }));
  };
  const [dataSource, setDataSource] = useState<
    {
      greenWhiteRed: number;
      greenWhite: number;
    }[]
  >([]);
  const [count, setCount] = useState(5);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(5);

  useEffect(() => {
    setDataSource(getRandomNumber(count, min, max));
  }, [count, max, min]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Space>
        <div>
          <span style={{ marginRight: 8 }}>数量:</span>
          <InputNumber
            min={5}
            max={100}
            defaultValue={5}
            value={count}
            onChange={(value) => setCount(value!)}
          />
        </div>
        <div>
          <span style={{ marginRight: 8 }}>最小值:</span>
          <InputNumber
            min={0}
            max={max - 1}
            defaultValue={1}
            value={min}
            onChange={(value) => setMin(value!)}
          />
        </div>
        <div>
          <span style={{ marginRight: 8 }}>最大值:</span>
          <InputNumber
            min={min + 1}
            max={1000}
            defaultValue={5}
            value={max}
            onChange={(value) => setMax(value!)}
          />
        </div>
        <div>
          <span style={{ marginRight: 8 }}>色阶步数: {count}</span>
        </div>
      </Space>
      <StyledTable
        scroll={{
          y: 800,
        }}
        bordered={false}
        pagination={{
          pageSize: 100,
        }}
        columns={getColumns({
          min,
          max,
          steps: dataSource.length,
        })}
        dataSource={dataSource}
      />
    </div>
  );
};
