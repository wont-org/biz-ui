import { FilterList } from '@wont/biz-ui';
import { validator } from '@wont/biz-ui/FilterList';
import {
  COMPONENT,
  FIELD_TYPES,
  FilterFieldMapType,
  OPERATORS,
  RELATION,
} from '@wont/biz-ui/FilterList/constant';
import { Button, Card, Form, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

// 自定义操作符
const CUSTOM_OPERATORS = {
  ...OPERATORS,
  // 修改操作符的值，保持标签不变
  equal: { value: 'eq', label: '等于' },
  notEqual: { value: 'neq', label: '不等于' },
  greaterThan: { value: 'gt', label: '大于' },
  lessThan: { value: 'lt', label: '小于' },
  greaterThanOrEqual: { value: 'gte', label: '大于等于' },
  lessThanOrEqual: { value: 'lte', label: '小于等于' },
  range: { value: 'between', label: '范围' },
  contains: { value: 'includes', label: '包含' },
  hasValue: { value: 'notEmpty', label: '有值' },
  noValue: { value: 'empty', label: '无值' },
  isTrue: { value: 'truly', label: '为真' },
  isFalse: { value: 'falsely', label: '为假' },
} as const;

const OPTIONS = [
  {
    value: 'number',
    label: 'number',
    fieldType: FIELD_TYPES.number.value,
  },
  {
    value: 'string',
    label: 'string',
    fieldType: FIELD_TYPES.string.value,
  },
  {
    value: 'date',
    label: 'date',
    fieldType: FIELD_TYPES.date.value,
  },
  {
    value: 'dateTime',
    label: 'dateTime',
    fieldType: FIELD_TYPES.dateTime.value,
  },
  {
    value: 'boolean',
    label: 'boolean',
    fieldType: FIELD_TYPES.boolean.value,
  },
];
// 自定义操作符和组件映射
const CUSTOM_FILTER_FIELD_MAP: FilterFieldMapType = {
  [FIELD_TYPES.string.value]: [
    {
      ...CUSTOM_OPERATORS.equal,
      component: COMPONENT.input.value,
      componentProps: {
        placeholder: 'input',
        maxLength: 50,
      },
    },
    {
      ...CUSTOM_OPERATORS.contains,
      component: COMPONENT.textarea.value,
      componentProps: {
        placeholder: 'textarea',
      },
    },
    {
      ...CUSTOM_OPERATORS.startsWith,
      component: COMPONENT.select.value,
      componentProps: {
        placeholder: 'select',
        options: [
          {
            value: '#',
            label: '#',
          },
          {
            value: '!',
            label: '!',
          },
        ],
      },
    },
    {
      ...CUSTOM_OPERATORS.in,
      component: COMPONENT.multipleSelect.value,
      componentProps: {
        placeholder: 'multipleSelect',
        options: [
          {
            value: '#',
            label: '#',
          },
          {
            value: '!',
            label: '!',
          },
        ],
      },
    },
  ],
  [FIELD_TYPES.number.value]: [
    {
      ...CUSTOM_OPERATORS.equal,
      component: COMPONENT.inputNumber.value,
      componentProps: {
        precision: 2,
        placeholder: '请输入价格',
      },
    },
    {
      ...CUSTOM_OPERATORS.greaterThan,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...CUSTOM_OPERATORS.lessThan,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...CUSTOM_OPERATORS.range,
      component: COMPONENT.inputNumberRange.value,
      componentProps: {
        placeholder: ['最小值', '最大值'],
      },
    },
  ],
  [FIELD_TYPES.date.value]: [
    {
      ...CUSTOM_OPERATORS.equal,
      component: COMPONENT.datePicker.value,
      componentProps: {
        placeholder: '选择日期',
      },
    },
    {
      ...CUSTOM_OPERATORS.before,
      component: COMPONENT.datePicker.value,
    },
    {
      ...CUSTOM_OPERATORS.after,
      component: COMPONENT.datePicker.value,
    },
    {
      ...CUSTOM_OPERATORS.range,
      component: COMPONENT.dateRangePicker.value,
    },
  ],
  [FIELD_TYPES.boolean.value]: [
    {
      ...CUSTOM_OPERATORS.isTrue,
    },
    {
      ...CUSTOM_OPERATORS.isFalse,
    },
    {
      ...CUSTOM_OPERATORS.hasValue,
    },
    {
      ...CUSTOM_OPERATORS.noValue,
    },
  ],
  [FIELD_TYPES.dateTime.value]: [
    {
      ...CUSTOM_OPERATORS.equal,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...CUSTOM_OPERATORS.before,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...CUSTOM_OPERATORS.after,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...CUSTOM_OPERATORS.range,
      component: COMPONENT.dateTimeRangePicker.value,
    },
  ],
};

const getInitialFilterValue = () => {
  return {
    relation: 'and',
    filterList: [
      {
        field: 'number',
        fieldType: 'number',
        operator: 'eq',
        value: 1,
      },
      {
        field: 'number',
        fieldType: 'number',
        operator: 'gt',
        value: 3,
      },
      {
        field: 'number',
        fieldType: 'number',
        operator: 'between',
        value: [1, 1000000],
      },
      {
        field: 'boolean',
        fieldType: 'boolean',
        operator: 'truly',
        value: true,
      },
      {
        field: 'boolean',
        fieldType: 'boolean',
        operator: 'notEmpty',
      },
    ],
  };
};

export default () => {
  const [form] = Form.useForm();
  const [filterValue, setFilterValue] = useState<any>(getInitialFilterValue());

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
        <Title level={4}>自定义操作符示例</Title>
        <Paragraph>
          本示例展示了如何自定义操作符的值以适应不同的后端API需求。通过传入自定义的operators对象，
          可以改变操作符的实际值，如将&quot;等于&quot;的值从&quot;equal&quot;改为&quot;eq&quot;，&quot;范围&quot;从&quot;range&quot;改为&quot;between&quot;等，
          同时保持用户界面的标签不变。
        </Paragraph>
        <Paragraph>
          自定义的操作符映射：
          <ul>
            <li>等于: equal → eq</li>
            <li>不等于: notEqual → neq</li>
            <li>大于: greaterThan → gt</li>
            <li>小于: lessThan → lt</li>
            <li>大于等于: greaterThanOrEqual → gte</li>
            <li>小于等于: lessThanOrEqual → lte</li>
            <li>范围: range → between</li>
            <li>包含: contains → includes</li>
            <li>有值: hasValue → notEmpty</li>
            <li>无值: noValue → empty</li>
            <li>为真: isTrue → truly</li>
            <li>为假: isFalse → falsely</li>
          </ul>
        </Paragraph>
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
          label="筛选条件"
          name="filterConditions"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                // 注意这里传入自定义的operators
                const isValid = validator(value, CUSTOM_FILTER_FIELD_MAP);
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
            conditionNumberValueProps={{
              min: 0,
              max: 1000000,
            }}
            filterFieldMap={CUSTOM_FILTER_FIELD_MAP}
            validateOnInit={true}
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
