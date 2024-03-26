# AutoLoadingButton

异步函数自动处理 loading 按钮

```jsx
import { Space } from 'antd';
import { AutoLoadingButton } from '@wont/biz-ui';

const sleep = (timeout) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, timeout);
  });
};

export default () => {
  const asyncClick = async () => {
    await sleep(2000);
  };
  const syncClick = () => {
    console.log('syncClick');
  };
  return (
    <Space>
      <AutoLoadingButton onClick={asyncClick}>async button</AutoLoadingButton>
      <AutoLoadingButton onClick={syncClick}>sync button</AutoLoadingButton>
    </Space>
  );
};
```
