import { Card, Space, Typography } from 'antd';
import React, { useState } from 'react';
import ColorPanel from '../index';

const { Title, Text } = Typography;

const ColorPickerDemo: React.FC = () => {
  const [basicColor, setBasicColor] = useState<string>('#1677ff');
  const [customColor, setCustomColor] = useState<string>('#f5222d');

  // 自定义颜色分组
  const customColorGroups = [
    {
      title: 'primary',
      colors: [
        '#f0f8ff',
        '#d6e9ff',
        '#99c9ff',
        '#66b0ff',
        '#3399ff',
        '#2196f3',
        '#0c7cd5',
        '#0059b2',
        '#004ba0',
        '#003c8f',
      ],
    },
    {
      title: 'red',
      colors: [
        '#ffebee',
        '#ffcdd2',
        '#ef9a9a',
        '#e57373',
        '#ef5350',
        '#f44336',
        '#e53935',
        '#c62828',
        '#b71c1c',
        '#891515',
      ],
    },
    {
      title: 'green',
      colors: [
        '#e8f5e9',
        '#c8e6c9',
        '#a5d6a7',
        '#81c784',
        '#66bb6a',
        '#4caf50',
        '#43a047',
        '#2e7d32',
        '#1b5e20',
        '#0d3f10',
      ],
    },
  ];

  // 更多颜色分组，用于测试高度动画
  const moreColorGroups = [
    {
      title: 'basic',
      colors: [
        '#000000',
        '#262626',
        '#434343',
        '#595959',
        '#8c8c8c',
        '#bfbfbf',
        '#d9d9d9',
        '#f0f0f0',
        '#ffffff',
      ],
    },
    {
      title: 'rainbow',
      colors: [
        '#ff0000',
        '#ff4d00',
        '#ff9900',
        '#ffcc00',
        '#ffff00',
        '#99cc00',
        '#339900',
        '#33cc99',
        '#0099ff',
        '#0033ff',
        '#4d00ff',
        '#9900ff',
      ],
    },
    {
      title: 'large group',
      colors: [
        '#ffb3ba',
        '#ffdfba',
        '#ffffba',
        '#baffc9',
        '#bae1ff',
        '#d8a4ff',
        '#ff677d',
        '#ffb54d',
        '#fff970',
        '#7dff9f',
        '#70d1ff',
        '#bc83ff',
        '#ff2e4a',
        '#ff8c1a',
        '#ffea00',
        '#00e64d',
        '#00a2ff',
        '#7931ff',
        '#cc0022',
        '#cc6600',
        '#cccc00',
        '#008c26',
        '#006ecc',
        '#4d06bf',
        '#800020',
        '#804000',
        '#808000',
        '#004d13',
        '#003f73',
        '#320680',
      ],
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="基本用法">
        <Space direction="vertical">
          <Title level={5}>默认预设颜色</Title>
          <Space>
            <ColorPanel value={basicColor} onChange={setBasicColor} />
            <Text>当前颜色: {basicColor}</Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: basicColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title="自定义颜色分组">
        <Space direction="vertical">
          <Title level={5}>可折叠的颜色分组</Title>
          <Space>
            <ColorPanel
              rowWrapCount={9}
              value={customColor}
              onChange={setCustomColor}
              presets={customColorGroups}
            />
            <Text>当前颜色: {customColor}</Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: customColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title="只读模式">
        <Space direction="vertical">
          <Title level={5}>不可交互的颜色选择器</Title>
          <Space>
            <ColorPanel
              rowWrapCount={9}
              value={customColor}
              onChange={() => {}}
              presets={customColorGroups}
              readOnly={true}
            />
            <Text>只读模式下不响应点击</Text>
          </Space>
        </Space>
      </Card>

      <Card title="动画效果展示">
        <Space direction="vertical">
          <Title level={5}>高度自适应的动画效果</Title>
          <Text>不同高度的组有不同的动画时长</Text>
          <Space>
            <ColorPanel
              rowWrapCount={6}
              value={basicColor}
              onChange={setBasicColor}
              presets={moreColorGroups}
            />
          </Space>
        </Space>
      </Card>
    </Space>
  );
};

export default ColorPickerDemo;
