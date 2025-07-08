import type { Language, LocaleData, MultiLangText } from './types';

function isEmptyObject(obj: unknown) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
/**
 * 将多语言数据结构转换为指定语言的数据
 * @param data 多语言数据对象
 * @param language 目标语言
 * @returns 转换后的语言数据
 */
export function getLocaleData(data: Record<string, any>, language: Language): LocaleData {
  const langKey = language === 'zh' ? 'zhCN' : 'enUS';

  function transform(obj: Record<string, any>): any {
    if (typeof obj !== 'object' || obj === null || isEmptyObject(obj)) {
      return {};
    }

    // 如果是多语言文本对象，直接返回对应语言的值
    if (obj.enUS !== undefined && obj.zhCN !== undefined) {
      return obj[langKey];
    }

    // 递归处理嵌套对象
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = transform(obj[key]);
      }
    }

    return result;
  }

  return transform(data);
}

/**
 * 泛型函数，用于从多语言数据中提取指定语言的数据
 * @param data 多语言数据
 * @param language 目标语言
 * @returns 指定语言的数据
 */
export function getLangData<T extends Record<string, MultiLangText>>(
  data: T,
  language: Language,
): { [K in keyof T]: string } {
  const langKey = language === 'zh' ? 'zhCN' : 'enUS';
  const result = {} as { [K in keyof T]: string };

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      result[key] = data[key][langKey];
    }
  }

  return result;
}

/**
 * 翻译函数，支持参数替换
 * @param messages 语言消息对象
 * @param key 翻译键
 * @param params 参数对象
 * @returns 翻译后的文本
 */
export function translate(messages: LocaleData, key: string, params?: Record<string, any>): string {
  const keys = key.split('.');
  let value: any = messages;

  // 根据键路径查找翻译值
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key "${key}" not found`);
      return key; // 返回原始key如果找不到翻译
    }
  }

  // 如果是字符串且有参数，进行参数替换
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? String(params[paramKey]) : match;
    });
  }

  return typeof value === 'string' ? value : key;
}
