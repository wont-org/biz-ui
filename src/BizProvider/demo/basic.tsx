import { BizUIProvider } from '@wont/biz-ui';
import { Language, useTranslation } from '@wont/biz-ui/BizProvider/index';
import FilterListBasicDemo from '@wont/biz-ui/FilterList/demo/Basic';
import {
  Button,
  Card,
  ConfigProvider as AntdConfigProvider,
  Divider,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import DataBarConfigTableDemo from '../../DataBar/demo';
import { getAntdLocale } from '../hooks';

const { Title, Text } = Typography;

function I18nDemo({
  locale,
  setLocale,
}: {
  locale: Language;
  setLocale: (locale: Language) => void;
}) {
  const { t } = useTranslation();

  return (
    <Card>
      <Title level={4}>语言切换 / Language Switching</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type={locale === 'zh' ? 'primary' : 'default'} onClick={() => setLocale('zh')}>
          中文
        </Button>
        <Button type={locale === 'en' ? 'primary' : 'default'} onClick={() => setLocale('en')}>
          English
        </Button>
      </Space>

      <Divider />

      <div style={{ marginBottom: 16 }}>
        <Text strong>Operation: </Text>
        <Space>
          <Button type="primary">{t('common.operation.confirm')}</Button>
          <Button>{t('common.operation.cancel')}</Button>
          <Button>{t('common.operation.delete')}</Button>
          <Button>{t('common.operation.edit')}</Button>
        </Space>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Text strong>{t('common.operation.loading')}</Text>
        <br />
        <Text>{t('common.operation.total', { total: 100 })}</Text>
        <br />
        <Text>{t('common.operation.selected', { count: 5 })}</Text>
      </div>

      <Divider />

      <Title level={5}>FilterList Example</Title>

      {/* 局部覆盖 */}
      <BizUIProvider
        locale={locale}
        localeData={{
          common: {
            form: {
              input: {
                enUS: 'Input111',
                zhCN: '请输入111',
              },
            },
          },
        }}
      >
        <FilterListBasicDemo />
      </BizUIProvider>
      <Divider />
      <h1>DataBar</h1>
      <DataBarConfigTableDemo />
    </Card>
  );
}

export default () => {
  const [locale, setLocale] = useState<Language>('zh');
  return (
    <BizUIProvider locale={locale}>
      <AntdConfigProvider locale={getAntdLocale(locale)}>
        <I18nDemo locale={locale} setLocale={setLocale} />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};
