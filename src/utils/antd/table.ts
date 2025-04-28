import { ActionType } from '@ant-design/pro-components';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { MutableRefObject } from 'react';

export const reloadTable = (tableRef: MutableRefObject<ActionType | undefined>, delNum: number) => {
  if (!tableRef.current?.pageInfo) {
    return;
  }
  const { current, total, pageSize } = tableRef.current.pageInfo;
  const totalPage = Math.ceil(total / pageSize);
  const lastPageNum = total - (totalPage - 1) * pageSize;
  const isLastPageEmpty = current === totalPage && delNum === lastPageNum && current !== 1;
  if (isLastPageEmpty) {
    tableRef.current.setPageInfo?.({
      ...tableRef.current.pageInfo,
      current: current - 1,
    });
  }
  tableRef.current.reload();
};
export const getTableCurrentPage = (
  tablePaginationConfig: TablePaginationConfig,
  delNum: number,
) => {
  if (!tablePaginationConfig.current) {
    return;
  }
  const { current, total = 0, pageSize = 10 } = tablePaginationConfig;
  const totalPage = Math.ceil(total / pageSize);
  const lastPageNum = total - (totalPage - 1) * pageSize;
  const isLastPageEmpty = current === totalPage && delNum === lastPageNum && current !== 1;
  if (isLastPageEmpty) {
    return current - 1;
  }
  return current;
};
