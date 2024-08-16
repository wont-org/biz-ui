import React from 'react';
import { Table } from 'antd';
import Basic from './Basic';

export default () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 300,
      render: (record = {}) => <Basic record={record} />,
    },
  ];
  const dataSource = [
    {
      order: 1,
      name: '第一列名称',
    },
  ];
  return <Table rowKey={'name'} columns={columns} dataSource={dataSource} />;
};
