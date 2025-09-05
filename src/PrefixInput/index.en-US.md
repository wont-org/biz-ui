---
title: PrefixInput
path: component/PrefixInput
group: Data Collect
---

# PrefixInput

Input component with prefix type selection

## Features

- Supports three matching types: global, prefix, and suffix
- Configurable default values
- Supports both controlled and uncontrolled modes
- Automatic output value formatting

## Basic Usage

<code src="./demo/Basic.tsx"></code>

## API

### PrefixInputProps

| Property | Description                          | Type                                                 | Default |
| -------- | ------------------------------------ | ---------------------------------------------------- | ------- |
| value    | Input value containing type and text | `{ type?: string; value?: string }`                  | -       |
| onChange | Callback when value changes          | `(value: { type?: string; value?: string }) => void` | -       |

Other properties are inherited from Antd Input component.

### PREFIX Constants

```typescript
const PREFIX = {
  global: {
    value: 'global',
    getValue: (val: string) => `%${val}%`, // Global match
  },
  prefix: {
    value: 'prefix',
    getValue: (val: string) => `${val}%`, // Prefix match
  },
  posfix: {
    value: 'posfix',
    getValue: (val: string) => `%${val}`, // Suffix match
  },
};
```
