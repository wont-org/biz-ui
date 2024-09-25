import { AntdResizableTable } from '@wont/biz-ui';
import React from 'react';
import { columns, dataSource } from './constant';
import './index.less';

export default () => {
  return (
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
      columns={columns}
      dataSource={dataSource}
    />
  );
};
