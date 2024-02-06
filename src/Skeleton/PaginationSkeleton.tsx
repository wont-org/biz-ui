import { Skeleton } from 'antd';

export default ({ style = {} }) => {
  return (
    <Skeleton.Button
      active
      block
      style={{
        marginTop: 24,
        maxWidth: '65%',
        float: 'right',
        ...style,
      }}
    />
  );
};
