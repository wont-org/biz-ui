import { FormulaInput } from '@wont/biz-ui';
import { Button, Form, Space } from 'antd';
import React from 'react';
import { validator } from '..';
import { FORMULA } from '../constant';

const OPTIONS = [
  {
    value: 'apple',
    label: '苹果',
  },
  {
    value: 'bannan',
    label: '香蕉',
  },
  {
    value: 'orange',
    label: '橙子',
  },
];
export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        FormulaInput: [],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="FormulaInput"
        name="FormulaInput"
        rules={[
          {
            required: true,
            validator: (rule, val) => validator(rule, val),
          },
        ]}
      >
        <FormulaInput
          valueSelectProps={{
            options: OPTIONS,
          }}
          typeSelectProps={{
            options: [
              {
                value: 'clicks',
                valueType: 'text',
                label: '点击数(clicks)',
              },
              ...Object.values(FORMULA),
            ],
          }}
        />
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
