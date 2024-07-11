import { MultiExpand } from '@wont/biz-ui';
import React from 'react';
import { columns, icon } from './constant';
import './index.less';

export default () => {
  return (
    <span
      style={{
        display: 'flex',
      }}
    >
      <MultiExpand
        data={columns.map((item) => ({
          label: item.title,
          icon,
        }))}
        className="multi-expand-reset"
      />
    </span>
  );
};
