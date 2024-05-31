import { Divider, Space, ButtonProps } from 'antd';
import React from 'react';
import AutoLoadingButton from '../AutoLoadingButton';

type OperateDataItem = ButtonProps & {
  title: string;
};
export interface OperateProps {
  data: OperateDataItem[];
}
export default (props: OperateProps) => {
  const { data = [] } = props;
  return (
    <Space size={0} split={<Divider type="vertical" />}>
      {data.map((item) => {
        const { title, ...rest } = item;
        return (
          <AutoLoadingButton key={title} type="link" style={{ padding: 0 }} {...rest}>
            {title}
          </AutoLoadingButton>
        );
      })}
    </Space>
  );
};
