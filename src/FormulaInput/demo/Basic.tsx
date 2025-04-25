import { FormulaInput } from '@wont/biz-ui';
import { validator } from '@wont/biz-ui/FormulaInput';
import { Button, Card, Form, Space } from 'antd';
import React from 'react';
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
        // FormulaInput: [
        //   {
        //     valueType: 'text',
        //     value: 'apple',
        //     type: 'clicks',
        //   },
        //   '-',
        //   {
        //     value: 'apple',
        //     valueType: 'text',
        //     type: 'clicks',
        //   },
        // ],
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
            validator: (rule, val) => {
              const { validateStatus, message } = validator(val);
              if (validateStatus === 'error') {
                return Promise.reject(message);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <FormulaInput
          minItem={0}
          valueSelectProps={{
            options: OPTIONS,
          }}
          typeSelectProps={{
            options: [
              {
                value: 'clicks',
                // valueType: keyof typeof FORMULA text|number
                valueType: FORMULA.text.valueType,
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
      <Form.Item
        shouldUpdate={(prevValues, curValues) => prevValues.FormulaInput !== curValues.FormulaInput}
      >
        {({ getFieldValue }) => {
          return (
            <Card title="公式数据">
              <pre>{JSON.stringify(getFieldValue('FormulaInput'), null, 2)}</pre>
            </Card>
          );
        }}
      </Form.Item>
    </Form>
  );
};
