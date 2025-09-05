import { BizUIProvider, PrefixInput, useTranslation } from '@wont/biz-ui';
import { Card, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { PREFIX } from '../constant';
import { demoLang } from './locales/demoLang';

const { Text } = Typography;

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const [value1, setValue1] = useState<any>();
  const [value2, setValue2] = useState({
    type: PREFIX.global.value,
    value: t('demo.sampleData.defaultText'),
  });
  const [value3, setValue3] = useState({
    type: PREFIX.prefix.value,
    value: 'controlled',
  });

  // 获取格式化后的值
  const getFormattedValue = (val: any) => {
    if (!val?.value || !val?.type) {
      return '';
    }
    const prefixConfig = Object.values(PREFIX).find((p) => p.value === val.type);
    return prefixConfig ? prefixConfig.getValue(val.value) : val.value;
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title={t('demo.titles.basicUsage')} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">{t('demo.descriptions.basicUsageDesc')}</Text>
          <PrefixInput value={value1} onChange={setValue1} style={{ width: 300 }} />
          {value1 && (
            <Text>
              <strong>{t('demo.labels.result')}</strong> {getFormattedValue(value1)}
            </Text>
          )}
        </Space>
      </Card>

      <Card title={t('demo.titles.withDefaultValue')} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">{t('demo.descriptions.defaultValueDesc')}</Text>
          <PrefixInput value={value2} onChange={setValue2} style={{ width: 300 }} />
          <Text>
            <strong>{t('demo.labels.result')}</strong> {getFormattedValue(value2)}
          </Text>
        </Space>
      </Card>

      <Card title={t('demo.titles.controlled')} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">{t('demo.descriptions.controlledDesc')}</Text>
          <PrefixInput value={value3} onChange={setValue3} style={{ width: 300 }} />
          <Space direction="vertical">
            <Text>
              <strong>{t('demo.labels.currentValue')}</strong>
              {JSON.stringify(value3, null, 2)}
            </Text>
            <Text>
              <strong>{t('demo.labels.result')}</strong> {getFormattedValue(value3)}
            </Text>
          </Space>
        </Space>
      </Card>
    </Space>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <BasicDemoInner />
    </BizUIProvider>
  );
};
