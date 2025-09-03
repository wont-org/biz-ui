import { BizUIProvider, EditableSelect } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import { Button, ConfigProvider as AntdConfigProvider, Form, message, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { serverDemoLang } from './locales/serverDemoLang';

const { Title, Paragraph } = Typography;

interface FormValues {
  team: string;
}

const ServerDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  const [options, setOptions] = useState([
    { label: t('demo.options.development'), value: 'development' },
    { label: t('demo.options.design'), value: 'design' },
    { label: t('demo.options.product'), value: 'product' },
    { label: t('demo.options.operations'), value: 'operations' },
  ]);

  // 模拟服务端API调用
  const simulateServerCall = (delay = 1000) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% 成功率
        if (Math.random() > 0.1) {
          resolve(true);
        } else {
          reject(new Error('Server error'));
        }
      }, delay);
    });
  };

  const handleAdd = async (option: DefaultOptionType & { label: string }) => {
    try {
      await simulateServerCall();
      setOptions((prev) => [...prev, { label: option.label, value: option.label }]);
      message.success(t('demo.message.addSuccess'));
    } catch (error) {
      message.error(t('demo.message.operationFailed'));
    }
  };

  const handleEdit = async (option: DefaultOptionType) => {
    try {
      await simulateServerCall();
      setOptions((prev) =>
        prev.map((item) =>
          item.value === option.value ? { ...item, label: option.label as string } : item,
        ),
      );
      message.success(t('demo.message.editSuccess'));
    } catch (error) {
      message.error(t('demo.message.operationFailed'));
    }
  };

  const handleDelete = async (option: DefaultOptionType) => {
    try {
      await simulateServerCall();
      setOptions((prev) => prev.filter((item) => item.value !== option.value));
      message.success(t('demo.message.deleteSuccess'));
    } catch (error) {
      message.error(t('demo.message.operationFailed'));
    }
  };

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
          team: 'development',
        }}
      >
        <Form.Item
          label={t('demo.form.label')}
          name="team"
          rules={[{ required: true, message: t('demo.form.validation') }]}
        >
          <EditableSelect
            style={{ width: 300 }}
            options={options}
            isServer={true}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            placeholder={t('demo.form.placeholder')}
            popconfirmProps={{
              title: t('demo.confirm.deleteTeam'),
              okText: t('common.operation.confirm'),
              cancelText: t('common.operation.cancel'),
            }}
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
    <BizUIProvider locale={locale as Language} localeData={serverDemoLang}>
      <AntdConfigProvider locale={getAntdLocale(locale as Language)}>
        <ServerDemoInner />
      </AntdConfigProvider>
    </BizUIProvider>
  );
};
