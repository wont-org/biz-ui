import { Skeleton } from 'antd';
import React from 'react';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Skeleton.Button
        active
        style={{
          width: 54,
          height: 54,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginLeft: 8,
        }}
      >
        <Skeleton.Button size="small" active />
        <Skeleton.Button size="small" active />
      </div>
    </div>
  );
};
