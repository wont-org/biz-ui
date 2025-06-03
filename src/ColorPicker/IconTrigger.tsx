import { DownOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { styled } from 'styled-components';

const IconTriggerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .trigger-icon-wrap {
    display: flex;
    padding-right: 4px;
    border-radius: 4px;
    margin-left: 2px;
    &:hover {
      background-color: rgba(31, 35, 41, 0.1);
    }
    .down {
      color: #606873;
      scale: 0.85;
    }
  }
`;
export interface IconTriggerProps {
  color: string;
  label?: string;
  size?: number;
}
const IconTrigger: React.FC<IconTriggerProps> = ({ color, label, size = 28 }) => {
  return (
    <IconTriggerWrapper>
      {label && <span>{label}</span>}
      <Tooltip title="更多颜色" placement="bottom">
        <div className="trigger-icon-wrap">
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="rgb(43, 47, 54)"
          >
            <path
              className="fill-while-active"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.66 3.09a.3.3 0 0 0-.42 0l-.64.63a.3.3 0 0 0 0 .43l.5.5L6.15 9.6a.5.5 0 0 0 0 .7l4.95 4.95c.2.2.5.2.7 0l5.66-5.65a.5.5 0 0 0 0-.71l-5.8-5.8zm.5 2.62L8.26 9.6h7.08l.35-.36-3.53-3.53z"
            ></path>
            <path
              className="fill-while-active"
              d="M18.16 15.56c.58-.64.58-1.7 0-2.34l-1.06-1.17-1.06 1.17c-.59.65-.59 1.7 0 2.34a1.4 1.4 0 0 0 2.12 0z"
            ></path>
            <path
              d="M5 18c0-.22.18-.4.4-.4h13.2c.22 0 .4.18.4.4v2.2a.4.4 0 0 1-.4.4H5.4a.4.4 0 0 1-.4-.4V18z"
              fill={color}
            ></path>
            <path
              className="fill-while-active"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.4 17.6a.4.4 0 0 0-.4.4v2.2c0 .22.18.4.4.4h13.2a.4.4 0 0 0 .4-.4V18a.4.4 0 0 0-.4-.4H5.4zm.47.5c-.2 0-.37.12-.37.27v1.46c0 .15.17.27.37.27h12.26c.2 0 .37-.12.37-.27v-1.46c0-.15-.17-.27-.37-.27H5.87z"
              fillOpacity=".2"
            ></path>
          </svg>
          <DownOutlined className="down" />
        </div>
      </Tooltip>
    </IconTriggerWrapper>
  );
};

export default IconTrigger;
