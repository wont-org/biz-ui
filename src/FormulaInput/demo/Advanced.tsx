import { FormulaInput } from '@wont/biz-ui';
import { validator } from '@wont/biz-ui/FormulaInput';
import { Button, Card, Form, Space } from 'antd';
import React, { useState } from 'react';
import { FORMULA } from '../constant';

// 模拟不同类型的值对应不同的选项
const getValueOptions = (type?: string | number | null) => {
  if (type === 'clicks') {
    return {
      options: [
        { value: 'pageViews', label: '页面浏览量' },
        { value: 'uniqueVisitors', label: '独立访客数' },
        { value: 'clickCount', label: '点击次数' },
      ],
    };
  }
  if (type === 'conversions') {
    return {
      options: [
        { value: 'purchases', label: '购买次数' },
        { value: 'signups', label: '注册数' },
        { value: 'downloads', label: '下载数' },
      ],
    };
  }
  if (type === 'time') {
    return {
      options: [
        { value: 'avgTime', label: '平均停留时间' },
        { value: 'bounceRate', label: '跳出率' },
        { value: 'sessionDuration', label: '会话时长' },
      ],
    };
  }

  // 默认返回空选项
  return {
    options: [],
  };
};

// 模拟异步获取选项
const getAsyncValueOptions = async (type?: string | number | null) => {
  // 模拟网络请求延迟
  return new Promise<ReturnType<typeof getValueOptions>>((resolve) => {
    setTimeout(() => {
      resolve(getValueOptions(type));
    }, 1000);
  });
};

export default () => {
  const [useAsync, setUseAsync] = useState(true);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type={useAsync ? 'primary' : 'default'} onClick={() => setUseAsync(true)}>
          使用异步加载选项
        </Button>
        <Button type={!useAsync ? 'primary' : 'default'} onClick={() => setUseAsync(false)}>
          使用同步加载选项
        </Button>
      </Space>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          FormulaInput: [
            {
              valueType: 'text',
              value: 'pageViews',
              type: 'clicks',
            },
            '+',
            {
              valueType: 'text',
              value: 'purchases',
              type: 'conversions',
            },
            '/',
            {
              valueType: 'number',
              value: 100,
              type: 'number',
            },
          ],
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="动态选项公式"
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
            valueSelectProps={useAsync ? getAsyncValueOptions : getValueOptions}
            typeSelectProps={{
              options: [
                {
                  value: 'clicks',
                  valueType: FORMULA.text.valueType,
                  label: '点击指标',
                },
                {
                  value: 'conversions',
                  valueType: FORMULA.text.valueType,
                  label: '转化指标',
                },
                {
                  value: 'time',
                  valueType: FORMULA.text.valueType,
                  label: '时间指标',
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
            <Button onClick={resetForm}>重置</Button>
          </Space>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) =>
            prevValues.FormulaInput !== curValues.FormulaInput
          }
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
    </>
  );
};
