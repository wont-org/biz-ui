import {
  CheckBoxWithAll,
  EditableSelect,
  InputWithDefault,
  MultipleSelect,
  PrefixInput,
  SwitchPro,
  TextAreaWithDefault,
} from '@wont/biz-ui';
import { PREFIX } from '@wont/biz-ui/PrefixInput/constant';
import { sleep } from '@wont/biz-ui/utils/commom';
import { Button, Form } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { SelectProps } from 'antd/lib';
import React, { useState } from 'react';

const getDefaultOptions = (): Required<SelectProps>['options'] => [
  {
    value: 'apple',
    label: '苹果',
  },
  {
    value: 'bannan',
    label: '香蕉',
    disabled: true,
  },
  {
    value: 'orange',
    label: '橙子',
  },
];
const onAdd = async (label: string) => {
  await sleep(1000);
  return [
    ...getDefaultOptions(),
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
  const [options, setOptions] = useState<SelectProps['options']>(getDefaultOptions());
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
        PrefixInput: {
          type: PREFIX.global.value,
          value: '111',
        },
        MultipleSelect: 'apple',
        // MultipleSelect: ['apple'],
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
        <CheckBoxWithAll options={getDefaultOptions()} />
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
        <InputWithDefault />
      </Form.Item>
      <Form.Item label="TextAreaWithDefault" name="TextAreaWithDefault">
        <TextAreaWithDefault />
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
          // mode="tags"
          // defaultOpen
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
        />
      </Form.Item>
      <Form.Item
        label="PrefixInput"
        name="PrefixInput"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <PrefixInput />
      </Form.Item>
      <Form.Item
        label="MultipleSelect"
        name="MultipleSelect"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <MultipleSelect options={getDefaultOptions()} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ paddingRight: 20 }}>
          Submit
        </Button>
        <Button
          style={{ paddingRight: 20 }}
          onClick={() => {
            setOptions(getDefaultOptions());
          }}
        >
          重置下拉框
        </Button>
      </Form.Item>
    </Form>
  );
};
