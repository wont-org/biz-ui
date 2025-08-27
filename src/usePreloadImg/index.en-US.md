---
title: usePreloadImg
path: component/usePreloadImg
group:
  title: Hooks
---

# usePreloadImg

Image preloading Hook

## Features

- **Image Preloading**: Preload image resources to avoid loading delays when displaying
- **Loading Status**: Returns image src after loading completion, returns empty string on failure
- **Error Handling**: Automatically handles image loading failure scenarios

## API

```typescript
const imgSrc = usePreloadImg(src: string): string;
```

### Parameters

| Parameter | Description | Type     | Default |
| --------- | ----------- | -------- | ------- |
| src       | Image URL   | `string` | `''`    |

### Return Value

| Parameter | Description                                  | Type     |
| --------- | -------------------------------------------- | -------- |
| imgSrc    | Preloaded image URL, empty string on failure | `string` |

## Basic Usage

<code src="./demo/Basic.tsx"></code>

## Code Example

```tsx
import { usePreloadImg } from '@wont/biz-ui';

export default () => {
  const imgSrc = usePreloadImg('https://example.com/image.jpg');

  return (
    <div>{imgSrc ? <img src={imgSrc} alt="Preloaded image" /> : <div>Loading image...</div>}</div>
  );
};
```

## Use Cases

- **Image Gallery**: Preload next image for better user experience
- **Carousel**: Preload all carousel images to avoid blank screens during transitions
- **Avatar Display**: Preload user avatars for quick display
- **Product Images**: Preload product images in e-commerce scenarios
