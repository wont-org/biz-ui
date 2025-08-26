import { BizUIProvider, FormulaInput, useTranslation } from '@wont/biz-ui';
import { validator } from '@wont/biz-ui/FormulaInput/utils';
import { Button, Card, Form, Space } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { FORMULA } from '../constant';
import { advancedDemoLang } from './locales/advancedDemoLang';

// 模拟不同类型的值对应不同的选项
const getValueOptions = (type?: string | number | null, t?: any) => {
  if (type === 'clicks') {
    return {
      options: [
        { value: 'pageViews', label: t ? t('demo.options.pageViews') : 'Page Views' },
        {
          value: 'uniqueVisitors',
          label: t ? t('demo.options.uniqueVisitors') : 'Unique Visitors',
        },
        { value: 'clickCount', label: t ? t('demo.options.clickCount') : 'Click Count' },
      ],
    };
  }
  if (type === 'conversions') {
    return {
      options: [
        { value: 'purchases', label: t ? t('demo.options.purchases') : 'Purchases' },
        { value: 'signups', label: t ? t('demo.options.signups') : 'Signups' },
        { value: 'downloads', label: t ? t('demo.options.downloads') : 'Downloads' },
      ],
    };
  }
  if (type === 'time') {
    return {
      options: [
        { value: 'avgTime', label: t ? t('demo.options.avgTime') : 'Average Time' },
        { value: 'bounceRate', label: t ? t('demo.options.bounceRate') : 'Bounce Rate' },
        {
          value: 'sessionDuration',
          label: t ? t('demo.options.sessionDuration') : 'Session Duration',
        },
      ],
    };
  }

  // 默认返回空选项
  return {
    options: [],
  };
};

// 模拟异步获取选项
const getAsyncValueOptions = async (type?: string | number | null, t?: any) => {
  // 模拟网络请求延迟
  return new Promise<ReturnType<typeof getValueOptions>>((resolve) => {
    setTimeout(() => {
      resolve(getValueOptions(type, t));
    }, 1000);
  });
};

const AdvancedDemoInner = () => {
  const { t } = useTranslation();
  const [useAsync, setUseAsync] = useState(true);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type={useAsync ? 'primary' : 'default'} onClick={() => setUseAsync(true)}>
          {t('demo.descriptions.asyncOptions')}
        </Button>
        <Button type={!useAsync ? 'primary' : 'default'} onClick={() => setUseAsync(false)}>
          {t('demo.descriptions.syncOptions')}
        </Button>
      </Space>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          FormulaInput: {
            formula: [
              {
                valueType: 'text',
                value: 'pageViews',
                type: 'clicks',
              },
              '+',
              {
                valueType: 'text',
                value: 'purchases',
                type: 'conversions',
              },
              '/',
              {
                valueType: 'number',
                value: 100,
                type: 'number',
              },
            ],
            name: t('demo.fields.exampleFormulaName'),
            precision: 2,
          },
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label={t('demo.fields.dynamicFormula')}
          name="FormulaInput"
          rules={[
            {
              required: true,
              validator: (rule, val) => {
                const { validateStatus, message } = validator(val, { t });
                if (validateStatus === 'error') {
                  return Promise.reject(message);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <FormulaInput
            nameInputProps={{
              useName: true,
              minLength: 1,
              maxLength: 50,
              showCount: true,
            }}
            valueSelectProps={
              useAsync
                ? (type: any) => getAsyncValueOptions(type, t)
                : (type: any) => getValueOptions(type, t)
            }
            typeSelectProps={{
              options: [
                {
                  value: 'clicks',
                  valueType: FORMULA.text.valueType,
                  label: t('demo.metrics.clickMetrics'),
                },
                {
                  value: 'conversions',
                  valueType: FORMULA.text.valueType,
                  label: t('demo.metrics.conversionMetrics'),
                },
                {
                  value: 'time',
                  valueType: FORMULA.text.valueType,
                  label: t('demo.metrics.timeMetrics'),
                },
                ...Object.values(FORMULA).map((item) => ({
                  ...item,
                  label: t(item.labelKey),
                })),
              ],
            }}
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('demo.buttons.submit')}
            </Button>
            <Button onClick={resetForm}>{t('demo.buttons.reset')}</Button>
          </Space>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.FormulaInput !== curValues.FormulaInput
          }
        >
          {({ getFieldValue }) => {
            return (
              <Card title={t('demo.cards.formulaData')}>
                <pre>{JSON.stringify(getFieldValue('FormulaInput'), null, 2)}</pre>
              </Card>
            );
          }}
        </Form.Item>
      </Form>
    </>
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
