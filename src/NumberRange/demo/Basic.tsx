import { NumberRange } from '@wont/biz-ui';
import { Button, Form, InputNumber, Select, Space } from 'antd';
import React from 'react';
import { NumberRangeProps, validate } from '..';
import { RANGE_TYPE } from './constant';

export type ValueOf<T> = T[keyof T];
export type ValueOfConst<T, K extends keyof T[keyof T]> = T[keyof T][K];
// interface DemoValues {
//   rangeUnit: ValueOfConst<typeof RANGE_TYPE, 'value'>;
//   rangeNum: number;
// }
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
        rangeNum: 5,
        rangeUnit: RANGE_TYPE.count.value,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="区间">
        <Space>
          <Form.Item name="rangeUnit">
            <Select options={Object.values(RANGE_TYPE)} />
          </Form.Item>
          <Form.Item name="rangeNum">
            <InputNumber />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item
        shouldUpdate={(pre, next) => {
          return pre.rangeNum !== next.rangeNum || pre.rangeUnit !== next.rangeUnit;
        }}
      >
        {({ getFieldValue }) => {
          const rangeUnit = getFieldValue('rangeUnit');
          const rangeNum = getFieldValue('rangeNum');
          return (
            <Form.Item
              label={RANGE_TYPE[rangeUnit].label}
              name="numberRange1"
              rules={[
                {
                  required: true,
                  validator,
                },
              ]}
            >
              <NumberRange
                showAddButton
                showDelButton
                max={30}
                min={-20}
                rangeNum={rangeUnit === RANGE_TYPE.count.value ? rangeNum : undefined}
                step={rangeUnit !== RANGE_TYPE.count.value ? rangeNum : undefined}
              />
            </Form.Item>
          );
        }}
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
