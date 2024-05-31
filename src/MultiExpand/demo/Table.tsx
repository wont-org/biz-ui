import { AntdResizableTable } from '@wont/biz-ui';
import { columns, dataSource } from './constant';
import './index.less';
import React from 'react';

export default () => {
  return (
    <AntdResizableTable
      columnsState={{
        persistenceType: 'sessionStorage',
        persistenceKey: 'columnsState',
      }}
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
