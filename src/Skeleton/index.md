# Skeleton

骨架屏

## CardSkeleton

```jsx
import { CardSkeleton } from '@wont/biz-ui';

export default () => {
  return <CardSkeleton />;
};
```

## DescriptionsWithSkeleton

```jsx
import { DescriptionsWithSkeleton } from '@wont/biz-ui';

export default () => {
  const items = [
    {
      key: '1',
      label: 'UserName',
      children: <span>Zhou Maomao</span>,
    },
    {
      key: '2',
      label: 'Telephone',
      children: <span>1810000000</span>,
    },
    {
      key: '3',
      label: 'Live',
      children: <span>Hangzhou, Zhejiang</span>,
    },
    {
      key: '4',
      label: 'Remark',
      children: <span>empty</span>,
    },
    {
      key: '5',
      label: 'Address',
      children: <span>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</span>,
    },
  ];
  return <DescriptionsWithSkeleton loading={true} items={items} />;
};
```

## ImgInfoSkeleton

```jsx
import { ImgInfoSkeleton } from '@wont/biz-ui';

export default () => {
  return <ImgInfoSkeleton />;
};
```

## PaginationSkeleton

```jsx
import { PaginationSkeleton } from '@wont/biz-ui';

export default () => {
  return <PaginationSkeleton />;
};
```

<!-- ## ParagraphSkeleton

```jsx
import { ParagraphSkeleton } from '@wont/biz-ui';

export default () => {
  return <ParagraphSkeleton />;
};
``` -->

## TableSkeleton

```jsx
import { TableSkeleton } from '@wont/biz-ui';

export default () => {
  return <TableSkeleton />;
};
```
