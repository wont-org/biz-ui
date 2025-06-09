import { CheckOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

// 颜色块容器
const ColorBlockWrapper = styled.div<{
  $size?: number;
  $rowWrapCount?: number;
  $readOnly?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  margin: 0 4px 4px 0;
  padding: 2px;
  cursor: ${(props) => (props.$readOnly ? 'default' : 'pointer')};
  border-radius: 4px;
  background: #fff;
  border: 1px solid #e4e6ef;
  /* transition: all 0.2s; */
  &:nth-of-type(${(props) => props.$rowWrapCount}n) {
    margin-right: 0;
  }

  &:hover {
    border-color: ${(props) => (props.$readOnly ? '#e4e6ef' : '#1677ff')};
  }

  &.selected {
    border-color: #1677ff;
  }
`;

// 内部颜色显示区域
const ColorInner = styled.div<{ $color?: string }>`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: ${(props) => props.$color};
`;

// 选中指示器
const SelectedIndicator = styled.div<{ $isDark: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;

  .color-picker-check-icon {
    color: ${(props) => (props.$isDark ? '#ffffff' : '#000000')};
    filter: drop-shadow(
      0 0 1px ${(props) => (props.$isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)')}
    );
  }
`;

// 判断颜色是否为深色
const isColorDark = (color: string): boolean => {
  // 处理rgba或hex格式
  let r = 0,
    g = 0,
    b = 0;

  // 处理hex格式
  if (color.startsWith('#')) {
    const hex = color.substring(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  }
  // 处理rgb格式
  else if (color.startsWith('rgb')) {
    const colorValues = color.match(/\d+/g);
    if (colorValues && colorValues.length >= 3) {
      r = parseInt(colorValues[0]);
      g = parseInt(colorValues[1]);
      b = parseInt(colorValues[2]);
    }
  }

  // 计算亮度 (亮度公式: 0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128; // 亮度小于128认为是深色
};

export interface ColorBlockProps {
  color?: string;
  size?: number;
  rowWrapCount?: number;
  selected?: boolean;
  readOnly?: boolean;
  onClick?: (color: string) => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({
  color,
  rowWrapCount = 1,
  size = 28,
  selected = false,
  readOnly = false,
  onClick,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!color) {
      return;
    }
    setIsDark(isColorDark(color));
  }, [color]);

  const handleClick = () => {
    if (!readOnly && onClick && color) {
      onClick(color);
    }
  };

  return (
    <ColorBlockWrapper
      $size={size}
      $rowWrapCount={rowWrapCount}
      $readOnly={readOnly}
      className={`${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <ColorInner $color={color}>
        {selected && (
          <SelectedIndicator $isDark={isDark}>
            <CheckOutlined className="color-picker-check-icon" />
          </SelectedIndicator>
        )}
      </ColorInner>
    </ColorBlockWrapper>
  );
};

export default ColorBlock;
