import { AntdResizableTable, BizUIProvider, useTranslation } from '@wont/biz-ui';
import { useLocale } from 'dumi';
import React from 'react';
import { getColumnsWithTranslation, getDataSourceWithTranslation } from './constant';
import './index.less';
import { demoLang } from './locales/demoLang';

const TableDemoInner = () => {
  const { t } = useTranslation();
  const columns = getColumnsWithTranslation(t);
  const dataSource = getDataSourceWithTranslation(t);

  return (
    <AntdResizableTable
      // columnsState={{
      //   persistenceType: 'sessionStorage',
      //   persistenceKey: 'columnsState',
      // }}
      rowKey="key"
      resizeColumnsState={{
        persistenceType: 'sessionStorage',
        persistenceKey: 'resizeColumnsState',
      }}
      tableType="ProTable"
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <TableDemoInner />
    </BizUIProvider>
  );
};
