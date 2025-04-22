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

const OPTIONS = [
  {
    value: 'price',
    label: '价格',
    fieldType: FIELD_TYPES.number.value,
  },
  {
    value: 'productName',
    label: '产品名称',
    fieldType: FIELD_TYPES.string.value,
  },
  {
    value: 'createDate',
    label: '创建日期',
    fieldType: FIELD_TYPES.date.value,
  },
  {
    value: 'createDate',
    label: '开始日期',
    fieldType: FIELD_TYPES.dateTime.value,
  },
  {
    value: 'isActive',
    label: '是否激活',
    fieldType: FIELD_TYPES.boolean.value,
  },
];

// 自定义操作符和组件映射
const CUSTOM_FILTER_FIELD_MAP: FilterFieldMapType = {
  [FIELD_TYPES.string.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.input.value,
      componentProps: {
        placeholder: '请输入产品名称',
        maxLength: 50,
      },
    },
    {
      ...OPERATORS.contains,
      component: COMPONENT.input.value,
      componentProps: {
        placeholder: '包含关键词',
      },
    },
    {
      ...OPERATORS.startsWith,
      component: COMPONENT.select.value,
      componentProps: {
        // placeholder: '以...开头',
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
      ...OPERATORS.equal,
      component: COMPONENT.inputNumber.value,
      componentProps: {
        precision: 2,
        placeholder: '请输入价格',
      },
    },
    {
      ...OPERATORS.greaterThan,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.lessThan,
      component: COMPONENT.inputNumber.value,
    },
    {
      ...OPERATORS.range,
      component: COMPONENT.inputNumberRange.value,
      componentProps: {
        placeholder: ['最小值', '最大值'],
      },
    },
  ],
  [FIELD_TYPES.date.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.datePicker.value,
      componentProps: {
        placeholder: '选择日期',
      },
    },
    {
      ...OPERATORS.before,
      component: COMPONENT.datePicker.value,
    },
    {
      ...OPERATORS.after,
      component: COMPONENT.datePicker.value,
    },
    {
      ...OPERATORS.range,
      component: COMPONENT.dateRangePicker.value,
    },
  ],
  [FIELD_TYPES.boolean.value]: [
    {
      ...OPERATORS.isTrue,
    },
    {
      ...OPERATORS.isFalse,
    },
  ],
  [FIELD_TYPES.dateTime.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.before,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.after,
      component: COMPONENT.dateTimePicker.value,
    },
    {
      ...OPERATORS.range,
      component: COMPONENT.dateTimeRangePicker.value,
    },
  ],
};

const getInitialFilterValue = () => {
  return {
    relation: RELATION.and.value,
    filterList: [
      {
        field: 'productName',
        fieldType: FIELD_TYPES.string.value,
        operator: OPERATORS.startsWith.value,
        value: undefined,
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
        <Title level={4}>高级筛选条件示例</Title>
        <Paragraph>
          本示例展示了如何使用自定义组件和属性进行更复杂的筛选条件配置。您可以通过 filterFieldMap
          参数来自定义每种字段类型可用的操作符和对应的值组件。
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
