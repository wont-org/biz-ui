import { BizUIProvider, PuzzleCaptcha, useTranslation } from '@wont/biz-ui';
import { Button, Card, message, Space } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { demoLang } from './locales/demoLang';

const BasicDemoInner = () => {
  const { t } = useTranslation();
  const [frontendState, setFrontendState] = useState({
    visible: false,
    useFetch: false,
    useMask: false,
  });

  const [backendState, setBackendState] = useState({
    visible: false,
    useFetch: true,
    useMask: false,
  });

  const [maskState, setMaskState] = useState({
    visible: false,
    useFetch: false,
    useMask: true,
  });

  const handleSuccess = (type: string) => {
    message.success(`${type}: ${t('demo.messages.verificationSuccess')}`);
    setFrontendState((prev) => ({ ...prev, visible: false }));
    setBackendState((prev) => ({ ...prev, visible: false }));
    setMaskState((prev) => ({ ...prev, visible: false }));
  };

  const handleFail = (type: string) => {
    message.error(`${type}: ${t('demo.messages.verificationFailed')}`);
  };

  const handleClose = () => {
    message.info(t('demo.messages.dialogClosed'));
    setFrontendState((prev) => ({ ...prev, visible: false }));
    setBackendState((prev) => ({ ...prev, visible: false }));
    setMaskState((prev) => ({ ...prev, visible: false }));
  };

  // 模拟后端验证函数
  const mockValidator = async ({ x }: { x: number }) => {
    // 模拟网络延迟
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    // 简单的验证逻辑，允许一定的误差范围
    const isValid = Math.abs(x - 200) < 10;
    return isValid;
  };

  // 模拟获取后端数据
  const mockFetchData = async () => {
    // 模拟网络延迟
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
    return {
      bgImg: 'https://picsum.photos/320/180?random=1',
      gapImg: 'https://picsum.photos/58/58?random=2',
      y: 80,
    };
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title={t('demo.titles.frontendImplementation')} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>{t('demo.descriptions.frontendDesc')}</div>
          <Button
            type="primary"
            onClick={() => setFrontendState((prev) => ({ ...prev, visible: true }))}
          >
            {t('demo.buttons.frontendVerification')}
          </Button>
          <PuzzleCaptcha
            {...frontendState}
            onSuccess={() => handleSuccess('Frontend')}
            onFail={() => handleFail('Frontend')}
            onClose={handleClose}
          />
        </Space>
      </Card>

      <Card title={t('demo.titles.backendImplementation')} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>{t('demo.descriptions.backendDesc')}</div>
          <Button
            type="primary"
            onClick={() => setBackendState((prev) => ({ ...prev, visible: true }))}
          >
            {t('demo.buttons.backendVerification')}
          </Button>
          <PuzzleCaptcha
            {...backendState}
            validator={mockValidator}
            fetchData={mockFetchData}
            onSuccess={() => handleSuccess('Backend')}
            onFail={() => handleFail('Backend')}
            onClose={handleClose}
          />
        </Space>
      </Card>

      <Card title={t('demo.titles.withMask')} size="small">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>{t('demo.descriptions.maskDesc')}</div>
          <Button
            type="primary"
            onClick={() => setMaskState((prev) => ({ ...prev, visible: true }))}
          >
            {t('demo.buttons.withMaskVerification')}
          </Button>
          <PuzzleCaptcha
            {...maskState}
            onSuccess={() => handleSuccess('Mask')}
            onFail={() => handleFail('Mask')}
            onClose={handleClose}
          />
        </Space>
      </Card>
    </Space>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <BasicDemoInner />
    </BizUIProvider>
  );
};
