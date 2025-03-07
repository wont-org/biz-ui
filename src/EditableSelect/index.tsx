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
import './index.less';

const { Option } = Select;

let isDelete = false;

interface EditableSelectProps
  extends Omit<SelectProps, 'optionLabelProp' | 'popupClassName' | 'dropdownRender'> {
  onDelete?: (val: DefaultOptionType) => Promise<void>;
  onAdd?: (val: DefaultOptionType & { label: string }) => Promise<void>;
  onEdit?: (val: DefaultOptionType) => Promise<void>;
  operateFormItemName?: string;
  inputProps?: InputProps;
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
  mode,
  ...props
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const [optionList, setOptionList] = useState<DefaultOptionType[]>(options);
  const [editingItem, setEditingItem] = useState<DefaultOptionType>();

  useEffect(() => {
    isServer && setOptionList(options);
  }, [isServer, options]);

  const reset = () => {
    setDeletingIndex(-1);
    setEditingItem(undefined);
    form.resetFields();
  };

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

  const deleteItem = async (item: DefaultOptionType, index: number) => {
    try {
      if (isServer) {
        setDeletingIndex(index);
        await onDelete?.(item);
      } else {
        setOptionList(optionList.filter((i) => i.value !== item.value));
      }
      if (typeof value === 'string' && item.value === value) {
        onChange?.(undefined, optionList);
      } else if (Array.isArray(value) && mode) {
        const multiValue = value.filter((val) => item.value !== val) || [];
        onChange?.(multiValue, optionList);
      }
      message.success(`删除成功`);
    } finally {
      setDeletingIndex(-1);
    }
  };

  // 确保在 options 变更时同步更新 optionList
  useEffect(() => {
    setOptionList(options);
  }, [options]);

  return (
    <Select
      placeholder="请选择"
      allowClear
      showSearch
      {...props}
      mode={mode}
      value={value}
      onChange={onChange}
      optionLabelProp="label"
      popupClassName={mode && 'select-dropdown-reset'}
      onDropdownVisibleChange={(open) => {
        if (open) {
          reset();
        }
      }}
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
          <Form
            style={{ padding: '0 8px 4px' }}
            form={form}
            onFinish={async () => {
              let operateItem: DefaultOptionType | undefined;
              const label = form.getFieldValue(operateFormItemName);

              isDelete = false;
              try {
                if (editingItem) {
                  operateItem = optionList.find((item) => item.value === editingItem?.value) || {};
                  operateItem = {
                    ...operateItem,
                    label,
                  };
                  if (isServer) {
                    setSubmitting(true);
                    await onEdit?.(operateItem);
                  } else {
                    let needUpdateValue = false;
                    const _optionList = optionList.map((i) => {
                      if (i.label !== operateItem?.label && i.value === operateItem?.value) {
                        needUpdateValue = true;
                        return {
                          ...i,
                          label: operateItem?.label,
                        };
                      }
                      return i;
                    });
                    needUpdateValue && setOptionList(_optionList);
                  }
                } else {
                  if (isServer) {
                    setSubmitting(true);
                    await onAdd?.({
                      label,
                    });
                  } else {
                    operateItem = {
                      value: label,
                      label,
                    };
                  }
                }
                form.resetFields();
                setEditingItem(undefined);
                if (!isServer) {
                  handleOperateItem(operateItem);
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div style={{ display: 'flex' }}>
              <Form.Item
                name={operateFormItemName}
                rules={inputFormItemRules}
                style={{
                  flex: 1,
                }}
              >
                <Input placeholder="请输入" maxLength={10} showCount {...inputProps} />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={submitting}
                  type="link"
                  htmlType="submit"
                  className="submit-btn-reset"
                  style={{
                    marginRight: mode ? 12 : 0,
                  }}
                >
                  {editingItem ? '更新' : '添加'}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    >
      {optionList.map((item, index) => (
        <Option key={item.value} value={item.value} label={item.label} disabled={item.disabled}>
          <Space
            style={{ display: 'flex', justifyContent: 'space-between', marginRight: 4 }}
            align="center"
          >
            <span>{item.label}</span>
            {/* edit */}
            {!item.disabled && (
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
                    deleteItem(item, index);
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
                    loading={deletingIndex === index}
                    onClick={(e) => {
                      isDelete = true;
                      // 阻止点击事件关闭下拉框
                      e.stopPropagation();
                    }}
                  />
                </Popconfirm>
              </div>
            )}
          </Space>
        </Option>
      ))}
    </Select>
  );
};

export default EditableSelect;
