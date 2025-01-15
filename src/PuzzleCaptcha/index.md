---
title: PuzzleCaptcha
path: component/PuzzleCaptcha
group: 数据录入
---

# PuzzleCaptcha

滑动拼图验证码

## 前端实现

```jsx
import { Space, Button } from 'antd';
import { PuzzleCaptcha } from '@wont/biz-ui';
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState({
    visible: false,
    useFetch: false,
    useMask: true,
  });
  const onFail = () => {
    console.log('onFail');
  };
  const onClose = () => {
    console.log('onClose');
    setState({
      ...state,
      visible: false,
    });
  };
  const onSuccess = () => {
    console.log('onSuccess');
    setState({
      ...state,
      visible: false,
    });
  };

  return (
    <Space>
      <Button
        onClick={() => {
          setState({
            ...state,
            visible: true,
          });
        }}
      >
        点击验证
      </Button>
      <PuzzleCaptcha {...state} onFail={onFail} onClose={onClose} onSuccess={onSuccess} />
    </Space>
  );
};
```
