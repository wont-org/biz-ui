import { BizUIProvider } from '@wont/biz-ui';
import { Language, useTranslation } from '@wont/biz-ui/BizProvider/index';
import ColorPicker from '@wont/biz-ui/ColorPicker';
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
import DataGradingConfigTableDemo from '../../DataGrading/demo';
import { getAntdLocale } from '../hooks';

const { Title, Text } = Typography;

// 语言切换器组件
function LanguageSwitcher({
  locale,
  setLocale,
}: {
  locale: Language;
  setLocale: (locale: Language) => void;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4}>语言切换 / Language Switching</Title>
      <Space>
        <Button
          type={locale === 'zh-CN' ? 'primary' : 'default'}
          onClick={() => setLocale('zh-CN')}
        >
          中文
        </Button>
        <Button
          type={locale === 'en-US' ? 'primary' : 'default'}
          onClick={() => setLocale('en-US')}
        >
          English
        </Button>
      </Space>
    </div>
  );
}

// 公共翻译演示组件
function CommonTranslationDemo() {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: 16 }}>
      <Title level={5}>公共翻译演示 / Common Translation</Title>
      <Space direction="vertical" size="middle">
        <div>
          <Text strong>操作按钮 / Operation Buttons: </Text>
          <Space>
            <Button type="primary">{t('common.operation.confirm')}</Button>
            <Button>{t('common.operation.cancel')}</Button>
            <Button>{t('common.operation.delete')}</Button>
            <Button>{t('common.operation.edit')}</Button>
          </Space>
        </div>
        <div>
          <Text strong>状态文本 / Status Text: </Text>
          <div>
            <Text>{t('common.status.loading')}</Text>
            <br />
            <Text>{t('common.status.total', { total: 100 })}</Text>
            <br />
            <Text>{t('common.status.selected', { count: 5 })}</Text>
          </div>
        </div>
      </Space>
    </div>
  );
}

// 组件演示区块
function ComponentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Divider />
      <Title level={4}>{title}</Title>
      {children}
    </>
  );
}

function I18nDemo({
  locale,
  setLocale,
}: {
  locale: Language;
  setLocale: (locale: Language) => void;
}) {
  const [selectedColor, setSelectedColor] = useState<string>('#1677ff');

  return (
    <Card>
      <LanguageSwitcher locale={locale} setLocale={setLocale} />

      <CommonTranslationDemo />

      <ComponentSection title="表单组件 / Form Components">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* ColorPicker 演示 */}
          <div>
            <Title level={5}>ColorPicker 颜色选择器</Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>基础用法 / Basic Usage: </Text>
                <ColorPicker value={selectedColor} onChange={setSelectedColor} />
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Text>当前颜色 / Current Color: {selectedColor}</Text>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      background: selectedColor,
                      border: '1px solid #d9d9d9',
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
              <div>
                <Text strong>图标触发器 / Icon Trigger: </Text>
                <ColorPicker value={selectedColor} onChange={setSelectedColor} trigger="icon" />
              </div>
              <div>
                <Text strong>自定义预设组 / Custom Preset Groups: </Text>
                <ColorPicker
                  value={selectedColor}
                  onChange={setSelectedColor}
                  presets={[
                    {
                      title: '主题色 / Theme Colors',
                      colors: [
                        { value: '#1677ff', label: '主蓝色 / Primary Blue' },
                        { value: '#52c41a', label: '成功绿 / Success Green' },
                        { value: '#fa8c16', label: '警告橙 / Warning Orange' },
                        { value: '#f5222d', label: '错误红 / Error Red' },
                      ],
                    },
                    {
                      title: '灰度 / Grayscale',
                      colors: [
                        { value: '#000000', label: '黑色 / Black' },
                        { value: '#666666', label: '深灰 / Dark Gray' },
                        { value: '#999999', label: '中灰 / Medium Gray' },
                        { value: '#cccccc', label: '浅灰 / Light Gray' },
                        { value: '#ffffff', label: '白色 / White' },
                      ],
                    },
                  ]}
                />
              </div>
              <div>
                <Text strong>只读模式 / Read Only: </Text>
                <ColorPicker value={selectedColor} readOnly />
              </div>
            </Space>
          </div>

          {/* FilterList 演示 */}
          <div>
            <Title level={5}>FilterList 筛选列表</Title>
            <BizUIProvider
              locale={locale}
              localeData={{
                common: {
                  form: {
                    input: {
                      enUS: 'Input Example',
                      zhCN: '输入示例',
                    },
                  },
                },
              }}
            >
              <FilterListBasicDemo />
            </BizUIProvider>
          </div>
        </Space>
      </ComponentSection>

      <ComponentSection title="数据展示 / Data Display">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* DataBar 演示 */}
          <div>
            <Title level={5}>DataBar 数据条</Title>
            <DataBarConfigTableDemo />
          </div>

          {/* DataGrading 演示 */}
          <div>
            <Title level={5}>DataGrading 数据分级</Title>
            <DataGradingConfigTableDemo />
          </div>
        </Space>
      </ComponentSection>
    </Card>
  );
}

export default () => {
  const [locale, setLocale] = useState<Language>('zh-CN');
  return (
    <BizUIProvider locale={locale}>
      <AntdConfigProvider locale={getAntdLocale(locale)}>
        <I18nDemo locale={locale} setLocale={setLocale} />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};
