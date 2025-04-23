import { FilterList } from '@wont/biz-ui';
import { FIELD_TYPES, RELATION } from '@wont/biz-ui/FilterList/constant';
import { validator } from '@wont/biz-ui/FilterList/utils';
import { Button, Card, Form, Space, Switch, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

const OPTIONS = [
  {
    value: 'price',
    label: '价格',
    fieldType: FIELD_TYPES.number.value,
  },
  {
    value: 'quantity',
    label: '数量',
    fieldType: FIELD_TYPES.number.value,
  },
  {
    value: 'productName',
    label: '产品名称',
    fieldType: FIELD_TYPES.string.value,
  },
  {
    value: 'isActive',
    label: '是否激活',
    fieldType: FIELD_TYPES.boolean.value,
  },
  {
    value: 'createDate',
    label: '创建日期',
    fieldType: FIELD_TYPES.date.value,
  },
  {
    value: 'updateTime',
    label: '更新时间',
    fieldType: FIELD_TYPES.dateTime.value,
  },
];
const getInitialFilterValue = () => {
  return {
    relation: 'and',
    filterList: [
      {
        field: 'price',
        fieldType: 'number',
        operator: 'equal',
      },

      {
        field: 'productName',
        fieldType: 'string',
        operator: 'equal',
      },
      {
        field: 'createDate',
        fieldType: 'date',
        operator: 'equal',
      },
      {
        field: 'updateTime',
        fieldType: 'dateTime',
        operator: 'equal',
      },
      {
        field: 'createDate',
        fieldType: 'date',
        operator: 'range',
      },
      {
        field: 'updateTime',
        fieldType: 'dateTime',
        operator: 'range',
      },
      {
        field: 'price',
        fieldType: 'number',
        operator: 'range',
        value: [null, null],
      },
    ],
  };
};

export default () => {
  const [form] = Form.useForm();
  const [filterValue, setFilterValue] = useState<any>(getInitialFilterValue());
  const [validateOnInit, setValidateOnInit] = useState(true);

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
    setFilterValue(getInitialFilterValue());
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
      </Typography>

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          filterConditions: getInitialFilterValue(),
        }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="筛选条件-非必填"
          name="filterConditions"
          rules={[
            {
              required: false,
              validator: (_, value) => {
                // console.log('value :>> ', value);
                if (value.filterList.length === 0) {
                  return Promise.resolve();
                }
                const isValid = validator(value);
                if (isValid) {
                  return Promise.resolve();
                }
                return Promise.reject('请补全筛选条件');
              },
            },
          ]}
        >
          <FilterList
            conditionSelectProps={{ options: OPTIONS }}
            conditionNumberValueProps={{
              min: 1,
              max: 10000,
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
