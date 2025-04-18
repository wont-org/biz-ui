import React, { useEffect, useState } from 'react';

interface RenderCellReturn {
  children: React.ReactNode;
  props: {
    rowSpan: number;
  };
}

/**
 * 计算从 data[currentIndex] 开始，有多少连续的行的数据，在指定字段 keys 上都相同
 *
 * @param data 数据数组
 * @param currentIndex 当前行索引
 * @param keys 要比较的字段数组，类型为 T 的 key
 * @returns 连续满足条件的行数
 */
function getRowSpan<T>(data: T[], currentIndex: number, keys: (keyof T)[]): number {
  if (!data || !data[currentIndex]) {
    return 1;
  }

  let count = 1;
  const currentItem = data[currentIndex];
  for (let i = currentIndex + 1; i < data.length; i++) {
    const nextItem = data[i];
    const isSame = keys.every((key) => currentItem[key] === nextItem[key]);
    if (isSame) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

/**
 * 根据当前行与前一行比较结果，返回用于表格单元格合并的配置对象
 *
 * 如果当前行与上一行在 keys 指定的字段上相同，则返回 rowSpan 为 0 以隐藏当前单元格；
 * 否则，计算从当前行开始连续满足条件的行数，并返回该值作为 rowSpan。
 *
 * @param data 数据数组
 * @param record 当前行数据
 * @param index 当前行索引
 * @param keys 用于比较合并的字段名称数组
 * @param value 渲染该单元格的内容
 * @returns 用于表格 render 方法返回的对象，包括 children 和 props.rowSpan
 */
function mergeCell<T>(
  data: T[],
  record: T,
  index: number,
  keys: (keyof T)[],
  value: React.ReactNode,
): RenderCellReturn {
  if (!data || index < 0 || !record) {
    return {
      children: value,
      props: {
        rowSpan: 1,
      },
    };
  }

  // 如果当前行不是第 0 行，并且上一行与当前行在指定的所有字段上相等，则隐藏当前单元格
  if (index > 0 && keys.every((key) => data[index - 1] && data[index - 1][key] === record[key])) {
    return {
      children: value,
      props: {
        rowSpan: 0,
      },
    };
  }
  // 否则，计算从当前行开始连续相同的行数
  const span = getRowSpan<T>(data, index, keys);
  return {
    children: value,
    props: {
      rowSpan: span,
    },
  };
}

/**
 * 将数据按照指定的字段分组
 *
 * @param data 数据数组
 * @param keys 用于分组的字段数组
 * @returns 分组后的数据，每个组是一个数组
 */
function groupData<T>(data: T[], keys: (keyof T)[]): T[][] {
  if (!data || data.length === 0) {
    return [];
  }

  const groups: T[][] = [];
  let currentGroup: T[] = [];

  data.forEach((item, index) => {
    // 如果是第一个元素，或者当前元素与前一个元素在指定的字段上相同，就添加到当前组
    if (index === 0 || keys.every((key) => item[key] === data[index - 1][key])) {
      currentGroup.push(item);
    } else {
      // 否则，将当前组添加到结果中，并开始一个新组
      groups.push([...currentGroup]);
      currentGroup = [item];
    }
  });

  // 添加最后一个组
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

/**
 * 根据排序条件对分组数据进行排序
 *
 * @param groups 分组后的数据
 * @param sortField 排序字段
 * @param sortOrder 排序方向
 * @returns 排序后的分组数据
 */
function sortGroupedData<T>(
  groups: T[][],
  sortField: keyof T,
  sortOrder: 'ascend' | 'descend' | undefined | null,
): T[][] {
  if (!sortOrder) {
    return groups;
  }

  return [...groups].sort((groupA, groupB) => {
    if (!groupA.length || !groupB.length) {
      return 0;
    }

    const valueA = groupA[0][sortField];
    const valueB = groupB[0][sortField];

    // 处理字符串和数字类型的比较
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'ascend'
        ? valueA.localeCompare(valueB) // 升序
        : valueB.localeCompare(valueA); // 降序
    }

    // 数字比较
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'ascend' ? valueA - valueB : valueB - valueA;
    }

    // 默认直接转字符串比较
    const strA = String(valueA);
    const strB = String(valueB);
    return sortOrder === 'ascend' ? strA.localeCompare(strB) : strB.localeCompare(strA);
  });
}

/**
 * 确保分组数据不会跨页。根据分页信息调整数据结构，
 * 确保每一页的第一行都是一个新的组的开始
 *
 * @param groups 分组后的数据数组
 * @param pageSize 每页显示的行数
 * @returns 调整后的数据数组（展平）
 */
function adjustGroupsForPagination<T>(groups: T[][], pageSize: number): T[] {
  // 如果没有分页或者只有一页，直接返回展平的数据
  if (!pageSize || pageSize <= 0 || !groups || groups.length === 0) {
    return groups.flat();
  }

  // 创建一个新的数据数组，确保每页的第一行都是一个组的开始
  const result: T[] = [];
  let currentIndex = 0;

  for (const group of groups) {
    // 计算这个组在哪些页中
    const startPage = Math.floor(currentIndex / pageSize);
    const endPage = Math.floor((currentIndex + group.length - 1) / pageSize);

    // 如果组不跨页，直接添加整个组
    if (startPage === endPage) {
      result.push(...group);
    } else {
      // 如果组跨页，将组拆分为多个子组，确保每个新页面的第一条记录都是子组的开始
      let groupIndex = 0;
      while (groupIndex < group.length) {
        // 计算当前记录在哪一页
        const currentPage = Math.floor((currentIndex + groupIndex) / pageSize);
        // 计算当前页的最后一条记录的索引
        const pageEndIndex = (currentPage + 1) * pageSize - 1;
        // 计算这一页中这个组还有多少条记录
        const itemsInCurrentPage = Math.min(
          pageEndIndex - (currentIndex + groupIndex) + 1,
          group.length - groupIndex,
        );

        // 添加这一页中的记录
        result.push(...group.slice(groupIndex, groupIndex + itemsInCurrentPage));
        groupIndex += itemsInCurrentPage;
      }
    }

    currentIndex += group.length;
  }

  return result;
}

// 示例：假设有如下数据：
interface DataItem {
  key: number;
  colA: string;
  colB: string;
  colC: string;
  other: string;
}

const initialData: DataItem[] = [
  { key: 1, colA: 'A', colB: 'B', colC: 'C', other: '数据1' },
  { key: 2, colA: 'A', colB: 'B', colC: 'C', other: '数据2' },
  { key: 3, colA: 'A', colB: 'B', colC: 'C', other: '数据3' },
  { key: 4, colA: 'A1', colB: 'B1', colC: 'C1', other: '数据4' },
  { key: 5, colA: 'A1', colB: 'B1', colC: 'C1', other: '数据5' },
  { key: 6, colA: 'A2', colB: 'B2', colC: 'C2', other: '数据6' },
  { key: 7, colA: 'A2', colB: 'B2', colC: 'C2', other: '数据7' },
  { key: 8, colA: 'A3', colB: 'B3', colC: 'C3', other: '数据8' },
  { key: 9, colA: 'A3', colB: 'B3', colC: 'C3', other: '数据9' },
  { key: 10, colA: 'A4', colB: 'B4', colC: 'C4', other: '数据10' },
  { key: 11, colA: 'A4', colB: 'B4', colC: 'C4', other: '数据11' },
  { key: 12, colA: 'A5', colB: 'B5', colC: 'C5', other: '数据12' },
  { key: 13, colA: 'A5', colB: 'B5', colC: 'C5', other: '数据13' },
  { key: 14, colA: 'A6', colB: 'B6', colC: 'C6', other: '数据14' },
  { key: 15, colA: 'A6', colB: 'B6', colC: 'C6', other: '数据15' },
];

// 示例 React Table 组件，使用 mergeCell 实现行合并功能
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';

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
  }, [data, pagination.current, pagination.pageSize]);

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

  // 构建表格列配置
  const columns: ColumnsType<DataItem> = [
    {
      title: '列 A',
      dataIndex: 'colA',
      key: 'colA',
      sorter: sortableColumns.includes('colA'),
      render: (text, record, index) => mergeCell(currentPageData, record, index, mergeKeys, text),
    },
    {
      title: '列 B',
      dataIndex: 'colB',
      key: 'colB',
      sorter: sortableColumns.includes('colB'),
      render: (text, record, index) => mergeCell(currentPageData, record, index, mergeKeys, text),
    },
    {
      title: '列 C',
      dataIndex: 'colC',
      key: 'colC',
      sorter: sortableColumns.includes('colC'),
      render: (text, record, index) => mergeCell(currentPageData, record, index, mergeKeys, text),
    },
    {
      title: '其他',
      dataIndex: 'other',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      bordered
      onChange={handleTableChange}
      rowKey="key"
    />
  );
}
