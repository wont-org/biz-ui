import { MinusOutlined } from '@ant-design/icons';
import { BizUIProvider, FilterList, useTranslation } from '@wont/biz-ui';
import { FIELD_TYPES, RELATION } from '@wont/biz-ui/FilterList/constant';
import { validator } from '@wont/biz-ui/FilterList/utils';
import { Button, Card, Form, Space, Switch, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { basicDemoLang } from './locales/basicDemoLang';

const { Title, Paragraph } = Typography;

const getOptionsWithTranslation = (t: any) => [
  {
    value: 'price',
    label: t('demo.fields.price'),
    fieldType: FIELD_TYPES.number.value,
  },
  {
    value: 'quantity',
    label: t('demo.fields.quantity'),
    fieldType: FIELD_TYPES.number.value,
  },
  {
    value: 'productName',
    label: t('demo.fields.productName'),
    fieldType: FIELD_TYPES.string.value,
  },
  {
    value: 'isActive',
    label: t('demo.fields.isActive'),
    fieldType: FIELD_TYPES.boolean.value,
  },
  {
    value: 'createDate',
    label: t('demo.fields.createDate'),
    fieldType: FIELD_TYPES.date.value,
  },
  {
    value: 'updateTime',
    label: t('demo.fields.updateTime'),
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

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [filterValue, setFilterValue] = useState<any>(getInitialFilterValue());
  const [validateOnInit, setValidateOnInit] = useState(true);
  const [showData, setShowData] = useState(false);

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

        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>{t('demo.validateOnInitLabel')}</span>
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
          label={t('demo.label')}
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
                return Promise.reject(t('demo.messages.incompleteConditions'));
              },
            },
          ]}
        >
          <FilterList
            minItem={1}
            maxItem={3}
            deleteIcon={<MinusOutlined />}
            conditionSelectProps={{ options: getOptionsWithTranslation(t) }}
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
              {t('common.operation.submit')}
            </Button>
            <Button onClick={handleValidate}>{t('common.operation.validate')}</Button>
            <Button htmlType="button" onClick={handleReset}>
              {t('common.operation.reset')}
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Card
        title={t('demo.title')}
        style={{ marginTop: 16 }}
        bodyStyle={{ display: showData ? 'block' : 'none' }}
        extra={
          <Button type="link" onClick={() => setShowData(!showData)}>
            {showData ? t('common.status.collapse') : t('common.status.expand')}
          </Button>
        }
      >
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
    <BizUIProvider locale={locale as any} localeData={basicDemoLang}>
      <BasicDemoInner />
    </BizUIProvider>
  );
};
