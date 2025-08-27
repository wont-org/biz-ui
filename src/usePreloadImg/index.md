---
title: usePreloadImg
path: component/usePreloadImg
group:
  title: Hooks
---

# usePreloadImg

图片预加载 Hook

## 功能特性

- **预加载图片**: 提前加载图片资源，避免显示时的加载延迟
- **加载状态**: 返回图片加载完成后的 src，加载失败时返回空字符串
- **错误处理**: 自动处理图片加载失败的情况

## API

```typescript
const imgSrc = usePreloadImg(src: string): string;
```

### 参数

| 参数 | 说明     | 类型     | 默认值 |
| ---- | -------- | -------- | ------ |
| src  | 图片地址 | `string` | `''`   |

### 返回值

| 参数   | 说明                                   | 类型     |
| ------ | -------------------------------------- | -------- |
| imgSrc | 预加载完成的图片地址，失败时为空字符串 | `string` |

## 基础用法

<code src="./demo/Basic.tsx"></code>

## 代码示例

```tsx
import { usePreloadImg } from '@wont/biz-ui';

export default () => {
  const imgSrc = usePreloadImg('https://example.com/image.jpg');

  return <div>{imgSrc ? <img src={imgSrc} alt="预加载图片" /> : <div>图片加载中...</div>}</div>;
};
```

## 使用场景

- **图片画廊**: 提前预加载下一张图片，提升用户体验
- **轮播图**: 预加载所有轮播图片，避免切换时的白屏
- **头像显示**: 预加载用户头像，确保快速显示
- **商品图片**: 电商场景下的商品图片预加载
