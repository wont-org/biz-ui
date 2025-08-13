import { useTranslation } from '@wont/biz-ui/BizProvider';

export const useFillTypeOptions = () => {
  const { t } = useTranslation();

  return {
    pure: { label: t('dataBar.fillType.pure'), value: false },
    gradient: { label: t('dataBar.fillType.gradient'), value: true },
  };
};

// 保持向下兼容，为不使用国际化的场景
export const FILL_TYPE_OPTIONS = {
  pure: { label: '纯色', value: false },
  gradient: { label: '渐变', value: true },
};
