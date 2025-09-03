import { BizUIProvider } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import ColorPicker from '@wont/biz-ui/ColorPicker';
import IconTrigger from '@wont/biz-ui/ColorPicker/IconTrigger';
import { Card, ConfigProvider as AntdConfigProvider, Row, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { colorPickerDemoLang } from './locales/colorPickerDemoLang';

const { Title, Text } = Typography;

const ColorPickerDemoInner: React.FC = () => {
  const { t } = useTranslation();
  const [basicColor, setBasicColor] = useState<string>('#1677ff');
  const [customColor, setCustomColor] = useState<string>('#f5222d');
  const [noTooltipColor, setNoTooltipColor] = useState<string>('#52c41a');
  const [customTooltipColor, setCustomTooltipColor] = useState<string>('#722ed1');
  const [open, setOpen] = useState<boolean>(true);

  // 自定义颜色分组
  const customColorGroups = [
    {
      title: 'Primary Colors',
      colors: [
        { value: '#f0f8ff', labelKey: 'demo.colorLabels.lightBlue' },
        { value: '#d6e9ff', labelKey: 'demo.colorLabels.skyBlue' },
        { value: '#99c9ff', labelKey: 'colorPicker.colors.lightBlue2' },
        { value: '#66b0ff', labelKey: 'demo.colorLabels.brightBlue' },
        { value: '#2196f3', labelKey: 'demo.colorLabels.blue' },
        { value: '#0c7cd5', labelKey: 'demo.colorLabels.darkBlue' },
      ],
    },
    {
      title: 'Red Series',
      colors: [
        { value: '#ffebee', labelKey: 'colorPicker.colors.lightRed1' },
        { value: '#ef9a9a', labelKey: 'colorPicker.colors.lightRed2' },
        { value: '#f44336', labelKey: 'demo.colorLabels.red' },
        { value: '#c62828', labelKey: 'colorPicker.colors.mediumRed' },
        { value: '#b71c1c', labelKey: 'colorPicker.colors.darkRed1' },
      ],
    },
    {
      title: 'Green Series',
      colors: [
        { value: '#e8f5e9', labelKey: 'colorPicker.colors.lightGreen1' },
        { value: '#a5d6a7', labelKey: 'colorPicker.colors.lightGreen2' },
        { value: '#4caf50', labelKey: 'demo.colorLabels.green' },
        { value: '#2e7d32', labelKey: 'colorPicker.colors.mediumGreen' },
        { value: '#1b5e20', labelKey: 'colorPicker.colors.darkGreen1' },
      ],
    },
  ];

  // 更多颜色分组，用于测试高度动画
  const moreColorGroups = [
    {
      title: 'Basic Colors',
      colors: [
        { value: '#000000', labelKey: 'colorPicker.colors.darkGray2' },
        { value: '#595959', labelKey: 'colorPicker.colors.mediumGray' },
        { value: '#bfbfbf', labelKey: 'colorPicker.colors.lightGray2' },
        { value: '#ffffff', labelKey: 'colorPicker.colors.white' },
      ],
    },
    {
      title: 'Rainbow Colors',
      colors: [
        { value: '#ff0000', labelKey: 'demo.colorLabels.red' },
        { value: '#ff9900', labelKey: 'colorPicker.colors.orange' },
        { value: '#ffff00', labelKey: 'demo.colorLabels.yellow' },
        { value: '#339900', labelKey: 'demo.colorLabels.green' },
        { value: '#0099ff', labelKey: 'colorPicker.colors.cyan' },
        { value: '#0033ff', labelKey: 'demo.colorLabels.blue' },
        { value: '#9900ff', labelKey: 'colorPicker.colors.purple' },
      ],
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title={t('demo.basicUsage')}>
        <Space direction="vertical">
          <Title level={5}>{t('demo.defaultPresetColors')}</Title>
          <Space>
            <ColorPicker value={basicColor} onChange={setBasicColor} />
            <Text>
              {t('demo.currentColor')}: {basicColor}
            </Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: basicColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title={t('demo.customTrigger')}>
        <Row>
          <Space>
            <ColorPicker
              value={basicColor}
              onChange={setBasicColor}
              onOpenChange={(_open) => {
                setOpen(!_open);
              }}
            >
              <IconTrigger open={open} label="Color" />
            </ColorPicker>
            <Text>
              {t('demo.currentColor')}: {basicColor}
            </Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: basicColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Space>
            <ColorPicker label={t('demo.noValue')} trigger="icon" />
            <Text>{t('demo.currentColor')}: undefined</Text>
          </Space>
        </Row>
      </Card>

      <Card title={t('demo.customColorGroups')}>
        <Space direction="vertical">
          <Title level={5}>{t('demo.collapsibleGroups')}</Title>
          <Space>
            <ColorPicker
              rowWrapCount={9}
              value={customColor}
              onChange={setCustomColor}
              presets={customColorGroups}
            />
            <Text>
              {t('demo.currentColor')}: {customColor}
            </Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: customColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title={t('demo.readOnlyMode')}>
        <Space direction="vertical">
          <Title level={5}>{t('demo.readOnlyDescription')}</Title>
          <Space>
            <ColorPicker
              rowWrapCount={9}
              value={customColor}
              onChange={() => {}}
              presets={customColorGroups}
              readOnly={true}
            />
            <Text>{t('demo.readOnlyNote')}</Text>
          </Space>
        </Space>
      </Card>

      <Card title={t('demo.disableTooltip')}>
        <Space direction="vertical">
          <Title level={5}>{t('demo.disableTooltipDescription')}</Title>
          <Space>
            <ColorPicker
              rowWrapCount={9}
              value={noTooltipColor}
              onChange={setNoTooltipColor}
              presets={customColorGroups}
              colorToolTip={false}
            />
            <Text>
              {t('demo.currentColor')}: {noTooltipColor}
            </Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: noTooltipColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title={t('demo.customTooltip')}>
        <Space direction="vertical">
          <Title level={5}>{t('demo.customTooltipDescription')}</Title>
          <Space>
            <ColorPicker
              rowWrapCount={9}
              value={customTooltipColor}
              onChange={setCustomTooltipColor}
              presets={customColorGroups}
              colorToolTip={{
                placement: 'right',
                color: '#722ed1',
                overlayInnerStyle: { color: 'white', fontWeight: 'bold' },
              }}
            />
            <Text>
              {t('demo.currentColor')}: {customTooltipColor}
            </Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: customTooltipColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title={t('demo.animationDemo')}>
        <Space direction="vertical">
          <Title level={5}>{t('demo.heightAdaptive')}</Title>
          <Text>{t('demo.animationNote')}</Text>
          <Space>
            <ColorPicker
              rowWrapCount={6}
              value={basicColor}
              onChange={setBasicColor}
              presets={moreColorGroups}
            />
          </Space>
        </Space>
      </Card>
    </Space>
  );
};

const ColorPickerDemo: React.FC = () => {
  const { id: locale } = useLocale();

  return (
    <BizUIProvider locale={locale as Language} localeData={colorPickerDemoLang}>
      <AntdConfigProvider locale={getAntdLocale(locale as Language)}>
        <ColorPickerDemoInner />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};

export default ColorPickerDemo;
