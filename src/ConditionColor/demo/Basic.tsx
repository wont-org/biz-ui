import { ConditionColor } from '@wont/biz-ui';
import { Button, Form, message, Space } from 'antd';
import React from 'react';

interface ConditionItem {
  valueType: string;
  value: number;
  color: string;
}

interface FormValues {
  conditions: ConditionItem[];
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
        conditions: [
          { valueType: 'auto', value: undefined, color: '#6CBF63' },
          // { valueType: 'percent', value: 50, color: '#FFFFFF' },
          { valueType: 'number', value: 100, color: '#ED7B77' },
        ],
      }}
    >
      <Form.Item name="conditions">
        <ConditionColor labelFormItemProps={{ labelCol: { span: 4 } }} />
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
