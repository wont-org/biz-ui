import { BizUIProvider, FormulaInput, useTranslation } from '@wont/biz-ui';
import { FormulaInputProps } from '@wont/biz-ui/FormulaInput/type';
import { validator } from '@wont/biz-ui/FormulaInput/utils';
import { Button, Card, Col, Form, Row, Space } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { DECIMAL_PLACES, FORMULA } from '../constant';
import { basicDemoLang } from './locales/basicDemoLang';

const getOptionsWithTranslation = (t: any) => [
  {
    value: 'apple',
    label: t('demo.options.apple'),
  },
  {
    value: 'bannan',
    label: t('demo.options.banana'),
  },
  {
    value: 'orange',
    label: t('demo.options.orange'),
  },
];
export const NAME_REG = /^[\u4E00-\u9FFFA-Za-z][\u4E00-\u9FFFA-Za-z0-9_]*$/;

const getNameInputPropsWithTranslation = (t: any): FormulaInputProps['nameInputProps'] => ({
  validator: (val?: string) => {
    if (!val) {
      return {
        validateStatus: 'error',
        message: t('demo.nameValidation.required'),
      };
    }
    if (!NAME_REG.test(val)) {
      return {
        validateStatus: 'error',
        message: t('demo.nameValidation.message'),
      };
    }
    return {};
  },
});

const BasicDemoInner = () => {
  const { t } = useTranslation();
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
        FormulaInputNoValue: {
          formula: [{ value: undefined, valueType: FORMULA.text.valueType }],
          name: t('demo.fields.formulaWithoutValue'),
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
              const { validateStatus, message } = validator(val, {
                nameInputProps: getNameInputPropsWithTranslation(t),
                t,
              });
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
            options: Object.values(DECIMAL_PLACES).map((item) => ({
              ...item,
              label: t(item.labelKey),
            })),
          }}
          nameInputProps={getNameInputPropsWithTranslation(t)}
          valueSelectProps={{
            options: getOptionsWithTranslation(t),
          }}
          typeSelectProps={{
            options: [
              {
                value: 'clicks',
                // valueType: keyof typeof FORMULA text|number
                valueType: FORMULA.text.valueType,
                label: t('demo.options.clicks'),
              },
              ...Object.values(FORMULA).map((item) => ({
                ...item,
                label: t(item.labelKey),
              })),
            ],
          }}
        />
      </Form.Item>

      <Form.Item
        label={t('demo.fields.formulaWithoutValue')}
        name="FormulaInputNoValue"
        rules={[
          {
            required: true,
            validator: (rule, val) => {
              const { validateStatus, message } = validator(val, {
                nameInputProps: getNameInputPropsWithTranslation(t),
                useValue: false,
                t,
              });
              if (validateStatus === 'error') {
                return Promise.reject(message);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <FormulaInput
          useValue={false}
          precisionSelectProps={{
            options: Object.values(DECIMAL_PLACES).map((item) => ({
              ...item,
              label: t(item.labelKey),
            })),
          }}
          nameInputProps={getNameInputPropsWithTranslation(t)}
          typeSelectProps={{
            options: [
              {
                value: 'clicks',
                valueType: FORMULA.text.valueType,
                label: t('demo.options.clicks'),
              },
              ...Object.values(FORMULA).map((item) => ({
                ...item,
                label: t(item.labelKey),
              })),
            ],
          }}
        />
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('demo.buttons.submit')}
          </Button>
          <Button htmlType="reset">{t('demo.buttons.reset')}</Button>
        </Space>
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, curValues) =>
          prevValues.FormulaInput !== curValues.FormulaInput ||
          prevValues.FormulaInputNoValue !== curValues.FormulaInputNoValue
        }
      >
        {({ getFieldValue }) => {
          return (
            <Card title={t('demo.cards.formulaData')}>
              <Row gutter={16}>
                <Col span={12}>
                  <Card type="inner" title={t('demo.cards.normalFormula')}>
                    <pre>{JSON.stringify(getFieldValue('FormulaInput'), null, 2)}</pre>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card type="inner" title={t('demo.cards.formulaWithoutValue')}>
                    <pre>{JSON.stringify(getFieldValue('FormulaInputNoValue'), null, 2)}</pre>
                  </Card>
                </Col>
              </Row>
            </Card>
          );
        }}
      </Form.Item>
    </Form>
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
