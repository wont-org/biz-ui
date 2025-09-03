import { BizUIProvider } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import { Col, ConfigProvider as AntdConfigProvider, Row } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { basicDemoLang } from './locales/basicDemoLang';
import { getLinearGradientStyle } from './utils';

const BasicDemoInner = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Row gutter={16}>
        <Col>
          <h3>{t('demo.greenWhite')}</h3>
          <div
            style={{
              ...getLinearGradientStyle({ colors: ['green', '#fff'] }),
              width: 100,
              height: 20,
            }}
          />
        </Col>
        <Col>
          <h3>{t('demo.twoColorGradientRedWhite')}</h3>
          <div
            style={{
              ...getLinearGradientStyle({ colors: ['red', '#fff'] }),
              width: 100,
              height: 20,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default () => {
  const { id: locale } = useLocale();

  return (
    <BizUIProvider locale={locale as Language} localeData={basicDemoLang}>
      <AntdConfigProvider locale={getAntdLocale(locale as Language)}>
        <BasicDemoInner />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};
