import { Skeleton, Table } from 'antd';
import PaginationSkeleton from './PaginationSkeleton';
import React from 'react';

export interface TableSkeletonProps {
  showTitle?: boolean;
  showPagination?: boolean;
  columnsLength?: number;
  dataSourceLength?: number;
}

export default (props: TableSkeletonProps) => {
  const { showTitle, showPagination = true, dataSourceLength = 3, columnsLength = 2 } = props;
  const dataSource = new Array(dataSourceLength).fill('id').map((item, id) => ({
    id,
  }));
  const columns = new Array(columnsLength).fill({
    title: (
      <Skeleton.Button
        active
        size="small"
        style={{
          width: 60,
        }}
      />
    ),
    render() {
      return <Skeleton.Button active size="small" block />;
    },
  });

  return (
    <>
      {showTitle && (
        <Skeleton.Button active size="small" style={{ width: 100, marginBottom: 16 }} />
      )}
      <Table pagination={false} dataSource={dataSource} columns={columns} rowKey="id" />
      {showPagination && <PaginationSkeleton />}
    </>
  );
};
