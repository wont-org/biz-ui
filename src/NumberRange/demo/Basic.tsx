import { NumberRange } from '@wont/biz-ui';
import { Button, Form } from 'antd';
import React from 'react';
import { NumberRangeProps, validate } from '..';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const validator = (rule, val: NumberRangeProps['value']) => {
    if (!val) {
      return Promise.reject('请补全区间');
    }
    const { message, isValid } = validate({
      min: -20,
      max: 30,
      ranges: val,
    });
    if (!isValid) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        numberRange1: [],
        numberRange2: [],
        numberRange3: [
          { min: -5, max: 0 },
          { min: 0, max: 5 },
        ],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="按区间生成"
        name="numberRange1"
        rules={[
          {
            required: true,
            validator,
          },
        ]}
      >
        <NumberRange showAddButton showDelButton max={30} min={-20} rangeNum={5} />
      </Form.Item>
      <Form.Item
        label="按步长生成"
        name="numberRange2"
        rules={[
          {
            required: true,
            validator,
          },
        ]}
      >
        <NumberRange max={30} min={-20} step={30} />
      </Form.Item>
      <Form.Item
        label="传入数值区间"
        name="numberRange3"
        rules={[
          {
            required: true,
            validator,
          },
        ]}
      >
        <NumberRange />
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
