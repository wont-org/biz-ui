import { CSSProperties } from 'react';
import { css, styled } from 'styled-components';

export const StyledBarWrapper = styled.div`
  display: flex;
  width: 100%;
  > div {
    width: 50%;
  }
`;
export const StyledBarItem = styled.div<{
  $background?: CSSProperties['background'];
  $border?: CSSProperties['border'];
}>`
  width: 50%;
  height: 20px;
  ${({ $background, $border }) => css`
    background: ${$background};
    border: ${$border};
  `}
`;
export const StyledIconWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-start;
`;
export const StyledSelectTemplate = styled.div<{
  $rowWrapCount: number;
  $size: { height: string; fontSize: string; padding: string };
}>`
  position: relative;
  width: 100%;
  user-select: none;

  .template-selector-header {
    ${({ $size }) => css`
      height: ${$size.height};
      font-size: ${$size.fontSize};
      padding: ${$size.padding};
    `}
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;

    .selected-template {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      margin-right: 16px;

      img {
        /* width: calc(34px * 0.8);
        height: calc(30px * 0.8); */
        object-fit: contain;
      }

      span {
        ${({ $size }) => css`
          font-size: ${$size.fontSize};
        `}
        color: #333;
      }
    }

    .placeholder {
      color: #bfbfbf;
      ${({ $size }) => css`
        font-size: ${$size.fontSize};
      `}
    }

    .dropdown-arrow {
      font-size: 12px;
      transition: transform 0.2s;
      color: rgba(0, 0, 0, 0.25);

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .template-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 15%);
    z-index: 100;
    max-height: 320px;
    overflow-y: auto;
    transition: transform 0.3s;

    .template-category {
      padding: 12px 12px 0px 12px;

      &:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
      }

      .category-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.75);
        margin-bottom: 8px;
        margin-left: 4px;
      }

      .options-grid {
        display: grid;
        grid-template-columns: repeat(${(props) => props.$rowWrapCount}, 1fr);
        gap: 6px;

        .template-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 4px;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: #f5f5f5;
          }

          &.selected {
            /* border: 1px solid #6d98fd; */
            background-color: rgba(109, 152, 253, 5%);
          }

          img {
            width: calc(34px * 1.5);
            height: calc(30px * 1.5);
            object-fit: contain;
            margin-bottom: 4px;
          }

          .option-label {
            font-size: 14px;
            color: #666;
            text-align: center;
          }
        }
      }
    }
  }
`;
