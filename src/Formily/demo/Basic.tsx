import { CheckBoxWithAll, InputWithDefault, SwitchPro } from '@wont/biz-ui';
import { sleep } from '@wont/biz-ui/utils/commom';
import { Button, Form } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { SelectProps } from 'antd/lib';
import React, { useState } from 'react';
import EditableSelect from '../../EditableSelect';

const OPTIONS = [
  {
    value: 'apple',
    label: '苹果',
  },
  {
    value: 'bannan',
    label: '香蕉',
  },
  {
    value: 'orange',
    label: '橙子',
  },
];
const onAdd = async (label: string) => {
  await sleep(1000);
  return [
    ...OPTIONS,
    {
      value: label,
      label: label,
    },
  ];
};
const onEdit = async (editOptionItem: DefaultOptionType, options: SelectProps['options'] = []) => {
  await sleep(1000);
  return options.map((i) => {
    if (i.value === editOptionItem.value && i.label !== editOptionItem.label) {
      return {
        ...i,
        label: editOptionItem.label,
      };
    }
    return i;
  });
};
const onDelete = async (delOptionItem: DefaultOptionType, options: SelectProps['options'] = []) => {
  await sleep(1000);
  return options.filter((i) => i.value !== delOptionItem.value);
};

export default () => {
  const [options, setOptions] = useState<SelectProps['options']>(OPTIONS);
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
        EditableSelect: ['apple'],
        checkBoxWithAll: [],
        switchPro: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="CheckBoxWithAll"
        name="checkBoxWithAll"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <CheckBoxWithAll options={OPTIONS} />
      </Form.Item>
      <Form.Item
        label="SwitchPro"
        name="switchPro"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SwitchPro activeValue={1} inactiveValue={2} />
      </Form.Item>
      <Form.Item
        label="Input with clear count"
        name="InputWithDefault"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputWithDefault maxLength={11} />
      </Form.Item>
      <Form.Item
        label="EditableSelect"
        name="EditableSelect"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <EditableSelect
          options={options}
          isServer
          mode="tags"
          onAdd={async ({ label }) => {
            const list = await onAdd(label);
            setOptions(list);
          }}
          onEdit={async (editOptionItem) => {
            const list = await onEdit(editOptionItem, options);
            setOptions(list);
          }}
          onDelete={async (editOptionItem) => {
            const list = await onDelete(editOptionItem, options);
            setOptions(list);
          }}
          defaultOpen
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ paddingRight: 20 }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
