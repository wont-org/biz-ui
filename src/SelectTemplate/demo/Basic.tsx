import { SelectTemplate } from '@wont/biz-ui';
import { Form } from 'antd';
import React from 'react';
import { BAR_TEMPLATE_OPTIONS } from '../constant/index';

const RichSelectDemo = () => {
  return (
    <Form labelCol={{ span: 4 }}>
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
    </Form>
  );
};

export default RichSelectDemo;
