import { useAntdResizableHeader } from '@wont/use-antd-resizable-header';

import { ProTable } from '@ant-design/pro-components';
import type { ProTableProps, ProColumns, ParamsType } from '@ant-design/pro-components';
import { Table } from 'antd';
import React, { ElementType } from 'react';

type ColumnsState = Parameters<typeof useAntdResizableHeader>['0']['columnsState'];
export type AntdResizableTableColumns<DataType> = ProColumns<DataType> & {
  resizable?: boolean;
};

export type AntdResizableTableProps<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> = Omit<ProTableProps<DataType, Params, ValueType>, 'columns'> & {
  columns: AntdResizableTableColumns<DataType>[];
  tableType?: 'ProTable' | 'Table';
  persistenceKey?: string;
  columnsState?: ColumnsState;
};

export type AntdResizableTableComponent = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: AntdResizableTableProps<DataType, Params, ValueType>,
) => JSX.Element;

const tableMap = {
  ProTable,
  Table,
};

const AntdResizableTable: AntdResizableTableComponent = (props) => {
  const { tableType = 'ProTable', columns, columnsState, ...tableProps } = props;

  const Component = tableMap[tableType] as ElementType<typeof tableMap[typeof tableType]>;
  const { components, resizableColumns, tableWidth } = useAntdResizableHeader({
    columns,
    columnsState,
    minConstraints: 80,
  });
  return (
    <Component
      {...tableProps}
      components={components}
      columns={resizableColumns}
      scroll={{ x: tableWidth }}
    />
  );
};

export default AntdResizableTable;
