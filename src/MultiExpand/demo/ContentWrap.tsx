import { MultiExpand } from '@wont/biz-ui';
import { Space } from 'antd';
import React from 'react';
import { MODE } from '../constant';
import { columns } from './constant';
import './index.less';

export default () => {
  return (
    <Space size={'large'}>
      <MultiExpand.ContentWrap
        data={columns.map((item) => ({
          label: item.title,
          icon: 'https://plus.unsplash.com/premium_photo-1687653081151-8b2716238fc7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
        }))}
        className="multi-expand-reset"
      />
      <MultiExpand.ContentWrap
        data={columns.map((item) => ({
          label: item.title,
          icon: 'https://plus.unsplash.com/premium_photo-1687653081151-8b2716238fc7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
        }))}
        mode={MODE.tag}
        className="multi-expand-reset"
        style={{
          height: 120,
        }}
      />
    </Space>
  );
};
