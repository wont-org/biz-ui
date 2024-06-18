import { Skeleton } from 'antd';
import React from 'react';

export default ({ style = {} }) => {
  return (
    <Skeleton.Button
      active
      block
      style={{
        marginTop: 24,
        maxWidth: '65%',
        float: 'right',
        ...style,
      }}
    />
  );
};
