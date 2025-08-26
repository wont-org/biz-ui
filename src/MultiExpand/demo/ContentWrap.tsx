import { BizUIProvider, MultiExpand, useTranslation } from '@wont/biz-ui';
import { Space } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { MODE } from '../constant';
import { getColumnsWithTranslation, icon } from './constant';
import './index.less';
import { demoLang } from './locales/demoLang';

const ContentWrapDemoInner = () => {
  const { t } = useTranslation();
  const columns = getColumnsWithTranslation(t);

  return (
    <Space size={'large'}>
      <MultiExpand.ContentWrap
        data={columns.map((item) => ({
          label: item.title,
          icon,
        }))}
        className="multi-expand-reset"
      />
      <MultiExpand.ContentWrap
        data={columns.map((item) => ({
          label: item.title,
          icon,
        }))}
        mode={MODE.tag}
        className="multi-expand-reset"
        style={{
          height: 120,
        }}
      />
    </Space>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <ContentWrapDemoInner />
    </BizUIProvider>
  );
};
