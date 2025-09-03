import { BizUIProvider, MultiExpand, useTranslation } from '@wont/biz-ui';
import { Descriptions } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { getColumnsWithTranslation, icon } from './constant';
import './index.less';
import { demoLang } from './locales/demoLang';

const DescriptionDemoInner = () => {
  const { t } = useTranslation();
  const columns = getColumnsWithTranslation(t);

  return (
    <Descriptions
      contentStyle={{
        border: '1px solid red',
        overflow: 'hidden',
        maxWidth: 'calc(100% - 16px)',
      }}
      labelStyle={{
        flexShrink: 0,
      }}
      column={2}
      items={[
        {
          label: 'xxx1',
          children: (
            <MultiExpand
              className="multi-expand-reset"
              data={columns.slice(0, 2).map((item) => ({
                label: item.title,
                icon,
              }))}
            />
          ),
        },
        {
          label: 'xxx2',
          children: (
            <MultiExpand
              className="multi-expand-reset"
              data={columns.map((item) => ({
                label: item.title,
                icon,
              }))}
            />
          ),
        },
        {
          label: 'xxx3',
          span: 2,
          children: (
            <MultiExpand
              className="multi-expand-reset"
              data={columns.map((item) => ({
                label: item.title,
                icon,
              }))}
            />
          ),
        },
      ]}
    />
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <DescriptionDemoInner />
    </BizUIProvider>
  );
};
