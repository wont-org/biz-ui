import { Col, Row } from 'antd';
import React from 'react';
import { getColorGrading } from './utils';

export default () => {
  return (
    <div>
      <Row gutter={16}>
        <Col>
          <h3>三色渐变 绿白红</h3>
          {getColorGrading({
            scale: ['green', '#ffffff', 'red'],
            domain: [0, 0.5, 1],
            steps: 5,
          }).map((color) => (
            <div key={color} style={{ width: 100, height: 20, backgroundColor: color }} />
          ))}
        </Col>
        <Col>
          <h3>二色渐变 绿白</h3>
          {getColorGrading({
            scale: ['green', '#fff'],
          }).map((color) => (
            <div key={color} style={{ width: 100, height: 20, backgroundColor: color }} />
          ))}
        </Col>
      </Row>
    </div>
  );
};
