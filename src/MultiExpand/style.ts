import { createGlobalStyle, styled } from 'styled-components';

export const StyleContent = styled.section`
  padding-right: 8px;
  overflow: hidden auto;
  max-width: 260px;
  max-height: 200px;
  line-height: 1;

  .contentItem {
    display: flex;
    align-items: center;
    white-space: nowrap;

    &:last-of-type {
      border: none;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }

  .contentTag {
    margin-bottom: 6px;
  }

  .cp {
    cursor: pointer;
  }

  .multi-expand-icon {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;

export const StyleContainer = styled.section`
  display: flex;
  align-items: center;
  /* width: fit-content; */
  width: 100%;
  overflow: hidden;
  /* border: 1px solid red; */

  .multi-expand-icon {
    width: 14px;
    height: 14px;
    margin-right: 6px;
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

  .p4 {
    padding: 4px;
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
    max-height: 200px;
  }

  .contentItem {
    display: flex;
    align-items: center;
    white-space: nowrap;

    &:last-of-type {
      border: none;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }

  .contentTag {
    margin-bottom: 6px;
  }
`;

export const PopoverStyleReset = createGlobalStyle`
  .popoverReset {
    .ant-popover-inner-content {
      width: initial;
    }

    .multi-expand-icon {
      width: 14px;
      height: 14px;
      margin-right: 6px;
    }

    .ant-popover-title {
      min-width: initial;
    }

    .content {
      padding-right: 8px;
      overflow: hidden auto;
      max-width: 260px;
      max-height: 200px;
      display: inline-flex;
      flex-wrap: wrap;
    }

    .contentItem {
      padding: 4px;
      display: flex;
      align-items: center;

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
      display: inline-flex;
      align-items: center;
    }
  }
`;
