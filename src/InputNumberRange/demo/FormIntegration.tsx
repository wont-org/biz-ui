import { BizUIProvider, InputNumberRange, useTranslation } from '@wont/biz-ui';
import { Button, Card, Form, Input, message, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { formIntegrationDemoLang } from './locales/formIntegrationDemoLang';

const { Title, Paragraph } = Typography;

const FormIntegrationDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [submittedData, setSubmittedData] = useState(null);
  const [validationResult, setValidationResult] = useState<{ success: boolean; errors?: any }>({
    success: true,
  });

  // 自定义验证函数
  const validateRange = (fieldName: string, min: number, max: number) => {
    return (_: any, value: [number, number]) => {
      if (!value || (value[0] === undefined && value[1] === undefined)) {
        return Promise.reject(new Error(t(`demo.validation.${fieldName}Required`)));
      }

      if (value[0] !== undefined && (value[0] < min || value[0] > max)) {
        return Promise.reject(new Error(t(`demo.validation.${fieldName}Invalid`)));
      }

      if (value[1] !== undefined && (value[1] < min || value[1] > max)) {
        return Promise.reject(new Error(t(`demo.validation.${fieldName}Invalid`)));
      }

      if (value[0] !== undefined && value[1] !== undefined && value[0] > value[1]) {
        return Promise.reject(new Error('Start value must be less than or equal to end value'));
      }

      return Promise.resolve();
    };
  };

  const onFinish = (values: any) => {
    console.log('Form submitted:', values);
    setSubmittedData(values);
    message.success(t('demo.results.submitSuccess'));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
    setValidationResult({ success: false, errors: errorInfo });
    message.error(t('demo.results.hasErrors'));
  };

  const handleValidateOnly = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Validation passed:', values);
        setValidationResult({ success: true });
        message.success(t('demo.results.allValid'));
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
        setValidationResult({ success: false, errors: errorInfo });
        message.error(t('demo.results.hasErrors'));
      });
  };

  const handleReset = () => {
    form.resetFields();
    setSubmittedData(null);
    setValidationResult({ success: true });
  };

  return (
    <div>
      <Title level={4}>{t('demo.descriptions.formIntegration')}</Title>
      <Paragraph>{t('demo.descriptions.validation')}</Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title={t('demo.labels.personalInfo')}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: '',
              ageRange: [25, 35],
              salaryRange: [80, 150],
              scoreRange: [70, 90],
              experienceRange: [2, 8],
            }}
          >
            {/* 姓名 */}
            <Form.Item
              label={t('demo.labels.name')}
              name="name"
              rules={[
                { required: true, message: t('demo.validation.nameRequired') },
                { min: 2, message: 'Name must be at least 2 characters' },
              ]}
            >
              <Input placeholder={t('demo.placeholders.enterName')} style={{ width: 300 }} />
            </Form.Item>

            {/* 年龄区间 */}
            <Form.Item
              label={t('demo.labels.ageRange')}
              name="ageRange"
              rules={[{ validator: validateRange('ageRange', 0, 120) }]}
            >
              <InputNumberRange
                style={{ width: 300 }}
                placeholder={[t('demo.placeholders.minAge'), t('demo.placeholders.maxAge')]}
                inputNumberProps={{
                  min: 0,
                  max: 120,
                }}
              />
            </Form.Item>

            {/* 期望薪资区间 */}
            <Form.Item
              label={t('demo.labels.salaryRange')}
              name="salaryRange"
              rules={[{ validator: validateRange('salaryRange', 1, 1000) }]}
            >
              <InputNumberRange
                style={{ width: 300 }}
                placeholder={[t('demo.placeholders.minSalary'), t('demo.placeholders.maxSalary')]}
                inputNumberProps={{
                  min: 1,
                  max: 1000,
                  formatter: (value) => `${value}K`,
                  parser: (value) => Number(value?.replace('K', '')),
                }}
              />
            </Form.Item>

            {/* 分数区间 */}
            <Form.Item
              label={t('demo.labels.scoreRange')}
              name="scoreRange"
              rules={[{ validator: validateRange('scoreRange', 0, 100) }]}
            >
              <InputNumberRange
                style={{ width: 300 }}
                placeholder={[t('demo.placeholders.minScore'), t('demo.placeholders.maxScore')]}
                inputNumberProps={{
                  min: 0,
                  max: 100,
                  precision: 1,
                }}
              />
            </Form.Item>

            {/* 工作年限 */}
            <Form.Item
              label={t('demo.labels.experienceRange')}
              name="experienceRange"
              rules={[{ validator: validateRange('experience', 0, 50) }]}
            >
              <InputNumberRange
                style={{ width: 300 }}
                placeholder={[t('demo.placeholders.minYears'), t('demo.placeholders.maxYears')]}
                inputNumberProps={{
                  min: 0,
                  max: 50,
                }}
              />
            </Form.Item>

            {/* 按钮 */}
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t('demo.buttons.submit')}
                </Button>
                <Button onClick={handleValidateOnly}>{t('demo.buttons.validateOnly')}</Button>
                <Button onClick={handleReset}>{t('demo.buttons.reset')}</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* 提交结果显示 */}
        {submittedData && (
          <Card title={t('demo.results.formData')} size="small">
            <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4 }}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </Card>
        )}

        {/* 验证结果显示 */}
        <Card title={t('demo.results.validationResult')} size="small">
          <div
            style={{
              color: validationResult.success ? '#52c41a' : '#f5222d',
              marginBottom: 8,
            }}
          >
            {validationResult.success ? t('demo.results.allValid') : t('demo.results.hasErrors')}
          </div>
          {!validationResult.success && validationResult.errors && (
            <pre
              style={{
                background: '#fff2f0',
                border: '1px solid #ffccc7',
                padding: 16,
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              {JSON.stringify(validationResult.errors, null, 2)}
            </pre>
          )}
        </Card>
      </Space>
    </div>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={formIntegrationDemoLang}>
      <FormIntegrationDemoInner />
    </BizUIProvider>
  );
};
