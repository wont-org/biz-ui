import { Form } from 'antd';
import { styled } from 'styled-components';

export const StyleValidateErrorPlaceholder = styled.div`
  height: 22px;
  line-height: 22px;
`;
export const StyleOperatorText = styled.div`
  margin-bottom: 8px;
  height: 22px;
  line-height: 22px;
`;
export const StyleIcon = styled.div`
  padding-right: 8px;
  margin-bottom: 8px;
`;
export const StyleTextSecondary = styled.div<{ $align?: 'right' }>`
  padding-right: 8px;
  color: #646a73;
  padding-right: ${(props) => (props.$align === 'right' ? '16px' : '8px')};
  text-align: ${(props) => (props.$align === 'right' ? 'right' : 'left')};
`;
export const StyledConditionItem = styled(Form.Item)`
  .ant-form-item {
    margin-bottom: 0px;
  }
  .operator {
    width: 160px;
  }
  .value {
    flex: 1;
  }
  .valueType {
    width: 100px;
  }

  .condition-color-item-wrap {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
`;
