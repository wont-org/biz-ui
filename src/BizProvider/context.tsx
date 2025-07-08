import { createContext, useContext } from 'react';
import { LOCALE_DATA } from '../locales';
import type { LocaleContextType } from './types';
import { getLocaleData, translate } from './utils';

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/**
 * 使用国际化上下文
 * @returns 国际化上下文对象
 */
export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    const locale = 'zh';
    const messages = getLocaleData(LOCALE_DATA, locale);
    return {
      locale,
      messages,
      setLocale: () => {},
      t: (key: string, params?: Record<string, any>) => {
        return translate(messages, key, params);
      },
    };
  }
  return context;
}
