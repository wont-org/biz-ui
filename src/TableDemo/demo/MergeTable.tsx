import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getColumns } from './columns';
import { DataItem, initialData } from './mock';
import { adjustGroupsForPagination, groupData, sortGroupedData } from './utils';

// 表格排序结果类型
interface SorterResult {
  column?: {
    dataIndex?: string | number | (string | number)[];
    key?: string;
  };
  order?: 'ascend' | 'descend' | null;
  field?: string | number | (string | number)[];
  columnKey?: string;
}

export default function MergedTable() {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showTotal: (total) => `共 ${total} 条`,
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const [currentPageData, setCurrentPageData] = useState<DataItem[]>([]);
  const mergeKeys: (keyof DataItem)[] = ['colA', 'colB', 'colC'];

  // 可排序的列配置
  const sortableColumns: (keyof DataItem)[] = ['colA', 'colB', 'colC'];

  // 根据分页变化更新当前页的数据
  useEffect(() => {
    if (!pagination.current || !pagination.pageSize || !data || data.length === 0) {
      setCurrentPageData(data || []);
      return;
    }

    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    setCurrentPageData(data.slice(startIndex, endIndex));
  }, [data, pagination, pagination.pageSize]);

  // 处理表格排序和分页
  const handleTableChange: TableProps<DataItem>['onChange'] = (
    paginationConfig,
    filters,
    sorter,
  ) => {
    // 更新分页信息
    setPagination((prevPagination) => ({
      ...prevPagination,
      ...paginationConfig,
    }));

    // 处理排序
    if (!sorter || Array.isArray(sorter)) {
      return;
    }

    const { columnKey, order } = sorter as SorterResult;

    if (!columnKey || !sortableColumns.includes(columnKey as keyof DataItem)) {
      return;
    }

    const sortField = columnKey as keyof DataItem;
    const groups = groupData(initialData, mergeKeys);

    if (!order) {
      // 如果取消排序，恢复初始数据
      const adjustedData = adjustGroupsForPagination(
        groupData(initialData, mergeKeys),
        pagination.pageSize || 10,
      );
      setData(adjustedData);
    } else {
      // 对分组后的数据进行排序
      const sortedGroups = sortGroupedData(groups, sortField, order);

      // 调整数据以适应分页，并设置到状态中
      const adjustedData = adjustGroupsForPagination(sortedGroups, pagination.pageSize || 10);
      setData(adjustedData);
    }
  };

  // 获取列配置
  const columns = getColumns(currentPageData, mergeKeys, sortableColumns);

  return (
    <Table
      style={{ width: 800 }}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      bordered
      onChange={handleTableChange}
      rowKey="key"
      scroll={{ x: '800px' }}
    />
  );
}
