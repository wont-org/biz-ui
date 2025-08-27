---
title: PuzzleCaptcha
path: component/PuzzleCaptcha
group: Data Collect
---

# PuzzleCaptcha

Slide puzzle captcha verification component

## Features

- Supports both frontend and backend verification modes
- Configurable mask overlay display
- Customizable success/failure messages
- Support for custom validators and data fetching functions
- Responsive design with different size support

## Basic Usage

<code src="./demo/Basic.tsx"></code>

## API

### PuzzleCaptchaProps

| Property   | Description                 | Type                                  | Default                                 |
| ---------- | --------------------------- | ------------------------------------- | --------------------------------------- |
| width      | Captcha width               | `number`                              | `320`                                   |
| height     | Captcha height              | `number`                              | `180`                                   |
| useMask    | Whether to use mask overlay | `boolean`                             | `false`                                 |
| visible    | Whether to show captcha     | `boolean`                             | `false`                                 |
| title      | Captcha title               | `string`                              | `Security Verification`                 |
| sliderTip  | Slider tip text             | `string`                              | `Slide to complete the puzzle`          |
| successMsg | Success message             | `string`                              | `Verification passed`                   |
| failMsg    | Failure message             | `string`                              | `Verification failed, please try again` |
| useFetch   | Whether to use backend data | `boolean`                             | `false`                                 |
| onSuccess  | Success callback            | `() => void`                          | -                                       |
| onFail     | Failure callback            | `() => void`                          | -                                       |
| onClose    | Close callback              | `() => void`                          | -                                       |
| validator  | Custom validator            | `({ x: number }) => Promise<boolean>` | -                                       |
| fetchData  | Fetch backend data          | `() => Promise<FetchInitData>`        | -                                       |

### FetchInitData

```typescript
interface FetchInitData {
  bgImg: string; // Background image URL
  gapImg: string; // Gap image URL
  y: number; // Gap Y position
}
```
