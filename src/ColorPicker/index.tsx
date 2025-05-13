import { Popover } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import ColorBlock from './ColorBlock';
import ColorPanel from './ColorPanel';
import { defaultPalette } from './constant';
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
}) => {
  const [visible, setVisible] = useState(false);

  const onColorChange = useCallback(
    (color: string) => {
      if (readOnly) {
        return;
      }
      onChange(color);
      setVisible(false);
    },
    [onChange, readOnly],
  );

  const handleClickTrigger = useCallback(() => {
    if (readOnly) {
      return;
    }
    setVisible(true);
  }, [readOnly]);

  return (
    <Popover
      showArrow={false}
      trigger="click"
      placement="bottomLeft"
      {...popoverProps}
      open={readOnly ? false : visible}
      onOpenChange={readOnly ? undefined : setVisible}
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
      {children || (
        <ColorBlock
          color={value}
          size={itemSize}
          rowWrapCount={rowWrapCount}
          onClick={handleClickTrigger}
          readOnly={readOnly}
        />
      )}
    </Popover>
  );
};

export default ColorPicker;
export type { ColorPickerProps };
