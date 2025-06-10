import ColorPicker from '@wont/biz-ui/ColorPicker';
import IconTrigger from '@wont/biz-ui/ColorPicker/IconTrigger';
import { Card, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

const ColorPickerDemo: React.FC = () => {
  const [basicColor, setBasicColor] = useState<string>('#1677ff');
  const [customColor, setCustomColor] = useState<string>('#f5222d');
  const [noTooltipColor, setNoTooltipColor] = useState<string>('#52c41a');
  const [customTooltipColor, setCustomTooltipColor] = useState<string>('#722ed1');
  const [open, setOpen] = useState<boolean>(true);
  // 自定义颜色分组
  const customColorGroups = [
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

  // 更多颜色分组，用于测试高度动画
  const moreColorGroups = [
    {
      title: 'basic',
      colors: [
        { value: '#000000', label: '黑色' },
        { value: '#262626', label: '深灰色' },
        { value: '#434343', label: '暗灰色' },
        { value: '#595959', label: '灰色' },
        { value: '#8c8c8c', label: '中灰色' },
        { value: '#bfbfbf', label: '浅灰色' },
        { value: '#d9d9d9', label: '淡灰色' },
        { value: '#f0f0f0', label: '近白色' },
        { value: '#ffffff', label: '白色' },
      ],
    },
    {
      title: 'rainbow',
      colors: [
        { value: '#ff0000', label: '红色' },
        { value: '#ff4d00', label: '橙红色' },
        { value: '#ff9900', label: '橙色' },
        { value: '#ffcc00', label: '金黄色' },
        { value: '#ffff00', label: '黄色' },
        { value: '#99cc00', label: '黄绿色' },
        { value: '#339900', label: '绿色' },
        { value: '#33cc99', label: '青绿色' },
        { value: '#0099ff', label: '青色' },
        { value: '#0033ff', label: '蓝色' },
        { value: '#4d00ff', label: '靛蓝色' },
        { value: '#9900ff', label: '紫色' },
      ],
    },
    {
      title: 'large group',
      colors: [
        { value: '#ffb3ba', label: '浅粉红' },
        { value: '#ffdfba', label: '浅杏色' },
        { value: '#ffffba', label: '浅黄色' },
        { value: '#baffc9', label: '浅薄荷绿' },
        { value: '#bae1ff', label: '浅天蓝色' },
        { value: '#d8a4ff', label: '浅紫色' },
        { value: '#ff677d', label: '粉红色' },
        { value: '#ffb54d', label: '杏色' },
        { value: '#fff970', label: '黄色' },
        { value: '#7dff9f', label: '薄荷绿' },
        { value: '#70d1ff', label: '天蓝色' },
        { value: '#bc83ff', label: '紫色' },
        { value: '#ff2e4a', label: '深粉色' },
        { value: '#ff8c1a', label: '橙色' },
        { value: '#ffea00', label: '金黄色' },
        { value: '#00e64d', label: '绿色' },
        { value: '#00a2ff', label: '蓝色' },
        { value: '#7931ff', label: '深紫色' },
        { value: '#cc0022', label: '深红色' },
        { value: '#cc6600', label: '深橙色' },
        { value: '#cccc00', label: '深黄色' },
        { value: '#008c26', label: '深绿色' },
        { value: '#006ecc', label: '深蓝色' },
        { value: '#4d06bf', label: '深靛蓝色' },
        { value: '#800020', label: '暗红色' },
        { value: '#804000', label: '暗橙色' },
        { value: '#808000', label: '暗黄色' },
        { value: '#004d13', label: '暗绿色' },
        { value: '#003f73', label: '暗蓝色' },
        { value: '#320680', label: '暗紫色' },
      ],
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="基本用法">
        <Space direction="vertical">
          <Title level={5}>默认预设颜色</Title>
          <Space>
            <ColorPicker value={basicColor} onChange={setBasicColor} />
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
      <Card title="自定义触发器">
        <Space direction="vertical">
          <Space>
            <ColorPicker
              value={basicColor}
              onChange={setBasicColor}
              onOpenChange={(_open) => {
                setOpen(!_open);
              }}
            >
              <IconTrigger open={open} label="正值" />
            </ColorPicker>
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
            <ColorPicker
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
            <ColorPicker
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

      <Card title="禁用颜色提示">
        <Space direction="vertical">
          <Title level={5}>不显示颜色名称提示</Title>
          <Space>
            <ColorPicker
              rowWrapCount={9}
              value={noTooltipColor}
              onChange={setNoTooltipColor}
              presets={customColorGroups}
              colorToolTip={false}
            />
            <Text>当前颜色: {noTooltipColor}</Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: noTooltipColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title="自定义Tooltip">
        <Space direction="vertical">
          <Title level={5}>自定义Tooltip样式和行为</Title>
          <Space>
            <ColorPicker
              rowWrapCount={9}
              value={customTooltipColor}
              onChange={setCustomTooltipColor}
              presets={customColorGroups}
              colorToolTip={{
                placement: 'right',
                color: '#722ed1',
                overlayInnerStyle: { color: 'white', fontWeight: 'bold' },
              }}
            />
            <Text>当前颜色: {customTooltipColor}</Text>
            <div
              style={{
                width: 40,
                height: 20,
                background: customTooltipColor,
                display: 'inline-block',
                border: '1px solid #d9d9d9',
                borderRadius: 2,
              }}
            />
          </Space>
        </Space>
      </Card>

      <Card title="动画效果展示">
        <Space direction="vertical">
          <Title level={5}>高度自适应的动画效果</Title>
          <Text>不同高度的组有不同的动画时长</Text>
          <Space>
            <ColorPicker
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
