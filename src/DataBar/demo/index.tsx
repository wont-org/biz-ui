import { SettingOutlined } from '@ant-design/icons';
import { ColorPicker } from '@wont/biz-ui';
import ConditionColor, { validator } from '@wont/biz-ui/ConditionColor';
import SelectTemplate from '@wont/biz-ui/SelectTemplate';
import { BAR_TEMPLATE_OPTIONS } from '@wont/biz-ui/SelectTemplate/constant/index';
import { Button, Form, message, Radio, Space, Table } from 'antd';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getColumns } from './columns';
import { FILL_TYPE_OPTIONS } from './constant';
import { getFixedData } from './mock';
import { DataSource, FormValues } from './type';

const getRandomData = ({
  n = 30,
  min = -20,
  max = 20,
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
  .ant-table-cell {
    padding: 4px;
    /* border: none; */
  }
`;

const INIT_NEGATIVE_COLOR = '#F54A45';
const STYLE_TEMPLATE_NAME = 'styleTemplate';
const customValue = {
  negativeColor: '#F54A45',
  positiveColor: '#7F3BF5',
  styleTemplate: {
    value: ['#7F3BF5'],
    extraLabel: '纯色-绿色',
    isGrading: true,
  },
  fillType: true,
  conditions: [
    {
      valueType: 'number',
      value: -10,
    },
    {
      valueType: 'number',
      value: 10,
    },
  ],
};
export default () => {
  const styleTemplate = BAR_TEMPLATE_OPTIONS[1].options[1];
  const initialValues: FormValues = {
    negativeColor: INIT_NEGATIVE_COLOR,
    positiveColor: styleTemplate.value[0],
    styleTemplate,
    fillType: FILL_TYPE_OPTIONS.gradient.value,
    conditions: [
      { valueType: 'number', value: -10 },
      { valueType: 'number', value: 10 },
    ],
  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [dataSource, setDataSource] = useState<DataSource[]>(
    getFixedData({ min: formValues.conditions?.[0]?.value, max: formValues.conditions?.[1]?.value })
      .mixedData,
  );

  const [form] = Form.useForm<FormValues>();

  const handleFinish = (values: FormValues) => {
    console.log('Success:', values);
    setFormValues(values);
    message.success('提交成功');
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('提交失败，请检查表单');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Form
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        labelCol={{ span: 4 }}
        initialValues={initialValues}
        onReset={() => {
          setDataSource(
            getFixedData({
              min: formValues.conditions?.[0]?.value,
              max: formValues.conditions?.[1]?.value,
            }).mixedData,
          );
        }}
      >
        <Form.Item
          noStyle
          // dependencies={['negativeColor', 'positiveColor']}
          shouldUpdate={(prevValues, curValues) => {
            const prevNegativeColor = prevValues?.negativeColor;
            const curNegativeColor = curValues?.negativeColor;
            const prevPositiveColor = prevValues?.positiveColor;
            const curPositiveColor = curValues?.positiveColor;
            return prevNegativeColor !== curNegativeColor || prevPositiveColor !== curPositiveColor;
          }}
        >
          {({ getFieldValue }) => {
            const negativeColor = getFieldValue('negativeColor');
            const positiveColor = getFieldValue('positiveColor');

            return (
              <Form.Item label="数据条" name={STYLE_TEMPLATE_NAME}>
                <SelectTemplate
                  options={BAR_TEMPLATE_OPTIONS}
                  showOptionLabel={false}
                  selectedTemplate={[negativeColor, positiveColor]}
                  compareKeys={['value', 'isGrading']}
                  onChange={(option) => {
                    form.setFieldValue('positiveColor', option.value?.[0]);
                    form.setFieldValue('negativeColor', INIT_NEGATIVE_COLOR);
                    form.setFieldValue('fillType', option.isGrading);
                  }}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <Form.Item label="填充方式" name="fillType">
          <Radio.Group
            options={Object.values(FILL_TYPE_OPTIONS)}
            onChange={(e) => {
              form.setFieldValue(STYLE_TEMPLATE_NAME, {
                ...(form.getFieldValue(STYLE_TEMPLATE_NAME) || {}),
                isGrading: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="颜色配置">
          <div style={{ display: 'flex', gap: 16 }}>
            <Form.Item name="negativeColor">
              <ColorPicker label="负值" trigger="icon" />
            </Form.Item>
            <Form.Item name="positiveColor">
              <ColorPicker
                label="正值"
                trigger="icon"
                onChange={(color) => {
                  form.setFieldValue(STYLE_TEMPLATE_NAME, {
                    ...(form.getFieldValue(STYLE_TEMPLATE_NAME) || {}),
                    value: [color],
                  });
                }}
              />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="conditions"
          rules={[
            {
              validator: async (_, value: FormValues['conditions'] = []) => {
                const valid = validator(value, {
                  useColor: false,
                });
                if (!valid) {
                  return Promise.reject('');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <ConditionColor useColor={false} labelFormItemProps={{ labelCol: { span: 4 } }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="reset">重置</Button>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setDataSource(
                  getRandomData({
                    n: 30,
                    min: formValues.conditions?.[0]?.value,
                    max: formValues.conditions?.[1]?.value,
                  }),
                );
                form.submit();
              }}
            >
              表格随机
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                setDataSource(
                  getFixedData({
                    min: formValues.conditions?.[0]?.value,
                    max: formValues.conditions?.[1]?.value,
                  }).positiveData,
                );
              }}
            >
              正数
            </Button>
            <Button
              type="primary"
              ghost
              icon={<SettingOutlined />}
              onClick={() => {
                form.setFieldsValue(customValue);
              }}
            >
              设置自定义模板
            </Button>
            <Button
              danger
              onClick={() => {
                setDataSource(
                  getFixedData({
                    min: formValues.conditions?.[0]?.value,
                    max: formValues.conditions?.[1]?.value,
                  }).negativeData,
                );
              }}
            >
              负数
            </Button>
            <Button
              onClick={() => {
                form
                  .validateFields()
                  .then((values: FormValues) => {
                    console.log('验证通过:', values);
                  })
                  .catch((errorInfo: any) => {
                    console.log('验证失败:', errorInfo);
                  });
              }}
            >
              验证
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
          min: formValues.conditions?.[0]?.value,
          max: formValues.conditions?.[1]?.value,
          positiveGradient: [formValues.positiveColor, '#fff'],
          negativeGradient: [formValues.negativeColor, '#fff'],
        })}
        dataSource={dataSource}
      />
    </div>
  );
};
