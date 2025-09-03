import { BizUIProvider, MultiExpand, useTranslation } from '@wont/biz-ui';
import { Descriptions } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { getColumnsWithTranslation, icon } from './constant';
import './index.less';
import { demoLang } from './locales/demoLang';

const DescriptionBorderedDemoInner = () => {
  const { t } = useTranslation();
  const columns = getColumnsWithTranslation(t);

  return (
    <>
      <Descriptions
        className="descriptions-reset"
        labelStyle={{
          width: 200,
        }}
        bordered
        items={[
          {
            label: 'xxx',
            children: (
              <MultiExpand
                className="multi-expand-reset"
                data={columns.map((item) => ({
                  label: item.title,
                  icon,
                }))}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <DescriptionBorderedDemoInner />
    </BizUIProvider>
  );
};
