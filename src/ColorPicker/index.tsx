import { Popover } from 'antd';
import React, { cloneElement, FC, isValidElement, useCallback, useState } from 'react';
import ColorBlock from './ColorBlock';
import ColorPanel from './ColorPanel';
import { PRESET_COLORS } from './constant';
import IconTrigger from './IconTrigger';
import { ColorGroup, ColorPickerProps } from './types';

// 将PRESET_COLORS转换为ColorPreset需要的格式
const defaultColorGroups: ColorGroup[] = [
  {
    // title: '预设颜色',
    colors: PRESET_COLORS,
  },
];

const ColorPicker: FC<ColorPickerProps> = ({
  children,
  value,
  label,
  itemSize = 28,
  popoverProps = {},
  onChange,
  rowWrapCount = 11,
  presets = defaultColorGroups,
  readOnly = false,
  trigger = 'block',
  onOpenChange,
  colorToolTip,
}) => {
  const [open, setOpen] = useState(false);

  const onColorChange = useCallback(
    (color: string) => {
      if (readOnly) {
        return;
      }
      onChange?.(color);
      setOpen(false);
    },
    [onChange, readOnly],
  );

  const handleClickTrigger = useCallback(() => {
    if (readOnly) {
      return;
    }
    setOpen(true);
  }, [readOnly]);
  const renderTrigger = () => {
    if (trigger === 'icon') {
      return (
        <IconTrigger
          color={value}
          label={label}
          onClick={handleClickTrigger}
          open={!open}
          readOnly={readOnly}
        />
      );
    }
    if (isValidElement(children)) {
      const _children = cloneElement(children, {
        ...(children.props as any),
        onClick: handleClickTrigger,
        color: value,
      });
      return _children;
    }
    return (
      <ColorBlock
        color={value}
        size={itemSize}
        rowWrapCount={rowWrapCount}
        onClick={handleClickTrigger}
        readOnly={readOnly}
        tooltipProps={colorToolTip}
      />
    );
  };

  return (
    <Popover
      showArrow={false}
      trigger="click"
      placement="bottomLeft"
      {...popoverProps}
      open={readOnly ? false : open}
      onOpenChange={(_open) => {
        if (readOnly) {
          return;
        }
        setOpen(_open);
        onOpenChange?.(_open);
      }}
      content={
        <ColorPanel
          rowWrapCount={rowWrapCount}
          itemSize={itemSize}
          presets={presets}
          value={value}
          onChange={onColorChange}
          colorToolTip={colorToolTip}
        />
      }
    >
      {renderTrigger()}
    </Popover>
  );
};

export default ColorPicker;
export type { ColorPickerProps };
