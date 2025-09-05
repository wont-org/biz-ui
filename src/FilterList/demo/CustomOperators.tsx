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
import { customOperatorsDemoLang } from './locales/customOperatorsDemoLang';

const { Title, Paragraph } = Typography;

// Custom operators
const CUSTOM_OPERATORS = {
  ...OPERATORS,
  // Modify operator values while keeping labelKey references unchanged
  equal: { value: 'eq', labelKey: 'filterList.operator.equal' },
  notEqual: { value: 'neq', labelKey: 'filterList.operator.notEqual' },
  greaterThan: { value: 'gt', labelKey: 'filterList.operator.greaterThan' },
  lessThan: { value: 'lt', labelKey: 'filterList.operator.lessThan' },
  greaterThanOrEqual: { value: 'gte', labelKey: 'filterList.operator.greaterThanOrEqual' },
  lessThanOrEqual: { value: 'lte', labelKey: 'filterList.operator.lessThanOrEqual' },
  range: { value: 'between', labelKey: 'filterList.operator.range' },
  contains: { value: 'includes', labelKey: 'filterList.operator.contains' },
  hasValue: { value: 'notEmpty', labelKey: 'filterList.operator.hasValue' },
  noValue: { value: 'empty', labelKey: 'filterList.operator.noValue' },
  isTrue: { value: 'truly', labelKey: 'filterList.operator.isTrue' },
  isFalse: { value: 'falsely', labelKey: 'filterList.operator.isFalse' },
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
// Custom operators and component mapping
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
        placeholder: 'Enter price',
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
        placeholder: ['Min', 'Max'],
      },
    },
  ],
  [FIELD_TYPES.date.value]: [
    {
      ...CUSTOM_OPERATORS.equal,
      component: COMPONENT.datePicker.value,
      componentProps: {
        placeholder: 'Select date',
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
        value: [1],
      },
      {
        field: 'number',
        fieldType: 'number',
        operator: 'gt',
        value: [1],
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

const CustomOperatorsDemoInner = () => {
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
    setFilterValue(getInitialFilterValue());
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
        <Paragraph>
          {t('demo.customMappingTitle')}
          <ul>
            <li>{t('demo.operatorMappings.equal')}</li>
            <li>{t('demo.operatorMappings.notEqual')}</li>
            <li>{t('demo.operatorMappings.greaterThan')}</li>
            <li>{t('demo.operatorMappings.lessThan')}</li>
            <li>{t('demo.operatorMappings.greaterThanOrEqual')}</li>
            <li>{t('demo.operatorMappings.lessThanOrEqual')}</li>
            <li>{t('demo.operatorMappings.range')}</li>
            <li>{t('demo.operatorMappings.contains')}</li>
            <li>{t('demo.operatorMappings.hasValue')}</li>
            <li>{t('demo.operatorMappings.noValue')}</li>
            <li>{t('demo.operatorMappings.isTrue')}</li>
            <li>{t('demo.operatorMappings.isFalse')}</li>
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
          label={t('demo.label')}
          name="filterConditions"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                // Note: passing custom operators here
                const isValid = validator(value, CUSTOM_FILTER_FIELD_MAP);
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
            filterFieldMap={CUSTOM_FILTER_FIELD_MAP}
            validateOnInit={true}
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('common.operation.submit')}
            </Button>
            <Button onClick={handleValidate}>{t('common.operation.validate')}</Button>
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
    <BizUIProvider locale={locale as any} localeData={customOperatorsDemoLang}>
      <CustomOperatorsDemoInner />
    </BizUIProvider>
  );
};
