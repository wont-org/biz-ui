import { Col, Row } from 'antd';
import React from 'react';
import { getLinearGradientStyle } from './utils';

export default () => {
  return (
    <div>
      <Row gutter={16}>
        <Col>
          <h3>绿白</h3>
          <div
            style={{
              ...getLinearGradientStyle({ colors: ['green', '#fff'] }),
              width: 100,
              height: 20,
            }}
          />
        </Col>
        <Col>
          <h3>二色渐变 红白</h3>
          <div
            style={{
              ...getLinearGradientStyle({ colors: ['red', '#fff'] }),
              width: 100,
              height: 20,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
