import { FormulaInput } from '@wont/biz-ui';
import { FormulaInputProps } from '@wont/biz-ui/FormulaInput/type';
import { validator } from '@wont/biz-ui/FormulaInput/utils';
import { Button, Card, Form, Space } from 'antd';
import React from 'react';
import { DECIMAL_PLACES, FORMULA } from '../constant';

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
export const NAME_MESSAGE = '请以中英文开头，可包含中英文、数字、英文下划线。';
export const NAME_REG = /^[\u4E00-\u9FFFA-Za-z][\u4E00-\u9FFFA-Za-z0-9_]*$/;
export const nameInputProps: FormulaInputProps['nameInputProps'] = {
  validator: (val?: string) => {
    if (!val) {
      return {
        validateStatus: 'error',
        message: '名称不能为空',
      };
    }
    if (!NAME_REG.test(val)) {
      return {
        validateStatus: 'error',
        message: NAME_MESSAGE,
      };
    }
    return {};
  },
};

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
        FormulaInput: {
          formula: [{ value: undefined, valueType: FORMULA.text.valueType }],
          name: 'd',
          precision: 2,
        },
        // 示例数据
        // FormulaInput: {
        //   formula: [
        //     {
        //       valueType: 'text',
        //       value: 'apple',
        //       type: 'clicks',
        //     },
        //     '-',
        //     {
        //       value: 'apple',
        //       valueType: 'text',
        //       type: 'clicks',
        //     },
        //   ],
        //   name: '示例公式',
        //   precision: 2
        // },
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
              console.log('val :>> ', val);
              // if (val.formula.length === 0) {
              //   console.log('val.formula.length :>> ', val.formula.length);
              //   return Promise.resolve();
              // }
              const { validateStatus, message } = validator(val, { nameInputProps });
              console.log('validateStatus, message :>> ', validateStatus, message);
              if (validateStatus === 'error') {
                return Promise.reject(message);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <FormulaInput
          // minItem={1}
          precisionSelectProps={{
            options: Object.values(DECIMAL_PLACES),
          }}
          nameInputProps={nameInputProps}
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
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
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
