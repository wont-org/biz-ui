---
title: BlankLink
path: component/BlankLink
group:
  title: 通用
  order: 9999
---

# BlankLink

封装 a 链接新开窗口安全跳转行为，默认增加`rel="noopener noreferrer"`

```jsx
import { Space } from 'antd';
import { BlankLink } from '@wont/biz-ui';

export default () => {
  return (
    <BlankLink href="https://github.com/wont-org/biz-ui">
      这是一个a链接，点击新开窗口，安全跳转到本项目github仓库
    </BlankLink>
  );
};
```
