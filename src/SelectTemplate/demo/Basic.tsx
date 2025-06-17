import { SelectTemplate } from '@wont/biz-ui';
import { Button, Form, Space } from 'antd';
import React from 'react';
import { BAR_TEMPLATE_OPTIONS } from '../constant/index';

const RichSelectDemo = () => {
  return (
    <Form
      labelCol={{ span: 6 }}
      initialValues={{
        readonly: {
          value: [
            BAR_TEMPLATE_OPTIONS[1].options[0].value,
            BAR_TEMPLATE_OPTIONS[1].options[1].value,
          ],
          isGrading: true,
        },
      }}
    >
      <Form.Item label="只读必须有value或selectedTemplate" name="readonly">
        <SelectTemplate
          options={BAR_TEMPLATE_OPTIONS}
          showOptionLabel={false}
          compareKeys={['value', 'isGrading']}
          readOnly
        />
      </Form.Item>
      <Form.Item label="数据条" name="bar">
        <SelectTemplate
          options={BAR_TEMPLATE_OPTIONS}
          showOptionLabel={false}
          compareKeys={['value', 'isGrading']}
        />
      </Form.Item>
      {/* <Form.Item label="色阶" name="grading">
        <SelectTemplate
          options={GRADING_TEMPLATE_OPTIONS}
          rowWrapCount={4}
          showOptionLabel={false}
          compareKeys={['value']}
        />
      </Form.Item>
      <Form.Item label="图标集" name="icon">
        <SelectTemplate options={ICON_TEMPLATE_OPTIONS} rowWrapCount={2} compareKeys={['value']} />
      </Form.Item> */}
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RichSelectDemo;
