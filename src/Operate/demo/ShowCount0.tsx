import { BizUIProvider, Operate, useTranslation } from '@wont/biz-ui';
import { message, Modal } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { demoLang } from './locales/demoLang';

const sleep = (timeout: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, timeout);
  });
};

interface BasicProps {
  record: Record<string, any>;
}

const ShowCount0DemoInner = (props: BasicProps) => {
  const { t } = useTranslation();
  const asyncClick = async () => {
    await sleep(2000);
  };
  const syncClick = () => {
    console.log('syncClick');
    message.success(t('demo.messages.syncOperation'));
  };
  const data = [
    {
      title: t('demo.buttons.sync'),
      onClick: syncClick,
    },
    {
      title: t('demo.buttons.delete'),
      type: 'link' as const,
      danger: true,
      onClick: () => {
        const name = props.record?.name ? `【${props.record.name}】` : '';
        Modal.confirm({
          title: t('demo.modal.deleteConfirm', { name }),
          okText: t('demo.modal.ok'),
          cancelText: t('demo.modal.cancel'),
          onOk: async () => {
            await asyncClick();
            message.success(t('demo.messages.operationSuccess'));
          },
        });
      },
    },
    {
      title: t('demo.buttons.nextHide'),
      onClick: console,
    },
    {
      title: t('demo.buttons.moreAction1'),
      onClick: () => {
        console.log('more action 1');
      },
    },
    {
      title: t('demo.buttons.moreAction2'),
      type: 'link' as const,
      danger: true,
      onClick: () => {
        console.log('more action 2');
      },
    },
  ];
  return (
    <Operate
      data={data}
      showCount={0}
      dropDownProps={{
        trigger: 'click',
      }}
    />
  );
};

export default (props: BasicProps) => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <ShowCount0DemoInner {...props} />
    </BizUIProvider>
  );
};
