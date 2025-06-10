import { RightOutlined } from '@ant-design/icons';
import { Divider, Popover, Typography } from 'antd';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import ChromeColorPicker from './ChromeColorPicker';
import ColorBlock, { ColorBlockProps } from './ColorBlock';
import { ColorPickerProps } from './types';

// 颜色预设容器
const PresetWrapper = styled.div<{ $width: number }>`
  width: ${(props) => props.$width}px;
  background: #fff;
  border-radius: 4px;
  /* min-width: 260px; */
`;
export const StylePaletteWrapper = styled.div<{ $readOnly?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${(props) => (props.$readOnly ? 'default' : 'pointer')};
  padding: 4px;
  border-radius: 4px;
  .left-palette-wrapper {
    display: flex;
    align-items: center;
  }
  &:hover {
    background: ${(props) => (props.$readOnly ? 'transparent' : '#f5f5f5')};
  }
`;
const StylePalette = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 50%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    red 0deg,
    red 3.09deg,
    #f60 66.27deg,
    #fdff00 131.88deg,
    #83ff00 167.11deg,
    #0091ff 214.06deg,
    #3800ff 265.42deg,
    #c700ff 312deg,
    red 1turn
  );
`;

// 分组标题
const GroupTitle = styled.div<{ $readOnly?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 4px;
  cursor: ${(props) => (props.$readOnly ? 'default' : 'pointer')};
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => (props.$readOnly ? 'rgba(0, 0, 0, 0.85)' : '#1677ff')};
  }
`;

// 分组内容
const GroupContent = styled.div<{
  $expanded?: boolean;
  $height: number;
  $transitionDuration: number;
}>`
  display: flex;
  flex-wrap: wrap;
  will-change: opacity, height;
  transition: all ${(props) => props.$transitionDuration}s ease-in-out;
  height: ${(props) => (props.$expanded ? props.$height : 0)}px;
  opacity: ${(props) => (props.$expanded ? 1 : 0)};
  overflow: hidden;
`;

// 图标样式
const IconWrapper = styled.span<{ $expanded: boolean }>`
  margin-right: 8px;
  font-size: 12px;
  transition: transform 0.2s ease; /* 动画时长和缓动 */
  transform: rotate(${(props) => (props.$expanded ? 90 : 0)}deg);
`;

export interface ColorPresetProps {
  presets: ColorPickerProps['presets'];
  value?: string;
  onChange?: (color: string) => void;
  rowWrapCount?: number;
  itemSize?: number;
  readOnly?: boolean;
  colorToolTip?: ColorBlockProps['tooltipProps'];
}

const ColorPanel: React.FC<ColorPresetProps> = ({
  presets = [],
  value = '',
  onChange,
  itemSize = 28,
  rowWrapCount = 11,
  readOnly = false,
  colorToolTip,
}) => {
  const [moreStatus, setMoreStatus] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    presets.reduce((acc, group) => {
      if (group.title) {
        acc[group.title] = true;
      }
      return acc;
    }, {} as Record<string, boolean>),
  );

  const toggleGroup = (title?: string) => {
    if (!title || readOnly) {
      return;
    }
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const moreCallBackFn = (color?: string) => {
    if (typeof color === 'string' && !readOnly) {
      onChange?.(color);
    }
    setMoreStatus(false);
  };
  const renderGroupContent = (
    group: NonNullable<ColorPickerProps['presets']>[number],
    _presets: NonNullable<ColorPickerProps['presets']>,
  ) => {
    const _expanded =
      (!group.title && _presets.length <= 1) || Boolean(group.title && expandedGroups[group.title]);
    const _rowCount = Math.ceil(group.colors.length / rowWrapCount);
    const contentHeight = _rowCount * itemSize + _rowCount * 4;
    // 根据高度计算动画持续时间，高度越大时间越长，但设置上限
    const transitionDuration = Math.min(0.1, 0.1 + contentHeight / 200);

    return (
      <GroupContent
        $expanded={_expanded}
        $height={contentHeight}
        $transitionDuration={transitionDuration}
      >
        {group.colors.map((colorItem, index) => {
          const colorValue = typeof colorItem === 'string' ? colorItem : colorItem.value;
          const colorLabel = typeof colorItem === 'string' ? undefined : colorItem.label;

          return (
            <ColorBlock
              rowWrapCount={rowWrapCount}
              key={`${group.title}-${colorValue}-${index}`}
              size={itemSize}
              color={colorValue}
              label={colorLabel}
              tooltipProps={colorToolTip}
              selected={value === colorValue}
              readOnly={readOnly}
              onClick={(selectedColor) => onChange?.(selectedColor)}
            />
          );
        })}
      </GroupContent>
    );
  };

  const handleMoreClick = () => {
    if (!readOnly) {
      setMoreStatus(true);
    }
  };

  return (
    <PresetWrapper $width={itemSize * rowWrapCount + (rowWrapCount - 1) * 4}>
      {presets.map((group, groupIndex) => (
        <div key={groupIndex}>
          {group.title && (
            <GroupTitle $readOnly={readOnly} onClick={() => toggleGroup(group.title)}>
              <IconWrapper $expanded={expandedGroups[group.title]}>
                <RightOutlined />
              </IconWrapper>
              {group.title}
            </GroupTitle>
          )}
          {renderGroupContent(group, presets)}
        </div>
      ))}
      <Popover
        showArrow={false}
        onOpenChange={readOnly ? undefined : setMoreStatus}
        open={readOnly ? false : moreStatus}
        trigger="click"
        placement="right"
        content={<ChromeColorPicker value={value} onChange={moreCallBackFn} />}
      >
        <Divider style={{ margin: 8 }} />
        <StylePaletteWrapper $readOnly={readOnly} onClick={handleMoreClick}>
          <div className="left-palette-wrapper">
            <StylePalette />
            <Typography.Text>更多颜色</Typography.Text>
          </div>
          <RightOutlined />
        </StylePaletteWrapper>
      </Popover>
    </PresetWrapper>
  );
};

export default ColorPanel;
