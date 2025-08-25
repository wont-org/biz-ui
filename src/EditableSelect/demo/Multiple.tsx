import { BizUIProvider, EditableSelect } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import { Button, ConfigProvider as AntdConfigProvider, Form, message, Typography } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { multipleDemoLang } from './locales/multipleDemoLang';

const { Title, Paragraph } = Typography;

interface FormValues {
  skills: string[];
}

const MultipleDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  const initialOptions = [
    { label: t('demo.options.javascript'), value: 'javascript' },
    { label: t('demo.options.typescript'), value: 'typescript' },
    { label: t('demo.options.react'), value: 'react' },
    { label: t('demo.options.vue'), value: 'vue' },
    { label: t('demo.options.angular'), value: 'angular' },
    { label: t('demo.options.nodejs'), value: 'nodejs' },
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
          skills: ['javascript', 'react'],
        }}
      >
        <Form.Item
          label={t('demo.form.label')}
          name="skills"
          rules={[{ required: true, message: 'Please select at least one skill' }]}
        >
          <EditableSelect
            style={{ width: 400 }}
            mode="multiple"
            options={initialOptions}
            placeholder="Please select or add skills"
            maxTagCount="responsive"
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
    <BizUIProvider locale={locale as Language} localeData={multipleDemoLang}>
      <AntdConfigProvider locale={getAntdLocale(locale as Language)}>
        <MultipleDemoInner />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};
