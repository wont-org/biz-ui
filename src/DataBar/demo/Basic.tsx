import { useTranslation } from '@wont/biz-ui/BizProvider';
import { Col, Row } from 'antd';
import React from 'react';
import { getLinearGradientStyle } from './utils';

export default () => {
  const { t } = useTranslation();
  return (
    <div>
      <Row gutter={16}>
        <Col>
          <h3>{t('dataBar.demo.greenWhite')}</h3>
          <div
            style={{
              ...getLinearGradientStyle({ colors: ['green', '#fff'] }),
              width: 100,
              height: 20,
            }}
          />
        </Col>
        <Col>
          <h3>{t('dataBar.demo.twoColorGradientRedWhite')}</h3>
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
