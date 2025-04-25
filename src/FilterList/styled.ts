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
    text-align: center;
    position: absolute;
    left: -15px;
    z-index: 10;
    display: flex;
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
  .ant-form-item.form-item-reset {
    margin-bottom: 0px;
    .ant-select.condition-field {
      width: 120px;
      margin-right: 6px;
    }
    .ant-select.operator-field {
      width: 100px;
      margin-right: 6px;
    }
  }
`;
