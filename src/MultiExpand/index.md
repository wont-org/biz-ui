# MultiExpand

多值折叠展示

## 表格场景

自动计算存放标签数量

```jsx
import { Table } from 'antd';
import { MultiExpand, AntdResizableTable } from 'dumi-test';

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
      title: '地方很大，但只展示一个',
      dataIndex: 'age',
      key: 'age',
      width: 500,
      ellipsis: true,
      render(text, record) {
        return <MultiExpand data={columns.map((item) => ({ label: item.title }))} maxSize={1} />;
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
    },
    // {
    //   key: '2',
    //   name: '胡彦祖',
    //   age: 42,
    //   address: '西湖区湖底公园1号',
    // },
  ];

  return <AntdResizableTable tableType="Table" columns={columns} dataSource={dataSource} />;
};
```
