import { BizUIProvider, MultipleSelect, useTranslation } from '@wont/biz-ui';
import { Button, Card, Space, Spin, Switch, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useEffect, useState } from 'react';
import { advancedDemoLang } from './locales/advancedDemoLang';

const { Title, Paragraph, Text } = Typography;

const AdvancedDemoInner = () => {
  const { t } = useTranslation();

  // 自定义字段名示例
  const [departmentValues, setDepartmentValues] = useState<string[]>(['engineering']);

  // 异步加载示例
  const [cityValues, setCityValues] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [cityLoading, setCityLoading] = useState(false);

  // 禁用状态示例
  const [skillValues, setSkillValues] = useState<string[]>(['javascript', 'react']);
  const [isDisabled, setIsDisabled] = useState(false);

  // 大数据集示例
  const [largeDataValues, setLargeDataValues] = useState<string[]>([]);
  const [largeDataOptions, setLargeDataOptions] = useState<any[]>([]);

  // 生成部门选项（自定义字段名）
  const getDepartmentOptions = () => {
    const departments = t('demo.dataSource.departments') as unknown as Record<string, string>;
    return Object.keys(departments).map((key) => ({
      name: departments[key], // 使用 name 作为 label 字段
      label: departments[key], // 添加 label 属性以满足类型要求
      id: key, // 使用 id 作为 value 字段
      value: key, // 添加 value 属性以满足类型要求
      description: `Department: ${departments[key]}`,
    }));
  };

  // 生成技能选项（包含禁用项）
  const getSkillOptions = () => {
    const skills = t('demo.dataSource.skills') as unknown as Record<string, string>;
    return Object.keys(skills).map((key, index) => ({
      label: skills[key],
      value: key,
      disabled: index === 2 || index === 5, // 禁用某些选项
    }));
  };

  // 模拟异步加载城市数据
  const loadCityData = async () => {
    setCityLoading(true);
    // 模拟网络延迟
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1500);
    });

    const cities = t('demo.dataSource.cities') as unknown as Record<string, string>;
    const options = Object.keys(cities).map((key) => ({
      label: cities[key],
      value: key,
    }));

    setCityOptions(options);
    setCityLoading(false);
  };

  // 生成大数据集
  const generateLargeDataSet = () => {
    const baseItems = ['Item', 'Product', 'Element', 'Component', 'Module', 'Service', 'Feature'];
    const adjectives = ['Advanced', 'Basic', 'Premium', 'Standard', 'Pro', 'Lite', 'Ultimate'];
    const categories = ['A', 'B', 'C', 'D', 'E'];

    const options = [];
    for (let i = 1; i <= 500; i++) {
      const base = baseItems[i % baseItems.length];
      const adj = adjectives[i % adjectives.length];
      const cat = categories[i % categories.length];

      options.push({
        label: `${adj} ${base} ${cat}-${i.toString().padStart(3, '0')}`,
        value: `item_${i}`,
        disabled: i % 50 === 0, // 每50个禁用一个
      });
    }

    setLargeDataOptions(options);
  };

  // 初始化大数据集
  useEffect(() => {
    generateLargeDataSet();
  }, []);

  const handleShowData = () => {
    console.log('Advanced Demo Data:', {
      departments: departmentValues,
      cities: cityValues,
      skills: skillValues,
      largeData: largeDataValues,
    });
  };

  const handleToggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div>
      <Title level={4}>{t('demo.descriptions.advanced')}</Title>
      <Paragraph>{t('demo.descriptions.fieldNames')}</Paragraph>
      <Paragraph>{t('demo.descriptions.asyncLoading')}</Paragraph>
      <Paragraph>{t('demo.descriptions.disabled')}</Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 自定义字段名示例 */}
        <Card title={t('demo.labels.customFieldNames')} size="small">
          <MultipleSelect
            style={{ width: '100%' }}
            placeholder={t('demo.placeholders.selectDepartments')}
            options={getDepartmentOptions()}
            fieldNames={{ label: 'name', value: 'id' }}
            value={departmentValues}
            onChange={setDepartmentValues}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            <Text type="secondary">{t('demo.descriptions.fieldNames')}</Text>
          </div>
        </Card>

        {/* 异步数据加载示例 */}
        <Card title={t('demo.labels.asyncData')} size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Button onClick={loadCityData} loading={cityLoading}>
                {cityLoading ? t('demo.status.loading') : t('demo.buttons.loadData')}
              </Button>
              {cityOptions.length > 0 && (
                <Button onClick={loadCityData}>{t('demo.buttons.reloadData')}</Button>
              )}
              <Text type="secondary">{cityOptions.length > 0 ? t('demo.status.loaded') : ''}</Text>
            </Space>

            <Spin spinning={cityLoading}>
              <MultipleSelect
                style={{ width: '100%' }}
                placeholder={
                  cityLoading
                    ? t('demo.placeholders.loadingData')
                    : t('demo.placeholders.selectCities')
                }
                options={cityOptions}
                value={cityValues}
                onChange={setCityValues}
                disabled={cityLoading || cityOptions.length === 0}
              />
            </Spin>
          </Space>
        </Card>

        {/* 禁用状态示例 */}
        <Card title={t('demo.labels.disabledDemo')} size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <span>{t('demo.buttons.toggleDisabled')}:</span>
              <Switch
                checked={isDisabled}
                onChange={handleToggleDisabled}
                checkedChildren={t('demo.status.disabled')}
                unCheckedChildren={t('demo.status.enabled')}
              />
              <Text type="secondary">
                {isDisabled ? t('demo.status.disabled') : t('demo.status.enabled')}
              </Text>
            </Space>

            <MultipleSelect
              style={{ width: '100%' }}
              placeholder={
                isDisabled
                  ? t('demo.placeholders.disabledSelect')
                  : t('demo.placeholders.selectSkills')
              }
              options={getSkillOptions()}
              value={skillValues}
              onChange={setSkillValues}
              disabled={isDisabled}
            />
          </Space>
        </Card>

        {/* 混合选项（部分禁用） */}
        <Card title={t('demo.labels.mixedOptions')} size="small">
          <MultipleSelect
            style={{ width: '100%' }}
            placeholder={t('demo.placeholders.selectSkills')}
            options={getSkillOptions()}
            value={skillValues}
            onChange={setSkillValues}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            <Text type="secondary">
              Note: Some options are disabled to demonstrate mixed states
            </Text>
          </div>
        </Card>

        {/* 大数据集示例 */}
        <Card title={t('demo.labels.largeDataSet')} size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Button onClick={generateLargeDataSet}>
                {t('demo.buttons.generateLargeDataSet')}
              </Button>
              <Text type="secondary">
                {t('demo.results.totalCount', { count: largeDataOptions.length })}
              </Text>
            </Space>

            <MultipleSelect
              style={{ width: '100%' }}
              placeholder="Select from 500+ items..."
              options={largeDataOptions}
              value={largeDataValues}
              onChange={setLargeDataValues}
              showSearch
              optionFilterProp="label"
            />

            {largeDataValues.length > 0 && (
              <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                <Text type="secondary">
                  Selected {largeDataValues.length} items from {largeDataOptions.length} total
                  options
                </Text>
              </div>
            )}
          </Space>
        </Card>

        {/* 操作按钮 */}
        <Space>
          <Button type="primary" onClick={handleShowData}>
            {t('demo.buttons.showSelectedData')}
          </Button>
        </Space>

        {/* 数据结构展示 */}
        <Card
          title={t('demo.results.dataStructure')}
          size="small"
          style={{ backgroundColor: '#fafafa' }}
        >
          <pre style={{ fontSize: 12, margin: 0 }}>
            {JSON.stringify(
              {
                departments: departmentValues,
                cities: cityValues,
                skills: skillValues,
                largeDataCount: largeDataValues.length,
              },
              null,
              2,
            )}
          </pre>
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
