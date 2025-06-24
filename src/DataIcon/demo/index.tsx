import { SettingOutlined } from '@ant-design/icons';
import { SelectTemplate } from '@wont/biz-ui';
import ConditionIcon from '@wont/biz-ui/ConditionIcon';
import { OPERATOR, VALUE_TYPE } from '@wont/biz-ui/ConditionIcon/constant';
import { ICON_TEMPLATE_OPTIONS } from '@wont/biz-ui/SelectTemplate/constant/index';
import { getInitialConditions } from '@wont/biz-ui/SelectTemplate/utils';
import { Button, Checkbox, Form, message, Space, Table } from 'antd';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { getColumns } from './columns';
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

const STYLE_TEMPLATE_NAME = 'styleTemplate';
const CONDITIONS_NAME = 'conditions';

const customValue: FormValues = {
  styleTemplate: {
    value: ICON_TEMPLATE_OPTIONS[3].options[3].value,
    isReverse: true,
  },
  [CONDITIONS_NAME]: getInitialConditions({
    styleTemplate: ICON_TEMPLATE_OPTIONS[3].options[3].value,
    valueTypeMap: VALUE_TYPE,
    operatorMap: OPERATOR,
  }),
  reverseIcon: false,
};
export default () => {
  const styleTemplate = ICON_TEMPLATE_OPTIONS[1].options[1];
  const initialValues: FormValues = {
    styleTemplate: {
      value: styleTemplate.value,
      isReverse: false,
    },
    [CONDITIONS_NAME]: getInitialConditions({
      styleTemplate: styleTemplate.value,
      valueTypeMap: VALUE_TYPE,
      operatorMap: OPERATOR,
    }),
    reverseIcon: false,
  };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [dataSource, setDataSource] = useState<DataSource[]>(
    getFixedData({
      min: formValues[CONDITIONS_NAME]?.[0]?.value,
      max: formValues[CONDITIONS_NAME]?.[1]?.value,
    }).mixedData,
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
              min: formValues[CONDITIONS_NAME]?.[0]?.value,
              max: formValues[CONDITIONS_NAME]?.[1]?.value,
            }).mixedData,
          );
        }}
      >
        <Form.Item label="图标集" name={STYLE_TEMPLATE_NAME}>
          <SelectTemplate
            options={ICON_TEMPLATE_OPTIONS}
            showOptionLabel={false}
            compareKeys={['value']}
            onChange={(option) => {
              form.setFieldValue(
                CONDITIONS_NAME,
                getInitialConditions({
                  styleTemplate: option.value,
                  valueTypeMap: VALUE_TYPE,
                  operatorMap: OPERATOR,
                }),
              );
            }}
          />
        </Form.Item>
        <Form.Item label="反转图标" name="reverseIcon" valuePropName="checked">
          <Checkbox
            onChange={(e) => {
              const styleTemplateValue = form.getFieldValue(STYLE_TEMPLATE_NAME).value || [];
              const reverseIcon = e.target.checked;
              const reverseStyleTemplateValue = [...styleTemplateValue].reverse();
              form.setFieldValue(STYLE_TEMPLATE_NAME, {
                value: reverseStyleTemplateValue,
                isReverse: reverseIcon,
              });
              form.setFieldValue(
                CONDITIONS_NAME,
                getInitialConditions({
                  styleTemplate: reverseStyleTemplateValue,
                  valueTypeMap: VALUE_TYPE,
                  operatorMap: OPERATOR,
                }),
              );
            }}
          />
        </Form.Item>
        <Form.Item name={CONDITIONS_NAME} dependencies={[STYLE_TEMPLATE_NAME]}>
          <ConditionIcon
            valuePropName={CONDITIONS_NAME}
            labelFormItemProps={{ labelCol: { span: 4 } }}
          />
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
                    min: formValues[CONDITIONS_NAME]?.[0]?.value,
                    max: formValues[CONDITIONS_NAME]?.[1]?.value,
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
                    min: formValues[CONDITIONS_NAME]?.[0]?.value,
                    max: formValues[CONDITIONS_NAME]?.[1]?.value,
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
                    min: formValues[CONDITIONS_NAME]?.[0]?.value,
                    max: formValues[CONDITIONS_NAME]?.[1]?.value,
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
          min: formValues[CONDITIONS_NAME]?.[0]?.value,
          max: formValues[CONDITIONS_NAME]?.[1]?.value,
        })}
        dataSource={dataSource}
      />
    </div>
  );
};
