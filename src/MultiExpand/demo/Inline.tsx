import { BizUIProvider, MultiExpand, useTranslation } from '@wont/biz-ui';
import { useLocale } from 'dumi';
import React from 'react';
import { getColumnsWithTranslation, icon } from './constant';
import './index.less';
import { demoLang } from './locales/demoLang';

const InlineDemoInner = () => {
  const { t } = useTranslation();
  const columns = getColumnsWithTranslation(t);

  return (
    <span
      style={{
        display: 'flex',
      }}
    >
      <MultiExpand
        data={columns.map((item) => ({
          label: item.title,
          icon,
        }))}
        className="multi-expand-reset"
      />
    </span>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <InlineDemoInner />
    </BizUIProvider>
  );
};
