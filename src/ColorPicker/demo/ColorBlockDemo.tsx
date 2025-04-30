import React, { useState } from 'react';
import ColorBlock from '../ColorBlock';
import ColorPanel from '../ColorPanel';

const Demo: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('rgba(25, 118, 210, 1)');

  const presets = [
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

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h3>ColorBlock 组件</h3>
      <div style={{ marginBottom: 16 }}>
        <h4>交互模式</h4>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <ColorBlock color="#1677ff" selected={true} />
          <ColorBlock color="#f5222d" />
          <ColorBlock color="#52c41a" />
          <ColorBlock color="#faad14" />
        </div>

        <h4>只读模式</h4>
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <ColorBlock color="#1677ff" selected={true} readOnly={true} />
          <ColorBlock color="#f5222d" readOnly={true} />
          <ColorBlock color="#52c41a" readOnly={true} />
          <ColorBlock color="#faad14" readOnly={true} />
        </div>
      </div>

      <h3>ColorPanel 组件</h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div>
          <h4>交互模式</h4>
          <ColorPanel
            presets={presets}
            value={selectedColor}
            onChange={setSelectedColor}
            rowWrapCount={5}
          />
        </div>

        <div>
          <h4>只读模式（不会响应点击）</h4>
          <ColorPanel
            presets={presets}
            value={selectedColor}
            onChange={() => {}}
            rowWrapCount={5}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        当前选中颜色：
        <div
          style={{
            marginTop: 8,
            width: 100,
            height: 24,
            background: selectedColor,
            borderRadius: 4,
            border: '1px solid #d9d9d9',
          }}
        />
        <div style={{ marginTop: 4 }}>{selectedColor}</div>
      </div>
    </div>
  );
};

export default Demo;
