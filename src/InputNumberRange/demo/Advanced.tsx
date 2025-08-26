import { BizUIProvider, InputNumberRange, useTranslation } from '@wont/biz-ui';
import { Button, Card, Space, Switch, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { advancedDemoLang } from './locales/advancedDemoLang';

const { Title, Paragraph } = Typography;

const AdvancedDemoInner = () => {
  const { t } = useTranslation();
  const [temperatureRange, setTemperatureRange] = useState<
    [number | undefined, number | undefined]
  >([-10, 40]);
  const [percentageRange, setPercentageRange] = useState<[number | undefined, number | undefined]>([
    20, 80,
  ]);
  const [disabledRange, setDisabledRange] = useState<[number | undefined, number | undefined]>([
    10, 20,
  ]);
  const [precisionRange, setPrecisionRange] = useState<[number | undefined, number | undefined]>([
    1.25, 9.75,
  ]);
  const [stepRange, setStepRange] = useState<[number | undefined, number | undefined]>([10, 50]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [showValues, setShowValues] = useState(false);

  const handleToggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const handleResetValues = () => {
    setTemperatureRange([undefined, undefined]);
    setPercentageRange([undefined, undefined]);
    setDisabledRange([undefined, undefined]);
    setPrecisionRange([undefined, undefined]);
    setStepRange([undefined, undefined]);
  };

  const handleShowValues = () => {
    setShowValues(!showValues);
  };

  const formatValue = (value: number | undefined) => {
    return value !== undefined ? value.toString() : 'undefined';
  };

  return (
    <div>
      <Title level={4}>{t('demo.descriptions.advanced')}</Title>
      <Paragraph>{t('demo.descriptions.disabled')}</Paragraph>
      <Paragraph>{t('demo.descriptions.precision')}</Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 温度区间 */}
        <Card title={t('demo.labels.temperatureRange')} size="small">
          <InputNumberRange
            value={temperatureRange}
            onChange={setTemperatureRange}
            style={{ width: 300 }}
            placeholder={[t('demo.placeholders.minTemp'), t('demo.placeholders.maxTemp')]}
            disabled={isDisabled}
            inputNumberProps={{
              min: -50,
              max: 50,
              addonAfter: '°C',
            }}
          />
          {showValues && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Range: [{formatValue(temperatureRange[0])}, {formatValue(temperatureRange[1])}]
            </div>
          )}
        </Card>

        {/* 百分比区间 */}
        <Card title={t('demo.labels.percentageRange')} size="small">
          <InputNumberRange
            value={percentageRange}
            onChange={setPercentageRange}
            style={{ width: 300 }}
            placeholder={[t('demo.placeholders.minPercent'), t('demo.placeholders.maxPercent')]}
            disabled={isDisabled}
            inputNumberProps={{
              min: 0,
              max: 100,
              formatter: (value) => `${value}%`,
              parser: (value) => Number(value?.replace('%', '')),
            }}
          />
          {showValues && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Range: [{formatValue(percentageRange[0])}%, {formatValue(percentageRange[1])}%]
            </div>
          )}
        </Card>

        {/* 禁用状态演示 */}
        <Card title={t('demo.labels.disabledRange')} size="small">
          <InputNumberRange
            value={disabledRange}
            onChange={setDisabledRange}
            style={{ width: 300 }}
            disabled={true}
            inputNumberProps={{
              min: 0,
              max: 100,
            }}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
            This range is always disabled for demonstration
          </div>
        </Card>

        {/* 精度控制 */}
        <Card title={t('demo.labels.precisionRange')} size="small">
          <InputNumberRange
            value={precisionRange}
            onChange={setPrecisionRange}
            style={{ width: 300 }}
            disabled={isDisabled}
            inputNumberProps={{
              min: 0,
              max: 10,
              precision: 2,
              step: 0.25,
            }}
          />
          {showValues && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Range: [{formatValue(precisionRange[0])}, {formatValue(precisionRange[1])}]
            </div>
          )}
        </Card>

        {/* 步长控制 */}
        <Card title={t('demo.labels.stepRange')} size="small">
          <InputNumberRange
            value={stepRange}
            onChange={setStepRange}
            style={{ width: 300 }}
            disabled={isDisabled}
            inputNumberProps={{
              min: 0,
              max: 100,
              step: 5,
            }}
          />
          {showValues && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              Range: [{formatValue(stepRange[0])}, {formatValue(stepRange[1])}]
            </div>
          )}
        </Card>

        {/* 控制面板 */}
        <Card title={t('demo.messages.currentState')} size="small">
          <Space direction="vertical">
            <div>
              <Space>
                <span>{t('demo.buttons.toggleDisabled')}:</span>
                <Switch checked={isDisabled} onChange={handleToggleDisabled} />
                <span style={{ color: isDisabled ? '#f50' : '#52c41a' }}>
                  {isDisabled ? t('demo.messages.disabled') : t('demo.messages.enabled')}
                </span>
              </Space>
            </div>

            <div>
              <Space>
                <span>{t('demo.messages.valuesDisplay')}:</span>
                <Switch checked={showValues} onChange={setShowValues} />
              </Space>
            </div>

            <Space>
              <Button type="primary" onClick={handleShowValues}>
                {t('demo.buttons.showValues')}
              </Button>
              <Button onClick={handleResetValues}>{t('demo.buttons.resetValues')}</Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={advancedDemoLang}>
      <AdvancedDemoInner />
    </BizUIProvider>
  );
};
