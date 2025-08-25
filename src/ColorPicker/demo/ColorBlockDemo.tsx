import { BizUIProvider } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import ColorBlock from '@wont/biz-ui/ColorPicker/ColorBlock';
import ColorPanel from '@wont/biz-ui/ColorPicker/ColorPanel';
import { Button, ConfigProvider as AntdConfigProvider, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { colorBlockDemoLang } from './locales/colorBlockDemoLang';

const { Text } = Typography;

// 语言切换器组件
function LanguageSwitcher({
  locale,
  setLocale,
}: {
  locale: Language;
  setLocale: (locale: Language) => void;
}) {
  return (
    <div style={{ marginBottom: 16, textAlign: 'right' }}>
      <Space>
        <Text>Language / 语言:</Text>
        <Button
          type={locale === 'zh' ? 'primary' : 'default'}
          size="small"
          onClick={() => setLocale('zh')}
        >
          中文
        </Button>
        <Button
          type={locale === 'en' ? 'primary' : 'default'}
          size="small"
          onClick={() => setLocale('en')}
        >
          English
        </Button>
      </Space>
    </div>
  );
}

const ColorBlockDemoInner: React.FC = () => {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState<string>('rgba(25, 118, 210, 1)');

  const presets = [
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

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h3>{t('demo.colorBlockComponent')}</h3>
      <div style={{ marginBottom: 16 }}>
        <h4>{t('demo.interactiveMode')}</h4>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <ColorBlock color="#1677ff" label={t('demo.colorLabels.blue')} selected={true} />
          <ColorBlock color="#f5222d" label={t('demo.colorLabels.red')} />
          <ColorBlock color="#52c41a" label={t('demo.colorLabels.green')} />
          <ColorBlock color="#faad14" label={t('demo.colorLabels.yellow')} />
        </div>

        <h4>{t('demo.readOnlyMode')}</h4>
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <ColorBlock
            color="#1677ff"
            label={t('demo.colorLabels.blue')}
            selected={true}
            readOnly={true}
          />
          <ColorBlock color="#f5222d" label={t('demo.colorLabels.red')} readOnly={true} />
          <ColorBlock color="#52c41a" label={t('demo.colorLabels.green')} readOnly={true} />
          <ColorBlock color="#faad14" label={t('demo.colorLabels.yellow')} readOnly={true} />
        </div>
      </div>

      <h3>{t('demo.colorPanelComponent')}</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div>
          <h4>{t('demo.interactiveMode')}</h4>
          <ColorPanel
            presets={presets}
            value={selectedColor}
            onChange={setSelectedColor}
            rowWrapCount={5}
          />
        </div>

        <div>
          <h4>{t('demo.readOnlyNote2')}</h4>
          <ColorPanel
            presets={presets}
            value={selectedColor}
            onChange={() => {}}
            rowWrapCount={5}
            readOnly={true}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {t('demo.selectedColor')}：
        <div
          style={{
            marginTop: 8,
            width: 100,
            height: 24,
            background: selectedColor,
            borderRadius: 4,
            border: '1px solid #d9d9d9',
          }}
        />
        <div style={{ marginTop: 4 }}>{selectedColor}</div>
      </div>
    </div>
  );
};

const ColorBlockDemo: React.FC = () => {
  const [locale, setLocale] = useState<Language>('zh');

  return (
    <BizUIProvider locale={locale} localeData={colorBlockDemoLang}>
      <AntdConfigProvider locale={getAntdLocale(locale)}>
        <div>
          <LanguageSwitcher locale={locale} setLocale={setLocale} />
          <ColorBlockDemoInner />
        </div>
      </AntdConfigProvider>
    </BizUIProvider>
  );
};

export default ColorBlockDemo;
