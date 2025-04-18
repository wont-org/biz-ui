import type { ColumnsType } from 'antd/es/table';
import { DataItem } from './mock';
import { mergeCell } from './utils';

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
      render: (text, record, index) => mergeCell(currentPageData, record, index, mergeKeys, text),
    },
    {
      title: '列 B',
      dataIndex: 'colB',
      sorter: sortableColumns.includes('colB'),
      render: (text, record, index) => mergeCell(currentPageData, record, index, mergeKeys, text),
    },
    {
      title: '列 C',
      dataIndex: 'colC',
      sorter: sortableColumns.includes('colC'),
      render: (text, record, index) => mergeCell(currentPageData, record, index, mergeKeys, text),
    },
    {
      title: '指标',
      dataIndex: 'other',
    },
  ];
}
