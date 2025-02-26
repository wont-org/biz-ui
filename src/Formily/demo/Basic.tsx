import { CheckBoxWithAll, InputWithDefault, SwitchPro } from '@wont/biz-ui';
import { Button, Form } from 'antd';
import React from 'react';
import EditableSelect from '../EditableSelect';

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
        checkBoxWithAll: [],
        switchPro: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="CheckBoxWithAll"
        name="checkBoxWithAll"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <CheckBoxWithAll options={OPTIONS} />
      </Form.Item>
      <Form.Item
        label="SwitchPro"
        name="switchPro"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SwitchPro activeValue={1} inactiveValue={2} />
      </Form.Item>
      <Form.Item
        label="Input with clear count"
        name="InputWithDefault"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputWithDefault maxLength={11} />
      </Form.Item>
      <Form.Item
        label="EditableSelect"
        name="EditableSelect"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <EditableSelect options={OPTIONS} />
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
