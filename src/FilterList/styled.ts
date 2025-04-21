import { styled } from 'styled-components';
import { RelationProps } from './Relation';

export const StyledRelation = styled.div<{
  $radio: RelationProps['value'];
}>`
  position: relative;
  padding: 5px 0 5px 30px;
  margin: 0 0 10px 20px;
  border-left: 1px solid #cbd5ee;
  .radioItem {
    position: absolute;
    left: -15px;
    z-index: 10;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 4px;
    cursor: pointer;
    border: 1px solid #0251ff;
    border-radius: 4px;
    transition: all 0.2s ease-in;
    &.and {
      top: calc(50% - 32px);
      color: ${({ $radio }) => ($radio === 'and' ? '#fff' : '#0251FF')};
      background-color: ${({ $radio }) => ($radio === 'and' ? '#0251FF' : '#fff')};
    }
    &.or {
      top: calc(50% + 2px);
      color: ${({ $radio }) => ($radio === 'or' ? '#fff' : '#0251FF')};
      background-color: ${({ $radio }) => ($radio === 'or' ? '#0251FF' : '#fff')};
    }
  }
`;

export const StyledFilterItem = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;

  .condition-field {
    width: 120px;
    margin-right: 8px;
  }

  .operator-field {
    width: 100px;
    margin-right: 8px;
  }

  .value-field {
    min-width: 150px;
  }

  .add-condition {
    margin-left: 8px;
    cursor: pointer;
    color: #0251ff;
  }

  .remove-condition {
    margin-left: 8px;
    cursor: pointer;
    color: #ff4d4f;
  }
`;
