import antdEn from 'antd/lib/locale/en_US';
import antdZh from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useLocale } from './context';
import type { Language } from './types';

type AntdLocale = typeof antdZh;

/**
 * 获取 Antd 的语言配置
 * @param language 语言类型
 * @returns Antd 语言配置对象
 */
export function getAntdLocale(language: Language): AntdLocale {
  return language === 'zh' ? antdZh : antdEn;
}

/**
 * 设置 moment.js 语言
 * @param language 语言类型
 */
export function setMomentLocale(language: Language): void {
  moment.locale(language === 'zh' ? 'zh-cn' : 'en');
}

/**
 * 使用翻译功能
 * @returns 翻译函数和相关状态
 */
export function useTranslation() {
  const { t, locale, setLocale } = useLocale();
  return { t, locale, setLocale };
}

/**
 * 获取 Antd 相关配置的 hook
 * @returns Antd 配置信息
 */
export function useAntd() {
  const { locale } = useLocale();

  return {
    locale,
    antdLocale: getAntdLocale(locale),
    momentLocale: locale === 'zh' ? 'zh-cn' : 'en',
  };
}
