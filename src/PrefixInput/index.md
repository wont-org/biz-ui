---
title: PrefixInput
path: component/PrefixInput
group: 数据录入
---

# PrefixInput

带前缀类型选择的输入框组件

## 功能特性

- 支持全局、前缀、后缀三种匹配类型
- 可设置默认值
- 支持受控和非受控模式
- 自动格式化输出值

## 基础用法

<code src="./demo/Basic.tsx"></code>

## API

### PrefixInputProps

| 参数     | 说明                   | 类型                                                 | 默认值 |
| -------- | ---------------------- | ---------------------------------------------------- | ------ |
| value    | 输入值，包含类型和文本 | `{ type?: string; value?: string }`                  | -      |
| onChange | 值变化回调             | `(value: { type?: string; value?: string }) => void` | -      |

其他属性继承自 Antd Input 组件。

### PREFIX 常量

```typescript
const PREFIX = {
  global: {
    value: 'global',
    getValue: (val: string) => `%${val}%`, // 全局匹配
  },
  prefix: {
    value: 'prefix',
    getValue: (val: string) => `${val}%`, // 前缀匹配
  },
  posfix: {
    value: 'posfix',
    getValue: (val: string) => `%${val}`, // 后缀匹配
  },
};
```
