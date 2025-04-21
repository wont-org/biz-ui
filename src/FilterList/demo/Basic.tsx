import { FilterList } from '@wont/biz-ui';
import { Button, Card, Form, Space, Switch, Typography } from 'antd';
import React, { useState } from 'react';
import { validator } from '..';
import { OPERATORS, RELATION } from '../constant';

const { Title, Paragraph } = Typography;

const OPTIONS = [
  {
    value: 'price',
    label: '价格',
  },
  {
    value: 'quantity',
    label: '数量',
  },
  {
    value: 'weight',
    label: '重量',
  },
];

// 可以自定义操作符选项
const CUSTOM_OPERATORS = [
  {
    value: OPERATORS.equal.value,
    label: '等于',
  },
  {
    value: OPERATORS.greater.value,
    label: '大于',
  },
  {
    value: OPERATORS.less.value,
    label: '小于',
  },
  {
    value: OPERATORS.range.value,
    label: '范围',
  },
];

export default () => {
  const [form] = Form.useForm();
  const [filterValue, setFilterValue] = useState<any>({
    relation: RELATION.and.value,
    filterList: [],
  });
  const [validateOnInit, setValidateOnInit] = useState(true);
  const [useCustomOperators, setUseCustomOperators] = useState(false);

  const onFinish = (values: any) => {
    console.log('提交的表单值:', values);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValuesChange = (changedValues: any, _allValues: any) => {
    if (changedValues.filterConditions) {
      const newFilterValue = changedValues.filterConditions;
      setFilterValue(newFilterValue);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setFilterValue({ relation: RELATION.and.value, filterList: [] });
  };

  const handleValidate = () => {
    form.validateFields().then(
      (values) => {
        console.log('校验通过:', values);
      },
      (errorInfo) => {
        console.log('校验失败:', errorInfo);
      },
    );
  };

  return (
    <div>
      <Typography>
        <Title level={4}>筛选条件示例</Title>
        <Paragraph>
          这个示例展示了如何使用 FilterList 组件的校验功能。您可以设置是否在初始化时进行校验，
          也可以手动触发校验。
        </Paragraph>

        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>初始化时校验:</span>
          <Switch checked={validateOnInit} onChange={setValidateOnInit} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>使用自定义操作符:</span>
          <Switch checked={useCustomOperators} onChange={setUseCustomOperators} />
        </div>
      </Typography>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          filterConditions: { relation: RELATION.and.value, filterList: [] },
        }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="筛选条件"
          name="filterConditions"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                const isValid = validator(value);
                if (isValid) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('请补全筛选条件'));
              },
            },
          ]}
        >
          <FilterList
            conditionSelectProps={{ options: OPTIONS }}
            operatorSelectProps={{
              options: useCustomOperators ? CUSTOM_OPERATORS : [],
            }}
            conditionNumberValueProps={{
              min: 1,
              max: 10000000,
            }}
            validateOnInit={validateOnInit}
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={handleValidate}>校验</Button>
            <Button htmlType="button" onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Card title="当前筛选条件" style={{ marginTop: 16 }}>
        <div>
          <strong>关系类型：</strong> {filterValue.relation === RELATION.and.value ? '且' : '或'}
        </div>
        <pre>{JSON.stringify(filterValue, null, 2)}</pre>
      </Card>
    </div>
  );
};
