import { Skeleton } from 'antd';
import { styled } from 'styled-components';

export default styled(Skeleton)<{
  $paragraphHeight?: string;
  $paragraphWidth?: string;
}>`
  .ant-skeleton-paragraph {
    > li {
      height: ${(props) => props.$paragraphHeight} !important;
      width: ${(props) => props.$paragraphWidth} !important;
    }
  }
`;
