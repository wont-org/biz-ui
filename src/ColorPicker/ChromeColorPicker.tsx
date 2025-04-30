import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { styled } from 'styled-components';
import { SPACE_TIMES } from './constant';

const toChangeValue = (data: ColorResult) => {
  const { r, g, b, a } = data.rgb;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const ChromeColorWrap = styled.div`
  .chrome-picker {
    box-shadow: none !important;
  }
`;

const BtnWrap = styled.div`
  margin-top: ${SPACE_TIMES(2.5)};
  text-align: right;

  > button:first-child {
    margin-right: ${SPACE_TIMES(2.5)};
  }
`;

/**
 * 单色选择组件（受控）
 * @param value 当前颜色
 * @param onChange (color: string) => void
 */
interface ChromeColorPickerProps {
  value: string;
  onChange: (color?: string) => void;
}

function ChromeColorPicker({ value, onChange }: ChromeColorPickerProps) {
  const [tempColor, setTempColor] = useState<string>(value);
  useEffect(() => {
    setTempColor(value);
  }, [value]);

  return (
    <ChromeColorWrap>
      <ChromePicker
        color={tempColor}
        onChangeComplete={(clr) => {
          const colorRgb = toChangeValue(clr);
          setTempColor(colorRgb);
        }}
      />
      <BtnWrap>
        <Button
          onClick={() => {
            onChange();
          }}
        >
          取消
        </Button>
        <Button
          type="primary"
          onClick={() => {
            onChange(tempColor);
          }}
        >
          确定
        </Button>
      </BtnWrap>
    </ChromeColorWrap>
  );
}

export default ChromeColorPicker;
