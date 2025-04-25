import { Operate } from '@wont/biz-ui';
import { message, Modal } from 'antd';
import React from 'react';
import { OperateProps } from '..';

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
  const data: OperateProps['data'] = [
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
    {
      title: '下个隐藏',
      onClick: (e) => {
        console.log('e', e);
      },
    },
    {
      title: '更多操作1',
      onClick: () => {
        console.log('more action 1');
      },
    },
    {
      title: '更多操作2',
      type: 'link' as const,
      danger: true,
      onClick: () => {
        console.log('more action 2');
      },
    },
  ];
  return <Operate data={data} />;
};
