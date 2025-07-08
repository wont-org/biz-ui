export type Language = 'zh' | 'en';

export interface MultiLangText {
  enUS: string;
  zhCN: string;
}

export interface LocaleData {
  [key: string]: MultiLangText | LocaleData;
}

export interface LocaleConfig {
  locale: Language;
  messages: LocaleData;
}

export interface ProviderProps {
  children: React.ReactNode;
  locale?: Language;
  localeData?: LocaleData;
}

export interface LocaleContextType {
  locale: Language;
  messages: LocaleData;
  setLocale: (locale: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}
