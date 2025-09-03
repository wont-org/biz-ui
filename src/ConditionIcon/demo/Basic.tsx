import { BizUIProvider, ConditionIcon } from '@wont/biz-ui';
import type { Language } from '@wont/biz-ui/BizProvider';
import { getAntdLocale } from '@wont/biz-ui/BizProvider/hooks';
import { useTranslation } from '@wont/biz-ui/BizProvider/index';
import { ICON_TEMPLATE_OPTIONS } from '@wont/biz-ui/SelectTemplate/constant';
import { getInitialIconConditions } from '@wont/biz-ui/SelectTemplate/utils';
import { Button, ConfigProvider as AntdConfigProvider, Form, message, Space } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { OPERATOR, VALUE_TYPE } from '../constant';
import { basicDemoLang } from './locales/basicDemoLang';

interface ConditionItem {
  valueType: string;
  value: number;
}

interface FormValues {
  conditions: ConditionItem[];
  icon?: any;
}

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  const handleFinish = (values: FormValues) => {
    console.log('Success:', values);
    message.success(t('demo.submitSuccess'));
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error(t('demo.submitFailed'));
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      labelCol={{ span: 4 }}
      initialValues={{
        conditions: getInitialIconConditions({
          styleTemplate: ICON_TEMPLATE_OPTIONS[3].options[3].value,
          valueTypeMap: VALUE_TYPE,
          operatorMap: OPERATOR,
        }),
      }}
    >
      <Form.Item name="conditions">
        <ConditionIcon labelFormItemProps={{ labelCol: { span: 4 } }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('demo.buttons.submit')}
          </Button>
          <Button htmlType="reset">{t('demo.buttons.reset')}</Button>
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((values: FormValues) => {
                  console.log(t('demo.validationPassed'), values);
                })
                .catch((errorInfo: any) => {
                  console.log(t('demo.validationFailed'), errorInfo);
                });
            }}
          >
            {t('demo.buttons.validate')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
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
