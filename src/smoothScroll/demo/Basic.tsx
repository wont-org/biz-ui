import { smoothScroll } from '@wont/biz-ui';
import { Button } from 'antd';
import React, { useRef } from 'react';

const MAX_HEIGHT = 500;

/**
 * smoothScroll 基础示例组件
 */
const Basic: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  /**
   * 滚动到顶部
   */
  const toTop = (): void => {
    if (boxRef.current) {
      smoothScroll(boxRef.current, 0, 0);
    }
  };

  /**
   * 滚动到底部
   */
  const toBottom = (): void => {
    if (boxRef.current) {
      smoothScroll(boxRef.current, 0, boxRef.current?.scrollHeight);
    }
  };

  return (
    <div
      ref={boxRef}
      style={{
        height: MAX_HEIGHT,
        border: '1px solid #114db4',
        overflowY: 'scroll',
        padding: 16,
      }}
    >
      <div style={{ height: MAX_HEIGHT * 3, position: 'relative' }}>
        <Button style={{ position: 'absolute', top: 0, left: 0 }} onClick={toBottom}>
          to bottom
        </Button>
        <Button style={{ position: 'absolute', bottom: 0, left: 0, margin: 0 }} onClick={toTop}>
          to top
        </Button>
      </div>
    </div>
  );
};

export default Basic;
