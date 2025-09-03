import { usePreloadImg } from '@wont/biz-ui';
import { Button, Card, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

// 示例图片URL
const imageUrls = [
  'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
  'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
];

export default () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImageUrl = imageUrls[currentImageIndex];

  // 预加载当前图片
  const preloadedImg = usePreloadImg(currentImageUrl);

  // 预加载下一张图片
  const nextImageIndex = (currentImageIndex + 1) % imageUrls.length;
  const nextImageUrl = imageUrls[nextImageIndex];
  const preloadedNextImg = usePreloadImg(nextImageUrl);

  const handleNext = () => {
    setCurrentImageIndex(nextImageIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentImageIndex === 0 ? imageUrls.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={4}>图片预加载示例</Title>
        <Text type="secondary">演示usePreloadImg的基础用法，当前图片和下一张图片都会被预加载</Text>
      </div>

      <Card style={{ width: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>
            {preloadedImg ? (
              <img
                src={preloadedImg}
                alt={`图片 ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 8,
                  color: '#999',
                }}
              >
                图片加载中...
              </div>
            )}
          </div>

          <Space>
            <Button onClick={handlePrevious}>上一张</Button>
            <Text>
              {currentImageIndex + 1} / {imageUrls.length}
            </Text>
            <Button onClick={handleNext} type="primary">
              下一张
            </Button>
          </Space>
        </div>
      </Card>

      <Card title="加载状态" style={{ width: 400 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>当前图片: </Text>
            <Text type={preloadedImg ? 'success' : 'warning'}>
              {preloadedImg ? '✅ 已加载' : '⏳ 加载中'}
            </Text>
          </div>
          <div>
            <Text strong>下一张图片: </Text>
            <Text type={preloadedNextImg ? 'success' : 'secondary'}>
              {preloadedNextImg ? '✅ 已预加载' : '⏳ 预加载中'}
            </Text>
          </div>
        </Space>
      </Card>
    </Space>
  );
};
