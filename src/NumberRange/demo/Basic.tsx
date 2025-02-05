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
  const MAX = 303582079;
  const MIN = 0;
  const MAX_DOT_RAW = 1000.5678;
  const MAX_DOT = Math.ceil(MAX_DOT_RAW);
  const MIN_DOT_RAW = -1.5678;
  const MIN_DOT = Math.floor(MIN_DOT_RAW);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const validator = (
    rule,
    val: NumberRangeProps['value'],
    options = {
      min: MIN,
      max: MAX,
    },
  ) => {
    if (!val) {
      return Promise.reject('请补全区间');
    }
    const { message, isValid } = validate({
      ...options,
      ranges: val,
    });
    if (!isValid) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{
        numberRange1: [],
        numberRange2: [],
        numberRange3: [
          { min: -5, max: 0 },
          { min: 0, max: 5 },
        ],
        numberRange4: [],
        numberRange5: [],
        numberRange6: [],
        numberRange7: [],
        rangeNum: 5,
        rangeUnit: RANGE_TYPE.step.value,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="区间">
        <Space>
          <Form.Item>
            <span>最大值：{MAX}</span>
            <span>最小值:{MIN}</span>
          </Form.Item>
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
          const rangeUnit = getFieldValue('rangeUnit') as ValueOfConst<typeof RANGE_TYPE, 'value'>;
          const rangeNum = getFieldValue('rangeNum');
          return (
            <Form.Item
              label={RANGE_TYPE[rangeUnit].label}
              extra="大数据量时，通过rangeLimit设置最大值，默认1000，避免计算太多导致浏览器卡死。默认开启虚拟滚动"
              name="numberRange1"
              rules={[
                {
                  required: true,
                  validator: (rule, val) => validator(rule, val),
                },
              ]}
            >
              <NumberRange
                showAddButton
                showDelButton
                max={MAX}
                min={MIN}
                rangeNum={rangeUnit === RANGE_TYPE.count.value ? rangeNum : undefined}
                step={rangeUnit !== RANGE_TYPE.count.value ? rangeNum : undefined}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item
        label="传入具体区间"
        name="numberRange3"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 5,
                min: -5,
              }),
          },
        ]}
      >
        <NumberRange showDelButton />
      </Form.Item>

      <Form.Item
        label="异常情况，max===min"
        name="numberRange4"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 1,
                min: 1,
              }),
          },
        ]}
      >
        <NumberRange max={1} min={1} step={111} />
      </Form.Item>
      <Form.Item
        label="异常情况，max<min"
        name="numberRange5"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 0,
                min: 1,
              }),
          },
        ]}
      >
        <NumberRange max={0} min={1} step={111} />
      </Form.Item>
      <Form.Item
        label={`最大值：${MAX_DOT_RAW}；最小值：${MIN_DOT_RAW}`}
        name="numberRange6"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: MAX_DOT,
                min: MIN_DOT,
              }),
          },
        ]}
      >
        <NumberRange max={MAX_DOT} min={MIN_DOT} step={10} />
      </Form.Item>
      <Form.Item
        label={`区间计算向上取整案例。最大值：${1027}；最小值：${1}`}
        name="numberRange7"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 1027,
                min: 1,
              }),
          },
        ]}
      >
        <NumberRange max={1027} min={1} rangeNum={10} />
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
