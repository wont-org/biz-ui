import { message, Modal } from 'antd';
import { Operate } from '@wont/biz-ui';
import React from 'react';

const sleep = (timeout: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
};

interface BasicProps {
  record: Record<string, any>;
}
export default (props: BasicProps) => {
  const asyncClick = async () => {
    await sleep(2000);
  };
  const syncClick = () => {
    console.log('syncClick');
    message.success('这是一个同步操作');
  };
  const data = [
    {
      title: '同步按钮',
      onClick: syncClick,
    },
    {
      title: '删除',
      type: 'link' as const,
      danger: true,
      onClick: () => {
        const name = props.record?.name ? `【${props.record.name}】` : '';
        Modal.confirm({
          title: `确定删除${name}？`,
          okText: '确定',
          cancelText: '取消',
          onOk: async () => {
            await asyncClick();
            message.success('操作成功');
          },
        });
      },
    },
  ];
  return <Operate data={data} />;
};
