import { merge } from 'lodash';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { LOCALE_DATA } from '../locales';
import { LocaleContext } from './context';
import { setMomentLocale } from './hooks';
import type { Language, LocaleContextType, ProviderProps } from './types';
import { getLocaleData, translate } from './utils';

const defaultLocale: Language = 'zh';

const Provider: FC<ProviderProps> = ({
  children,
  locale: propLocale = defaultLocale,
  localeData: propLocaleData = LOCALE_DATA,
}) => {
  const [currentLocale, setCurrentLocale] = useState<Language>(propLocale);

  useEffect(() => {
    if (propLocale) {
      setCurrentLocale(propLocale);
    }
  }, [propLocale]);

  useEffect(() => {
    // 设置 moment 语言
    setMomentLocale(currentLocale);
  }, [currentLocale]);

  // 生成当前语言的消息数据
  const messages = useMemo(() => {
    const result = getLocaleData(merge(LOCALE_DATA, propLocaleData), currentLocale);
    return result;
  }, [currentLocale, propLocaleData]);

  // 翻译函数
  const t = useCallback(
    (key: string, params?: Record<string, any>) => {
      return translate(messages, key, params);
    },
    [messages],
  );

  const contextValue: LocaleContextType = {
    locale: currentLocale,
    messages,
    setLocale: setCurrentLocale,
    t,
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export default Provider;

// 导出类型和 hooks
export { useLocale } from './context';
export { useAntd, useTranslation } from './hooks';
export type { Language, ProviderProps } from './types';
