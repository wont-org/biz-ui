import { Card, Skeleton } from 'antd';
import React from 'react';
import PaginationSkeleton from './PaginationSkeleton';

export default ({ active = true, length = 1 }) => {
  return (
    <>
      {new Array(length).fill(null).map((_, index) => (
        <Card
          style={{
            marginBottom: 24,
          }}
          key={index}
          bordered
          title={
            <div className="df jc-sb" style={{ margin: '16px 0' }}>
              <Skeleton.Button
                block
                active={active}
                size="default"
                style={{ display: 'flex', width: '35%' }}
              />
              <Skeleton.Button
                block
                active={active}
                size="default"
                style={{ float: 'right', width: '20%' }}
              />
            </div>
          }
        >
          <div className="df g-24">
            <div
              style={{
                width: '35%',
              }}
            >
              <Skeleton
                active={active}
                title={{
                  width: '20%',
                }}
                paragraph={{
                  rows: 3,
                  width: '100%',
                }}
              />
              <div className="df g8">
                <Skeleton.Button active={active} size="small" />
                <Skeleton.Button active={active} size="small" />
              </div>
            </div>
            <div
              style={{
                width: '65%',
              }}
            >
              <div
                className="df jc-sb g8"
                style={{
                  marginBottom: 16,
                }}
              >
                <div className="df g8">
                  <Skeleton.Button active={active} size="small" />
                  <Skeleton.Button active={active} size="small" />
                </div>
                <div className="df g8">
                  <Skeleton.Button active={active} size="small" />
                  <Skeleton.Button active={active} size="small" />
                </div>
              </div>
              <Skeleton.Button
                active={active}
                block
                style={{
                  height: '120px',
                }}
              />
            </div>
          </div>
        </Card>
      ))}
      <PaginationSkeleton />
    </>
  );
};
