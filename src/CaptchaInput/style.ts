import { styled } from 'styled-components';

export const StyleVerificationInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyleVerificationInputBox = styled.input`
  width: 48px;
  height: 48px;
  margin-right: 8px;
  font-size: 20px;
  text-align: center;
  border: none;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 -2px 0 -1px #ccc inset;
  transition: all 0.2s;
  ime-mode: disabled;

  &:hover,
  &:focus {
    box-shadow: 0 -2px 0 -1px #0251ff inset;
  }

  &[disabled] {
    box-shadow: 0 -2px 0 -1px #9caacb inset;
  }

  &:last-child {
    margin-right: 0;
  }
`;

// Error state styling
export const ErrorInputBox = styled(StyleVerificationInputBox)`
  border: 1px solid #f90d58;
`;
