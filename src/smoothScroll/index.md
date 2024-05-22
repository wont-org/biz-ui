# smoothScroll

平滑滚动。将某个 DOM 节点平滑滚动到指定位置，避免生硬的长距离页面跳动。

## API

```ts
function smoothScroll(
  element: HTMLElement | Window,
  x: number,
  y: number,
  duration: number = 250,
): void;
```

将 `element` 滚动到 `(x, y)` 处，动画时长为 `duration`。

## 基础用法

```jsx
import { smoothScroll } from '@wont/biz-ui';
import { Button } from 'antd';
import React from 'react';

const MAX_HEIGHT = 500;
const SIZE = 20;

export default class Test extends React.Component {
  box = React.createRef();

  render() {
    return (
      <div
        ref={this.box}
        style={{
          height: MAX_HEIGHT,
          border: '1px solid #114db4',
          overflowY: 'scroll',
          padding: 16,
        }}
      >
        <div style={{ height: MAX_HEIGHT * 3, position: 'relative' }}>
          <Button style={{ position: 'absolute', top: 0, left: 0 }} onClick={this.toBottom}>
            to bottom
          </Button>
          <Button
            style={{ position: 'absolute', bottom: 0, left: 0, margin: 0 }}
            onClick={this.toTop}
          >
            to top
          </Button>
        </div>
      </div>
    );
  }

  toTop = (evt) => {
    smoothScroll(this.box.current, 0, 0);
  };

  toBottom = () => {
    smoothScroll(this.box.current, 0, MAX_HEIGHT * 2);
  };
}
```
