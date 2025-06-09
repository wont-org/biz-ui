import { Popover } from 'antd';
import React, { FC, isValidElement, useCallback, useState } from 'react';
import ColorBlock from './ColorBlock';
import ColorPanel from './ColorPanel';
import { defaultPalette } from './constant';
import IconTrigger from './IconTrigger';
import { ColorPickerProps } from './types';

// 将defaultPalette转换为ColorPreset需要的格式
const defaultColorGroups = [
  {
    // title: '预设颜色',
    colors: defaultPalette,
  },
];

const ColorPicker: FC<ColorPickerProps> = ({
  children,
  value,
  itemSize = 28,
  popoverProps = {},
  onChange,
  rowWrapCount = 11,
  presets = defaultColorGroups,
  readOnly = false,
  trigger = 'block',
  onOpenChange,
}) => {
  const [open, setOpen] = useState(false);

  const onColorChange = useCallback(
    (color: string) => {
      if (readOnly) {
        return;
      }
      onChange(color);
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
        <IconTrigger color={value} onClick={handleClickTrigger} open={!open} readOnly={readOnly} />
      );
    }
    if (isValidElement(children)) {
      return <div onClick={handleClickTrigger}>{children}</div>;
    }
    return (
      <ColorBlock
        color={value}
        size={itemSize}
        rowWrapCount={rowWrapCount}
        onClick={handleClickTrigger}
        readOnly={readOnly}
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
        />
      }
    >
      {renderTrigger()}
    </Popover>
  );
};

export default ColorPicker;
export type { ColorPickerProps };
