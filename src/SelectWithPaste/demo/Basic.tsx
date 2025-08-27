import { BizUIProvider, SelectWithPaste, useTranslation } from '@wont/biz-ui';
import { Divider, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React, { useState } from 'react';
import { demoLang } from './locales/demoLang';

const { Title, Text } = Typography;

const SelectWithPasteDemoInner = () => {
  const { t } = useTranslation();
  const [value1, setValue1] = useState<string[]>(['opt1', 'opt2']);
  const [value2, setValue2] = useState<string[]>();
  const [value3, setValue3] = useState<string[]>([]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={4}>{t('demo.titles.basicUsage')}</Title>
        <Text type="secondary">{t('demo.descriptions.basicUsageDesc')}</Text>
        <div style={{ marginTop: 16 }}>
          <SelectWithPaste
            value={value1}
            onChange={(val) => setValue1(val || [])}
            selectProps={{
              style: { width: 400 },
              options: [
                { label: t('demo.options.option1'), value: 'opt1' },
                { label: t('demo.options.option2'), value: 'opt2' },
                { label: t('demo.options.option3'), value: 'opt3' },
                { label: t('demo.options.option4'), value: 'opt4' },
                { label: t('demo.options.option5'), value: 'opt5' },
              ],
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Text>
              {t('demo.labels.currentValue')} {JSON.stringify(value1)}
            </Text>
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={4}>{t('demo.titles.emailBatch')}</Title>
        <Text type="secondary">{t('demo.descriptions.emailBatchDesc')}</Text>
        <div style={{ marginTop: 16 }}>
          <SelectWithPaste
            value={value2}
            onChange={(val) => setValue2(val || [])}
            selectProps={{
              style: { width: 500 },
              placeholder: t('demo.placeholders.emailInput'),
              options: [
                { label: 'admin@example.com', value: 'admin@example.com' },
                { label: 'user@example.com', value: 'user@example.com' },
                { label: 'test@example.com', value: 'test@example.com' },
              ],
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Text>
              {t('demo.labels.emailList')} {value2?.join(', ')}
            </Text>
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={4}>{t('demo.titles.idBatch')}</Title>
        <Text type="secondary">{t('demo.descriptions.idBatchDesc')}</Text>
        <div style={{ marginTop: 16 }}>
          <SelectWithPaste
            value={value3}
            onChange={(val) => setValue3(val || [])}
            selectProps={{
              style: { width: 450 },
              placeholder: t('demo.placeholders.idInput'),
              options: [
                { label: 'ID: 100001', value: '100001' },
                { label: 'ID: 100002', value: '100002' },
                { label: 'ID: 100003', value: '100003' },
              ],
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Text>
              {t('demo.labels.idCount')} {value3.length} {t('demo.labels.count')}
            </Text>
            {value3.length > 0 && (
              <div style={{ marginTop: 4 }}>
                <Text code>{value3.join(', ')}</Text>
              </div>
            )}
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={4}>{t('demo.titles.instructions')}</Title>
        <ul>
          <li>
            <Text>{t('demo.instructions.manualInput')}</Text>
          </li>
          <li>
            <Text>{t('demo.instructions.dropdownSelect')}</Text>
          </li>
          <li>
            <Text>{t('demo.instructions.batchPaste')}</Text>
          </li>
          <li>
            <Text>{t('demo.instructions.autoDedupe')}</Text>
          </li>
          <li>
            <Text>{t('demo.instructions.autoFilter')}</Text>
          </li>
        </ul>
      </div>
    </Space>
  );
};

export default () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <SelectWithPasteDemoInner />
    </BizUIProvider>
  );
};
