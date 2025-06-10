import ColorPicker from '@wont/biz-ui/ColorPicker';
import IconTrigger from '@wont/biz-ui/ColorPicker/IconTrigger';
import ConditionColor, { ConditionColorProps, validator } from '@wont/biz-ui/ConditionColor';
import SelectTemplate from '@wont/biz-ui/SelectTemplate';
import { BAR_TEMPLATE_OPTIONS } from '@wont/biz-ui/SelectTemplate/constant/index';
import { SelectTemplateProps } from '@wont/biz-ui/SelectTemplate/types';
import { ValueOfConstWithType } from '@wont/biz-ui/utils/types';
import { Button, Form, message, Radio, Space, Table } from 'antd';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getColumns } from './columns';
import { FILL_TYPE_OPTIONS } from './constant';
import { fixedData } from './mock';
import { DataSource } from './type';

const getRandomData = (n: number, minValue: number, maxValue: number) => {
  return Array.from({ length: n }, (_, index) => {
    const value = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return { index: index + 1, value };
  });
};

const StyledTable = styled(Table)`
  .ant-table-cell {
    padding: 4px;
    /* border: none; */
  }
`;

interface FormValues {
  conditions: ConditionColorProps['value'];
  bar: SelectTemplateProps['value'];
  fillType: ValueOfConstWithType<typeof FILL_TYPE_OPTIONS, 'value'>;
  negativeColor: string;
  positiveColor: string;
}

export default () => {
  const [dataSource, setDataSource] = useState<DataSource[]>(fixedData);

  const bar = BAR_TEMPLATE_OPTIONS[1].options[1];
  const [open, setOpen] = useState(false);
  const initialValues = {
    negativeColor: '#F54A45',
    positiveColor: bar.value[0],
    bar,
    fillType: FILL_TYPE_OPTIONS.gradient.value,
    conditions: [
      { valueType: 'min', value: -20 },
      { valueType: 'max', value: 10 },
    ],
  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

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
              <Form.Item label="数据条" name="bar">
                <SelectTemplate
                  options={BAR_TEMPLATE_OPTIONS}
                  showOptionLabel={false}
                  selectedTemplate={[negativeColor, positiveColor]}
                  compareKeys={['value', 'isGrading']}
                  onChange={(option) => {
                    form.setFieldValue('positiveColor', option.value[0]);
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
              form.setFieldValue('bar', {
                ...(form.getFieldValue('bar') || {}),
                isGrading: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="颜色配置">
          <div style={{ display: 'flex', gap: 16 }}>
            <Form.Item name="negativeColor">
              <ColorPicker
                onOpenChange={(_open) => {
                  setOpen(!_open);
                }}
              >
                <IconTrigger open={open} label="负值" />
              </ColorPicker>
            </Form.Item>
            <Form.Item name="positiveColor">
              <ColorPicker
                onOpenChange={(_open) => {
                  setOpen(!_open);
                }}
                onChange={(color) => {
                  form.setFieldValue('bar', {
                    ...(form.getFieldValue('bar') || {}),
                    value: [color],
                  });
                }}
              >
                <IconTrigger open={open} label="正值" />
              </ColorPicker>
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
                  getRandomData(
                    30,
                    formValues.conditions![0].value,
                    formValues.conditions![1].value,
                  ),
                );
              }}
            >
              表格随机
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
