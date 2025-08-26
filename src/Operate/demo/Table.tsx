import { BizUIProvider, useTranslation } from '@wont/biz-ui';
import { Table } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import Basic from './Basic';
import { demoLang } from './locales/demoLang';

const TableDemoInner = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('demo.table.columns.order'),
      dataIndex: 'order',
    },
    {
      title: t('demo.table.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('demo.table.columns.operation'),
      width: 300,
      render: (record = {}) => <Basic record={record} />,
    },
  ];
  const dataSource = [
    {
      order: 1,
      name: t('demo.table.data.firstRowName'),
    },
  ];
  return <Table rowKey={'name'} columns={columns} dataSource={dataSource} />;
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <TableDemoInner />
    </BizUIProvider>
  );
};
