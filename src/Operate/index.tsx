import { DownOutlined } from '@ant-design/icons';
import { ButtonProps, Divider, Dropdown, DropDownProps, Space } from 'antd';
import React from 'react';
import AutoLoadingButton from '../AutoLoadingButton';

type OperateDataItem = ButtonProps & {
  title: string;
};
export interface OperateProps {
  data: OperateDataItem[];
  showCount?: number;
  split?: boolean;
  dropDownProps?: Omit<DropDownProps, 'menu'>;
}
export default (props: OperateProps) => {
  const { data = [], showCount = 3, split = true, dropDownProps = {} } = props;
  const count = showCount === -1 ? data.length : Math.min(showCount, data.length);
  const getListRender = (_count: number) => {
    if (showCount === 0) {
      return null;
    }
    return data.slice(0, _count).map((item) => {
      const { title, ...rest } = item;
      return (
        <AutoLoadingButton key={title} type="link" style={{ padding: 0 }} {...rest}>
          {title}
        </AutoLoadingButton>
      );
    });
  };
  const getMoreRender = () => {
    if ((data.length <= showCount && showCount !== 0) || showCount === -1) {
      return null;
    }
    const items = data.slice(count).map((item) => {
      const { title, ...rest } = item;

      return {
        key: title,
        label: (
          <AutoLoadingButton key={title} type="link" style={{ padding: 0 }} size="small" {...rest}>
            {title}
          </AutoLoadingButton>
        ),
      };
    });
    return (
      <Dropdown {...dropDownProps} menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space
            style={{
              fontSize: 14,
            }}
          >
            更多
            <DownOutlined
              style={{
                fontSize: 13,
              }}
            />
          </Space>
        </a>
      </Dropdown>
    );
  };

  return (
    <Space size={0} split={split && <Divider type="vertical" />}>
      {getListRender(count)}
      {getMoreRender()}
    </Space>
  );
};
