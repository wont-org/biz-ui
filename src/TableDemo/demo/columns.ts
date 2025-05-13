import type { ColumnsType } from 'antd/es/table';
import { DataItem } from './mock';
import { onCell } from './utils';

/**
 * 生成表格列配置
 *
 * @param currentPageData 当前页数据
 * @param mergeKeys 合并单元格的键
 * @param sortableColumns 可排序的列
 * @returns 表格列配置
 */
export function getColumns(
  currentPageData: DataItem[],
  mergeKeys: (keyof DataItem)[],
  sortableColumns: (keyof DataItem)[],
): ColumnsType<DataItem> {
  return [
    {
      title: '列 A',
      dataIndex: 'colA',
      sorter: sortableColumns.includes('colA'),
      onCell: (record, index = 0) => onCell(currentPageData, record, index, mergeKeys),
    },
    {
      title: '列 B',
      dataIndex: 'colB',
      sorter: sortableColumns.includes('colB'),
      onCell: (record, index = 0) => onCell(currentPageData, record, index, mergeKeys),
    },
    {
      title: '列 C',
      dataIndex: 'colC',
      sorter: sortableColumns.includes('colC'),
      onCell: (record, index = 0) => onCell(currentPageData, record, index, mergeKeys),
    },
    {
      title: '指标',
      dataIndex: 'other',
      sorter: true,
    },
    {
      title: '2025-01-01',
      dataIndex: '2025-01-01',
      sorter: true,
    },
  ];
}
