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
    padding: 16px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.06);

    .title-wrap {
      z-index: 1002;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .title {
        margin: 0;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.85);
        letter-spacing: 0.5px;
        font-weight: 500;
      }

      > .reset {
        width: 23px;
        height: 20px;
        position: absolute;
        right: 0;
        cursor: pointer;
        font-size: 18px;
        color: #1890ff;
        font-weight: bold;
        /* transform: rotateY(180deg); */
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
          background-color: #60b25e;
        }

        &.fail-tip {
          background-color: #dd725b;
        }
      }
    }

    .slider-wrap {
      margin-top: 12px;
      height: 28px;
      background-color: #eaebf0;
      box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.16);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .slider {
        position: absolute;
        left: 0;
        border-radius: 19px;
        background: linear-gradient(
          360deg,
          #f4f4f4 0%,
          #fefefe 50%,
          #f4f4f4 100%
        );
        border: 1px solid rgba(0, 0, 0, 0.1);
        width: 50px;
        height: 36px;
        cursor: pointer;
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          .slider-icon {
            color: #1890ff !important;
          }
        }
      }

      .slider-path {
        z-index: 1001;
        position: absolute;
        left: 0;
        height: 32px;
        background: #adc6ff;
        box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.16);
        border-radius: 16px;
      }

      .slider-tip {
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
`;
