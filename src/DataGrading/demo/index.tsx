import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from '@wont/biz-ui/BizProvider';
import ConditionColor, { validator } from '@wont/biz-ui/ConditionColor';
import { VALUE_TYPE } from '@wont/biz-ui/ConditionColor/constant';
import SelectTemplate from '@wont/biz-ui/SelectTemplate';
import { GRADING_TEMPLATE_OPTIONS } from '@wont/biz-ui/SelectTemplate/constant/index';
import { getInitialGradingConditions } from '@wont/biz-ui/SelectTemplate/utils';
import { Button, Form, message, Space, Table } from 'antd';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getColumns } from './columns';
import { getFixedData } from './mock';
import { DataSource, FormValues } from './type';

const MIN = 1;
const MAX = 100;
const getRandomData = ({
  n = 10,
  min = MIN,
  max = MAX,
}: {
  n?: number;
  min?: number;
  max?: number;
}) => {
  return Array.from({ length: n }, (_, index) => {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    return { index: index + 1, mixedValue: value, positiveValue: value, negativeValue: value };
  });
};

const StyledTable = styled(Table)`
  .ant-table-tbody {
    .ant-table-cell {
      padding: 0px;
      /* border: none; */
    }
  }
`;

const STYLE_TEMPLATE_NAME = 'styleTemplate';
const CONDITIONS_NAME = 'conditions';
const customValue: FormValues = {
  styleTemplate: {
    value: GRADING_TEMPLATE_OPTIONS[1].options[3].value,
  },
  [CONDITIONS_NAME]: getInitialGradingConditions({
    styleTemplate: GRADING_TEMPLATE_OPTIONS[1].options[3].value,
    valueTypeMap: VALUE_TYPE,
  }),
};
export default () => {
  const { t } = useTranslation();

  const styleTemplate = GRADING_TEMPLATE_OPTIONS[1].options[1];
  const initialValues: FormValues = {
    styleTemplate: {
      value: styleTemplate.value,
    },
    [CONDITIONS_NAME]: getInitialGradingConditions({
      styleTemplate: styleTemplate.value,
      valueTypeMap: VALUE_TYPE,
    }),
  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [dataSource, setDataSource] = useState<DataSource[]>(
    getFixedData({
      min: -10,
      max: 20,
    }).mixedData,
  );

  const [form] = Form.useForm<FormValues>();

  const handleFinish = (values: FormValues) => {
    console.log('Success:', values);
    setFormValues(values);
    message.success(t('dataGrading.message.submitSuccess'));
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error(t('dataGrading.message.submitFailed'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Form
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        labelCol={{ span: 4 }}
        initialValues={initialValues}
        onValuesChange={(changedValues: FormValues, allValues: FormValues) => {
          console.log('changedValues', changedValues, allValues);
          if (changedValues.conditions) {
            const conditionsColor = (allValues.conditions || []).reduce<string[]>((acc, cur) => {
              if (cur.valueType === VALUE_TYPE.none.value) {
                return acc;
              }
              if (cur.color) {
                acc.push(cur.color);
              }
              return acc;
            }, []);
            // console.log('conditionsColor :>> ', conditionsColor);
            form.setFieldValue(STYLE_TEMPLATE_NAME, {
              value: conditionsColor,
            });
          }
        }}
        onReset={() => {
          setDataSource(
            getFixedData({
              min: -10,
              max: 20,
            }).mixedData,
          );
        }}
      >
        <Form.Item noStyle dependencies={[CONDITIONS_NAME]}>
          {() => {
            return (
              <Form.Item label={t('dataGrading.form.colorScale')} name={STYLE_TEMPLATE_NAME}>
                <SelectTemplate
                  options={GRADING_TEMPLATE_OPTIONS}
                  showOptionLabel={false}
                  onChange={(option) => {
                    const conditions = getInitialGradingConditions({
                      styleTemplate: option.value,
                      valueTypeMap: VALUE_TYPE,
                    });
                    form.setFieldValue(CONDITIONS_NAME, conditions);
                  }}
                />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item
          name={CONDITIONS_NAME}
          rules={[
            {
              validator: async (_, value: FormValues['conditions'] = []) => {
                const valid = validator(value, {
                  useColor: true,
                });
                if (!valid) {
                  return Promise.reject('');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <ConditionColor useColor={true} labelFormItemProps={{ labelCol: { span: 4 } }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space wrap>
            <Button type="primary" htmlType="submit">
              {t('dataGrading.button.submit')}
            </Button>
            <Button htmlType="reset">{t('dataGrading.button.reset')}</Button>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setDataSource(
                  getRandomData({
                    n: 30,
                  }),
                );
                form.submit();
              }}
            >
              {t('dataGrading.button.randomTable')}
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setDataSource(
                  getFixedData({
                    min: -10,
                    max: 20,
                  }).positiveData,
                );
              }}
            >
              {t('dataGrading.button.positiveNumbers')}
            </Button>
            <Button
              type="primary"
              ghost
              icon={<SettingOutlined />}
              onClick={() => {
                form.setFieldsValue(customValue);
              }}
            >
              {t('dataGrading.button.setCustomTemplate')}
            </Button>
            <Button
              danger
              onClick={() => {
                setDataSource(
                  getFixedData({
                    min: -10,
                    max: 20,
                  }).negativeData,
                );
              }}
            >
              {t('dataGrading.button.negativeNumbers')}
            </Button>
            <Button
              onClick={() => {
                form
                  .validateFields()
                  .then((values: FormValues) => {
                    console.log(t('dataGrading.message.validationPassed'), values);
                  })
                  .catch((errorInfo: any) => {
                    console.log(t('dataGrading.message.validationFailed'), errorInfo);
                  });
              }}
            >
              {t('dataGrading.button.validate')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <StyledTable
        scroll={{
          y: 800,
        }}
        rowKey={'index'}
        bordered
        pagination={{
          pageSize: 100,
        }}
        columns={getColumns({
          formValues,
          dataSource,
          valueTypeMap: VALUE_TYPE,
          t,
        })}
        dataSource={dataSource}
      />
    </div>
  );
};
