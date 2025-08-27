import type { ColumnsType } from 'antd/es/table';
import { DataItem } from './mock';
import { onCell } from './utils';

interface ColumnLabels {
  columnA: string;
  columnB: string;
  columnC: string;
  indicator: string;
}

/**
 * 生成表格列配置
 *
 * @param currentPageData 当前页数据
 * @param mergeKeys 合并单元格的键
 * @param sortableColumns 可排序的列
 * @param labels 列标题的国际化标签
 * @returns 表格列配置
 */
export function getColumns(
  currentPageData: DataItem[],
  mergeKeys: (keyof DataItem)[],
  sortableColumns: (keyof DataItem)[],
  labels: ColumnLabels,
): ColumnsType<DataItem> {
  return [
    {
      title: labels.columnA,
      dataIndex: 'colA',
      sorter: sortableColumns.includes('colA'),
      onCell: (record, index = 0) => onCell(currentPageData, record, index, mergeKeys),
    },
    {
      title: labels.columnB,
      dataIndex: 'colB',
      sorter: sortableColumns.includes('colB'),
      onCell: (record, index = 0) => onCell(currentPageData, record, index, mergeKeys),
    },
    {
      title: labels.columnC,
      dataIndex: 'colC',
      sorter: sortableColumns.includes('colC'),
      onCell: (record, index = 0) => onCell(currentPageData, record, index, mergeKeys),
    },
    {
      title: labels.indicator,
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
