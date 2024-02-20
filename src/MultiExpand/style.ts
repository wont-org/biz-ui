import { createGlobalStyle, styled } from 'styled-components';

export const StyleContainer = styled.section`
  display: flex;
  align-items: center;
  width: fit-content;
  overflow: hidden;

  .ant-tag {
    border-radius: 12px !important;
    font-size: 12px !important;
    // padding-bottom: 2px !important;
    padding: 1px 10px !important;
  }

  .cp {
    cursor: pointer;
  }

  .df {
    display: flex !important;
  }

  .mr4 {
    margin-right: 4px;
  }

  .mb4 {
    margin-bottom: 4px;
  }

  .groupTitle {
    font-size: 12px;
    color: rgba(0, 0, 0, 45%);
    margin: 4px 0;
  }

  .content {
    padding-right: 8px;
    overflow: hidden auto;
    max-width: 260px;
  }

  .contentItem {
    padding: 4px;
    display: flex;

    /* line-height: 1.4; */

    /* border-bottom: 1px solid rgba(0, 0, 0, 6%); */
    white-space: nowrap;

    &:last-of-type {
      border: none;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }

  .contentTag {
    margin-bottom: 4px;
  }
`;

export const PopoverStyleReset = createGlobalStyle`
  .popoverReset {
    .ant-popover-inner-content {
      width: initial;
    }

    .ant-popover-title {
      min-width: initial;
    }

    .content {
      padding-right: 8px;
      overflow: hidden auto;
      max-width: 260px;
    }

  .contentItem {
    padding: 4px;
    display: flex;

    /* line-height: 1.4; */
    border-bottom: 1px solid rgba(0, 0, 0, 6%);
    white-space: nowrap;

    &:last-of-type {
      border: none;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }

    .contentTag {
      margin-bottom: 4px;
    }
  }
`;
