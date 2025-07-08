---
title: BizProvider
path: component/BizProvider
group:
  title: 国际化
  order: 99999
---

# BizProvider

为组件库提供统一的配置，支持国际化等功能。基于 ant-design/pro-components 的 provider 包设计。

## 何时使用

- 需要为整个应用设置统一的语言
- 需要为子组件提供国际化支持
- 需要全局配置组件库的行为
- 需要将 antd 相关依赖统一管理

## 代码演示

### 基本用法

支持中文和英文两种语言，可以动态切换。antd 相关依赖已提取为独立的 hook。

<code src="./demo/basic.tsx"></code>

## API

### BizProvider

| 参数     | 说明     | 类型           | 默认值 |
| -------- | -------- | -------------- | ------ |
| locale   | 语言设置 | `'zh' \| 'en'` | `'zh'` |
| children | 子组件   | `ReactNode`    | -      |

### useTranslation

翻译相关的 hook。

返回值：

| 参数      | 说明     | 类型                                                    |
| --------- | -------- | ------------------------------------------------------- |
| t         | 翻译函数 | `(key: string, params?: Record<string, any>) => string` |
| locale    | 当前语言 | `'zh' \| 'en'`                                          |
| setLocale | 设置语言 | `(locale: 'zh' \| 'en') => void`                        |

### useLocale

国际化上下文 hook。

返回值：

| 参数      | 说明           | 类型                                                    |
| --------- | -------------- | ------------------------------------------------------- |
| locale    | 当前语言       | `'zh' \| 'en'`                                          |
| messages  | 当前语言的消息 | `LocaleData`                                            |
| setLocale | 设置语言       | `(locale: 'zh' \| 'en') => void`                        |
| t         | 翻译函数       | `(key: string, params?: Record<string, any>) => string` |

### useAntd

Antd 相关配置的 hook，将 antd 依赖从核心逻辑中分离。

返回值：

| 参数         | 说明               | 类型         |
| ------------ | ------------------ | ------------ |
| locale       | Antd 语言配置      | `AntdLocale` |
| momentLocale | Moment.js 语言标识 | `string`     |

## 数据格式

采用多语言字段格式，每个翻译项包含所有语言版本：

```typescript
{
  operation: {
    confirm: {
      enUS: 'Confirm',
      zhCN: '确定',
    },
    cancel: {
      enUS: 'Cancel',
      zhCN: '取消',
    },
  }
}
```

## 特性

1. **类似 pro-components 的设计**: 参考 ant-design/pro-components 的 provider 包架构
2. **antd 依赖分离**: 使用 `useAntd` hook 管理 antd 相关依赖
3. **统一的文件结构**: 将原有的 ConfigProvider 和 locale 目录合并
4. **向后兼容**: 保持与原有 API 的兼容性
5. **TypeScript 支持**: 完整的类型定义

## 注意事项

1. BizProvider 必须包裹在需要国际化的组件外层
2. 切换语言会影响所有子组件
3. 支持参数替换，如 `{count}` 会被替换为传入的参数值
4. 如果翻译键不存在，会显示键名本身并输出警告
5. antd 相关依赖通过 `useAntd` hook 获取
