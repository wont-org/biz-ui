import { Descriptions, DescriptionsProps, Skeleton } from 'antd';

export default (props: DescriptionsProps & { loading?: boolean }) => {
  const { items, colon, title, loading, ...restProps } = props;
  const skeItem = items?.map((item) => ({
    ...item,
    label: <Skeleton.Button active size="small" />,
    children: (
      <Skeleton.Button
        active
        size="small"
        block
        style={{
          width: '80%',
        }}
      />
    ),
  }));

  return (
    <>
      {loading && title && (
        <Skeleton.Button
          active
          size="small"
          style={{
            width: 100,
            marginBottom: 16,
          }}
        />
      )}
      <Descriptions
        title={loading ? false : title}
        colon={loading ? false : colon}
        items={loading ? skeItem : items}
        {...restProps}
      />
    </>
  );
};
