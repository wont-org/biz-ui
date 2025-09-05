import { BizUIProvider } from '@wont/biz-ui';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import React from 'react';
import { getAntdLocale } from './hooks';
import { Language } from './types';

export default ({ children, locale }: { children: React.ReactNode; locale: Language }) => {
  return (
    <BizUIProvider locale={locale}>
      <AntdConfigProvider locale={getAntdLocale(locale)}>{children}</AntdConfigProvider>
    </BizUIProvider>
  );
};
