import { MultiExpand } from '@wont/biz-ui';
import { Descriptions } from 'antd';
import React from 'react';
import { columns, icon } from './constant';
import './index.less';

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
                icon,
              }))}
            />
          ),
        },
      ]}
    />
  );
};
