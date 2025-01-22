import { InputNumber, InputNumberProps } from 'antd';
import { FC } from 'react';
import { styled } from 'styled-components';

export const StyleContainer = styled.section`
  overflow-y: auto;
  margin-bottom: 12px;
  padding-right: 8px;
  .number-range-item-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    .split {
      margin: 0 8px;
    }
  }
`;
export const StyleInputNumber: FC<InputNumberProps<number>> = styled(InputNumber)`
  width: 100%;
`;
