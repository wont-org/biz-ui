---
title: AutoLoadingButton
path: component/AutoLoadingButton
group:
  title: 通用
  order: 9999
---

# AutoLoadingButton

异步函数自动处理 loading 按钮

```jsx
import { Space } from 'antd';
import { AutoLoadingButton } from '@wont/biz-ui';

const sleep = (timeout) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('timeout');
    }, timeout);
  });
};

export default () => {
  const asyncClick = async () => {
    await sleep(2000);
  };
  function* fetchGenerator() {
    const urls = [1, 2];
    for (const url of urls) {
      yield sleep(1000);
    }
  }
  const generatorCLick = async () => {
    const gen = fetchGenerator();
    // for await (const data of gen) {
    //   console.log('data :>> ', data);
    // }
    let result = gen.next();
    while (!result.done) {
      const data = await result.value;
      console.log(data);
      result = gen.next();
    }
  };

  const syncClick = () => {
    console.log('syncClick');
  };
  return (
    <Space>
      <AutoLoadingButton onClick={asyncClick}>async promise button</AutoLoadingButton>
      <AutoLoadingButton onClick={generatorCLick}>async generator button</AutoLoadingButton>
      <AutoLoadingButton onClick={syncClick}>sync button</AutoLoadingButton>
    </Space>
  );
};
```
