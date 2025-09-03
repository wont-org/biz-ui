import { BizUIProvider, MultipleSelect, useTranslation } from '@wont/biz-ui';
import { Button, Card, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { basicDemoLang } from './locales/basicDemoLang';

const { Title, Paragraph, Text } = Typography;

const BasicDemoInner = () => {
  const { t } = useTranslation();

  // 水果选择
  const [fruitValues, setFruitValues] = useState<string[]>(['apple', 'banana']);

  // 颜色选择
  const [colorValues, setColorValues] = useState<string[]>([]);

  // 动物选择
  const [animalValues, setAnimalValues] = useState<string[]>(['cat']);

  // 自定义占位符示例
  const [customValues, setCustomValues] = useState<string[]>([]);

  // 生成选项数据
  const getFruitOptions = () => {
    const fruits = t('demo.options.fruits') as unknown as Record<string, string>;
    return Object.keys(fruits).map((key) => ({
      label: fruits[key],
      value: key,
    }));
  };

  const getColorOptions = () => {
    const colors = t('demo.options.colors') as unknown as Record<string, string>;
    return Object.keys(colors).map((key) => ({
      label: colors[key],
      value: key,
    }));
  };

  const getAnimalOptions = () => {
    const animals = t('demo.options.animals') as unknown as Record<string, string>;
    return Object.keys(animals).map((key) => ({
      label: animals[key],
      value: key,
    }));
  };

  const handleShowValues = () => {
    console.log('Current Values:', {
      fruits: fruitValues,
      colors: colorValues,
      animals: animalValues,
      custom: customValues,
    });
  };

  const handleClearAll = () => {
    setFruitValues([]);
    setColorValues([]);
    setAnimalValues([]);
    setCustomValues([]);
  };

  const handleResetToDefault = () => {
    setFruitValues(['apple', 'banana']);
    setColorValues(['red', 'blue']);
    setAnimalValues(['cat']);
    setCustomValues(['apple', 'red']);
  };

  const formatSelectedCount = (values: string[]) => {
    if (values.length === 0) {
      return t('demo.messages.noSelection');
    }
    return t('demo.messages.selectedCount', { count: values.length });
  };

  return (
    <div>
      <Title level={4}>{t('demo.descriptions.basic')}</Title>
      <Paragraph>{t('demo.descriptions.customPlaceholder')}</Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 基础水果选择 */}
        <Card title={t('demo.labels.basicFruits')} size="small">
          <MultipleSelect
            style={{ width: '100%' }}
            placeholder={t('demo.placeholders.selectFruits')}
            options={getFruitOptions()}
            value={fruitValues}
            onChange={setFruitValues}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            <Text type="secondary">
              {t('demo.messages.currentValues')} {formatSelectedCount(fruitValues, 'fruits')}
            </Text>
          </div>
        </Card>

        {/* 颜色选择 */}
        <Card title={t('demo.labels.colorSelection')} size="small">
          <MultipleSelect
            style={{ width: '100%' }}
            placeholder={t('demo.placeholders.selectColors')}
            options={getColorOptions()}
            value={colorValues}
            onChange={setColorValues}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            <Text type="secondary">
              {t('demo.messages.currentValues')} {formatSelectedCount(colorValues, 'colors')}
            </Text>
          </div>
        </Card>

        {/* 动物选择 */}
        <Card title={t('demo.labels.animalSelection')} size="small">
          <MultipleSelect
            style={{ width: '100%' }}
            placeholder={t('demo.placeholders.selectAnimals')}
            options={getAnimalOptions()}
            value={animalValues}
            onChange={setAnimalValues}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            <Text type="secondary">
              {t('demo.messages.currentValues')} {formatSelectedCount(animalValues, 'animals')}
            </Text>
          </div>
        </Card>

        {/* 自定义占位符示例 */}
        <Card title={t('demo.labels.customPlaceholder')} size="small">
          <MultipleSelect
            style={{ width: '100%' }}
            placeholder={t('demo.placeholders.chooseYourFavorite')}
            options={[...getFruitOptions(), ...getColorOptions()]}
            value={customValues}
            onChange={setCustomValues}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            <Text type="secondary">
              {t('demo.messages.currentValues')} {formatSelectedCount(customValues, 'mixed')}
            </Text>
          </div>
        </Card>

        {/* 操作按钮 */}
        <Space>
          <Button type="primary" onClick={handleShowValues}>
            {t('demo.buttons.getCurrentValues')}
          </Button>
          <Button onClick={handleResetToDefault}>{t('demo.buttons.resetToDefault')}</Button>
          <Button onClick={handleClearAll}>{t('demo.buttons.clearAll')}</Button>
        </Space>

        {/* 当前选择状态显示 */}
        <Card
          title={t('demo.messages.currentValues')}
          size="small"
          style={{ backgroundColor: '#fafafa' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>🍎 {t('demo.labels.basicFruits')}: </Text>
              <Text code>
                {fruitValues.length > 0 ? fruitValues.join(', ') : t('demo.messages.noSelection')}
              </Text>
            </div>
            <div>
              <Text strong>🎨 {t('demo.labels.colorSelection')}: </Text>
              <Text code>
                {colorValues.length > 0 ? colorValues.join(', ') : t('demo.messages.noSelection')}
              </Text>
            </div>
            <div>
              <Text strong>🐾 {t('demo.labels.animalSelection')}: </Text>
              <Text code>
                {animalValues.length > 0 ? animalValues.join(', ') : t('demo.messages.noSelection')}
              </Text>
            </div>
            <div>
              <Text strong>🌟 {t('demo.labels.customPlaceholder')}: </Text>
              <Text code>
                {customValues.length > 0 ? customValues.join(', ') : t('demo.messages.noSelection')}
              </Text>
            </div>
          </Space>
        </Card>
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
