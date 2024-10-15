import { AntdResizableTable } from '@wont/biz-ui';
import { Button, Card } from 'antd';
import React, { useState } from 'react';
import { columns, dataSource } from './constant';

export default () => {
  const [more, setMore] = useState(false);
  const getColumns = () => {
    if (more) {
      return columns.map((item, index) => ({
        ...item,
        width: columns.length - 1 === index ? undefined : item.width,
      }));
    }
    const shortCols = columns.slice(0, 3);
    console.log('shortCols :>> ', shortCols);
    return shortCols.map((item, index) => ({
      ...item,
      width: shortCols.length - 1 === index ? undefined : item.width,
    }));
  };
  const _columns = getColumns();
  console.log('_columns :>> ', _columns);
  return (
    <>
      <Card>
        <Button onClick={() => setMore(!more)}>{more ? '列变少' : '列变多'}</Button>
      </Card>
      <AntdResizableTable
        // columnsState={{
        //   persistenceType: 'sessionStorage',
        //   persistenceKey: 'columnsState',
        // }}
        rowKey="key"
        resizeColumnsState={{
          persistenceType: 'sessionStorage',
          persistenceKey: 'resizeColumnsState',
        }}
        tableType="ProTable"
        columns={_columns}
        dataSource={dataSource}
      />
    </>
  );
};
