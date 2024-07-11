import { MultiExpand } from '@wont/biz-ui';
import { Space } from 'antd';
import React from 'react';
import { MODE } from '../constant';
import { columns, icon } from './constant';
import './index.less';

export default () => {
  return (
    <Space size={'large'}>
      <MultiExpand.ContentWrap
        data={columns.map((item) => ({
          label: item.title,
          icon,
        }))}
        className="multi-expand-reset"
      />
      <MultiExpand.ContentWrap
        data={columns.map((item) => ({
          label: item.title,
          icon,
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
