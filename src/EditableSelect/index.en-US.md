---
title: EditableSelect
path: component/EditableSelect
group: Data Collect
---

# EditableSelect

Editable Select

> An enhanced select component with dynamic add, edit, and delete options functionality, supporting both local and server-side operation modes

## Basic Usage

<code src="./demo/Basic.tsx"></code>

## Server Mode

<code src="./demo/Server.tsx"></code>

## Multiple Mode

<code src="./demo/Multiple.tsx"></code>

## API

### EditableSelect

| Property            | Description                              | Type                                                            | Default                                             |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| onDelete            | Callback function for deleting options   | `(val: DefaultOptionType) => Promise<void>`                     | -                                                   |
| afterDelete         | Callback function after deleting options | `(val: DefaultOptionType) => Promise<void>`                     | -                                                   |
| onAdd               | Callback function for adding options     | `(val: DefaultOptionType & { label: string }) => Promise<void>` | -                                                   |
| onEdit              | Callback function for editing options    | `(val: DefaultOptionType) => Promise<void>`                     | -                                                   |
| operateFormItemName | Form item field name for operations      | `string`                                                        | `'editLabel'`                                       |
| inputProps          | Input properties                         | `InputProps`                                                    | `{}`                                                |
| inputFormItemRules  | Form validation rules for input          | `FormItemProps['rules']`                                        | `[{ required: true, message: '该字段是必填字段' }]` |
| isServer            | Whether it is server mode                | `boolean`                                                       | `false`                                             |
| popconfirmProps     | Properties for delete confirmation popup | `PopconfirmProps`                                               | See default config                                  |

Inherits all properties from Antd Select, except `optionLabelProp`, `popupClassName`, `dropdownRender`.

### Operation Modes

#### Local Mode (isServer=false)

- Add, delete, and edit operations are performed locally
- No need to provide `onAdd`, `onEdit`, `onDelete` callbacks
- Suitable for simple form scenarios

#### Server Mode (isServer=true)

- Add, delete, and edit operations require server interaction
- Must provide corresponding callback functions to handle server requests
- Supports asynchronous operations and error handling
- Suitable for scenarios requiring data persistence
