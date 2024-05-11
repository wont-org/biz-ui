# Ellipsis

文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。

## API

| 参数                 | 说明                                             | 类型    | 默认值 |
| -------------------- | ------------------------------------------------ | ------- | ------ |
| tooltip              | 移动到文本展示完整内容的提示                     | boolean | -      |
| length               | 在按照长度截取下的文本最大字符数，超过则截取省略 | number  | -      |
| lines                | 在按照行数截取下最大的行数，超过则截取省略       | number  | `1`    |
| fullWidthRecognition | 是否将全角字符的长度视为 2 来计算字符串长度      | boolean | -      |

## length

```jsx
import { Ellipsis } from '@wont/biz-ui';

export default () => {
  return (
    <>
      <div
        style={{
          width: 200,
        }}
      >
        <Ellipsis length={11} tooltip>
          文本过长自动处理省略号，支持按照文本长度和最大行数两种方式截取。
        </Ellipsis>
      </div>
      <div
        style={{
          width: 200,
        }}
      >
        <Ellipsis length={11} tooltip>
          文本过长自动处理省略号
        </Ellipsis>
      </div>
    </>
  );
};
```

## lines

```jsx
import { Ellipsis } from '@wont/biz-ui';

export default () => {
  return (
    <>
      <div
        style={{
          width: 200,
        }}
      >
        <Ellipsis lines={3} tooltip>
          There were injuries alleged in three and a fourth incident in September, according to the
          safety recall report. After meeting with US regulators in October, the firm decided to
          issue a voluntary recall.
        </Ellipsis>
      </div>
      <div
        style={{
          width: 200,
          height: 20,
        }}
      >
        <Ellipsis
          style={{
            lineHeight: '20px',
            fontSize: '20px',
          }}
          lines={1}
          tooltip
        >
          文本过长自动处。
        </Ellipsis>
      </div>
    </>
  );
};
```
