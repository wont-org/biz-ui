import { MultiExpand } from '@wont/biz-ui';
import { Typography } from 'antd';
import React from 'react';
import { MODE } from '../constant';

export const icon =
  'https://plus.unsplash.com/premium_photo-1687653081151-8b2716238fc7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8';

export const ALPHA_ICON =
  'data:image/png;base64,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';

export const columns = [
  {
    title: '自动计算',
    dataIndex: 'name1',
    // key: 'name',
    width: 320,
    ellipsis: true,
    render() {
      return (
        <MultiExpand
          data={columns.map((item) => ({
            label: item.title,
            icon,
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
    ellipsis: true,
    render() {
      return (
        <MultiExpand data={columns.map((item) => ({ label: item.title, icon }))} mode={MODE.text} />
      );
    },
  },
  {
    title: '刚好两个',
    dataIndex: 'name3',
    // key: 'name',
    width: 320,
    ellipsis: true,
    render() {
      return <MultiExpand data={[{ label: '111', icon: ALPHA_ICON }, { label: '222' }]} />;
    },
  },
  {
    title: '刚好两个, 自定义render',
    dataIndex: 'name4',
    // key: 'name',
    width: 320,
    ellipsis: true,
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
