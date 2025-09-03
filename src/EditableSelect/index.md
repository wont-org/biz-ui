---
title: EditableSelect
path: component/EditableSelect
group: 数据录入
---

# EditableSelect

可编辑下拉选择器

> 在下拉选择器基础上增加了动态添加、编辑、删除选项的功能，支持本地和服务端两种操作模式

## 基础用法

<code src="./demo/Basic.tsx"></code>

## 服务端模式

<code src="./demo/Server.tsx"></code>

## 多选模式

<code src="./demo/Multiple.tsx"></code>

## API

### EditableSelect

| 参数                | 说明                 | 类型                                                            | 默认值                                              |
| ------------------- | -------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| onDelete            | 删除选项的回调函数   | `(val: DefaultOptionType) => Promise<void>`                     | -                                                   |
| afterDelete         | 删除选项后的回调函数 | `(val: DefaultOptionType) => Promise<void>`                     | -                                                   |
| onAdd               | 添加选项的回调函数   | `(val: DefaultOptionType & { label: string }) => Promise<void>` | -                                                   |
| onEdit              | 编辑选项的回调函数   | `(val: DefaultOptionType) => Promise<void>`                     | -                                                   |
| operateFormItemName | 操作表单项的字段名   | `string`                                                        | `'editLabel'`                                       |
| inputProps          | 输入框的属性         | `InputProps`                                                    | `{}`                                                |
| inputFormItemRules  | 输入框表单验证规则   | `FormItemProps['rules']`                                        | `[{ required: true, message: '该字段是必填字段' }]` |
| isServer            | 是否为服务端模式     | `boolean`                                                       | `false`                                             |
| popconfirmProps     | 删除确认弹窗的属性   | `PopconfirmProps`                                               | 详见默认配置                                        |

继承 Antd Select 的所有属性，除了 `optionLabelProp`、`popupClassName`、`dropdownRender`。

### 操作模式

#### 本地模式 (isServer=false)

- 选项的增删改操作直接在本地进行
- 不需要提供 `onAdd`、`onEdit`、`onDelete` 回调
- 适用于简单的表单场景

#### 服务端模式 (isServer=true)

- 选项的增删改操作需要与服务端交互
- 必须提供相应的回调函数处理服务端请求
- 支持异步操作和错误处理
- 适用于需要持久化数据的场景
