import { BizUIProvider, NumberRange, useTranslation } from '@wont/biz-ui';
import { ValueOfConst } from '@wont/biz-ui/utils/types';
import { Button, Form, Select, Space } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { NumberRangeProps, validate } from '..';
import { StyleInputNumber } from '../style';
import { RANGE_TYPE } from './constant';
import { demoLang } from './locales/demoLang';

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const MAX = 7966.319861650467;
  const MIN = 0;
  const MAX_DOT_RAW = 1000.5678;
  const MAX_DOT = Math.ceil(MAX_DOT_RAW);
  const MIN_DOT_RAW = -1.5678;
  const MIN_DOT = Math.floor(MIN_DOT_RAW);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const validator = (
    rule: any,
    val: NumberRangeProps['value'],
    options = {
      min: MIN,
      max: MAX,
    },
  ) => {
    if (!val) {
      return Promise.reject(t('demo.validation.rangeRequired'));
    }
    const { message, isValid } = validate({
      ...options,
      ranges: val,
      t,
    });
    if (!isValid) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  };

  // 生成选项数据
  const getRangeTypeOptions = () => {
    return Object.values(RANGE_TYPE).map((item) => ({
      ...item,
      label: t(item.labelKey),
    }));
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{
        min: MIN,
        max: MAX,
        numberRange1: [],
        numberRange2: [],
        numberRange3: [
          { min: -5, max: 0 },
          { min: 0, max: 5 },
        ],
        numberRange4: [],
        numberRange5: [],
        numberRange6: [],
        numberRange7: [],
        rangeNum: 1000,
        rangeUnit: RANGE_TYPE.step.value,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h1>{t('demo.titles.linkedExample')}</h1>
      <Form.Item label={t('demo.labels.maxValue')} name="max">
        <StyleInputNumber />
      </Form.Item>
      <Form.Item label={t('demo.labels.minValue')} name="min">
        <StyleInputNumber />
      </Form.Item>
      <Form.Item label={t('demo.labels.rangeUnit')} name="rangeUnit">
        <Select options={getRangeTypeOptions()} />
      </Form.Item>
      <Form.Item label={t('demo.labels.rangeValue')} name="rangeNum">
        <StyleInputNumber />
      </Form.Item>
      <Form.Item
        shouldUpdate={(pre, next) => {
          return pre.rangeNum !== next.rangeNum || pre.rangeUnit !== next.rangeUnit;
        }}
      >
        {({ getFieldValue }) => {
          const rangeUnit = getFieldValue('rangeUnit') as ValueOfConst<typeof RANGE_TYPE, 'value'>;
          const rangeNum = getFieldValue('rangeNum');
          return (
            <Form.Item
              label={t(RANGE_TYPE[rangeUnit].labelKey)}
              extra={t('demo.descriptions.bigDataExtra')}
              name="numberRange1"
              rules={[
                {
                  required: true,
                  validator: (rule, val) => validator(rule, val),
                },
              ]}
            >
              <NumberRange
                showAddButton
                showDelButton
                max={MAX}
                min={MIN}
                rangeNum={rangeUnit === RANGE_TYPE.count.value ? rangeNum : undefined}
                step={rangeUnit !== RANGE_TYPE.count.value ? rangeNum : undefined}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
      <h1>{t('demo.titles.otherExamples')}</h1>
      <Form.Item
        label={t('demo.labels.passSpecificRange')}
        name="numberRange3"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 5,
                min: -5,
              }),
          },
        ]}
      >
        <NumberRange showDelButton />
      </Form.Item>

      <Form.Item
        label={t('demo.labels.abnormalMaxEqualsMin')}
        name="numberRange4"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 1,
                min: 1,
              }),
          },
        ]}
      >
        <NumberRange max={1} min={1} step={111} />
      </Form.Item>
      <Form.Item
        label={t('demo.labels.abnormalMaxLessThanMin')}
        name="numberRange5"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 0,
                min: 1,
              }),
          },
        ]}
      >
        <NumberRange max={0} min={1} step={111} />
      </Form.Item>
      <Form.Item
        label={`${t('demo.descriptions.maxValue', { value: MAX_DOT_RAW })}；${t(
          'demo.descriptions.minValue',
          { value: MIN_DOT_RAW },
        )}`}
        name="numberRange6"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: MAX_DOT,
                min: MIN_DOT,
              }),
          },
        ]}
      >
        <NumberRange max={MAX_DOT} min={MIN_DOT} step={10} />
      </Form.Item>
      <Form.Item
        label={`${t('demo.labels.roundUpExample')}。${t('demo.descriptions.maxValue', {
          value: 1027,
        })}；${t('demo.descriptions.minValue', { value: 1 })}`}
        name="numberRange7"
        rules={[
          {
            required: true,
            validator: (rule, val) =>
              validator(rule, val, {
                max: 1027,
                min: 1,
              }),
          },
        ]}
      >
        <NumberRange max={1027} min={1} rangeNum={10} />
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="primary" htmlType="submit">
            {t('demo.buttons.submit')}
          </Button>
          <Button htmlType="reset">{t('demo.buttons.reset')}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <BasicDemoInner />
    </BizUIProvider>
  );
};
