import { BizUIProvider, EditableSelect } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import { Button, ConfigProvider as AntdConfigProvider, Form, message, Typography } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { basicDemoLang } from './locales/basicDemoLang';

const { Title, Paragraph } = Typography;

interface FormValues {
  category: string;
}

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  const initialOptions = [
    { label: t('demo.options.frontend'), value: 'frontend' },
    { label: t('demo.options.backend'), value: 'backend' },
    { label: t('demo.options.mobile'), value: 'mobile' },
    { label: t('demo.options.testing'), value: 'testing' },
  ];

  const handleFinish = (values: FormValues) => {
    console.log('Success:', values);
    message.success(t('demo.message.submitSuccess'));
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error(t('demo.message.submitFailed'));
  };

  return (
    <div>
      <Title level={4}>{t('demo.title')}</Title>
      <Paragraph>{t('demo.description')}</Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        initialValues={{
          category: 'frontend',
        }}
      >
        <Form.Item
          label={t('demo.form.label')}
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <EditableSelect
            style={{ width: 300 }}
            options={initialOptions}
            placeholder="Please select or add a category"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            {t('demo.form.submit')}
          </Button>
          <Button htmlType="reset">{t('demo.form.reset')}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default () => {
  const { id: locale } = useLocale();

  return (
    <BizUIProvider locale={locale as Language} localeData={basicDemoLang}>
      <AntdConfigProvider locale={getAntdLocale(locale as Language)}>
        <BasicDemoInner />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};
