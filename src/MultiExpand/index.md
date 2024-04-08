# MultiExpand

多值折叠展示

## 表格场景

自动计算存放标签数量

```jsx
import { Table, Typography } from 'antd';
import { MultiExpand, AntdResizableTable } from '@wont/biz-ui';

export default () => {
  const columns = [
    {
      title: '自动计算',
      dataIndex: 'name',
      // key: 'name',
      width: 320,
      ellipsis: true,
      render(text, record) {
        return <MultiExpand data={columns.map((item) => ({ label: item.title }))} />;
      },
    },
    {
      title: '刚好两个',
      dataIndex: 'name',
      // key: 'name',
      width: 320,
      ellipsis: true,
      render(text, record) {
        return <MultiExpand data={[{ label: '111' }, { label: '222' }]} />;
      },
    },
    {
      title: '刚好两个, 自定义render',
      dataIndex: 'name',
      // key: 'name',
      width: 320,
      ellipsis: true,
      render(text, record) {
        return (
          <MultiExpand
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
      render(text, record) {
        return <MultiExpand data={[columns[0]].map((item) => ({ label: item.title }))} />;
      },
    },
    {
      title: '地方很大，但只展示一个',
      dataIndex: 'age',
      key: 'age',
      width: 300,
      ellipsis: true,
      render(text, record) {
        return <MultiExpand data={columns.map((item) => ({ label: item.title }))} maxSize={1} />;
      },
    },
    {
      title: '自定义触发器',
      dataIndex: 'moreRender',
      key: 'age',
      width: 160,
      ellipsis: true,
      render(text, record) {
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
      key: 'address',
      ellipsis: true,
    },
  ];
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      maxSize: 'maxSize',
      moreRender: 'moreRender',
    },
    // {
    //   key: '2',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
  ];

  return (
    <AntdResizableTable
      columnsState={{
        persistenceType: 'sessionStorage',
        persistenceKey: 'columnsState',
      }}
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
```
