import { Descriptions } from 'antd';
import { MultiExpand } from '@wont/biz-ui';
import { columns } from './constant';
import './index.less';
import React from 'react';

export default () => {
  return (
    <Descriptions
      contentStyle={{
        // border: '1px solid red',
        display: 'inline-block',
        overflow: 'hidden',
      }}
      labelStyle={{
        width: 200,
      }}
      items={[
        {
          label: 'xxx',
          children: (
            <MultiExpand
              className="multi-expand-reset"
              data={columns.map((item) => ({
                label: item.title,
                icon: 'https://plus.unsplash.com/premium_photo-1687653081151-8b2716238fc7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
              }))}
            />
          ),
        },
      ]}
    />
  );
};
