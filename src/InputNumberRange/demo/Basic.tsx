import { BizUIProvider, InputNumberRange, useTranslation } from '@wont/biz-ui';
import { Button, Card, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { basicDemoLang } from './locales/basicDemoLang';

const { Title, Paragraph } = Typography;

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const [basicRange, setBasicRange] = useState<[number | undefined, number | undefined]>([10, 50]);
  const [priceRange, setPriceRange] = useState<[number | undefined, number | undefined]>([
    100, 500,
  ]);
  const [ageRange, setAgeRange] = useState<[number | undefined, number | undefined]>([18, 60]);
  const [weightRange, setWeightRange] = useState<[number | undefined, number | undefined]>([
    50, 80,
  ]);
  const [customRange, setCustomRange] = useState<[number | undefined, number | undefined]>([
    undefined,
    undefined,
  ]);

  const handleShowValues = () => {
    console.log('Range Values:', {
      basic: basicRange,
      price: priceRange,
      age: ageRange,
      weight: weightRange,
      custom: customRange,
    });
  };

  const handleClearAll = () => {
    setBasicRange([undefined, undefined]);
    setPriceRange([undefined, undefined]);
    setAgeRange([undefined, undefined]);
    setWeightRange([undefined, undefined]);
    setCustomRange([undefined, undefined]);
  };

  const formatValue = (value: number | undefined) => {
    return value !== undefined ? value.toString() : t('demo.messages.noValue');
  };

  return (
    <div>
      <Title level={4}>{t('demo.descriptions.basic')}</Title>
      <Paragraph>{t('demo.descriptions.customPlaceholder')}</Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 基础区间 */}
        <Card title={t('demo.labels.basicRange')} size="small">
          <InputNumberRange
            value={basicRange}
            onChange={setBasicRange}
            style={{ width: 300 }}
            inputNumberProps={{
              min: 0,
              max: 100,
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {t('demo.messages.currentValues')} [{formatValue(basicRange[0])},{' '}
            {formatValue(basicRange[1])}]
          </div>
        </Card>

        {/* 价格区间 */}
        <Card title={t('demo.labels.priceRange')} size="small">
          <InputNumberRange
            value={priceRange}
            onChange={setPriceRange}
            style={{ width: 300 }}
            placeholder={[t('demo.placeholders.startPrice'), t('demo.placeholders.endPrice')]}
            inputNumberProps={{
              min: 0,
              max: 10000,
              step: 10,
              formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              parser: (value) => Number(value?.replace(/\$\s?|(,*)/g, '')),
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {t('demo.messages.currentValues')} [${formatValue(priceRange[0])}, $
            {formatValue(priceRange[1])}]
          </div>
        </Card>

        {/* 年龄区间 */}
        <Card title={t('demo.labels.ageRange')} size="small">
          <InputNumberRange
            value={ageRange}
            onChange={setAgeRange}
            style={{ width: 300 }}
            placeholder={[t('demo.placeholders.minAge'), t('demo.placeholders.maxAge')]}
            inputNumberProps={{
              min: 0,
              max: 120,
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {t('demo.messages.currentValues')} [{formatValue(ageRange[0])},{' '}
            {formatValue(ageRange[1])}] years
          </div>
        </Card>

        {/* 重量区间 */}
        <Card title={t('demo.labels.weightRange')} size="small">
          <InputNumberRange
            value={weightRange}
            onChange={setWeightRange}
            style={{ width: 300 }}
            placeholder={[t('demo.placeholders.minWeight'), t('demo.placeholders.maxWeight')]}
            inputNumberProps={{
              min: 0,
              max: 200,
              precision: 1,
              step: 0.5,
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {t('demo.messages.currentValues')} [{formatValue(weightRange[0])},{' '}
            {formatValue(weightRange[1])}] kg
          </div>
        </Card>

        {/* 自定义区间 */}
        <Card title={t('demo.labels.customRange')} size="small">
          <InputNumberRange
            value={customRange}
            onChange={setCustomRange}
            style={{ width: 300 }}
            inputNumberProps={{
              step: 1,
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {t('demo.messages.currentValues')} [{formatValue(customRange[0])},{' '}
            {formatValue(customRange[1])}]
          </div>
        </Card>

        {/* 操作按钮 */}
        <Space>
          <Button type="primary" onClick={handleShowValues}>
            {t('demo.buttons.getRangeValues')}
          </Button>
          <Button onClick={handleClearAll}>{t('demo.buttons.clearAll')}</Button>
        </Space>
      </Space>
    </div>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={basicDemoLang}>
      <BasicDemoInner />
    </BizUIProvider>
  );
};
