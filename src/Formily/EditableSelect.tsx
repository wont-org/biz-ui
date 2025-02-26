import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  FormItemProps,
  Input,
  InputProps,
  message,
  Popconfirm,
  Select,
  Space,
} from 'antd';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import React, { useEffect, useState } from 'react';

let isDelete = false;

interface EditableSelectProps extends SelectProps {
  onDelete?: (val: DefaultOptionType) => Promise<void>;
  onAdd?: (val: DefaultOptionType) => Promise<{
    value: DefaultOptionType['value'];
  }>;
  onEdit?: (val: DefaultOptionType) => Promise<void>;
  operateFormItemName: string;
  inputProps: InputProps;
  inputFormItemRules?: FormItemProps['rules'];
  isServer?: boolean;
}

const EditableSelect: React.FC<EditableSelectProps> = ({
  value,
  onChange,
  options = [],
  onDelete,
  onEdit,
  onAdd,
  operateFormItemName = 'editLabel',
  inputProps = {},
  inputFormItemRules = [{ required: true, message: '该字段是必填字段' }],
  isServer,
  ...props
}) => {
  const [form] = Form.useForm();
  const [optionList, setOptionList] = useState<DefaultOptionType[]>(options);
  const [editingItem, setEditingItem] = useState<DefaultOptionType>();

  useEffect(() => {
    isServer && setOptionList(options);
  }, [isServer, options]);

  const handleOperateItem = (optionItem?: DefaultOptionType) => {
    const _value = optionItem?.value;
    if (!_value) {
      return;
    }
    if (editingItem) {
      const _optionList = optionList.map((item) => {
        if (item.value === _value) {
          return optionItem;
        }
        return item;
      });
      setOptionList(_optionList);
    } else {
      const newItem = { label: _value, value: _value };
      setOptionList([...optionList, newItem]);
    }
  };

  const deleteItem = async (item: DefaultOptionType) => {
    setOptionList(optionList.filter((i) => i.value !== item.value));
    if (item.value === value) {
      onChange?.(undefined, optionList);
    }
    if (isServer) {
      await onDelete?.(item);
      return;
    }
    message.success(`删除成功`);
  };

  // 确保在 options 变更时同步更新 optionList
  useEffect(() => {
    setOptionList(options);
  }, [options]);

  return (
    <Select
      {...props}
      placeholder="请选择"
      value={value}
      onChange={onChange}
      optionLabelProp="label"
      dropdownRender={(menu) => (
        <div
          onMouseDown={(e) => {
            if (!isDelete) {
              return;
            }
            e.stopPropagation();
          }}
        >
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Form
              form={form}
              onFinish={async () => {
                let operateItem: DefaultOptionType | undefined;
                const label = form.getFieldValue(operateFormItemName);

                isDelete = false;
                if (editingItem) {
                  operateItem = optionList.find((item) => item.value === editingItem?.value) || {};
                  operateItem = {
                    ...operateItem,
                    label,
                  };
                  isServer && (await onEdit?.(operateItem));
                  const needUpdateValue = operateItem.label !== label;
                  needUpdateValue && value && onChange?.(operateItem.label, editingItem);
                } else {
                  const { value: _value } = isServer
                    ? (await onAdd?.({
                        label,
                      })) || {}
                    : {};
                  operateItem = {
                    value: _value || label,
                    label,
                  };
                }
                form.resetFields();
                setEditingItem(undefined);
                if (!isServer) {
                  handleOperateItem(operateItem);
                }
              }}
            >
              <Space>
                <Form.Item name={operateFormItemName} rules={inputFormItemRules}>
                  <Input placeholder="请输入" maxLength={10} showCount {...inputProps} />
                </Form.Item>

                <Form.Item>
                  <Button type="link" htmlType="submit">
                    {editingItem ? '更新' : '添加'}
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Space>
        </div>
      )}
    >
      {optionList.map((item) => (
        <Select.Option key={item.value} value={item.value} label={item.label}>
          <Space style={{ display: 'flex', justifyContent: 'space-between' }} align="center">
            <span>{item.label}</span>
            {/* edit */}
            <div>
              <Button
                type="link"
                icon={<EditOutlined />}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingItem(item);
                  form.setFieldValue(operateFormItemName, item.label);
                }}
              />
              <Popconfirm
                title="确认删除？"
                description="删除当前分组后，所属事件将被移入未分组中，确认删除吗？"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  deleteItem(item);
                }}
                onCancel={(e) => {
                  e?.stopPropagation();
                }}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={(e) => {
                    isDelete = true;
                    // 阻止点击事件关闭下拉框
                    e.stopPropagation();
                  }}
                />
              </Popconfirm>
            </div>
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};

export default EditableSelect;
