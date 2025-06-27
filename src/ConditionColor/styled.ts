import { Form } from 'antd';
import { styled } from 'styled-components';

export const StyledConditionColorItem = styled(Form.Item)`
  .condition-color-item {
    display: flex;
    gap: 8px;
  }
  .ant-form-item {
    margin-bottom: 0px;
    &:nth-of-type(1) {
      width: 160px;
    }
    &:nth-of-type(2) {
      flex: 1;
    }
  }
`;
