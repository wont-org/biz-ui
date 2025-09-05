import { BizUIProvider } from '@wont/biz-ui';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/es/table';
import { useLocale } from 'dumi';
import React, { useEffect, useMemo, useState } from 'react';
import { getColumns } from './columns';
import { tableDemoLang } from './locales/demoLang';
import { DataItem, generateInitialData } from './mock';
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

// 内部组件，使用BizUIProvider包装
function MergedTableInner() {
  const { id: locale } = useLocale();

  // 动态翻译函数
  const t = (keyPath: string) => {
    const keys = keyPath.split('.');
    let value: any = tableDemoLang;

    for (const key of keys) {
      value = value?.[key];
    }

    if (value && typeof value === 'object') {
      return locale === 'en-US' ? value.enUS : value.zhCN;
    }

    return keyPath;
  };

  // 国际化的初始数据
  const internationalizedData = useMemo(() => {
    const dataLabels = {
      indicator1: t('data.indicator1'),
      indicator2: t('data.indicator2'),
      indicator3: t('data.indicator3'),
      indicator4: t('data.indicator4'),
      indicator5: t('data.indicator5'),
      indicator6: t('data.indicator6'),
      indicator7: t('data.indicator7'),
      indicator8: t('data.indicator8'),
      indicator9: t('data.indicator9'),
      indicator10: t('data.indicator10'),
      indicator11: t('data.indicator11'),
      indicator12: t('data.indicator12'),
      indicator13: t('data.indicator13'),
      indicator14: t('data.indicator14'),
      indicator15: t('data.indicator15'),
    };
    return generateInitialData(dataLabels);
  }, [locale]);

  const [data, setData] = useState<DataItem[]>(internationalizedData);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showTotal: (total) => t('ui.total').replace('{total}', total.toString()),
    showSizeChanger: true,
    showQuickJumper: true,
  });
  const [currentPageData, setCurrentPageData] = useState<DataItem[]>([]);
  const mergeKeys: (keyof DataItem)[] = ['colA', 'colB', 'colC'];

  // 可排序的列配置
  const sortableColumns: (keyof DataItem)[] = ['colA', 'colB', 'colC', '2025-01-01', 'other'];

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

    const { column, order } = sorter as SorterResult;
    const dataIndex = column?.dataIndex;

    if (!dataIndex || !sortableColumns.includes(dataIndex as keyof DataItem)) {
      return;
    }

    const sortField = dataIndex as keyof DataItem;
    const groups = groupData(internationalizedData, mergeKeys);

    if (!order) {
      // 如果取消排序，恢复初始数据
      const adjustedData = adjustGroupsForPagination(
        groupData(internationalizedData, mergeKeys),
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

  // 更新数据以响应语言变化
  useEffect(() => {
    setData(internationalizedData);
    setPagination((prev) => ({
      ...prev,
      showTotal: (total) => t('ui.total').replace('{total}', total.toString()),
    }));
  }, [internationalizedData]);

  // 获取列配置
  const columnLabels = {
    columnA: t('ui.columnA'),
    columnB: t('ui.columnB'),
    columnC: t('ui.columnC'),
    indicator: t('ui.indicator'),
  };
  const columns = getColumns(currentPageData, mergeKeys, sortableColumns, columnLabels);

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

// 使用BizUIProvider包装的导出组件
export default function MergedTable() {
  return (
    <BizUIProvider>
      <MergedTableInner />
    </BizUIProvider>
  );
}
