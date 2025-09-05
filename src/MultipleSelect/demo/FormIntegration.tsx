import { BizUIProvider, MultipleSelect, useTranslation } from '@wont/biz-ui';
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

  // 生成选项数据
  const getColorOptions = () => {
    const colors = t('demo.options.colors') as unknown as Record<string, string>;
    return Object.keys(colors).map((key) => ({
      label: colors[key],
      value: key,
    }));
  };

  const getHobbyOptions = () => {
    const hobbies = t('demo.options.hobbies') as unknown as Record<string, string>;
    return Object.keys(hobbies).map((key) => ({
      label: hobbies[key],
      value: key,
    }));
  };

  const getSkillOptions = () => {
    const skills = t('demo.options.skills') as unknown as Record<string, string>;
    return Object.keys(skills).map((key) => ({
      label: skills[key],
      value: key,
    }));
  };

  const getLanguageOptions = () => {
    const languages = t('demo.options.languages') as unknown as Record<string, string>;
    return Object.keys(languages).map((key) => ({
      label: languages[key],
      value: key,
    }));
  };

  const getCompanyOptions = () => {
    const companies = t('demo.options.companies') as unknown as Record<string, string>;
    return Object.keys(companies).map((key) => ({
      label: companies[key],
      value: key,
    }));
  };

  // 自定义验证函数
  const validateMaxItems = (max: number, fieldName: string) => {
    return (_: any, value: string[]) => {
      if (value && value.length > max) {
        return Promise.reject(new Error(t(`demo.validation.max${fieldName}Exceeded`)));
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

  const handleFillSampleData = () => {
    form.setFieldsValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      favoriteColors: ['blue', 'green'],
      hobbies: ['reading', 'music', 'travel'],
      skills: ['frontend', 'backend'],
      languages: ['javascript', 'typescript', 'python'],
      companies: ['google', 'microsoft'],
    });
    message.success(t('demo.results.sampleDataFilled'));
  };

  return (
    <div>
      <Title level={4}>{t('demo.descriptions.formIntegration')}</Title>
      <Paragraph>{t('demo.descriptions.validation')}</Paragraph>
      <Paragraph>{t('demo.descriptions.dynamicForm')}</Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title={t('demo.labels.userInfo')}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              favoriteColors: ['blue'],
              hobbies: ['reading'],
              skills: ['frontend'],
              languages: ['javascript'],
            }}
          >
            {/* 基本信息 */}
            <Form.Item
              label={t('demo.labels.name')}
              name="name"
              rules={[
                { required: true, message: t('demo.validation.nameRequired') },
                { min: 2, message: 'Name must be at least 2 characters' },
              ]}
            >
              <Input placeholder={t('demo.placeholders.enterName')} />
            </Form.Item>

            <Form.Item
              label={t('demo.labels.email')}
              name="email"
              rules={[
                { required: true, message: t('demo.validation.emailRequired') },
                { type: 'email', message: t('demo.validation.emailInvalid') },
              ]}
            >
              <Input placeholder={t('demo.placeholders.enterEmail')} />
            </Form.Item>

            {/* 偏好设置 */}
            <Title level={5}>{t('demo.labels.preferences')}</Title>

            <Form.Item
              label={t('demo.labels.favoriteColors')}
              name="favoriteColors"
              rules={[
                { required: true, message: t('demo.validation.colorsRequired') },
                { validator: validateMaxItems(3, 'Colors') },
              ]}
            >
              <MultipleSelect
                placeholder={t('demo.placeholders.selectColors')}
                options={getColorOptions()}
              />
            </Form.Item>

            <Form.Item
              label={t('demo.labels.hobbies')}
              name="hobbies"
              rules={[
                { required: true, message: t('demo.validation.hobbiesRequired') },
                { validator: validateMaxItems(5, 'Hobbies') },
              ]}
            >
              <MultipleSelect
                placeholder={t('demo.placeholders.selectHobbies')}
                options={getHobbyOptions()}
              />
            </Form.Item>

            {/* 专业技能 */}
            <Title level={5}>{t('demo.labels.workExperience')}</Title>

            <Form.Item
              label={t('demo.labels.skills')}
              name="skills"
              rules={[{ required: true, message: t('demo.validation.skillsRequired') }]}
            >
              <MultipleSelect
                placeholder={t('demo.placeholders.selectSkills')}
                options={getSkillOptions()}
              />
            </Form.Item>

            <Form.Item
              label={t('demo.labels.languages')}
              name="languages"
              rules={[{ required: true, message: t('demo.validation.languagesRequired') }]}
            >
              <MultipleSelect
                placeholder={t('demo.placeholders.selectLanguages')}
                options={getLanguageOptions()}
              />
            </Form.Item>

            <Form.Item label={t('demo.labels.companies')} name="companies">
              <MultipleSelect
                placeholder={t('demo.placeholders.selectCompanies')}
                options={getCompanyOptions()}
              />
            </Form.Item>

            {/* 操作按钮 */}
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t('demo.buttons.submit')}
                </Button>
                <Button onClick={handleValidateOnly}>{t('demo.buttons.validateOnly')}</Button>
                <Button onClick={handleReset}>{t('demo.buttons.reset')}</Button>
                <Button onClick={handleFillSampleData}>{t('demo.buttons.fillSampleData')}</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* 提交结果显示 */}
        {submittedData && (
          <Card title={t('demo.results.formData')} size="small">
            <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, fontSize: 12 }}>
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
