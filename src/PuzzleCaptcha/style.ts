import styled from 'styled-components';

export const StyleContainer = styled.section`
  .puzzle-captcha-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .puzzle-captcha-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: opacity 200ms;
    z-index: 999;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .puzzle-captcha-body {
    width: fit-content;
    height: fit-content;
    user-select: none;
    background-color: #fff;
    padding: 9px 12px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.06);

    .title-wrap {
      z-index: 1002;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .title {
        margin: 0;
        font-size: 14px;
        color: #333;
        letter-spacing: 0.5px;
        font-weight: 500;
      }

      > .reset {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
        font-weight: bold;
        transform: rotateY(180deg);
      }
    }

    .canvas-wrap {
      position: relative;
      overflow: hidden;

      .loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: #e6e6e6;
        z-index: 1001;

        > i {
          font-size: 16px;
          color: #377ef6;
        }
      }

      .bg {
        position: absolute;
      }

      .gap {
        position: absolute;
      }

      .result-tip {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 24px;
        z-index: 1001;
        position: absolute;
        bottom: 0;
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        opacity: 0;
        transform: translateY(24px);
        transition: transform 200ms;

        &.result-visible {
          opacity: 0.95;
          transform: translateY(0);
        }

        &.success-tip {
          background-color: #82cf5c;
        }

        &.fail-tip {
          background-color: #f77;
        }
      }
    }

    .slider-wrap {
      margin-top: 9px;
      height: 20px;
      background-color: #e9ebf0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      position: relative;

      .slider {
        position: absolute;
        left: 0;
        background: #6598ff;
        outline: 2px solid rgba(101, 152, 255, 0.6);
        border-radius: 10px;
        width: 26px;
        height: 20px;
        cursor: pointer;
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;

        > i {
          color: #fff;
          font-size: 8px;
        }
      }

      .slider-path {
        z-index: 1001;
        position: absolute;
        left: 0;
        height: 20px;
        background: rgba(101, 152, 255, 0.6);
        border-radius: 10px;
      }

      .slider-tip {
        font-weight: 400;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
