import { ConditionIcon } from '@wont/biz-ui';
import { ICON_TEMPLATE_OPTIONS } from '@wont/biz-ui/SelectTemplate/constant';
import { getInitialIconConditions } from '@wont/biz-ui/SelectTemplate/utils';
import { Button, Form, message, Space } from 'antd';
import React from 'react';
import { OPERATOR, VALUE_TYPE } from '../constant';

interface ConditionItem {
  valueType: string;
  value: number;
}

interface FormValues {
  conditions: ConditionItem[];
  icon?: any;
}

export default () => {
  const [form] = Form.useForm<FormValues>();

  const handleFinish = (values: FormValues) => {
    console.log('Success:', values);
    message.success('提交成功');
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('提交失败，请检查表单');
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
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((values: FormValues) => {
                  console.log('验证通过:', values);
                })
                .catch((errorInfo: any) => {
                  console.log('验证失败:', errorInfo);
                });
            }}
          >
            验证
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
