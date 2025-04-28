import { styled } from 'styled-components';

export const StyledFormulaInput = styled.div<{
  $validateStatus?: boolean;
}>`
  .space-reset {
    margin-bottom: 8px;
  }

  .showBox {
    padding: 2px 5px;
    min-height: 50px;
    border: 1px solid #cbd5ee;
    border-radius: 4px;
    cursor: text;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    position: relative;
    resize: vertical;
    box-sizing: border-box;
    outline-color: #000;

    border-color: ${({ $validateStatus }) => ($validateStatus ? '#ff4d4f' : '#cbd5ee')};

    &__Item {
      display: flex;
      align-items: center;
      height: 40px;

      .symbol {
        cursor: pointer;
      }

      .tagGroup {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;

        .tag {
          height: 38px;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;

          .filterBtn {
            background-color: #f5f8ff;
          }

          .out {
            height: 100%;
            line-height: 20px;
          }
        }
      }

      .blank {
        &.ing {
          border-right: 1px solid #000;
          animation: flick 1s linear infinite;
        }

        width: 10px;
        height: 64%;
        line-height: 30px;
        transform: translateX(-5px);
      }
    }
  }

  .hiddenInput {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }

  @keyframes flick {
    50% {
      border: none;
    }
  }
`;
