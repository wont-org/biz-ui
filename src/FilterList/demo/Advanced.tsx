import { BizUIProvider, FilterList, useTranslation } from '@wont/biz-ui';
import {
  COMPONENT,
  FIELD_TYPES,
  FilterFieldMapType,
  OPERATORS,
  RELATION,
} from '@wont/biz-ui/FilterList/constant';
import { validator } from '@wont/biz-ui/FilterList/utils';
import { Button, Card, Form, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { advancedDemoLang } from './locales/advancedDemoLang';

const { Title, Paragraph } = Typography;

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
      ...OPERATORS.equal,
      component: COMPONENT.input.value,
      componentProps: {
        maxLength: 50,
      },
    },
    {
      ...OPERATORS.contains,
      component: COMPONENT.textarea.value,
      componentProps: {},
    },
    {
      ...OPERATORS.startsWith,
      component: COMPONENT.select.value,
      componentProps: {
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
      ...OPERATORS.in,
      component: COMPONENT.multipleSelect.value,
      componentProps: {
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
      componentProps: {},
    },
  ],
  [FIELD_TYPES.date.value]: [
    {
      ...OPERATORS.equal,
      component: COMPONENT.datePicker.value,
      componentProps: {},
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
    relation: 'and',
    filterList: [
      {
        field: 'string',
        fieldType: 'string',
        operator: 'equal',
      },
      {
        field: 'string',
        fieldType: 'string',
        operator: 'contains',
      },
      {
        field: 'string',
        fieldType: 'string',
        operator: 'startsWith',
      },
      {
        field: 'string',
        fieldType: 'string',
        operator: 'in',
        value: ['#', '!'],
      },
      {
        field: 'number',
        fieldType: 'number',
        operator: 'equal',
      },
      {
        field: 'number',
        fieldType: 'number',
        operator: 'range',
        value: [null, null],
      },
      {
        field: 'date',
        fieldType: 'date',
        operator: 'equal',
      },
      {
        field: 'dateTime',
        fieldType: 'dateTime',
        operator: 'range',
        value: ['2025-04-01 17:01:14', '2025-04-30 17:01:20'],
      },
      {
        field: 'boolean',
        fieldType: 'boolean',
        operator: 'isTrue',
        value: true,
      },
    ],
  };
};
const AdvancedDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [filterValue, setFilterValue] = useState<any>(getInitialFilterValue());

  const onFinish = (values: any) => {
    console.log(t('demo.messages.submitSuccess'), values);
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
        console.log(t('demo.messages.validateSuccess'), values);
      },
      (errorInfo) => {
        console.log(t('demo.messages.validateFailed'), errorInfo);
      },
    );
  };

  return (
    <div>
      <Typography>
        <Title level={4}>{t('demo.pageTitle')}</Title>
        <Paragraph>{t('demo.description')}</Paragraph>
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
          label={t('demo.label')}
          name="filterConditions"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                const isValid = validator(value);
                if (isValid) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('demo.messages.incompleteConditions')));
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
            minItem={1}
            filterFieldMap={CUSTOM_FILTER_FIELD_MAP}
            validateOnInit={true}
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('common.operation.submit')}
            </Button>
            <Button onClick={handleValidate}>{t('common.form.validate')}</Button>
            <Button htmlType="button" onClick={handleReset}>
              {t('common.operation.reset')}
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Card title={t('demo.title')} style={{ marginTop: 16 }}>
        <div>
          <strong>{t('filterList.relation.label')}：</strong>{' '}
          {filterValue.relation === RELATION.and.value
            ? t('filterList.relation.and')
            : t('filterList.relation.or')}
        </div>
        <pre>{JSON.stringify(filterValue, null, 2)}</pre>
      </Card>
    </div>
  );
};

export default () => {
  const { id: locale } = useLocale();

  return (
    <BizUIProvider locale={locale as any} localeData={advancedDemoLang}>
      <AdvancedDemoInner />
    </BizUIProvider>
  );
};
