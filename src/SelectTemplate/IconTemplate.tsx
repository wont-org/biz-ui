import React from 'react';
import { styled } from 'styled-components';
import { KeyOf } from '../utils/types';
import { ICON_COLOR, SVG_ICON } from './constant/icon';

const StyleIcon = styled.div<{ $color?: string }>`
  color: ${({ $color }) => $color};
  text-align: left;
  font-size: 20px;
  line-height: 1;
  display: flex;
`;
export interface IconTemplateProps {
  name: KeyOf<typeof SVG_ICON>;
  color?: KeyOf<typeof ICON_COLOR>;
}
export const IconTemplate = ({ name, color }: IconTemplateProps) => {
  return <StyleIcon $color={color ? ICON_COLOR[color] : undefined}>{SVG_ICON[name]}</StyleIcon>;
};
