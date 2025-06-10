import React, { useState } from 'react';
import ColorBlock from '../ColorBlock';
import ColorPanel from '../ColorPanel';

const Demo: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('rgba(25, 118, 210, 1)');

  const presets = [
    {
      title: 'primary',
      colors: [
        { value: '#f0f8ff', label: '淡蓝色' },
        { value: '#d6e9ff', label: '天蓝色' },
        { value: '#99c9ff', label: '浅蓝色' },
        { value: '#66b0ff', label: '亮蓝色' },
        { value: '#3399ff', label: '明蓝色' },
        { value: '#2196f3', label: '蓝色' },
        { value: '#0c7cd5', label: '深蓝色' },
        { value: '#0059b2', label: '暗蓝色' },
        { value: '#004ba0', label: '深暗蓝色' },
        { value: '#003c8f', label: '藏蓝色' },
      ],
    },
    {
      title: 'red',
      colors: [
        { value: '#ffebee', label: '浅粉红色' },
        { value: '#ffcdd2', label: '淡粉红色' },
        { value: '#ef9a9a', label: '浅红色' },
        { value: '#e57373', label: '亮红色' },
        { value: '#ef5350', label: '鲜红色' },
        { value: '#f44336', label: '红色' },
        { value: '#e53935', label: '砖红色' },
        { value: '#c62828', label: '深红色' },
        { value: '#b71c1c', label: '暗红色' },
        { value: '#891515', label: '酒红色' },
      ],
    },
    {
      title: 'green',
      colors: [
        { value: '#e8f5e9', label: '淡绿色' },
        { value: '#c8e6c9', label: '浅绿色' },
        { value: '#a5d6a7', label: '清绿色' },
        { value: '#81c784', label: '亮绿色' },
        { value: '#66bb6a', label: '明绿色' },
        { value: '#4caf50', label: '绿色' },
        { value: '#43a047', label: '草绿色' },
        { value: '#2e7d32', label: '深绿色' },
        { value: '#1b5e20', label: '暗绿色' },
        { value: '#0d3f10', label: '墨绿色' },
      ],
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h3>ColorBlock 组件</h3>
      <div style={{ marginBottom: 16 }}>
        <h4>交互模式</h4>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <ColorBlock color="#1677ff" label="蓝色" selected={true} />
          <ColorBlock color="#f5222d" label="红色" />
          <ColorBlock color="#52c41a" label="绿色" />
          <ColorBlock color="#faad14" label="黄色" />
        </div>

        <h4>只读模式</h4>
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <ColorBlock color="#1677ff" label="蓝色" selected={true} readOnly={true} />
          <ColorBlock color="#f5222d" label="红色" readOnly={true} />
          <ColorBlock color="#52c41a" label="绿色" readOnly={true} />
          <ColorBlock color="#faad14" label="黄色" readOnly={true} />
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
            readOnly={true}
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
