import { MultiExpand } from '@wont/biz-ui';
import { AntdResizableTableColumns } from '@wont/biz-ui/AntdResizableTable';
import { MODE } from '@wont/biz-ui/MultiExpand/constant';
import { Typography } from 'antd';
import React from 'react';

export const columns: AntdResizableTableColumns<Record<string, any>>[] = [
  {
    title: '自动计算',
    dataIndex: 'name1',
    // key: 'name',
    width: 320,
    ellipsis: true,
    fixed: 'left',
    render() {
      return (
        <MultiExpand
          data={columns.map((item) => ({
            label: item.title,
          }))}
        />
      );
    },
  },
  {
    title: '自动计算 mode Text',
    dataIndex: 'name2',
    // key: 'name',
    width: 320,
    fixed: 'left',
    ellipsis: true,
    render() {
      return <MultiExpand data={columns.map((item) => ({ label: item.title }))} mode={MODE.text} />;
    },
  },
  {
    title: '刚好两个',
    dataIndex: 'name3',
    // key: 'name',
    width: 320,
    ellipsis: true,
    align: 'right',
    render() {
      return <MultiExpand data={[{ label: '111' }, { label: '222' }]} />;
    },
  },
  {
    title: '刚好两个, 自定义render',
    dataIndex: 'name4',
    // key: 'name',
    width: 320,
    ellipsis: true,
    align: 'right',
    render() {
      return (
        <MultiExpand
          data={[{ label: '111' }, { label: '222' }]}
          moreRender={<Typography.Link>{'更多>'}</Typography.Link>}
        />
      );
    },
  },
  {
    title: 'maxSize 0, 自定义render',
    dataIndex: 'name5',
    // key: 'name',
    width: 320,
    ellipsis: true,
    render() {
      return (
        <MultiExpand
          maxSize={0}
          data={[{ label: '111' }, { label: '222' }]}
          moreRender={<Typography.Link>{'更多>'}</Typography.Link>}
        />
      );
    },
  },
  {
    title: '小于maxSize无更多',
    dataIndex: 'maxSize',
    // key: 'name',
    width: 160,
    ellipsis: true,
    render() {
      return <MultiExpand data={[columns[0]].map((item) => ({ label: item.title }))} />;
    },
  },
  {
    title: '地方很大，但只展示一个',
    dataIndex: 'age',
    // key: 'age',
    width: 300,
    ellipsis: true,
    render() {
      return <MultiExpand data={columns.map((item) => ({ label: item.title }))} maxSize={1} />;
    },
  },
  {
    title: '自定义触发器',
    dataIndex: 'moreRender',
    // key: 'age',
    width: 160,
    ellipsis: true,
    render() {
      return (
        <MultiExpand
          data={columns.map((item) => ({ label: item.title }))}
          maxSize={1}
          moreRender={<Typography.Link>{'更多>'}</Typography.Link>}
        />
      );
    },
  },
  {
    title: '很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
    dataIndex: 'address',
    // key: 'address',
    width: 200,
    ellipsis: true,
  },
];
export const dataSource = [
  {
    id: '1',
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    maxSize: 'maxSize',
    moreRender: 'moreRender',
  },
];
