---
title: PuzzleCaptcha
path: component/PuzzleCaptcha
group: 数据录入
---

# PuzzleCaptcha

滑动拼图验证码

## 功能特性

- 支持前端和后端两种验证模式
- 可配置遮罩层显示
- 自定义验证成功/失败消息
- 支持自定义验证器和数据获取函数
- 响应式设计，支持不同尺寸

## 基础用法

<code src="./demo/Basic.tsx"></code>

## API

### PuzzleCaptchaProps

| 参数       | 说明             | 类型                                  | 默认值             |
| ---------- | ---------------- | ------------------------------------- | ------------------ |
| width      | 验证码宽度       | `number`                              | `320`              |
| height     | 验证码高度       | `number`                              | `180`              |
| useMask    | 是否使用遮罩层   | `boolean`                             | `false`            |
| visible    | 是否显示验证码   | `boolean`                             | `false`            |
| title      | 验证码标题       | `string`                              | `安全验证`         |
| sliderTip  | 滑块提示文字     | `string`                              | `滑动完成拼图`     |
| successMsg | 验证成功提示     | `string`                              | `验证通过`         |
| failMsg    | 验证失败提示     | `string`                              | `验证失败，请重试` |
| useFetch   | 是否使用后端数据 | `boolean`                             | `false`            |
| onSuccess  | 验证成功回调     | `() => void`                          | -                  |
| onFail     | 验证失败回调     | `() => void`                          | -                  |
| onClose    | 关闭回调         | `() => void`                          | -                  |
| validator  | 自定义验证器     | `({ x: number }) => Promise<boolean>` | -                  |
| fetchData  | 获取后端数据     | `() => Promise<FetchInitData>`        | -                  |
