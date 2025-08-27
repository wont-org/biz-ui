import { BizUIProvider, SelectTemplate, useTranslation } from '@wont/biz-ui';
import { Button, Form, Space, Typography } from 'antd';
import { useLocale } from 'dumi';
import React from 'react';
import { BAR_TEMPLATE_OPTIONS } from '../constant/index';
import { demoLang } from './locales/demoLang';

const { Text } = Typography;

const SelectTemplateBasicDemoInner = () => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Text type="secondary">{t('demo.descriptions.basicUsage')}</Text>
      </div>

      <Form
        labelCol={{ span: 6 }}
        initialValues={{
          readonly: {
            value: [
              BAR_TEMPLATE_OPTIONS[1].options[0].value,
              BAR_TEMPLATE_OPTIONS[1].options[1].value,
            ],
            isGrading: true,
          },
        }}
      >
        <Form.Item label={t('demo.labels.readonlyValue')} name="readonly">
          <SelectTemplate
            options={BAR_TEMPLATE_OPTIONS}
            showOptionLabel={false}
            compareKeys={['value', 'isGrading']}
            readOnly
          />
        </Form.Item>

        <Form.Item label={t('demo.labels.readonlySelectedTemplate')}>
          <SelectTemplate
            options={BAR_TEMPLATE_OPTIONS}
            value={{ isGrading: true }}
            selectedTemplate={[
              BAR_TEMPLATE_OPTIONS[1].options[0].value[0],
              BAR_TEMPLATE_OPTIONS[1].options[1].value[0],
            ]}
            readOnly
          />
        </Form.Item>

        <Form.Item
          label={t('demo.labels.dataBar')}
          name="bar"
          tooltip={t('demo.descriptions.dataBarTemplates')}
        >
          <SelectTemplate
            options={BAR_TEMPLATE_OPTIONS}
            showOptionLabel={false}
            compareKeys={['value', 'isGrading']}
          />
        </Form.Item>

        {/* <Form.Item
          label={t('demo.labels.grading')}
          name="grading"
          tooltip={t('demo.descriptions.gradingTemplates')}
        >
          <SelectTemplate
            options={GRADING_TEMPLATE_OPTIONS}
            rowWrapCount={4}
            showOptionLabel={false}
            compareKeys={['value']}
          />
        </Form.Item>

        <Form.Item
          label={t('demo.labels.iconSet')}
          name="icon"
          tooltip={t('demo.descriptions.iconTemplates')}
        >
          <SelectTemplate
            options={ICON_TEMPLATE_OPTIONS}
            rowWrapCount={2}
            compareKeys={['value']}
          />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              {t('demo.buttons.submit')}
            </Button>
            <Button htmlType="reset">{t('demo.buttons.reset')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Space>
  );
};

const SelectTemplateBasicDemo = () => {
  const { id: locale } = useLocale();
  return (
    <BizUIProvider locale={locale as any} localeData={demoLang}>
      <SelectTemplateBasicDemoInner />
    </BizUIProvider>
  );
};

export default SelectTemplateBasicDemo;
