import { Card, Flex, Skeleton } from 'antd';
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
            <Flex justify="space-between" style={{ margin: '16px 0' }}>
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
            </Flex>
          }
        >
          <Flex gap={24}>
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
              <Flex gap={8}>
                <Skeleton.Button active={active} size="small" />
                <Skeleton.Button active={active} size="small" />
              </Flex>
            </div>
            <div
              style={{
                width: '65%',
              }}
            >
              <Flex
                gap={8}
                justify="space-between"
                style={{
                  marginBottom: 16,
                }}
              >
                <Flex gap={8}>
                  <Skeleton.Button active={active} size="small" />
                  <Skeleton.Button active={active} size="small" />
                </Flex>
                <Flex gap={8}>
                  <Skeleton.Button active={active} size="small" />
                  <Skeleton.Button active={active} size="small" />
                </Flex>
              </Flex>
              <Skeleton.Button
                active={active}
                block
                style={{
                  height: '120px',
                }}
              />
            </div>
          </Flex>
        </Card>
      ))}
      <PaginationSkeleton />
    </>
  );
};
